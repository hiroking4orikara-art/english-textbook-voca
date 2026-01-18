const fs = require('fs');
const path = require('path');

const targetFile = path.join(__dirname, 'data.js');

const l1_words = [
    // Scene 1 (p.8)
    { en: "minute", jp: "(時間の)分", part: "noun" },

    // Scene 2 (p.9)
    { en: "hey", jp: "やあ、おい", part: "interjection" },
    { en: "Jack", jp: "ジャック", part: "noun" },
    { en: "before", jp: "…の前に[の]、…より先に；(…分)前", part: "preposition" },
    { en: "today", jp: "きょう", part: "noun" },
    { en: "photography", jp: "写真撮影", part: "noun" },
    { en: "That's right.", jp: "そのとおり。", part: "phrase" },
    { en: "article", jp: "(新聞や雑誌などの)記事、論文", part: "noun" },
    { en: "tournament", jp: "(リーグ戦に対して)トーナメント、勝ち抜き戦", part: "noun" },
    { en: "way", jp: "[…へ行く]道", part: "noun" },
    { en: "by the way", jp: "ところで", part: "phrase" },

    // Scene 3 (p.10)
    { en: "sister", jp: "姉、妹、女のきょうだい", part: "noun" },
    { en: "video", jp: "動画、ビデオ映像", part: "noun" },
    { en: "against", jp: "…に対抗して", part: "preposition" },
    { en: "lose", jp: "(勝負に)負ける", part: "verb" },
    { en: "lost", jp: "lose(負ける)の過去形・過去分詞", part: "verb" },
    { en: "to", jp: "…に対して；…に比べて", part: "preposition" },
    { en: "final", jp: "最後の", part: "adjective" },
    { en: "last", jp: "最後の", part: "adjective" },
    { en: "second", jp: "(時間の)秒", part: "noun" },
    { en: "break", jp: "(規則・記録・静けさなどを)破る", part: "verb" },
    { en: "broke", jp: "break(破る)の過去形", part: "verb" },
    { en: "tie", jp: "(競技の)同点、引き分け", part: "noun" },

    // Goal Activity (p.11)
    { en: "surely", jp: "確かに、きっと", part: "adverb" },
    { en: "competition", jp: "競技会", part: "noun" },
    { en: "card", jp: "カード", part: "noun" },
    { en: "poem", jp: "(一編の)詩", part: "noun" },
    { en: "spread", jp: "広げる、広める；広がる", part: "verb" },
    { en: "until", jp: "…まで(ずっと)", part: "preposition" },
    { en: "for", jp: "…の間", part: "preposition" },
    { en: "half", jp: "半分の", part: "adjective" },
    { en: "hour", jp: "時間、60分", part: "noun" },

    // Take Action! Listen 1 (p.13)
    { en: "flight", jp: "飛行便", part: "noun" },
    { en: "gate", jp: "出入り口；(飛行場の)搭乗口、ゲート", part: "noun" },
    { en: "boarding", jp: "乗船、搭乗", part: "noun" },
    { en: "immediately", jp: "すぐに、ただちに", part: "adverb" },
    { en: "passenger", jp: "(列車・船・バス・飛行機などの)乗客、旅客", part: "noun" },
    { en: "page", jp: "呼び出す", part: "verb" },
    { en: "daughter", jp: "娘", part: "noun" }
];

try {
    let content = fs.readFileSync(targetFile, 'utf8');

    // Find Grade 2 section
    const grade2Regex = /"2":\s*\[/;
    const grade2Match = content.match(grade2Regex);

    if (!grade2Match) {
        throw new Error("Grade 2 section not found");
    }

    const insertPos = grade2Match.index + grade2Match[0].length;

    // Check if L1 already exists
    if (content.includes('"unit": "Lesson 1"')) {
        // It might exist in Grade 3, so we need to be careful.
        // Let's check if "Lesson 1" exists within the Grade 2 block.
        // A simple check: get the Grade 2 substring first.
        // Finding the end of Grade 2 is tricky without full parsing, but we can look for "3": [
        const grade3Match = content.match(/"3":\s*\[/);
        let grade2Content = "";
        if (grade3Match) {
            grade2Content = content.substring(grade2Match.index, grade3Match.index);
        } else {
            grade2Content = content.substring(grade2Match.index);
        }

        if (grade2Content.includes('"unit": "Lesson 1"')) {
            console.log("Lesson 1 already exists in Grade 2. Skipping.");
            process.exit(0);
        }
    }

    const l1Obj = {
        unit: "Lesson 1",
        pages: "P7〜13",
        words: l1_words
    };

    const l1String = "\n            " + JSON.stringify(l1Obj, null, 4).replace(/\n/g, "\n            ") + ",";

    // Insert at the beginning of Grade 2 array
    const newContent = content.slice(0, insertPos) + l1String + content.slice(insertPos);

    fs.writeFileSync(targetFile, newContent);
    console.log("Successfully inserted Lesson 1 into Grade 2.");

} catch (e) {
    console.error("Error:", e);
    process.exit(1);
}
