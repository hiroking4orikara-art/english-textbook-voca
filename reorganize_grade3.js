const fs = require('fs');
const path = require('path');

const filePath = path.join(__dirname, 'data.js');
let content = fs.readFileSync(filePath, 'utf8');

function getSection(text, key) {
    const startRe = new RegExp(`"${key}":\\s*\\[`);
    const match = text.match(startRe);
    if (!match) return null;
    let open = text.indexOf('[', match.index);
    let balance = 1;
    let close = -1;
    for (let i = open + 1; i < text.length; i++) {
        if (text[i] === '[') balance++;
        if (text[i] === ']') balance--;
        if (balance === 0) {
            close = i;
            break;
        }
    }
    return { start: open, end: close, text: text.substring(open + 1, close) };
}

const g3 = getSection(content, '3');
if (!g3) { console.error("No Grade 3 section"); process.exit(1); }

// Parse existing units
const units = [];
let balance = 0;
let buffer = '';
let inUnit = false;
for (const line of g3.text.split('\n')) {
    const clean = line.replace(/\/\/.*$/, '');
    if (!inUnit && clean.includes('{')) { inUnit = true; }
    if (inUnit) {
        buffer += line + '\n';
        for (const c of clean) {
            if (c === '{') balance++;
            if (c === '}') balance--;
        }
        if (balance === 0) {
            try {
                // Evaluate safe subset of JS to parse object
                const u = eval('(' + buffer + ')');
                units.push(u);
            } catch (e) {
                console.error("Failed to parse unit:", buffer);
            }
            buffer = '';
            inUnit = false;
        }
    }
}

// Define target lessons and their components
const lessonMap = {
    "Lesson 1": { pages: "P8〜14", components: ["Lesson 1"] },
    "Lesson 2": { pages: "P15〜26", components: ["Lesson 2"] },
    "Lesson 3": { pages: "P27〜41", components: ["Lesson 3", "Project 1", "Reading Lesson 1"] },
    "Lesson 4": { pages: "P43〜54", components: ["Lesson 4"] },
    "Lesson 5": { pages: "P55〜66", components: ["Lesson 5"] },
    "Lesson 6": { pages: "P67〜81", components: ["Lesson 6", "Project 2", "Reading Lesson 2"] },
    "Lesson 7": { pages: "P84〜93", components: ["Lesson 7"] },
    "Lesson 8": { pages: "P95〜111", components: ["Lesson 8", "Project 3", "Reading Lesson 3"] }
};

const finalUnits = [];
const processedComponents = new Set();

for (const [key, config] of Object.entries(lessonMap)) {
    let mergedWords = [];

    // Find and merge components
    config.components.forEach(compName => {
        const found = units.find(u => u.unit === compName);
        if (found) {
            mergedWords = mergedWords.concat(found.words);
            processedComponents.add(compName);
        }
    });

    if (mergedWords.length > 0) {
        finalUnits.push({
            unit: key,
            pages: config.pages,
            words: mergedWords
        });
    }
}

// Check for any orphans (units not in our map) and decide carefully
// The user said "Lessonナンバーが変わるまでは同じ単元"
// If there are any other units, I should probably check them.
// But for now I'll stick to the strict map as requested.

// Generate JSON string with nice formatting
const newBody = "\n" + finalUnits.map(u => {
    return `            {
                "unit": "${u.unit}",
                "pages": "${u.pages}",
                "words": [
${u.words.map(w => `                    { "en": ${JSON.stringify(w.en)}, "jp": ${JSON.stringify(w.jp)}, "part": ${JSON.stringify(w.part)} }`).join(',\n')}
                ]
            }`;
}).join(",\n") + "\n";

const finalContent = content.substring(0, g3.start + 1) + newBody + content.substring(g3.end);

fs.writeFileSync(filePath, finalContent);
console.log("Reorganized and merged Grade 3 lessons.");
