const fs = require('fs');
const path = require('path');

const targetFile = path.join(__dirname, 'data.js');

// Lesson 8: Rakugo Goes Overseas
const l8_words = [
    // Part 1 (p.99-101 / Word List p.148)
    { en: "go", jp: "届く、達する", part: "verb" }, // "Rakugo Goes Overseas" -> go abroad. Image definition: "届く、達する"
    { en: "have", jp: "(今までに)もう…してしまった", part: "auxiliary verb" }, // present perfect completion
    { en: "just", jp: "ちょうど今(…したばかり)", part: "adverb" },
    { en: "yet", jp: "[否定の疑問文で]もう(…したか)、すでに", part: "adverb" },
    { en: "now", jp: "今度は、これからは；もう；今すぐに", part: "adverb" }, // Image: "今度は、これからは；もう；今すぐに"
    { en: "show", jp: "(芝居・映画・サーカスなどの)見せ物、ショー", part: "noun" },
    { en: "Time Noodles", jp: "『時そば』", part: "noun" }, // "Taimu Nudoruzu"
    { en: "owner", jp: "所有者、持ち主", part: "noun" },
    { en: "be", jp: "(…に)いる、(…に)ある", part: "verb" },
    { en: "performer", jp: "演技者、役者；演奏者", part: "noun" },
    { en: "stage", jp: "(劇場などの)舞台、ステージ", part: "noun" },

    // Part 2 (p.102-103 / Word List p.150)
    { en: "have", jp: "(今まで)ずっと…している", part: "auxiliary verb" }, // present perfect continuation
    { en: "been", jp: "be(ある、いる)の過去分詞", part: "verb" }, // listed again with continuation meaning?
    // Image says: "have [has] been + ... の形で用いる" implicit?
    // Actually lists: "have", "been", "long", "How long...?", "since"
    { en: "long", jp: "(時間が)長く、長い間、久しく", part: "adverb" },
    { en: "How long ...?", jp: "どれくらい長く", part: "phrase" },
    { en: "since", jp: "…から(今まで)、…以来(ずっと)", part: "preposition" },
    { en: "tool", jp: "道具、手段", part: "noun" },
    { en: "represent", jp: "表す、意味する", part: "verb" },
    { en: "for example", jp: "たとえば", part: "phrase" }, // "for example"
    { en: "act", jp: "(役を)演じる", part: "verb" }, // Image 0: "act"
    { en: "conversation", jp: "会話、(人との)話", part: "noun" },
    { en: "facial", jp: "顔の", part: "adjective" },
    { en: "expression", jp: "表情", part: "noun" }, // Image 0: "expression" -> "表情"

    // Part 3 (pp.106-107? / Word List p.154, 156)
    { en: "sense", jp: "わかる心；感覚", part: "noun" },
    { en: "humor", jp: "ユーモア、おかしさ、こっけい", part: "noun" },
    { en: "over", jp: "…の一面に、…をくまなく(おおって)", part: "preposition" },
    { en: "all over the world", jp: "世界中に[で]", part: "phrase" },
    { en: "abroad", jp: "外国へ[に、で]、海外へ[に]", part: "adverb" },
    { en: "nearly", jp: "ほとんど；ほぼ", part: "adverb" },
    { en: "any", jp: "いくつかの、いくらかの、何かのか", part: "adjective" }, // Image: "いくつかの、いくらかの、何かのか" ? "何かの"
    { en: "difficulty", jp: "難しさ、困難、苦労", part: "noun" },
    { en: "difference", jp: "違い、相違(点)", part: "noun" },
    { en: "between ... and ~", jp: "…と～の間に", part: "phrase" },
    { en: "sound", jp: "音；響き", part: "noun" },
    { en: "make a sound", jp: "音をたてる", part: "phrase" },
    { en: "manners", jp: "作法；行儀、マナー", part: "noun" },
    { en: "custom", jp: "慣習、風習；習慣", part: "noun" },

    // Part 3 continued (p.156)
    { en: "opinion", jp: "意見、考え", part: "noun" },
    { en: "in my opinion", jp: "私の意見では", part: "phrase" },
    { en: "common", jp: "[in commonの形で]共通の、共通して", part: "adjective" }, // Image: "[in commonの形で]共通の、共通して"
    // Wait, Image says "common" -> "(in commonの形で) 共通の、共通して". 
    // And "in common" phrase listing.
    { en: "in common", jp: "共通して", part: "phrase" }, // implicit
    { en: "laughter", jp: "笑い", part: "noun" },
    { en: "laugh", jp: "(声を出して)笑う", part: "verb" },
    { en: "future", jp: "未来の", part: "adjective" }, // Image says "未来の" adj? Usually noun. Image: "[形]未来の"
    { en: "continue", jp: "続く；続ける", part: "verb" },
    { en: "lead", jp: "(道などが)通じる、至る", part: "verb" },
    { en: "peaceful", jp: "平和(的)な、おだやかな", part: "adjective" },
    { en: "pleasure", jp: "楽しみ、喜び", part: "noun" },
    { en: "My pleasure.", jp: "どういたしまして。", part: "phrase" },

    // Goal Activity (p.104-105 / Word List p.152) - Usually between Part 2 and 3?
    { en: "now", jp: "[文頭で]さあ、さて", part: "adverb" }, // Image: "now" -> "さあ、さて"
    { en: "begin", jp: "始まる、始める", part: "verb" },
    { en: "David", jp: "デイビッド、デビッド", part: "noun" },
    { en: "Miller", jp: "ミラー", part: "noun" },
    { en: "question", jp: "質問、問い", part: "noun" },
    { en: "you've", jp: "you haveの短縮形", part: "auxiliary verb" },
    { en: "long", jp: "(時間が)長い、長時間", part: "adjective" }, // Image: "[形](時間が)長い、長時間" (Wait, Part 2 was adverb)
    { en: "for a long time", jp: "長い間", part: "phrase" },
    { en: "perform", jp: "演じる、演奏する；上演する", part: "verb" },
    { en: "united", jp: "連合した；(一致)団結した、まとまった", part: "adjective" },
    { en: "United States", jp: "ユナイテッドステイツ", part: "noun" }, // "the United States"
    { en: "joke", jp: "冗談、しゃれ", part: "noun" }
];

// Project 3: Favorite (Travel Map)
const proj3_words = [
    { en: "favorite", jp: "お気に入りの[人、もの]", part: "noun" }, // Image: [名]お気に入りの(人[もの])
    { en: "pork-based", jp: "豚肉ベースの", part: "adjective" },
    { en: "roast", jp: "焼いた、あぶった", part: "adjective" },
    { en: "item", jp: "項目；品目", part: "noun" },
    { en: "by", jp: "…までに(は)", part: "preposition" },
    { en: "photo", jp: "写真", part: "noun" },
    { en: "far", jp: "(距離・時間が)遠くに、遠く", part: "adverb" },
    { en: "so far", jp: "今のところでは", part: "phrase" },
    { en: "strongly", jp: "強く；激しく", part: "adverb" },
    { en: "star-shaped", jp: "スターシェイプト", part: "adjective" }, // "星形の"
    { en: "thousands of ...", jp: "何千の…、非常に多数の…", part: "phrase" },
    { en: "cherry", jp: "サクラの木", part: "noun" }
];

// Reading Lesson 3: A Pot of Poison
const read3_words = [
    { en: "viewing", jp: "見ること、鑑賞", part: "noun" },
    { en: "bathing", jp: "水浴び", part: "noun" },
    { en: "impressive", jp: "印象的", part: "adjective" }, // Missing 'na' in transcription? Image: "印象的" or "印象的な"? Image: "印象的[IV]..." can't read right side fully, wait 1768729727059.jpg
    // "impressive [adj] 印象的な" (standard). Let's assume "印象的な".
    { en: "day", jp: "日", part: "noun" },
    { en: "New Year's Day", jp: "ニューイヤーズデイ", part: "noun" }, // "元日"
    { en: "for", jp: "…のために、…の理由で", part: "preposition" },
    { en: "be famous for ...", jp: "…で有名だ", part: "phrase" },
    { en: "meal", jp: "食事", part: "noun" },
    { en: "price", jp: "値段、価格", part: "noun" },
    { en: "to", jp: "…まで", part: "preposition" },
    { en: "from ... to ~", jp: "…から～まで", part: "phrase" },

    // A Pot of Poison story words
    { en: "poison", jp: "毒、毒薬", part: "noun" },
    { en: "away", jp: "(距離的に)離れて、遠くに", part: "adverb" },
    { en: "priest", jp: "僧侶", part: "noun" },
    { en: "neighboring", jp: "近くの、近所の", part: "adjective" }, // "neighboring"
    { en: "invite", jp: "招待する、招く", part: "verb" },
    { en: "be back", jp: "帰る", part: "phrase" },
    { en: "yes", jp: "[呼びかけられて]はい", part: "adverb" },
    { en: "master", jp: "主人；住職；和尚", part: "noun" },
    { en: "shelf", jp: "たな", part: "noun" },
    { en: "be full of ...", jp: "…でいっぱいである", part: "phrase" },
    { en: "worry", jp: "心配する、気をもむ", part: "verb" },
    { en: "Don't worry.", jp: "心配しないで。", part: "phrase" },
    { en: "pass", jp: "(時などが)過ぎ去る、たつ", part: "verb" },

    // Page 184? (likely extension of Reading 3)
    { en: "shall", jp: "(私)たち(は)…しましょうか", part: "auxiliary verb" },
    { en: "Shall we ...?", jp: "…しましょうか。", part: "phrase" },
    { en: "Yes, let's.", jp: "そうしよう。", part: "phrase" },
    { en: "wipe", jp: "(…の表面を)ふく、ぬぐう", part: "verb" },
    { en: "shut", jp: "(ドアなどを)しめる、閉じる", part: "verb" },
    { en: "take", jp: "(手に)取る、つかむ", part: "verb" },
    { en: "take off ...", jp: "…を取り外す", part: "phrase" },
    { en: "lid", jp: "ふた", part: "noun" },
    { en: "stuff", jp: "もの", part: "noun" },
    { en: "sugar", jp: "砂糖", part: "noun" },
    { en: "we've", jp: "we haveの短縮形", part: "auxiliary verb" },
    { en: "eaten", jp: "eat(食べる)の過去分詞", part: "verb" },
    { en: "be in trouble", jp: "トラブルに巻き込まれている", part: "phrase" },

    // Page 166
    { en: "minute", jp: "[a minuteの形で]ちょっとの間", part: "noun" },
    { en: "Wait a minute.", jp: "ちょっと待って。", part: "phrase" },
    { en: "break", jp: "こわす、割る", part: "verb" },
    { en: "plate", jp: "(浅くて丸い)皿", part: "noun" },
    { en: "must", jp: "…に違いない", part: "auxiliary verb" },
    { en: "be", jp: "…している", part: "auxiliary verb" },
    { en: "kid", jp: "からかう、冗談を言う", part: "verb" },
    { en: "You must be kidding.", jp: "冗談だろう。", part: "phrase" },
    { en: "ground", jp: "[the groundの形で]地面", part: "noun" },
    { en: "break", jp: "こわれる、割れる、砕ける", part: "verb" }, // Intransitive
    { en: "piece", jp: "断片、破片", part: "noun" },
    { en: "believe", jp: "信じる", part: "verb" },
    { en: "trust", jp: "信頼する、信用する", part: "verb" },

    // Page 168
    { en: "go", jp: "(物事が)…に進行する、なっている", part: "verb" },
    { en: "What's going on?", jp: "いったいどうしたんだ。", part: "phrase" },
    { en: "awful", jp: "恐ろしい；ひどい、とても悪い", part: "adjective" },
    { en: "precious", jp: "貴重な；大切な", part: "adjective" },
    { en: "punish", jp: "罰する、処罰する", part: "verb" },
    { en: "ourselves", jp: "私たち自身を[に]；私たち、自分", part: "pronoun" },
    { en: "ear", jp: "耳", part: "noun" },
    { en: "ring", jp: "鳴る", part: "verb" },
    { en: "agghhhhhh", jp: "ああっ、まあ", part: "interjection" },
    { en: "ah", jp: "ああ、まあ", part: "interjection" }
];

try {
    let content = fs.readFileSync(targetFile, 'utf8');

    // Find Grade 2
    const g2StartRegex = /"2":\s*\[/;
    const g2StartMatch = g2StartRegex.exec(content);
    if (!g2StartMatch) throw new Error("Grade 2 not found");

    // Find matching closing bracket for Grade 2
    let brace = 0;
    let inStr = false;
    let g2EndIndex = -1;
    for (let i = g2StartMatch.index + g2StartMatch[0].length - 1; i < content.length; i++) {
        if (content[i] === '"' && content[i - 1] !== '\\') inStr = !inStr;
        if (!inStr) {
            if (content[i] === '[') brace++;
            if (content[i] === ']') brace--;
            if (brace === 0) {
                g2EndIndex = i + 1;
                break;
            }
        }
    }

    // Parse G2
    const g2JsonStr = content.substring(g2StartMatch.index + 4, g2EndIndex);
    let g2Array = JSON.parse(g2JsonStr);

    // Filter out L8, Proj3, Read3 if exists
    g2Array = g2Array.filter(u =>
        u.unit !== "Lesson 8" &&
        u.unit !== "Project 3" &&
        u.unit !== "Reading Lesson 3"
    );

    // Append new units
    const l8Unit = {
        unit: "Lesson 8",
        pages: "P99〜107", // and goal activity
        words: l8_words
    };

    const proj3Unit = {
        unit: "Project 3",
        pages: "P108〜109",
        words: proj3_words
    };

    const read3Unit = {
        unit: "Reading Lesson 3",
        pages: "P110〜113",
        words: read3_words
    };

    g2Array.push(l8Unit);
    g2Array.push(proj3Unit);
    g2Array.push(read3Unit);

    // Write back
    const newG2Json = JSON.stringify(g2Array, null, 4);
    const newContent = content.substring(0, g2StartMatch.index + 4) +
        newG2Json +
        content.substring(g2EndIndex);

    fs.writeFileSync(targetFile, newContent);
    console.log("Successfully updated Grade 2 with Lesson 8, Project 3, Reading 3.");

} catch (e) {
    console.error("Error:", e);
    process.exit(1);
}
