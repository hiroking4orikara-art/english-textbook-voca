const fs = require('fs');
const path = require('path');

const filePath = path.join(__dirname, 'data.js');
const source = fs.readFileSync(filePath, 'utf8');
const lines = source.split('\n');

function findArrayBounds(keyPattern) {
    const startIdx = lines.findIndex(line => keyPattern.test(line));
    if (startIdx === -1) return null;

    // Find opening bracket
    let arrayOpenIdx = -1;
    for (let i = startIdx; i < lines.length; i++) {
        if (lines[i].includes('[')) {
            arrayOpenIdx = i;
            break;
        }
    }
    if (arrayOpenIdx === -1) return null;

    let balance = 0;
    let arrayCloseIdx = -1;

    for (let i = arrayOpenIdx; i < lines.length; i++) {
        let line = lines[i];
        // Strip comments for bracket counting
        line = line.replace(/\/\/.*$/, '').replace(/\/\*.*?\*\//g, '');

        for (const char of line) {
            if (char === '[') balance++;
            if (char === ']') balance--;
        }

        if (balance === 0) {
            arrayCloseIdx = i;
            break;
        }
    }

    return { start: arrayOpenIdx, end: arrayCloseIdx, headerStart: startIdx };
}

const g2 = findArrayBounds(/"2":\s*\[/);
const g3 = findArrayBounds(/"3":\s*\[/);

if (!g2 || !g3) {
    console.error('Could not find Grade 2 or Grade 3 arrays');
    process.exit(1);
}

console.log(`Grade 2: ${g2.start}-${g2.end}`);
console.log(`Grade 3: ${g3.start}-${g3.end}`);

const g2Content = lines.slice(g2.start + 1, g2.end).join('\n');
const g3Content = lines.slice(g3.start + 1, g3.end).join('\n');

function parseLessons(text) {
    const rawLessons = [];
    let buffer = '';
    let balance = 0;
    let inLesson = false;

    const contentLines = text.split('\n');

    for (const line of contentLines) {
        const cleanLine = line.replace(/\/\/.*$/, '').replace(/\/\*.*?\*\//g, '');

        // Very simplified parsing logic assuming standard indentation
        // We look for { at start of an object and } at end

        if (cleanLine.trim() === '') continue;

        if (!inLesson) {
            if (cleanLine.includes('{')) {
                inLesson = true;
                buffer += line + '\n';
                for (const char of cleanLine) {
                    if (char === '{') balance++;
                    if (char === '}') balance--;
                }
                if (balance === 0) {
                    rawLessons.push(buffer);
                    buffer = '';
                    inLesson = false;
                }
            }
        } else {
            buffer += line + '\n';
            for (const char of cleanLine) {
                if (char === '{') balance++;
                if (char === '}') balance--;
            }
            if (balance === 0) {
                rawLessons.push(buffer);
                buffer = '';
                inLesson = false;
            }
        }
    }
    return rawLessons;
}

const g2Lessons = parseLessons(g2Content);
const g3Lessons = parseLessons(g3Content);

console.log(`Found ${g2Lessons.length} lessons in Grade 2`);
console.log(`Found ${g3Lessons.length} lessons in Grade 3`);

function analyzeLesson(lessonStr) {
    const unitM = lessonStr.match(/"unit":\s*"([^"]+)"/);
    const pagesM = lessonStr.match(/"pages":\s*"([^"]+)"/);

    // Check if word list is non-empty
    // Simple heuristic: look for "en":
    const hasWords = lessonStr.includes('"en":');

    return {
        unit: unitM ? unitM[1] : '',
        pages: pagesM ? pagesM[1] : '',
        hasWords: hasWords,
        fullText: lessonStr.trim().replace(/,$/, '')
    };
}

const allLessons = [];

// Keep existing G3
g3Lessons.forEach(l => {
    const info = analyzeLesson(l);
    if (info.unit) allLessons.push(info);
});

// Move G2 to G3
g2Lessons.forEach(l => {
    const info = analyzeLesson(l);
    console.log(`Evaluating G2 lesson: ${info.unit} ${info.pages} Words:${info.hasWords}`);

    if (info.unit === 'Lesson 4') allLessons.push(info);
    else if (info.unit === 'Lesson 5') {
        if (!info.hasWords) {
            console.log('Skipping empty Lesson 5');
        } else {
            allLessons.push(info);
        }
    }
    else if (info.unit === 'Lesson 6') {
        if (info.pages.includes('P69〜79')) {
            console.log('Skipping partial Lesson 6');
        } else {
            allLessons.push(info);
        }
    }
    else if (info.unit === 'Lesson 7') allLessons.push(info);
    else if (info.unit === 'Lesson 8') allLessons.push(info);
});

allLessons.sort((a, b) => {
    const getNum = (u) => {
        const m = u.match(/\d+/);
        return m ? parseInt(m[0]) : 999;
    };
    return getNum(a.unit) - getNum(b.unit);
});

const newG3Str = '\n' + allLessons.map(l => l.fullText).join(',\n') + '\n';

const finalLines = [
    ...lines.slice(0, g2.start + 1),
    ...lines.slice(g2.end, g3.start + 1),
    newG3Str,
    ...lines.slice(g3.end)
];

fs.writeFileSync(filePath, finalLines.join('\n'));
console.log('Success Reorganizing');
