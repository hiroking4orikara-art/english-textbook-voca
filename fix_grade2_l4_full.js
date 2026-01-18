const fs = require('fs');
const path = require('path');

const targetFile = path.join(__dirname, 'data.js');

const l4_words_full = [
    // Previous "Part 1" (likely Get Ready / P45)
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

    // New from Image 0 (Part 1 / Core conservation words)
    { en: "recycle", jp: "再生する、再利用する", part: "verb" },
    { en: "electronic", jp: "電子の", part: "adjective" },
    { en: "goods", jp: "商品、製品", part: "noun" },
    { en: "reuse", jp: "再利用する", part: "verb" },
    { en: "reduce", jp: "減らす；減る", part: "verb" },
    { en: "waste", jp: "廃物、ごみ、くず", part: "noun" },
    { en: "eco-friendly", jp: "環境にやさしい", part: "adjective" },
    { en: "product", jp: "産物；製品", part: "noun" },
    { en: "air", jp: "空気、大気", part: "noun" },
    { en: "conditioner", jp: "調節器", part: "noun" },
    { en: "air conditioner", jp: "エアコン", part: "noun" },
    { en: "to", jp: "…に（なるまで）", part: "preposition" },

    // New from Image 3 Top (Before Part 2)
    { en: "some", jp: "(全体の中の)ある人たち；ある物", part: "pronoun" },
    { en: "dirty", jp: "きたない；汚れた", part: "adjective" },
    { en: "directly", jp: "直接に", part: "adverb" },
    { en: "pond", jp: "池", part: "noun" },
    { en: "should", jp: "…すべきである；…するほうがよい", part: "auxiliary verb" },
    { en: "presentation", jp: "発表、プレゼンテーション", part: "noun" },

    // Existing Part 2
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

    // Existing Part 3
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

    // Existing Goal Activity
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

    // Robustly find Grade 2 Lesson 4
    // 1. Find start of Grade 2
    const g2Regex = /"2":\s*\[/;
    const g2Match = g2Regex.exec(content);
    if (!g2Match) throw new Error("Grade 2 section not found");

    // 2. Find "Lesson 4" unit within Grade 2
    // We can search strictly after g2Match
    const l4UnitRegex = /"unit":\s*"Lesson 4"/g;
    l4UnitRegex.lastIndex = g2Match.index;
    const l4Match = l4UnitRegex.exec(content);

    // Check if this L4 is actually in Grade 2 (before Grade 3 starts)
    const g3Regex = /"3":\s*\[/;
    const g3Match = g3Regex.exec(content);
    if (g3Match && l4Match.index > g3Match.index) {
        throw new Error("Found Lesson 4 but it seems to be in Grade 3 or later");
    }

    if (!l4Match) throw new Error("Lesson 4 not found in Grade 2");

    // 3. Find the "words": [ ... ] array for this unit
    // Scan forward from l4Match to find "words": [
    const wordsStartRegex = /"words":\s*\[/g;
    wordsStartRegex.lastIndex = l4Match.index;
    const wordsStartMatch = wordsStartRegex.exec(content);
    if (!wordsStartMatch) throw new Error("words array not found for Lesson 4");

    const wordsStartIndex = wordsStartMatch.index + wordsStartMatch[0].length;

    // 4. Find the matching closing bracket ]
    let braceCount = 0;
    let inString = false;
    let wordsEndIndex = -1;

    for (let i = wordsStartIndex; i < content.length; i++) {
        const char = content[i];
        if (char === '"' && content[i - 1] !== '\\') inString = !inString;
        if (!inString) {
            if (char === '{') braceCount++;
            if (char === '}') braceCount--;
            if (char === ']' && braceCount === 0) {
                wordsEndIndex = i; // The closing ]
                break;
            }
        }
    }

    if (wordsEndIndex === -1) throw new Error("Could not find end of words array");

    // 5. Replace the content between wordsStartIndex and wordsEndIndex
    // JSON.stringify(l4_words_full) creates "[...]", we want content inside [ ... ]
    const jsonStr = JSON.stringify(l4_words_full, null, 4);
    // Remove leading [ and trailing ]
    const innerJson = jsonStr.substring(1, jsonStr.length - 1);

    const newContent = content.substring(0, wordsStartIndex) +
        innerJson +
        content.substring(wordsEndIndex);

    fs.writeFileSync(targetFile, newContent);
    console.log("Successfully updated Grade 2 Lesson 4 with full verified list.");

} catch (e) {
    console.error("Error:", e);
    process.exit(1);
}
