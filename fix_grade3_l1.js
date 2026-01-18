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

const newLesson1 = {
    unit: "Lesson 1",
    pages: "P7〜14", // Updated page range
    words: [
        { en: "face", jp: "直面する", part: "verb" },
        { en: "twice", jp: "2度、2回", part: "adverb" },
        { en: "hard", jp: "厳しい、つらい", part: "adjective" },
        { en: "U.F.O.", jp: "未確認飛行物体、ユーフォー", part: "noun" },
        { en: "post", jp: "(ウェブ上に)投稿する", part: "verb" },
        { en: "clip", jp: "切り抜き; (映像の)一場面、(ビデオ)クリップ", part: "noun" },
        { en: "social", jp: "社交のための、親睦の", part: "adjective" },
        { en: "media", jp: "マスコミ、マスメディア", part: "noun" },
        { en: "social media", jp: "ソーシャルメディア", part: "noun" },
        { en: "blog", jp: "ブログ", part: "noun" },
        { en: "come up with ...", jp: "…を思いつく", part: "phrase" },
        { en: "hobby", jp: "趣味", part: "noun" },
        { en: "anybody", jp: "[肯定文で]だれでも", part: "pronoun" },
        { en: "beginner", jp: "初心者、初学者", part: "noun" },
        { en: "close", jp: "(ごく)近い、接近した", part: "adjective" },
        { en: "wind", jp: "風", part: "noun" },
        { en: "star", jp: "星", part: "noun" },
        { en: "from", jp: "…から", part: "preposition" },
        { en: "awesome", jp: "すばらしい、すごい", part: "adjective" },
        { en: "workshop", jp: "(小グループの)研究会、研修会、ワークショップ", part: "noun" },
        { en: "edit", jp: "編集する", part: "verb" },
        { en: "attract", jp: "(人・人の注意などを)引きつける、魅了する", part: "verb" },
        { en: "bound", jp: "(…)行きの、(…)へ向かう", part: "adjective" },
        { en: "for", jp: "…に向かって; …行きの", part: "preposition" },
        { en: "temporarily", jp: "一時的に", part: "adverb" },
        { en: "estimate", jp: "見積もる、概算する、推定する", part: "verb" },
        { en: "option", jp: "選択(の自由); 選択(肢)", part: "noun" },
        { en: "entire", jp: "全体の、全部の", part: "adjective" },
        { en: "hurry", jp: "急ぐこと、急ぎ", part: "noun" },
        { en: "crowded", jp: "こんでいる、こみ合った", part: "adjective" },
        { en: "apologize", jp: "謝る、おわびする", part: "verb" },
        { en: "into", jp: "(物・事・人)に夢中で、…が大好きで", part: "preposition" },
        { en: "rap", jp: "ラップ音楽、ラップの曲", part: "noun" },
        { en: "hello", jp: "(電話で)もしもし", part: "interjection" },
        { en: "Jim", jp: "ジム", part: "noun" },
        { en: "to", jp: "…に(属する)、…について(いる)、…の", part: "preposition" },
        { en: "until", jp: "…まで(は)", part: "preposition" },
        { en: "later", jp: "あとで; のちほど", part: "adverb" },
        { en: "Why don't we ...?", jp: "…しませんか。", part: "phrase" },
        { en: "Why not?", jp: "いいですとも、もちろんさ。", part: "phrase" }
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
        const clean = line.replace(/\/\/.*$/, '');
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

// Update Lesson 1
const u = newLesson1;
const unitStr = `
            {
                "unit": "${u.unit}",
                "pages": "${u.pages}",
                "words": [
${u.words.map(w => `                    { "en": ${JSON.stringify(w.en)}, "jp": ${JSON.stringify(w.jp)}, "part": ${JSON.stringify(w.part)} }`).join(',\n')}
                ]
            }`;
map[u.unit] = unitStr;

// Temporarily remove Lesson 4 and Lesson 5 as they are reported incorrect (will be replaced next)
// Actually, it's safer to keep them as placeholders or just leave them until I get the new images.
// The user said "Lesson 4 and 5 are Grade 2 content", so I SHOULD probably remove them to avoid confusion
// if the user checks the app. But I will just overwrite them when the new images come.
// For now, let's just update Lesson 1.

// Construct ordered list
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
console.log("Updated Lesson 1 in Grade 3.");
