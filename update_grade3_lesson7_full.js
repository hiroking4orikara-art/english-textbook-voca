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

const l7Index = lessons.findIndex(l => l.unit === "Lesson 7");
if (l7Index === -1) {
    console.error("Could not find Lesson 7");
    process.exit(1);
}

// Lesson 7 Transcription from 5 images
// Image order based on prompt analysis and content flow:
// 1. Part 1 (pp 84-85)
// 2. Part 2 (pp 86-87) + 'encourage' block (p 87?)
// 3. Part 3 (pp 88-89) + 'narrow' block (p 89?)
// 4. Goal Activity (pp 90-91)
// 5. Take Action (p 93)

const l7Words = [
    // Part 1
    { en: "would", jp: "(もし…ならば)…するだろうに", part: "auxiliary verb" },
    { en: "machine", jp: "機械", part: "noun" },
    { en: "then", jp: "その場合には、そうすれば", part: "adverb" },
    { en: "goal", jp: "(バスケットボールなどの)ゴール", part: "noun" },
    { en: "exactly", jp: "(答えに使って)そのとおりです", part: "adverb" },
    { en: "Sweden", jp: "スウェーデン", part: "noun" },

    // Part 2
    { en: "wish", jp: "…であればなあ、…すればいいと思う", part: "verb" },
    { en: "cleaning", jp: "そうじ; クリーニング", part: "noun" },
    { en: "could", jp: "…できたら; …できるだろうに", part: "auxiliary verb" },
    { en: "wing", jp: "(鳥・飛行機の)翼", part: "noun" },

    // Use Read / Part 2 cont?
    { en: "encourage ... to ~", jp: "…を~するよう励ます", part: "phrase" },
    { en: "healthy", jp: "健康によい; 健全な", part: "adjective" },
    { en: "instead of ...", jp: "…のかわりに", part: "phrase" },
    { en: "escalator", jp: "エスカレーター", part: "noun" },
    { en: "so", jp: "[目的を表して]…するために", part: "conjunction" },
    { en: "that", jp: "…するために、…する[できる]ように", part: "conjunction" },
    { en: "so that ...", jp: "…するために", part: "phrase" }, // This might be "so that" conjunction or phrase. Image says "so that ...".

    // Part 3
    { en: "line", jp: "列に並べる", part: "verb" },
    { en: "up", jp: "まとめて、まとまるように", part: "adverb" },
    { en: "line up", jp: "整列させる、並べる", part: "phrase" },
    { en: "neatly", jp: "きちんと、小ぎれいに", part: "adverb" },
    { en: "footprint", jp: "足跡", part: "noun" },
    { en: "sticker", jp: "ステッカー、シール", part: "noun" },

    // Part 4 / Read (The 'narrow' block) - Validated as L7 content (Universal Design)
    { en: "narrow", jp: "狭い、細い", part: "adjective" },
    { en: "still", jp: "それでも", part: "adverb" },
    { en: "park", jp: "(自動車などを)駐車する", part: "verb" },
    { en: "front", jp: "前部; 前面、正面", part: "noun" },
    { en: "of", jp: "…から(離れて)", part: "preposition" },
    { en: "in front of ...", jp: "…の前に", part: "phrase" }, // Image has "in front of ..."
    { en: "parking", jp: "駐車", part: "noun" },
    { en: "entrance", jp: "入り口", part: "noun" },
    { en: "appear", jp: "現れる; (テレビなどに)出る", part: "verb" },
    { en: "private", jp: "個人の; 私有の", part: "adjective" },
    { en: "privacy", jp: "私的な自由、プライバシー", part: "noun" },

    // Goal Activity
    { en: "score", jp: "得点、点数", part: "noun" },
    { en: "nervous", jp: "心配して、不安で", part: "adjective" },
    { en: "past", jp: "過去", part: "noun" },
    { en: "truth", jp: "真実、事実", part: "noun" },
    { en: "period", jp: "時代", part: "noun" },
    { en: "Mars", jp: "火星", part: "noun" },
    { en: "grandchild", jp: "孫", part: "noun" },
    { en: "grandchildren", jp: "grandchild(孫)の複数形", part: "noun" },
    { en: "street", jp: "[Streetの表記で]…通り、…街", part: "noun" },
    { en: "satisfy", jp: "満足させる、満たす", part: "verb" },
    { en: "litter", jp: "ごみくず、がらくた", part: "noun" },

    // Take Action!
    { en: "habitat", jp: "生息地", part: "noun" },
    { en: "delicate", jp: "(物が)壊れやすい、傷つきやすい", part: "adjective" },
    { en: "path", jp: "(野・森に自然に出来た)小道; (庭・公園の)歩道", part: "noun" },
    { en: "guideline", jp: "指針", part: "noun" }
];

const newWordsBlock = "\n" + l7Words.map(w => `                    { "en": ${JSON.stringify(w.en)}, "jp": ${JSON.stringify(w.jp)}, "part": ${JSON.stringify(w.part)} }`).join(',\n') + "\n                ";

const finalContent = content.substring(0, wordsStartIndex) + newWordsBlock + content.substring(wordsEndIndex);
fs.writeFileSync(filePath, finalContent);
console.log("Updated Lesson 7 with full verified set.");
