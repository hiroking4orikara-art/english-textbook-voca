const fs = require('fs');
const path = require('path');

const targetFile = path.join(__dirname, 'data.js');

// --- NEW DATA (L1, L4, L5) ---

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
    { en: "sign up", jp: "登録をする", part: "phrase" },
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

    // Reading for Enjoyment 2? (P94) -> Likely "Reading Lesson 2".
    { en: "artwork", jp: "(絵画などの)芸術品", part: "noun" },
    { en: "brush", jp: "ブラシ；絵筆、毛筆", part: "noun" },
    { en: "to", jp: "…すればよいか", part: "preposition" },
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


function extractUnitWords(content, unitName) {
    // Regex to match the unit block: { "unit": "UnitName", ... "words": [ ... ] }
    // It is safer to find the unit start, then parse the JSON-like structure manually or use a smarter regex.
    // Given the issues with simple parsing, let's try to locate the unit and then extract the words array block.

    const unitRegex = new RegExp(`"unit":\\s*"${unitName}"`, 'g');
    const match = unitRegex.exec(content);
    if (!match) return null;

    // Find the start of the object { containing this unit
    let scanIndex = match.index;
    while (scanIndex > 0 && content[scanIndex] !== '{') scanIndex--;
    const unitStartIndex = scanIndex;

    // Now find the "words": [ ... ] part
    const wordsRegex = /"words":\s*\[/;
    wordsRegex.lastIndex = unitStartIndex;
    // We need to search FROM unitStartIndex in the content string
    const subContent = content.substring(unitStartIndex);
    const wordsMatch = subContent.match(wordsRegex);
    if (!wordsMatch) return null;

    const wordsStartIndex = unitStartIndex + wordsMatch.index + wordsMatch[0].length;

    // Parse array until ]
    let braceCount = 0; // for objects inside array
    let inString = false;
    let wordsEndIndex = -1;

    for (let i = wordsStartIndex; i < content.length; i++) {
        const char = content[i];
        if (char === '"' && content[i - 1] !== '\\') inString = !inString;
        if (!inString) {
            if (char === '{') braceCount++;
            if (char === '}') braceCount--;
            if (char === ']' && braceCount === 0) {
                wordsEndIndex = i;
                break;
            }
        }
    }

    if (wordsEndIndex === -1) return null;

    // Extract string
    const arrayStr = "[" + content.substring(wordsStartIndex, wordsEndIndex) + "]";
    try {
        // Need to wrap properties in quotes if they aren't? 
        // The file content is valid JSON-like (keys are quoted).
        // However, it might contain comments /* ... */ which JSON.parse hates.
        // We should strip comments.
        const cleanStr = arrayStr.replace(/\/\*[\s\S]*?\*\//g, '');
        // Also trailing commas might exist.
        // cleanStr = cleanStr.replace(/,\s*]/g, ']'); 
        // But we can just use eval if we trust the content, or Function.
        // eval is dangerous but this is a local script.
        return eval(cleanStr);
    } catch (e) {
        console.error(`Error parsing words for ${unitName}:`, e);
        return null;
    }
}

try {
    let content = fs.readFileSync(targetFile, 'utf8');

    // Extract L2, L3, Reading L1 from Grade 2 section
    // We need to limit the search to Grade 2 section (before "3": [)
    const grade3Match = content.match(/"3":\s*\[/);
    let grade2Content = content;
    if (grade3Match) {
        grade2Content = content.substring(0, grade3Match.index);
    }

    const l2_extracted = extractUnitWords(grade2Content, "Lesson 2");
    const l3_extracted = extractUnitWords(grade2Content, "Lesson 3");
    const rl1_extracted = extractUnitWords(grade2Content, "Reading Lesson 1");

    if (!l2_extracted) console.error("Warning: Lesson 2 words not found/parsed.");
    if (!l3_extracted) console.error("Warning: Lesson 3 words not found/parsed.");
    if (!rl1_extracted) console.error("Warning: Reading Lesson 1 words not found/parsed.");

    // Construct new Grade 2 units
    const newGrade2Units = [
        {
            unit: "Lesson 1",
            pages: "P7〜13",
            words: l1_words
        },
        {
            unit: "Lesson 2",
            pages: "P15〜26",
            words: l2_extracted || []
        },
        {
            unit: "Lesson 3",
            pages: "P28〜41",
            words: l3_extracted || []
        },
        {
            unit: "Reading Lesson 1",
            pages: "P43〜45",
            words: rl1_extracted || []
        },
        {
            unit: "Lesson 4",
            pages: "P45〜53",
            words: l4_words
        },
        {
            unit: "Lesson 5",
            pages: "P56〜67",
            words: l5_words
        }
    ];

    // Convert to JSON string
    const newGrade2Str = JSON.stringify(newGrade2Units, null, 4);

    // Replace Grade 2 section in the main file
    // Find "2": [ ... ]
    const g2StartRegex = /"2":\s*\[/;
    const g2StartMatch = content.match(g2StartRegex);
    if (!g2StartMatch) throw new Error("Grade 2 start not found");

    const g2StartIndex = g2StartMatch.index + g2StartMatch[0].length;

    // Find end of Grade 2 array. It ends before "3": [ or end of file.
    let g2EndIndex = -1;
    if (grade3Match) {
        // Search backwards from grade3Match for the closing bracket of Grade 2 array
        let scan = grade3Match.index;
        while (scan > 0) {
            scan--;
            if (content[scan] === ']') { // Found closing bracket
                // Check if there is a comma
                let commaCheck = scan + 1;
                while (commaCheck < grade3Match.index && /\s/.test(content[commaCheck])) commaCheck++;
                if (content[commaCheck] === ',') {
                    // We found `],` before `"3":`
                    g2EndIndex = scan + 1; // Include ]
                    break;
                }
                // If no comma but just whitespace, then ] is end
                g2EndIndex = scan + 1;
                break;
            }
        }
    } else {
        // Assume Grade 2 is the last one
        let scan = content.lastIndexOf(']');
        // This ] matches the file closing }? No, file ends with }.
        // JSON structure: { ... "2": [ ... ] }
        // So last ] is end of "2".
        g2EndIndex = scan + 1;
    }

    if (g2EndIndex === -1) throw new Error("Could not find Grade 2 end");

    // The logic above for g2EndIndex needs to be precise. 
    // Easier: find the comma before "3": [ if it exists.
    // If we replace everything between ` "2": [` and `"3": [` it is safer, 
    // BUT we must handle the comma separating "2" and "3".

    // Let's rely on finding "3": [
    let replaceEndIndex;
    let replacement = newGrade2Str;

    if (grade3Match) {
        // We replace from g2StartIndex (after `[`) to the comma/bracket before "3":
        // Actually, let's look backwards from `"3":`
        let scan = grade3Match.index - 1;
        while (/\s/.test(content[scan])) scan--;
        if (content[scan] === ',') scan--; // Skip comma
        while (/\s/.test(content[scan])) scan--;
        if (content[scan] === ']') {
            // scan is at `]`
            // So we want to replace `...content...` between `g2StartIndex` and `scan`.
            // Wait, newGrade2Str includes `[` and `]`? 
            // JSON.stringify([]) returns "[ ... ]".
            // So we should replace the WHOLE content of "2": [ ... ]
            // i.e. REPLACE `[ ... ]` with `newGrade2Str`.

            // So start replacement at g2StartMatch.index (the `"2": [` part? No, just the `[` part?)
            // g2StartMatch[0] is `"2": [`
            // So we replace from `g2StartMatch.index + g2StartMatch[0].length - 1` (the `[`) to `scan + 1` (the `]`)
            // Actually, let's just replace the whole array.

            const arrayStartIndex = content.indexOf('[', g2StartMatch.index);
            const arrayEndIndex = scan + 1; // Position after `]`

            const before = content.substring(0, arrayStartIndex);
            const after = content.substring(arrayEndIndex);

            // Reconstruct
            const final = before + newGrade2Str + after;
            fs.writeFileSync(targetFile, final);
            console.log("Successfully restored Grade 2 (L1-L5).");
            return;
        }
    } else {
        // Should not happen as we saw "3":
        throw new Error("Grade 3 not found, assuming structure is different");
    }

} catch (e) {
    console.error("Error:", e);
    process.exit(1);
}
