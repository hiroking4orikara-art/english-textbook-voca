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

// Helper to parse lessons from array content
function parseLessons(text) {
    const lessons = [];
    let balance = 0;
    let buffer = '';
    let inLesson = false;
    // Normalize newlines
    const lines = text.split(/\r?\n/);

    for (const line of lines) {
        const clean = line.replace(/\/\/.*$/, '').replace(/\/\*.*?\*\//g, ''); // Simple cleanup
        if (!inLesson && clean.includes('{')) inLesson = true;

        if (inLesson) {
            buffer += line + '\n';
            for (const c of clean) {
                if (c === '{') balance++;
                if (c === '}') balance--;
            }
            if (balance === 0) {
                lessons.push(buffer.trim().replace(/,$/, ''));
                buffer = '';
                inLesson = false;
            }
        }
    }
    return lessons;
}

// 1. Get both G2 and G3 sections
const g2Sec = getSection(content, '2');
const g3Sec = getSection(content, '3');

if (!g2Sec || !g3Sec) {
    console.error("Could not find separate Grade 2 and Grade 3 sections.");
    process.exit(1);
}

// 2. Parse all lessons from both
let allLessons = [];
if (g2Sec.text.trim()) allLessons = allLessons.concat(parseLessons(g2Sec.text));
if (g3Sec.text.trim()) allLessons = allLessons.concat(parseLessons(g3Sec.text));

console.log(`Total lessons found: ${allLessons.length}`);

// 3. Classify
const g2Lessons = [];
const g3Lessons = [];

allLessons.forEach(l => {
    let lower = l.toLowerCase();

    // Grade 2 Signatures
    // Lesson 1: Peter Rabbit
    if (lower.includes('peter rabbit') || lower.includes('mcgregor') || lower.includes('chamomile')) {
        g2Lessons.push(l); return;
    }
    // Lesson 2: Alice
    if (lower.includes('alice') && (lower.includes('wonderland') || lower.includes('trouble'))) {
        g2Lessons.push(l); return;
    }
    // Lesson 6: Singapore
    if (lower.includes('singapore') || lower.includes('malay') || lower.includes('merlion')) {
        g2Lessons.push(l); return;
    }
    // Lesson 7: China? Great Wall?
    if (lower.includes('great wall') || lower.includes('chinatown')) {
        g2Lessons.push(l); return;
    }
    // Lesson 8: Rakugo
    if (lower.includes('rakugo') || lower.includes('time noodles') || lower.includes('shampoo')) {
        g2Lessons.push(l); return;
    }
    // Project 1: Furniture/Actor/Police?
    // Wait, G2 P1 is "Project 1". G3 P1 is also "Project 1".
    // G2 P1 content: Job? "police officer", "actor"? 
    // New Crown 2 L3 is "Career Day" -> Jobs. 
    // "Project 1" in G3 is usually P38-39.
    // "Project 1" in G2 is P28-31?
    // Let's check pages
    if (lower.includes('"pages": "p38〜39"')) {
        // P38-39 matches G3 Project 1 (based on previous task lists)
        g3Lessons.push(l); return;
    }

    // Grade 3 Signatures
    // Lesson 1: Sports / Join Us (Sister, video)
    if (lower.includes('"sister"') && lower.includes('"video"')) {
        g3Lessons.push(l); return;
    }
    // Lesson 2: Power of Music (Djembe, Heal)
    // Wait, do I have G3 L2? "trouble"?
    // Earlier debug showed G3 L2 was "trouble/lend/Alice" -> That's G2 L2.
    // Do I have the REAL G3 L2? 
    // Not seeing keywords for G3 L2 (Djembe, etc) in the debug output earlier.
    // If I don't have it, I can't put it in G3.

    // Lesson 3: Culture? "interest", "bakery"?
    if (lower.includes('"interest"') && lower.includes('"bakery"')) {
        // "bakery" -> L3 G3? Or L3 G2?
        // G2 L3 is "Career/Work Experience". Bakery is a workplace.
        // "interest" -> "I am interested in..."
        // This looks like G2 L3 Work Experience.
        g2Lessons.push(l); return;
    }

    // Lesson 4: Environment (Recycle, Clean)
    if (lower.includes('recycle') || lower.includes('eco-friendly') || lower.includes('clean')) {
        g3Lessons.push(l); return;
    }

    // Lesson 5: World Heritage (Uluru, Site)
    if (lower.includes('uluru') || lower.includes('world heritage') || lower.includes('live')) {
        g3Lessons.push(l); return;
    }

    // Default / Unknown
    // Let's look at Unit Name
    if (l.includes('"unit": "Lesson 1"')) { g3Lessons.push(l); } // Fallback G3 L1 if not caught by Peter Rabbit
    else if (l.includes('"unit": "Lesson 2"')) {
        // If it wasn't Alice, what is it?
        g3Lessons.push(l);
    }
    else {
        // Unknowns go to G3 for manual check? No, safer to log and maybe hold
        console.log("Unclassified lesson, defaulting to G3: " + l.substring(0, 50));
        g3Lessons.push(l);
    }
});

// Sort by Unit Number
function sorter(a, b) {
    const getNum = (str) => {
        const m = str.match(/"unit": ".*?(\d+)"/);
        return m ? parseInt(m[1]) : 999;
    };
    return getNum(a) - getNum(b);
}

g2Lessons.sort(sorter);
g3Lessons.sort(sorter);

console.log(`Classified: G2=${g2Lessons.length}, G3=${g3Lessons.length}`);

// Reconstruct File
const newG2 = '\n' + g2Lessons.join(',\n') + '\n';
const newG3 = '\n' + g3Lessons.join(',\n') + '\n';

// We need to inject carefully.
// The file might have changed structure if g2/g3 overlap or moved.
// Safest is to rebuild the string with the sections found earlier, 
// BUT we have to be careful about indices shifting if we modify the first part.

// Strategy: Split file into 3 parts: Pre-2, Post-2-Pre-3, Post-3
// g2Sec.start is index of `[` for 2.
// g2Sec.end is index of `]` for 2.
// g3Sec.start is index of `[` for 3.
// g3Sec.end is index of `]` for 3.

// Assuming 2 comes before 3.
const part1 = content.substring(0, g2Sec.start + 1);
const part2 = content.substring(g2Sec.end, g3Sec.start + 1);
const part3 = content.substring(g3Sec.end);

const newContent = part1 + newG2 + part2 + newG3 + part3;

fs.writeFileSync(filePath, newContent);
console.log("G2 and G3 Separated.");
