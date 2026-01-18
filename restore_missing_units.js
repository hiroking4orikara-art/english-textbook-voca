const fs = require('fs');
const path = require('path');

const filePath = path.join(__dirname, 'data.js');
let content = fs.readFileSync(filePath, 'utf8');

function parseSection(fullText, key) {
    const keyRe = new RegExp(`"${key}":\\s*\\[`);
    const match = fullText.match(keyRe);
    if (!match) return null;

    let currentIdx = -1;
    // Find first [ after match
    for (let i = match.index; i < fullText.length; i++) {
        if (fullText[i] === '[') {
            currentIdx = i;
            break;
        }
    }
    if (currentIdx === -1) return null;

    let balance = 1;
    let endIdx = -1;

    for (let i = currentIdx + 1; i < fullText.length; i++) {
        const char = fullText[i];
        if (char === '[') balance++;
        else if (char === ']') balance--;

        if (balance === 0) {
            endIdx = i;
            break;
        }
    }

    return {
        start: currentIdx,
        end: endIdx,
        content: fullText.substring(currentIdx + 1, endIdx)
    };
}

const g3 = parseSection(content, '3');
if (!g3) {
    console.error("G3 section not found");
    process.exit(1);
}

function getLessons(text) {
    const lessons = [];
    let balance = 0;
    let buffer = "";
    let inLesson = false;

    const lines = text.split('\n');
    for (const line of lines) {
        // Strip comments but keep line structure
        const clean = line.replace(/\/\/.*$/, '').replace(/\/\*.*?\*\//g, '');

        if (!inLesson && clean.includes('{')) {
            inLesson = true;
        }

        if (inLesson) {
            buffer += line + '\n';
            for (const c of clean) {
                if (c === '{') balance++;
                if (c === '}') balance--;
            }
            if (balance === 0) {
                lessons.push(buffer);
                buffer = "";
                inLesson = false;
            }
        }
    }
    return lessons;
}

const lessons = getLessons(g3.content);
const newLessons = [];

const project1 = `
            {
                "unit": "Project 1",
                "pages": "P38〜39",
                "words": [
                    { "en": "furniture", "jp": "家具", "part": "noun" },
                    { "en": "actually", "jp": "実際には, 実は", "part": "adverb" },
                    { "en": "actor", "jp": "俳優", "part": "noun" },
                    { "en": "doctor", "jp": "医者", "part": "noun" },
                    { "en": "police", "jp": "(しばしば the policeで)警察", "part": "noun" },
                    { "en": "officer", "jp": "警察官", "part": "noun" },
                    { "en": "police officer", "jp": "警察官", "part": "noun" },
                    { "en": "scientist", "jp": "科学者; 自然科学者", "part": "noun" },
                    { "en": "interview", "jp": "インタビュー[面接]をする", "part": "verb" },
                    { "en": "musician", "jp": "音楽家", "part": "noun" },
                    { "en": "volunteer", "jp": "ボランティア", "part": "noun" },
                    { "en": "need", "jp": "必要, 必要な物, 困窮", "part": "noun" }
                ]
            }`;

const reading1 = `
            {
                "unit": "Reading Lesson 1",
                "pages": "P43〜45",
                "words": [
                    { "en": "wonder", "jp": "[…]かしら(と思う), だろうか", "part": "verb" },
                    { "en": "just", "jp": "ほんの; ちょっと, ただ", "part": "adverb" },
                    { "en": "chamomile", "jp": "カモミール", "part": "noun" },
                    { "en": "outside", "jp": "外に, 外へ", "part": "adverb" },
                    { "en": "McGregor", "jp": "マグレガー(人の姓)", "part": "noun" },
                    { "en": "catch", "jp": "捕まえる, 捕る, 捕らえる", "part": "verb" },
                    { "en": "caught", "jp": "catchの過去形・過去分詞", "part": "verb" },
                    { "en": "radish", "jp": "ハツカダイコン", "part": "noun" },
                    { "en": "parsley", "jp": "パセリ", "part": "noun" },
                    { "en": "myself", "jp": "私自身を[に]", "part": "pronoun" },
                    { "en": "near", "jp": "[距離・時間が]近い, 近くの", "part": "adjective" },
                    { "en": "reason", "jp": "理由", "part": "noun" },
                    { "en": "interested", "jp": "興味をもった", "part": "adjective" },
                    { "en": "be interested in ...", "jp": "…に興味がある", "part": "phrase" },
                    { "en": "wriggle", "jp": "身をよじる, ごそごそする", "part": "verb" },
                    { "en": "wriggle out of ...", "jp": "…を身をよじって脱ぐ", "part": "phrase" },
                    { "en": "hide", "jp": "隠れる", "part": "verb" },
                    { "en": "hid", "jp": "hideの過去形", "part": "verb" },
                    { "en": "watering", "jp": "水まき(用の)", "part": "noun" },
                    { "en": "can", "jp": "缶", "part": "noun" },
                    { "en": "watering can", "jp": "じょうろ", "part": "noun" },
                    { "en": "thought", "jp": "thinkの過去形・過去分詞", "part": "verb" },
                    { "en": "safe", "jp": "安全な", "part": "adjective" },
                    { "en": "some more", "jp": "もういくらか", "part": "phrase" },
                    { "en": "last", "jp": "最後", "part": "noun" },
                    { "en": "at last", "jp": "ついに", "part": "phrase" },
                    { "en": "get home", "jp": "帰宅する", "part": "phrase" },
                    { "en": "tired", "jp": "疲れて, くたびれて", "part": "adjective" },
                    { "en": "sold", "jp": "sellの過去形・過去分詞", "part": "verb" },
                    { "en": "system", "jp": "仕組み; 体系", "part": "noun" },
                    { "en": "simple", "jp": "簡単な, わかりやすい; やさしい", "part": "adjective" },
                    { "en": "itself", "jp": "[直前の語を強めて]それ自身", "part": "pronoun" },
                    { "en": "share", "jp": "共有する, いっしょに使う", "part": "verb" },
                    { "en": "knowledge", "jp": "知識", "part": "noun" },
                    { "en": "impress", "jp": "感銘[感動]を与える, 感動させる", "part": "verb" },
                    { "en": "return", "jp": "帰る, もどる", "part": "verb" },
                    { "en": "parent", "jp": "親; [複数形parentsで]両親", "part": "noun" },
                    { "en": "with", "jp": "…にとって(は)", "part": "preposition" },
                    { "en": "worried", "jp": "不安で; 心配して", "part": "adjective" },
                    { "en": "decide to ...", "jp": "…することを決心する", "part": "phrase" },
                    { "en": "major", "jp": "(他と比べて)大きな, (より)重要な", "part": "adjective" },
                    { "en": "too", "jp": "あまりに(も)…すぎる", "part": "adverb" },
                    { "en": "only", "jp": "たった, ほんの", "part": "adverb" },
                    { "en": "less", "jp": "いっそう少ない量[額]", "part": "pronoun" },
                    { "en": "sell", "jp": "売る, 売っている", "part": "verb" },
                    { "en": "loaf", "jp": "パンのひとかたまり", "part": "noun" },
                    { "en": "loaves", "jp": "loaf(パンのひとかたまり)の複数形", "part": "noun" }
                ]
            }`;

for (const lesson of lessons) {
    if (lesson.includes('"unit": "Lesson 8"') && lesson.includes('"pages": "P99〜107"')) {
        console.log("Dropping duplicate Lesson 8 (P99-107)");
        continue;
    }

    newLessons.push(lesson.trim().replace(/,$/, ''));

    // Check if this is Lesson 3
    // Use more robust check than just includes
    const unitMatch = lesson.match(/"unit":\s*"([^"]+)"/);
    if (unitMatch && unitMatch[1] === "Lesson 3") {
        console.log("Inserting Project 1 and Reading 1 after Lesson 3");
        newLessons.push(project1.trim());
        newLessons.push(reading1.trim());
    }
}

const newBody = "\n" + newLessons.join(",\n") + "\n";
const finalContent = content.substring(0, g3.start + 1) + newBody + content.substring(g3.end);

fs.writeFileSync(filePath, finalContent);
console.log("Restoration Complete");
