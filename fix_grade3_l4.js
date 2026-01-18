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

const lesson4 = {
    unit: "Lesson 4",
    pages: "P43〜56",
    words: [
        { en: "Bollywood", jp: "ボリウッド、インド映画産業", part: "noun" },
        { en: "by", jp: "…の(すぐ)そばに", part: "preposition" },
        { en: "produce", jp: "(劇などを)製作する", part: "verb" },
        { en: "Hollywood", jp: "ハリウッド", part: "noun" },
        { en: "guess", jp: "推測", part: "noun" }, // Assuming noun based on short JP
        { en: "most", jp: "大部分; たいていのもの", part: "pronoun" },
        { en: "dancing", jp: "ダンス、踊り", part: "noun" },
        { en: "theater", jp: "劇場; [米では]映画館", part: "noun" },
        { en: "direct", jp: "(映画などを)監督[演出]する", part: "verb" },
        { en: "director", jp: "映画監督", part: "noun" },
        { en: "catch", jp: "わかる、(意味などを)つかむ、理解する", part: "verb" },
        { en: "second", jp: "第2に、2番目に", part: "adverb" },
        { en: "original", jp: "最初の、もとの", part: "adjective" },
        { en: "tone", jp: "(音・声・色などの)調子、音色、口調", part: "noun" },
        { en: "concentrate", jp: "集中する", part: "verb" },
        { en: "comfortable", jp: "快適な", part: "adjective" },
        { en: "personally", jp: "個人的には", part: "adverb" },
        { en: "view", jp: "(物の)見方、考え方、見解", part: "noun" },
        { en: "bathroom", jp: "(家庭・ホテル・レストランなどで遠回しに)トイレ、手洗い", part: "noun" },
        { en: "those", jp: "それらは[が]、あれらは[が]", part: "pronoun" },
        { en: "Hindi", jp: "ヒンディー語", part: "noun" },
        { en: "subtitle", jp: "(映画・テレビの)字幕、スーパー", part: "noun" },
        { en: "half", jp: "半分、2分の1", part: "noun" },
        { en: "Telugu", jp: "テルグ語", part: "noun" },
        { en: "streaming", jp: "ストリーミング", part: "noun" },
        { en: "service", jp: "サービス", part: "noun" },
        { en: "convenient", jp: "便利な", part: "adjective" },
        { en: "how", jp: "[人の感じをたずねて]どんなふうに、いかが", part: "adverb" },
        { en: "speak to ...", jp: "…(の心)に訴える", part: "phrase" },
        { en: "sorry", jp: "気の毒で", part: "adjective" },
        { en: "shocked", jp: "ショックを受けた", part: "adjective" },
        { en: "prefer", jp: "…のほうを好む、選ぶ", part: "verb" },
        { en: "original", jp: "独創的な、独自の", part: "adjective" },
        { en: "depend", jp: "(物事が)…による、…次第である", part: "verb" },
        { en: "on", jp: "…を支えとして; …に基づいて", part: "preposition" },
        { en: "depend on ...", jp: "…次第である", part: "phrase" },
        { en: "genre", jp: "種類、類型、ジャンル", part: "noun" },
        { en: "dubbing", jp: "吹き替え", part: "noun" },
        { en: "dub", jp: "[ほかのことばに](映画やテレビの)会話を吹き替える", part: "verb" },
        { en: "visual", jp: "映像", part: "noun" },
        { en: "bottom", jp: "いちばん下の所、下部", part: "noun" },
        { en: "screen", jp: "(テレビ・コンピュータ・映画館などの)画面、スクリーン", part: "noun" },
        { en: "totem", jp: "トーテム", part: "noun" },
        { en: "pole", jp: "棒、柱", part: "noun" },
        { en: "totem pole", jp: "トーテムポール", part: "noun" },
        { en: "Can I help you?", jp: "お手伝いしましょうか。", part: "phrase" },
        { en: "pale", jp: "(顔色が)悪い、青ざめた", part: "adjective" },
        { en: "heat", jp: "暑さ", part: "noun" },
        { en: "extra", jp: "余分の", part: "adjective" },
        { en: "shade", jp: "日陰、陰", part: "noun" },
        { en: "lose", jp: "(道に)迷う", part: "verb" },
        { en: "steam", jp: "蒸気、水蒸気", part: "noun" },
        { en: "chime", jp: "(鐘が)鳴る", part: "verb" },
        { en: "quarter", jp: "4分の1", part: "noun" }
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

// Update Lesson 4
const u = lesson4;
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
console.log("Updated Lesson 4 in Grade 3.");
