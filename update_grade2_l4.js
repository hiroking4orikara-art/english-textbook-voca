const fs = require('fs');
const path = require('path');

const targetFile = path.join(__dirname, 'data.js');

const l4_words = [
    // Part 1 (p.45-47)
    { en: "clean", jp: "きれいな、清潔な", part: "adjective" },
    { en: "there", jp: "…がある、…がいる", part: "adverb" },
    { en: "department", jp: "(デパートなどの商品別)売り場", part: "noun" },
    { en: "store", jp: "店、商店", part: "noun" },
    { en: "department store", jp: "デパート、百貨店", part: "noun" },
    { en: "post", jp: "郵便、郵便箱", part: "noun" },
    { en: "office", jp: "事務所、役所、…局", part: "noun" },
    { en: "post office", jp: "郵便局", part: "noun" },
    { en: "one of ...", jp: "…の1つ、…の1人", part: "phrase" },
    { en: "there's", jp: "there isの短縮形", part: "phrase" },
    { en: "chart", jp: "図表、グラフ", part: "noun" },
    { en: "pie chart", jp: "円グラフ", part: "noun" },

    // Part 2 (p.48-49)
    { en: "laundry", jp: "[the laundryの形で]洗濯物", part: "noun" },
    { en: "tap", jp: "蛇口", part: "noun" },
    { en: "available", jp: "[…の種類[場所]で]入手できる", part: "adjective" },
    { en: "everywhere", jp: "どこでも；いたる所に[で、を]", part: "adverb" },
    { en: "million", jp: "百万(の)", part: "noun" },
    { en: "imagine", jp: "想像する、心に思い描く", part: "verb" },
    { en: "billion", jp: "10億", part: "noun" },
    { en: "drinking", jp: "飲用(の)", part: "adjective" },
    { en: "drinking water", jp: "飲料水、飲み水", part: "noun" },
    { en: "say", jp: "(本・手紙・掲示などに)…と書いてある", part: "verb" },
    { en: "take", jp: "[…するのに](時間が)かかる；[…するのに]必要とする", part: "verb" },
    { en: "It takes ... to ~", jp: "～するのに…(時間)がかかる", part: "phrase" },
    { en: "more", jp: "もっと多くの物[人、事、量]", part: "pronoun" },
    { en: "than", jp: "[比較級に続いて]…より", part: "preposition" },
    { en: "more than ...", jp: "…より多くの、…以上の[で]", part: "phrase" },
    { en: "collect", jp: "取ってくる、取りに[迎えに]行く", part: "verb" },

    // Part 3 (p.50-51) + Pre-Part 3 words
    { en: "understand", jp: "理解する、わかる", part: "verb" },
    { en: "importance", jp: "重要性、大切さ", part: "noun" },
    { en: "of", jp: "[意味上の主語を表して]…の；[行為者]…の、…による", part: "preposition" },
    { en: "step", jp: "(成功などへの)一歩、進歩", part: "noun" },
    { en: "situation", jp: "事態、情勢", part: "noun" },
    { en: "slide", jp: "(映写用の)スライド", part: "noun" },
    { en: "graph", jp: "グラフ、図表", part: "noun" },
    { en: "already", jp: "すでに、もう", part: "adverb" },
    { en: "note", jp: "覚え書き、メモ", part: "noun" },
    { en: "save", jp: "救う、助ける；守る", part: "verb" },
    { en: "earth", jp: "地球", part: "noun" },
    { en: "turn", jp: "回る；回す", part: "verb" },
    { en: "off", jp: "(電気・水道・テレビなどが)切れて、止まって", part: "adverb" },
    { en: "turn off", jp: "止める、消す", part: "phrase" },

    // Goal Activity (p.52-53)
    { en: "handout", jp: "(配布する)資料；(教室などで配る)プリント", part: "noun" },
    { en: "if", jp: "たとえ…でも", part: "conjunction" },
    { en: "even if ...", jp: "たとえ…だとしても", part: "phrase" },
    { en: "blank", jp: "白紙の、何も書いてない", part: "adjective" },
    { en: "side", jp: "(左右・上下などの)側、(表裏・内外などの)面", part: "noun" },
    { en: "both", jp: "両方の", part: "adjective" },
    { en: "paper", jp: "紙", part: "noun" },
    { en: "set", jp: "置く", part: "verb" }
];

try {
    let content = fs.readFileSync(targetFile, 'utf8');

    // Robustly find Grade 2 section
    const grade2Regex = /"2":\s*\[/;
    const grade2Match = content.match(grade2Regex);

    if (!grade2Match) {
        throw new Error("Grade 2 section not found");
    }

    const grade2StartIndex = grade2Match.index;

    // Find "Lesson 3"
    const l3Regex = /"unit":\s*"Lesson 3"/g;
    let l3SearchBase = content.substring(grade2StartIndex);
    let l3Match = l3Regex.exec(l3SearchBase);

    if (!l3Match) throw new Error("Lesson 3 not found");

    const l3AbsStart = grade2StartIndex + l3Match.index;

    // Trace forward to find the closing brace of Lesson 3 object
    let braceCount = 0;
    let inString = false;
    let l3EndIndex = -1;
    let l3ObjStart = l3AbsStart;

    // Scan backwards to find {
    while (l3ObjStart > 0 && content[l3ObjStart] !== '{') l3ObjStart--;

    // Scan forward
    for (let i = l3ObjStart; i < content.length; i++) {
        const char = content[i];
        if (char === '"' && content[i - 1] !== '\\') {
            inString = !inString;
        }
        if (!inString) {
            if (char === '{') braceCount++;
            if (char === '}') {
                braceCount--;
                if (braceCount === 0) {
                    l3EndIndex = i + 1; // Position after }
                    break;
                }
            }
        }
    }

    if (l3EndIndex === -1) throw new Error("Could not parse Lesson 3 object end");

    const l4Obj = {
        unit: "Lesson 4",
        pages: "P45〜53",
        words: l4_words
    };

    const l4String = ",\n            " + JSON.stringify(l4Obj, null, 4).replace(/\n/g, "\n            ");

    // Check if L4 already exists (idempotency check)
    if (content.includes('"unit": "Lesson 4"')) {
        console.log("Lesson 4 seems to already exist. Skipping insertion.");
    } else {
        const newContent = content.slice(0, l3EndIndex) + l4String + content.slice(l3EndIndex);
        fs.writeFileSync(targetFile, newContent);
        console.log("Successfully inserted Lesson 4 into Grade 2.");
    }

} catch (e) {
    console.error("Error:", e);
    process.exit(1);
}
