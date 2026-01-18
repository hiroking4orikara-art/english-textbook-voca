const fs = require('fs');
const path = require('path');

const targetFile = path.join(__dirname, 'data.js');

const l5_words = [
    // Take Action Talk 2 (p.56)
    { en: "zip-lining", jp: "ジップライン", part: "noun" },
    { en: "take", jp: "[交通手段として]乗る；…に乗って行く", part: "verb" },
    { en: "canoe", jp: "カヌー", part: "noun" },
    { en: "forget", jp: "忘れる", part: "verb" },
    { en: "with", jp: "…に賛成して、…に同調して", part: "preposition" },
    { en: "dangerous", jp: "危険な", part: "adjective" },
    { en: "money", jp: "お金", part: "noun" },

    // Lesson 5 Part 1 (p.58-59)
    { en: "balloon", jp: "風船", part: "noun" },
    { en: "card", jp: "(あいさつ・お祝いなどの)カード", part: "noun" },
    { en: "cookie", jp: "クッキー", part: "noun" },
    { en: "cupcake", jp: "カップケーキ", part: "noun" },
    { en: "Uluru", jp: "ウルル", part: "noun" },
    { en: "rock", jp: "岩、岩石", part: "noun" },
    { en: "organize", jp: "計画して準備する、主催する", part: "verb" },
    { en: "sound", jp: "…に聞こえる[思われる]", part: "verb" },
    { en: "sign", jp: "(会社などと)契約する", part: "verb" },
    { en: "up", jp: "最後まで、すっかり、つきて", part: "adverb" },
    { en: "sign up", jp: "登録をする", part: "phrase" }, // Usually sign up for -> 登録する but text says "登録をする"
    { en: "live", jp: "生放送の、ライブの、生の", part: "adjective" },
    { en: "culture", jp: "文化", part: "noun" },
    { en: "theme", jp: "主題、テーマ", part: "noun" },
    { en: "theme park", jp: "テーマパーク", part: "noun" },
    { en: "heritage", jp: "(文化的・歴史的な)遺産", part: "noun" },
    { en: "site", jp: "敷地、(重大な出来事などが)行われる[行われた]場所；遺跡", part: "noun" },
    { en: "World Heritage Site", jp: "世界遺産", part: "noun" },

    // Lesson 5 Part 2 (p.60-61)
    { en: "send", jp: "送る、(手紙などを)出す", part: "verb" },
    { en: "link", jp: "結び付ける人[物]、リンク", part: "noun" },
    { en: "website", jp: "ウェブサイト", part: "noun" },
    { en: "check", jp: "確認する、調べる", part: "verb" },
    { en: "check out", jp: "調べる", part: "phrase" },
    { en: "guidebook", jp: "観光案内書、ガイドブック", part: "noun" },
    { en: "Elizabeth", jp: "エリザベス", part: "noun" },
    { en: "Jones", jp: "ジョーンズ", part: "noun" },
    { en: "call", jp: "[call ... ~の形で]…を～と呼ぶ", part: "verb" },
    { en: "make", jp: "[make ... ~の形で]…を～にする", part: "verb" },
    { en: "California", jp: "カリフォルニア", part: "noun" },
    { en: "Hawaii", jp: "ハワイ", part: "noun" },
    { en: "Georgia", jp: "ジョージア", part: "noun" },
    { en: "aloha", jp: "こんにちは、ようこそ；さようなら", part: "interjection" },
    { en: "state", jp: "[しばしばStateの形で](米国・オーストラリアの)州", part: "noun" },
    { en: "golden", jp: "金色の；金の", part: "adjective" },
    { en: "win", jp: "(賞・品などを)獲得する、受賞する", part: "verb" },
    { en: "ticket", jp: "切符、入場券、チケット", part: "noun" },
    { en: "do", jp: "…する[…です]ね", part: "auxiliary verb" },
    { en: "sunrise", jp: "日の出；朝焼け", part: "noun" },
    { en: "sunset", jp: "日没；夕焼け", part: "noun" },

    // Lesson 5 Part 3 (p.62-63)
    { en: "sacred", jp: "神聖な", part: "adjective" },
    { en: "Anangu", jp: "アナング族(の)、アナング人(の)", part: "noun" },
    { en: "native", jp: "その土地[国]に生まれた[育った]", part: "adjective" },
    { en: "people", jp: "国民、民族", part: "noun" },
    { en: "ancestor", jp: "祖先、先祖", part: "noun" },
    { en: "British", jp: "英国(人)の、イギリス(人)の", part: "adjective" },
    { en: "explorer", jp: "探検家、探検者", part: "noun" },
    { en: "name", jp: "名づける、命名する", part: "verb" },
    { en: "Ayers Rock", jp: "エアーズ・ロック", part: "noun" },
    { en: "hurt", jp: "(肉体・感情などを)傷つける", part: "verb" },
    { en: "today", jp: "今日では、このごろ(は)", part: "adverb" },
    { en: "respect", jp: "尊敬する、尊重する", part: "verb" },
    { en: "tradition", jp: "伝統、慣習、しきたり", part: "noun" },
    { en: "Barunga", jp: "バランガ", part: "noun" },
    { en: "welcome", jp: "ようこそ、いらっしゃい", part: "interjection" },
    { en: "Welcome to ...", jp: "…へようこそ。", "part": "phrase" },
    { en: "studio", jp: "(芸術家の)スタジオ、アトリエ", part: "noun" },

    // Goal Activity (p.64-65)
    { en: "relaxing", jp: "くつろがせる、ゆったりとさせる", part: "adjective" },
    { en: "symbol", jp: "象徴、シンボル", part: "noun" },
    { en: "fantastic", jp: "とてもすばらしい、すてきな", part: "adjective" },
    { en: "market", jp: "市；市場", part: "noun" },
    { en: "Sydney", jp: "シドニー", part: "noun" },
    { en: "The Rocks Market", jp: "ロックス・マーケット", part: "noun" },
    { en: "spot", jp: "場所、地点", part: "noun" },
    { en: "artist", jp: "芸術家；画家；アーティスト", part: "noun" },
    { en: "gather", jp: "集める；集まる", "part": "verb" },
    { en: "here", jp: "ここに、ここで、ここへ", "part": "adverb" },
    { en: "craft", jp: "工芸", part: "noun" },
    { en: "arts and crafts", jp: "美術工芸", part: "noun" },

    // Reading for Enjoyment 2? (P94) -> Likely "Reading Lesson 2" or such. 
    // Content looks like Art. "artwork", "brush", "paint".
    { en: "artwork", jp: "(絵画などの)芸術品", part: "noun" },
    { en: "brush", jp: "ブラシ；絵筆、毛筆", part: "noun" },
    { en: "to", jp: "…すればよいか", part: "preposition" }, // [疑問詞+to+動詞]
    { en: "paint", jp: "(絵の具で絵を)かく", part: "verb" },
    { en: "hit", jp: "打つ；当たる", part: "verb" },
    { en: "home", jp: "[野球の]本塁、ホーム(ベース)", part: "noun" },
    { en: "run", jp: "[野球・クリケットの]得点", part: "noun" },
    { en: "home run", jp: "[野球の]ホームラン、本塁打", part: "noun" },
    { en: "spell", jp: "(文字を)つづる", part: "verb" },
    { en: "code", jp: "符号、コード", part: "noun" },
    { en: "fortune", jp: "運、運勢", part: "noun" },
    { en: "history", jp: "歴史", part: "noun" },
    { en: "taste", jp: "味わう", part: "verb" },
    { en: "attractive", jp: "魅力的な；人を引きつける", part: "adjective" },

    // Take Action Talk 3 (p.67)
    { en: "Could you ...?", jp: "…していただけませんか。", part: "phrase" },
    { en: "Stanley Park", jp: "スタンレー・パーク", part: "noun" },
    { en: "line", jp: "路線、線路", part: "noun" },
    { en: "Canada Line", jp: "カナダ線", part: "noun" },
    { en: "King Edward Station", jp: "キング・エドワード駅", part: "noun" },
    { en: "change", jp: "取り替える；乗り換える", part: "verb" },
    { en: "expo", jp: "博覧会、展覧会", part: "noun" },
    { en: "Expo Line", jp: "エキスポ線", part: "noun" },
    { en: "Waterfront Station", jp: "ウォーターフロント駅", part: "noun" },
    { en: "get off", jp: "降りる", part: "phrase" },
    { en: "Burrard Station", jp: "バラード駅", part: "noun" },
    { en: "visit", jp: "訪問；見物", part: "noun" }
];

try {
    let content = fs.readFileSync(targetFile, 'utf8');

    // Find "Lesson 4" to insert after.
    const l4Regex = /"unit":\s*"Lesson 4"/g;
    const l4Match = l4Regex.exec(content);

    if (!l4Match) {
        console.error("Lesson 4 not found. Please run L4 update first.");
        throw new Error("Lesson 4 missing");
    }

    // Find end of Lesson 4 block
    let braceCount = 0;
    let inString = false;
    let l4EndIndex = -1;

    // Scan backwards from match to find start {
    let scanPos = l4Match.index;
    while (scanPos > 0 && content[scanPos] !== '{') scanPos--;
    const l4Start = scanPos;

    for (let i = l4Start; i < content.length; i++) {
        const char = content[i];
        if (char === '"' && content[i - 1] !== '\\') inString = !inString;
        if (!inString) {
            if (char === '{') braceCount++;
            if (char === '}') {
                braceCount--;
                if (braceCount === 0) {
                    l4EndIndex = i + 1;
                    break;
                }
            }
        }
    }

    if (l4EndIndex === -1) throw new Error("Could not parse Lesson 4 end");

    const l5Obj = {
        unit: "Lesson 5",
        pages: "P56〜67", // Range covers Talk 2 to Talk 3
        words: l5_words
    };

    // Check if L5 already exists
    if (content.includes('"unit": "Lesson 5"') && content.lastIndexOf('"unit": "Lesson 5"') > l4Match.index) {
        // Simple check to avoid double insertion if already there (Grade 3 L5 exists, so checking Grade 2 region specifically is harder with simple string includes. 
        // But since we navigate from L4, this insertion is safe if we trust our parse)
        console.log("Lesson 5 might already exist, but proceeding with insertion logic usually.");
    }

    const l5String = ",\n            " + JSON.stringify(l5Obj, null, 4).replace(/\n/g, "\n            ");
    const newContent = content.slice(0, l4EndIndex) + l5String + content.slice(l4EndIndex);

    fs.writeFileSync(targetFile, newContent);
    console.log("Successfully inserted Grade 2 Lesson 5.");

} catch (e) {
    console.error("Error:", e);
    process.exit(1);
}
