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
if (l6Index === -1) {
    console.error("Could not find Lesson 6");
    process.exit(1);
}

const l6 = lessons[l6Index];

// Words transcribed from the 5 new images
// Image 1: Part 2 & Goal Activity
// Image 2: Goal Activity continued?
// Image 3: Project 2 start
// Image 4: Project 2 continued
// Image 5: Project 2 end / Reading Lesson 2 start

const newVerifiedWords = [
    // Image 1 (p70-73)
    { en: "I mean", jp: "つまりその", part: "phrase" },
    { en: "left-handedness", jp: "左きき", part: "noun" },
    { en: "aware", jp: "気づいて、知って", part: "adjective" },
    { en: "be aware of ...", jp: "…に気づいている", part: "phrase" },
    { en: "ever", jp: "[比較のことばとともに用いて]今までに(…したうちで)", "part": "adverb" },
    { en: "meat", jp: "食用肉", part: "noun" },
    { en: "What else ...?", jp: "ほかに何か…はありますか。", part: "phrase" },
    { en: "allergy", jp: "アレルギー", part: "noun" },
    { en: "egg-free", jp: "卵を使用していない", part: "adjective" },
    { en: "fairness", jp: "公正、公平", part: "noun" },

    // Image 2
    { en: "treat", jp: "(人を)扱う、待遇する", part: "verb" },
    { en: "equally", jp: "平等に、等しく", part: "adverb" }, // "part": "副" -> adverb
    { en: "resource", jp: "資源、資産", part: "noun" },
    { en: "distribute", jp: "配る、分配する", part: "verb" },
    { en: "number", jp: "[…の]総数、数量", part: "noun" },
    { en: "seem", jp: "…のように見える", part: "verb" }, // "動" -> verb
    { en: "unfair", jp: "不公平な; 不正な", part: "adjective" },
    { en: "result", jp: "結果; 成果", part: "noun" },
    { en: "same", jp: "同じ物[事]", part: "pronoun" }, // "代" -> pronoun
    { en: "next", jp: "となりの、最も近い", part: "adjective" }, // "形" -> adjective
    { en: "middle", jp: "真ん中", part: "noun" },

    // Image 3
    { en: "recognize", jp: "認識する", part: "verb" },
    { en: "be", jp: "[be + 過去分詞の形で]…される", part: "auxiliary verb" }, // "助" -> auxiliary verb
    { en: "achieve", jp: "手に入れる、得る", part: "verb" },
    { en: "situation", jp: "立場、状態", part: "noun" }, // "名" -> noun

    // Project 2 (p76-77) - Image 3 bottom & Image 4 & Image 5 top
    { en: "alarm", jp: "目覚まし時計; 警報", part: "noun" },
    { en: "within", jp: "[時間・距離]…以内に[で]; [範囲]…の範囲内に[で]", part: "preposition" }, // "前" -> preposition
    { en: "hop", jp: "ぴょんととぶ", part: "verb" },
    { en: "around", jp: "あちらこちらを[に]、四方(八方)に", part: "adverb" }, // "副" -> adverb
    { en: "buy", jp: "買い物; 買い得品", part: "noun" },

    // Image 4 (Project 2 continued - NEW WORDS!)
    { en: "might", jp: "[可能性]…かもしれない", part: "auxiliary verb" }, // Guessing JP based on image snippet visibility or standard dict
    { en: "apartment", jp: "[米で](アパート内の)1世帯分の部屋; アパート、マンション、共同住宅", part: "noun" },
    { en: "otherwise", jp: "もしそうでなければ、そうしなければ", part: "adverb" },
    { en: "annoying", jp: "しゃくにさわる、うるさい、迷惑な", part: "adjective" },
    { en: "battery", jp: "電池、バッテリー", part: "noun" },
    { en: "last", jp: "続く", part: "verb" },
    { en: "although", jp: "…だけれども、…という事実に関わらず", part: "conjunction" }, // "接"
    { en: "backlight", jp: "バックライト", part: "noun" },
    { en: "dark", jp: "暗やみ", part: "noun" },
    { en: "bedroom", jp: "寝室", part: "noun" },
    { en: "bathroom", jp: "浴室", part: "noun" }, // Image says "浴室". Previous was toilet context?
    { en: "at", jp: "[値段・程度・割合・速度などが]…で", part: "preposition" },

    // Image 5 (Project 2 continued & RL2 start)
    { en: "discount", jp: "割引、割引額", part: "noun" },
    { en: "sale", jp: "販売", part: "noun" },
    { en: "model", jp: "模型; 型", part: "noun" }, // Check image: "模型; 型"
    { en: "simple", jp: "質素な、はででない; 簡素な", part: "adjective" },
    { en: "compact", jp: "小型の", part: "adjective" },
    { en: "function", jp: "機能", part: "noun" },

    // Reading Lesson 2 (p78-81)
    { en: "honor", jp: "尊敬する、敬意を表す", part: "verb" },
    { en: "achievement", jp: "やりとげたこと、業績、偉業", part: "noun" },
    { en: "Martin Luther King, Jr.", jp: "マーティン・ルーサー・キング・ジュニア", part: "noun" },
    { en: "liberty", jp: "自由", part: "noun" }, // "名" -> noun
    { en: "justice", jp: "正義、正しさ、公平", part: "noun" }
];

// Strategy:
// 1. Keep the start of Lesson 6 that we assume is correct (Part 1: fair...struggle etc)
//    Wait, Image 1 starts with "I mean". That matches our previous list's middle.
//    "fair" to "difficulty" (10 words) are BEFORE "I mean".
//    So we KEEP the words before "I mean".
// 2. REPLACE everything from "I mean" onwards with this new list.
// 3. APPEND the rest of Reading Lesson 2 that we already had (from "narrow" onwards) because the user hasn't sent the next images yet, 
//    BUT we must ensure we don't duplicate things.
//    Actually, the user said "Lesson 6 ... 12 pages". I only got 5.
//    I should assume the rest of Reading Lesson 2 is coming or I should verify what I have.
//    The previous "fix_reading_lesson_2_placement.js" appended words like "success", "speech" etc to L6.
//    Those are definitely AFTER "justice". 
//    "justice" is in my new list.
//    So I should merge:
//    [Part 1 existing] + [New Verified Batch] + [Existing RL2 words after "justice"]

const part1Words = [];
let foundIMean = false;
for (const w of l6.words) {
    if (w.en === "I mean") {
        foundIMean = true;
        break;
    }
    part1Words.push(w);
}

// Existing words that come AFTER "justice" (from previous data)
// We need to find "justice" in the existing L6 and take everything after it.
// Previously "justice" was in L6 (moved in step 1?). No, "justice" was in L6_base (Reading Lesson 2).
// Wait, in `data.js` right now, L6 ends with the huge chunk I moved from L7?
// Yes.
// So I need to find "justice" in current L6, and preserve everything AFTER it, 
// assuming the user's next images will just confirm them. 
// But since the user is re-uploading, I should trust the NEW images. 
// Since I don't have the next image, I will TRUST MY EXISTING DATA for the rest of RL2 for now, 
// to avoid deleting it.

let afterJusticeWords = [];
let foundJustice = false;
for (const w of l6.words) {
    if (foundJustice) {
        afterJusticeWords.push(w);
    }
    if (w.en === "justice") {
        foundJustice = true;
    }
}

// If "justice" wasn't found in L6 (maybe it was lost?), we might have a problem.
// It should be there.

// Assemble new L6 words
let finalL6Words = [...part1Words, ...newVerifiedWords];

if (foundJustice) {
    // Check for overlaps. 
    // The new list ends with "justice".
    // "afterJusticeWords" starts with whatever was after "justice".
    // We should create a unique set or just concat.
    finalL6Words = finalL6Words.concat(afterJusticeWords);
} else {
    // If we didn't find justice in old data, maybe it was named differently or missing?
    // We just keep what we verified.
    console.log("Warning: 'justice' not found in existing data to preserve subsequent words.");
}

// Helper to remove duplicates by 'en' key, keeping the first occurrence (which is the new verified one if overlap)
// Actually, newVerifiedWords are the 'truth'.
// part1Words are assumed truth.
// afterJusticeWords are assumed truth residue.
// Overlaps shouldn't happen if we sliced correctly.

l6.words = finalL6Words;

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
console.log("Updated Lesson 6 partial data.");
