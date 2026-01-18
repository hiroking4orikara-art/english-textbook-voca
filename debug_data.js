const fs = require('fs');
const path = require('path');

const filePath = path.join(__dirname, 'data.js');
const content = fs.readFileSync(filePath, 'utf8');

function parseSection(fullText, key) {
    const keyRe = new RegExp(`"${key}":\\s*\\[`);
    const match = fullText.match(keyRe);
    if (!match) return null;

    let currentIdx = -1;
    for (let i = match.index; i < fullText.length; i++) {
        if (fullText[i] === '[') {
            currentIdx = i;
            break;
        }
    }
    if (currentIdx === -1) return null;

    let balance = 1;
    let endIdx = -1;

    for (let i = currentIdx + 1; i < fullText.length; i++) {
        const char = fullText[i];
        if (char === '[') balance++;
        else if (char === ']') balance--;

        if (balance === 0) {
            endIdx = i;
            break;
        }
    }

    return fullText.substring(currentIdx + 1, endIdx);
}

const g2Content = parseSection(content, '2');
const g3Content = parseSection(content, '3');

function getLessonSummaries(text) {
    const lessons = [];
    if (!text) return lessons;

    const lines = text.split('\n');
    let currentUnit = null;
    let currentPages = null;
    let firstWord = null;

    for (const line of lines) {
        const unitM = line.match(/"unit":\s*"([^"]+)"/);
        const pagesM = line.match(/"pages":\s*"([^"]+)"/);
        const wordM = line.match(/"en":\s*"([^"]+)"/);

        if (unitM) currentUnit = unitM[1];
        if (pagesM) currentPages = pagesM[1];
        if (wordM && !firstWord) firstWord = wordM[1];

        if (line.includes('}') && currentUnit && currentPages) {
            // End of a probable block or just sampling
            // actually this is lossy, but I just want a list
        }
    }

    // Better parser:
    // Split by ` {` that starts a lesson object
    // usage of regex to find all objects

    const regex = /"unit":\s*"([^"]+)",\s*"pages":\s*"([^"]+)",\s*"words":\s*\[\s*{ "en": "([^"]+)"/g;
    let match;
    while ((match = regex.exec(text)) !== null) {
        lessons.push({
            unit: match[1],
            pages: match[2],
            firstWord: match[3]
        });
    }
    return lessons;
}

console.log("--- Grade 2 (Current) ---");
console.log(getLessonSummaries(g2Content));
console.log("\n--- Grade 3 (Current) ---");
console.log(getLessonSummaries(g3Content));
