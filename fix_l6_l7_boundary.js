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

const g3Section = getSection(content, '3');
if (!g3Section) {
    console.error("Could not find Grade 3 section.");
    process.exit(1);
}

const lessons = [];
let balance = 0;
let buffer = '';
let inLesson = false;
for (const line of g3Section.text.split('\n')) {
    const clean = line.replace(/\/\/.*$/, '');
    if (!inLesson && clean.includes('{')) { inLesson = true; }
    if (inLesson) {
        buffer += line + '\n';
        for (const c of clean) {
            if (c === '{') balance++;
            if (c === '}') balance--;
        }
        if (balance === 0) {
            try {
                const l = eval('(' + buffer + ')');
                lessons.push(l);
            } catch (e) {
                console.error("Failed to parse lesson chunk:", buffer);
            }
            buffer = '';
            inLesson = false;
        }
    }
}

const l6Index = lessons.findIndex(l => l.unit === "Lesson 6");
const l7Index = lessons.findIndex(l => l.unit === "Lesson 7");

if (l6Index === -1 || l7Index === -1) {
    console.error("Could not find Lesson 6 or Lesson 7");
    process.exit(1);
}

const l6 = lessons[l6Index];
const l7 = lessons[l7Index];

// Find split point
// We want to keep "Universal Design" words in L7.
// We want to move "Civil Rights" words to L6.
// Boundary seems to be: "limit" (L7 end) -> "black" (L6 start).

let splitIndex = -1;
for (let i = 0; i < l7.words.length; i++) {
    const w = l7.words[i];
    if (w.en === "black" && w.jp.includes("黒人の")) {
        splitIndex = i;
        break;
    }
}

if (splitIndex === -1) {
    // Fallback search for "Rosa Parks" or "restroom" if "black" is missing
    for (let i = 0; i < l7.words.length; i++) {
        const w = l7.words[i];
        if (w.en === "Rosa Parks" || w.en === "restroom") {
            splitIndex = i;
            // Backtrack to find start of block? 
            // "restroom" is at 1604, "black" is at 1601.
            // If we found restroom, we probably missed black?
            // Actually let's just stick to finding "black".
            // If not found, print error.
            break;
        }
    }
}

if (splitIndex !== -1) {
    const wordsToMove = l7.words.slice(splitIndex);
    const wordsToKeep = l7.words.slice(0, splitIndex);

    // Safety check
    // "limit" should be in wordsToKeep?
    const lastKeep = wordsToKeep[wordsToKeep.length - 1];

    console.log("Splitting Lesson 7...");
    console.log(`Keeping ${wordsToKeep.length} words (End: ${lastKeep.en})`);
    console.log(`Moving ${wordsToMove.length} words (Start: ${wordsToMove[0].en})`);

    l7.words = wordsToKeep;
    l6.words = l6.words.concat(wordsToMove);
} else {
    console.log("Could not find split point 'black'. Checking for manual keywords...");
    // Force move strictly known list if split point logic fails?
    // No, safest is to fail loud if structure is unexpected.
    console.error("Split point not found. Aborting to avoid data corruption.");
    process.exit(1);
}

const newBody = "\n" + lessons.map(u => {
    return `            {
                "unit": "${u.unit}",
                "pages": "${u.pages}",
                "words": [
${u.words.map(w => `                    { "en": ${JSON.stringify(w.en)}, "jp": ${JSON.stringify(w.jp)}, "part": ${JSON.stringify(w.part)} }`).join(',\n')}
                ]
            }`;
}).join(",\n") + "\n";

const finalContent = content.substring(0, g3Section.start + 1) + newBody + "        " + content.substring(g3Section.end);
fs.writeFileSync(filePath, finalContent);
console.log("Values updated successfully.");
