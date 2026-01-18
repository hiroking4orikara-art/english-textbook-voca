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

const lesson5 = {
    unit: "Lesson 5",
    pages: "P55〜66", // Updated based on images P55-66 range seen
    words: [
        { en: "translate", jp: "訳す、翻訳する", part: "verb" },
        { en: "that", jp: "(…する[である])ところの", part: "pronoun" },
        { en: "translation", jp: "翻訳(すること); 翻訳(されたもの)", part: "noun" },
        { en: "which", jp: "(…する[である])ところの", part: "pronoun" },
        { en: "unique", jp: "独特な、とても珍しい", part: "adjective" },
        { en: "phrase", jp: "言い回し、表現", part: "noun" },
        { en: "clap", jp: "パチパチという音", part: "noun" },
        { en: "What about ...?", jp: "…はどうですか。", part: "phrase" },
        { en: "expression", jp: "表現; 言い回し、ことば", part: "noun" },
        { en: "exact", jp: "正確な、的確な", part: "adjective" },
        { en: "replace", jp: "取りかえる; …に取って代わる", part: "verb" },
        { en: "these", jp: "これらを[に]、これら", part: "pronoun" },
        { en: "who", jp: "…する(ところの)", part: "pronoun" },
        { en: "architect", jp: "建築家", part: "noun" },
        { en: "translator", jp: "翻訳者[家]", part: "noun" },
        { en: "deal", jp: "[deal with ... の形で]…に対処する", part: "verb" },
        { en: "deal with ...", jp: "…に対処する", part: "phrase" },
        { en: "Nodame Cantabile", jp: "『のだめカンタービレ』", part: "noun" },
        { en: "reader", jp: "読者", part: "noun" },
        { en: "unfamiliar", jp: "よく知らない; 見覚えのない; 見[聞き]なれない", part: "adjective" },
        { en: "add", jp: "書き足す、[…を]付け加える", part: "verb" },
        { en: "explanation", jp: "説明", part: "noun" },
        { en: "back", jp: "後ろ、裏", part: "noun" },
        { en: "costume", jp: "衣装", part: "noun" },
        { en: "want", jp: "[want ... to ~ の形で]…に~してもらいたい、…に~することを要求する", part: "verb" },
        { en: "sleeve", jp: "そで", part: "noun" },
        { en: "get", jp: "(人・物など)を移動させる", part: "verb" },
        { en: "strip", jp: "コマ漫画; 細長い1片", part: "noun" },
        { en: "able", jp: "[be able to ... の形で]…することができる", part: "adjective" },
        { en: "be able to ...", jp: "…できる", part: "phrase" },
        { en: "someone", jp: "だれか、ある人", part: "pronoun" },
        { en: "contact", jp: "連絡をとる", part: "verb" },
        { en: "below", jp: "下(の方)に[の]", part: "adverb" },
        { en: "through", jp: "…を通じて; …によって", part: "preposition" },
        { en: "dad", jp: "(お)父さん", part: "noun" },
        { en: "clear", jp: "クリアする、乗り越える", part: "verb" },
        { en: "stage", jp: "段階、時期", part: "noun" },
        { en: "promise", jp: "約束する", part: "verb" },
        { en: "tonight", jp: "今夜(は)、今晩", part: "adverb" },
        { en: "addiction", jp: "中毒、依存; 熱中", part: "noun" },
        { en: "apparent", jp: "明らかな", part: "adjective" },
        { en: "behavior", jp: "ふるまい; 行儀", part: "noun" },
        { en: "dependence", jp: "依存", part: "noun" },
        { en: "interaction", jp: "交流、[…間の、…との]相互作用", part: "noun" },
        { en: "face-to-face", jp: "向かい合って、対面して", part: "adverb" },
        { en: "device", jp: "装置", part: "noun" }
    ]
};

const g3 = getSection(content, '3');
if (!g3) { console.error("No Grade 3 section"); process.exit(1); }

function parseLessons(text) {
    const lessons = [];
    let balance = 0;
    let buffer = '';
    let inLesson = false;
    for (const line of text.split('\n')) {
        const clean = line.replace(/\/\/.*$/, ''); // ignore comments
        if (!inLesson && clean.includes('{')) { inLesson = true; }
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

const existingLessons = parseLessons(g3.text);
const map = {};
existingLessons.forEach(l => {
    let name = "Unknown";
    const m = l.match(/"unit": "([^"]+)"/);
    if (m) name = m[1];
    map[name] = l;
});

// Update Lesson 5
const u = lesson5;
const unitStr = `
            {
                "unit": "${u.unit}",
                "pages": "${u.pages}",
                "words": [
${u.words.map(w => `                    { "en": ${JSON.stringify(w.en)}, "jp": ${JSON.stringify(w.jp)}, "part": ${JSON.stringify(w.part)} }`).join(',\n')}
                ]
            }`;
map[u.unit] = unitStr;

// Order
const order = [
    "Lesson 1", "Lesson 2", "Lesson 3", "Project 1", "Reading Lesson 1",
    "Lesson 4", "Lesson 5", "Lesson 6", "Project 2", "Reading Lesson 2",
    "Lesson 7", "Lesson 8", "Project 3", "Reading Lesson 3"
];

const finalBodyList = [];
order.forEach(k => {
    if (map[k]) finalBodyList.push(map[k].trim());
});
for (const k in map) {
    if (!order.includes(k)) {
        finalBodyList.push(map[k].trim());
    }
}

const newG3Body = "\n" + finalBodyList.join(",\n") + "\n";
const finalContent = content.substring(0, g3.start + 1) + newG3Body + content.substring(g3.end);

fs.writeFileSync(filePath, finalContent);
console.log("Updated Lesson 5 in Grade 3.");
