const fs = require('fs');
const path = require('path');

const filePath = path.join(__dirname, 'data.js');
let content = fs.readFileSync(filePath, 'utf8');

// Helper to extract JSON section
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
if (!g3) { console.log('No G3 data'); process.exit(1); }

function parseLessons(text) {
    const lessons = [];
    let balance = 0;
    let buffer = '';
    let inLesson = false;
    for (const line of text.split('\n')) {
        const clean = line.replace(/\/\/.*$/, '');
        if (!inLesson && clean.includes('{')) inLesson = true;
        if (inLesson) {
            buffer += line + '\n';
            for (const c of clean) {
                if (c === '{') balance++;
                if (c === '}') balance--;
            }
            if (balance === 0) {
                lessons.push(buffer);
                buffer = '';
                inLesson = false;
            }
        }
    }
    return lessons;
}

const mixedLessons = parseLessons(g3.text);
const g2 = [];
const g3_clean = [];

mixedLessons.forEach(l => {
    // Classification Logic
    let isG2 = false;
    let isG3 = false;

    // Keywords
    if (l.includes('"Alice') || l.includes('Alice\'s Adventures')) isG2 = true; // L2
    if (l.includes('"bakery"') || l.includes('"interest"')) isG2 = true; // L3
    if (l.includes('"Peter Rabbit"') || l.includes('"McGregor"')) isG2 = true; // RL1
    if (l.includes('"Singapore"') || l.includes('"Southeast Asia"')) isG2 = true; // L6 (G2 L1 content)
    if (l.includes('"poison"') || l.includes('"busu"')) isG2 = true; // L8 (G2 content)
    if (l.includes('"Time Noodles"')) isG2 = true; // L8 (G2 content based on search)

    if (l.includes('"recycle"') || l.includes('"eco-friendly"')) isG3 = true; // L4
    if (l.includes('"Uluru"') || l.includes('"World Heritage"')) isG3 = true; // L5
    if (l.includes('"sister"') && l.includes('"video"')) isG3 = true; // L1 (Assume G3 Sports)

    // Conflict resolution
    if (isG2 && isG3) {
        console.log("CONFLICT in lesson: ", l.substring(0, 100));
        // If it has 'clean' and 'recycle', it's G3.
        // If it has 'poison', it's G2.
        if (l.includes('"poison"')) { isG2 = true; isG3 = false; }
        else { isG2 = false; isG3 = true; }
    }

    if (isG2) g2.push(l.trim().replace(/,$/, ''));
    else if (isG3) g3_clean.push(l.trim().replace(/,$/, ''));
    else {
        // Unclassified. Default to G3?
        // Proj 1 "furniture"?
        if (l.includes('"furniture"')) g3_clean.push(l.trim().replace(/,$/, '')); // User task cycle 15 has Proj 1
        else if (l.includes('"Chinatown"')) g3_clean.push(l.trim().replace(/,$/, '')); // L7 G3?
        else {
            console.log("Unclassified, keeping in G3: ", l.substring(0, 50));
            g3_clean.push(l.trim().replace(/,$/, ''));
        }
    }
});

// Reconstruct
const g2Body = '\n' + g2.join(',\n') + '\n';
const g3Body = '\n' + g3_clean.join(',\n') + '\n';

// We need to inject g2Body into "2": [ ... ]
// Find "2": [
const g2Section = getSection(content, '2');
// We replace the content of 2 and 3.

let newContent = content.substring(0, g3.start + 1) + g3Body + content.substring(g3.end);
// Now handle g2. Since content length changed, we must re-find g2
const g2Res = getSection(newContent, '2');
newContent = newContent.substring(0, g2Res.start + 1) + g2Body + newContent.substring(g2Res.end);

fs.writeFileSync(filePath, newContent);
console.log(`Separated: G2=${g2.length}, G3=${g3_clean.length}`);
