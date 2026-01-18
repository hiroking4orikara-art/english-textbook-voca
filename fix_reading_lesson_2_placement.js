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

// Large list of Civil Rights related words to move from L7 to L6
const wordsToMove = [
    // MLK Reading 2
    "success", "beginning", "courage", "movement", "March on Washington",
    "Dr.", "great", "speech", "make a speech", "step", "Lincoln Memorial", "head",
    "that", "child", "nation", "where", "not ... but ~", "judge", "by", "skin", "content",
    "character", "join", "join hands with ...", "Nobel Peace Prize",
    // Rosa Parks / Montgomery (User confirmed these belong to L6 context)
    "restroom", "drinking fountain", "Rosa Parks", "public", "Montgomery", "Alabama",
    "boycott", "arrest", "upset", "leader", "civil", "right", "civil rights",
    "stand", "take", "be free to ...", "anywhere", "white", "Whites Only",
    "section", "fill", "fill up", "Mrs.", "give up ...", "or", "call", "refuse",
    "control", "limit", "(1960)s", "law", "black", "America", "were"
];

const actuallyMoved = [];
const newL7Words = [];

l7.words.forEach(w => {
    let shouldMove = false;

    if (wordsToMove.includes(w.en)) {
        // Specific checks for common words to avoid false positives if L7 has duplicates
        if (w.en === "that") {
            if (w.jp.includes("という")) shouldMove = true;
        } else if (w.en === "by") {
            if (w.jp.includes("に従って")) shouldMove = true;
        } else if (w.en === "were") {
            if (w.jp.includes("いた")) shouldMove = true;
        } else if (w.en === "white") {
            // Both "white" noun and adjective might be in L6. 
            // L7 has "white" (noun), "Whites Only", "white"(adj). 
            // Assuming all Civil Rights content moves.
            shouldMove = true;
        } else if (w.en === "arrest") {
            // Noun and Verb. Both relevant.
            shouldMove = true;
        } else {
            shouldMove = true;
        }
    }

    if (shouldMove) {
        actuallyMoved.push(w);
    } else {
        newL7Words.push(w);
    }
});

l7.words = newL7Words;
l6.words = l6.words.concat(actuallyMoved);

console.log(`Moved ${actuallyMoved.length} words from Lesson 7 to Lesson 6.`);

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
console.log("Updated data.js success.");
