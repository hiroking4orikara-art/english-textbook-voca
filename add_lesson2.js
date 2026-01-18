const fs = require('fs');
const path = require('path');

const filePath = path.join(__dirname, 'data.js');
let content = fs.readFileSync(filePath, 'utf8');

// Section Parser
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

const g3 = getSection(content, '3');
if (!g3) { console.error("No Grade 3 section"); process.exit(1); }

// New Data Transcribed from Images
const lesson2 = `
            {
                "unit": "Lesson 2",
                "pages": "P15〜26",
                "words": [
                    { "en": "power", "jp": "力", "part": "noun" },
                    { "en": "have", "jp": "ずっと…している", "part": "auxiliary verb" },
                    { "en": "been", "jp": "(今まで)…し続けている", "part": "auxiliary verb" },
                    { "en": "discuss", "jp": "話し合う、討議[論議]する", "part": "verb" },
                    { "en": "album", "jp": "アルバム", "part": "noun" },
                    { "en": "used", "jp": "中古の、使用済みの", "part": "adjective" },
                    { "en": "between", "jp": "(2つ以上の選択肢)の中から", "part": "preposition" },
                    { "en": "Shake It Off", "jp": "シェイク・イット・オフ", "part": "noun" },
                    { "en": "catchy", "jp": "人の心をひき寄せる、(曲が)覚えやすい", "part": "adjective" },
                    { "en": "audience", "jp": "聴衆、観客", "part": "noun" },
                    { "en": "along", "jp": "(人と)いっしょに", "part": "adverb" },
                    { "en": "sing along", "jp": "いっしょに歌う", "part": "phrase" },
                    { "en": "sound like ...", "jp": "…のように思われる", "part": "phrase" },
                    { "en": "consider", "jp": "よく考える、熟慮する、考慮に入れる", "part": "verb" },
                    { "en": "Count on Me", "jp": "カウント・オン・ミー", "part": "noun" },
                    { "en": "lately", "jp": "最近、近ごろ", "part": "adverb" },
                    { "en": "friendship", "jp": "友情", "part": "noun" },
                    { "en": "lyric", "jp": "歌詞", "part": "noun" },
                    { "en": "move", "jp": "(心を)動かす、感動させる", "part": "verb" },
                    { "en": "set", "jp": "セット、組、そろい", "part": "noun" },
                    { "en": "problem", "jp": "(数学・理科などの)問題", "part": "noun" },
                    { "en": "folk", "jp": "みなさん、みんな", "part": "noun" },
                    { "en": "American", "jp": "アメリカの、米国の; アメリカ人の", "part": "adjective" },
                    { "en": "Bruno", "jp": "ブルーノ", "part": "noun" },
                    { "en": "Mars", "jp": "マーズ", "part": "noun" },
                    { "en": "alone", "jp": "ひとりで、単独で", "part": "adjective" },
                    { "en": "true", "jp": "ほんとうの[で]、真実の[で]、真の", "part": "adjective" },
                    { "en": "playlist", "jp": "プレイリスト", "part": "noun" },
                    { "en": "those", "jp": "その; それらの; あの; あれらの", "part": "adjective" },
                    { "en": "remind", "jp": "思い出させる", "part": "verb" },
                    { "en": "remind ... of ~", "jp": "…に~を思い起こさせる", "part": "phrase" },
                    { "en": "title", "jp": "タイトル、題名", "part": "noun" },
                    { "en": "summertime", "jp": "夏、夏季", "part": "noun" },
                    { "en": "it", "jp": "[あとにくるto doを受けて形式的な主語になる]", "part": "pronoun" },
                    { "en": "for", "jp": "[不定詞の意味上の主語を表して]…にとって", "part": "preposition" },
                    { "en": "impossible", "jp": "不可能な; ありえない", "part": "adjective" },
                    { "en": "melody", "jp": "旋律、メロディー", "part": "noun" },
                    { "en": "complex", "jp": "複雑な", "part": "adjective" },
                    { "en": "rhythm", "jp": "リズム、調子", "part": "noun" },
                    { "en": "debut", "jp": "デビューする", "part": "verb" },
                    { "en": "number", "jp": "…番、(電話などの)番号", "part": "noun" },
                    { "en": "Billboard Hot 100", "jp": "ビルボード・ホット100", "part": "noun" },
                    { "en": "unhappy", "jp": "不幸な; 悲しい", "part": "adjective" },
                    { "en": "Help!", "jp": "ヘルプ!", "part": "noun" },
                    { "en": "The Beatles", "jp": "ビートルズ", "part": "noun" },
                    { "en": "word", "jp": "単語、ことば", "part": "noun" },
                    { "en": "throughout", "jp": "…じゅう、…を通じて", "part": "preposition" },
                    { "en": "person", "jp": "人、個人、人物", "part": "noun" },
                    { "en": "down", "jp": "(勢いが)落ちて; (気持ちが)沈んで", "part": "adverb" },
                    { "en": "ask", "jp": "たのむ、求める", "part": "verb" },
                    { "en": "ask for ...", "jp": "…を求める", "part": "phrase" },
                    { "en": "contrast", "jp": "対照、対比", "part": "noun" },
                    { "en": "in contrast", "jp": "(…と)対照的に", "part": "phrase" },
                    { "en": "upbeat", "jp": "楽しい; 陽気な", "part": "adjective" },
                    { "en": "concern", "jp": "心配", "part": "noun" },
                    { "en": "better", "jp": "(健康状態が)もっとよい、より元気な", "part": "adjective" },
                    { "en": "afraid", "jp": "恐れて、こわがって; 心配して", "part": "adjective" },
                    { "en": "be afraid of ...", "jp": "…を恐れる", "part": "phrase" },
                    { "en": "passion", "jp": "情熱", "part": "noun" },
                    { "en": "fight", "jp": "たたかい; 奮闘", "part": "noun" },
                    { "en": "roller", "jp": "[roller coasterで]ジェットコースター", "part": "noun" },
                    { "en": "coaster", "jp": "[roller coasterで]ジェットコースター", "part": "noun" },
                    { "en": "roller coaster", "jp": "ジェットコースター", "part": "noun" },
                    { "en": "numbered", "jp": "番号のふられた、数字の書かれた", "part": "adjective" },
                    { "en": "line", "jp": "列; 行列", "part": "noun" },
                    { "en": "haunted", "jp": "幽霊の出る", "part": "adjective" },
                    { "en": "house", "jp": "(いろいろな目的に使われる)建物、小屋", "part": "noun" },
                    { "en": "close", "jp": "(施設などを)閉鎖する", "part": "verb" },
                    { "en": "daytime", "jp": "日中、昼間", "part": "noun" },
                    { "en": "double", "jp": "2倍の", "part": "adjective" },
                    { "en": "free", "jp": "自由な", "part": "adjective" },
                    { "en": "feel free to ...", "jp": "遠慮なく…する、気軽に…する", "part": "phrase" },
                    { "en": "go-cart", "jp": "ゴーカート", "part": "noun" },
                    { "en": "Ferris wheel", "jp": "観覧車", "part": "noun" },
                    { "en": "next", "jp": "次に; 今度", "part": "adverb" },
                    { "en": "app", "jp": "アプリ、アプリケーション", "part": "noun" },
                    { "en": "roller", "jp": "[roller skatingで]ローラースケート", "part": "noun" },
                    { "en": "according", "jp": "…によれば", "part": "adverb" },
                    { "en": "to", "jp": "…に合わせて、…に合って", "part": "preposition" },
                    { "en": "according to ...", "jp": "…によれば", "part": "phrase" }
                ]
            }`;

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
const newLessons = [];

// Insert L2 after L1
let inserted = false;
for (const l of existingLessons) {
    if (l.includes('"unit": "Lesson 1"')) {
        newLessons.push(l.trim().replace(/,$/, ''));
        newLessons.push(lesson2.trim());
        inserted = true;
    } else {
        newLessons.push(l.trim().replace(/,$/, ''));
    }
}

if (!inserted) {
    // If L1 not found, assume it's missing or sort at start
    // We'll just unshift
    newLessons.unshift(lesson2.trim());
}

// Rebuild G3 Body
const newG3Body = "\n" + newLessons.join(",\n") + "\n";
const finalContent = content.substring(0, g3.start + 1) + newG3Body + content.substring(g3.end);

fs.writeFileSync(filePath, finalContent);
console.log("Lesson 2 Added.");
