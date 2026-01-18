const fs = require('fs');
const path = require('path');

const targetFile = path.join(__dirname, 'data.js');

// --- Unit 1 (P8-18) ---
// Image 1: Unit 1 (1) (P8-13)
// Image 0: Unit 1 (2) ~ Daily Life Scene 1 (P14-18)
const unit1_words = [
    // Unit 1 (1)
    { en: "back", jp: "(元に)戻って", part: "adverb" },
    { en: "can", jp: "[Can you ~?で] ～してくれませんか。", part: "auxiliary verb" },
    { en: "come out of ~", jp: "～から外へ出る", part: "phrase" },
    { en: "comic book", jp: "漫画本", part: "noun" },
    { en: "down", jp: "落ち込んだ、元気がない", part: "adjective" }, // Image says "落ち込んだ、元気がない"
    { en: "else", jp: "その他に", part: "adverb" },
    { en: "feel", jp: "(～と)感じる、～を感じる", part: "verb" },
    { en: "feel down", jp: "落ち込む", part: "phrase" },
    { en: "for the first time in ~", jp: "～ぶりに", part: "phrase" },
    { en: "gift", jp: "贈り物", part: "noun" },
    { en: "half", jp: "半分(の)、2分の1(の)", part: "noun" }, // "半分、2分の1" (noun) / "の" (adj) -> Both. Image just lists meanings.
    { en: "half a year", jp: "半年", part: "phrase" },
    { en: "keep", jp: "(日記・記録など)をつける", part: "verb" },
    { en: "look for ~", jp: "～をさがす", part: "phrase" },
    { en: "met", jp: "meet の過去形", part: "verb" },
    { en: "no", jp: "～のない", part: "adjective" },
    { en: "other", jp: "別の、他の", part: "adjective" },
    { en: "read", jp: "read の過去形", part: "verb" }, // Pronounced 'red'
    { en: "same", jp: "同じ", part: "adjective" },
    { en: "scary", jp: "怖い、恐ろしい", part: "adjective" }, // Image: scary
    { en: "view", jp: "眺め、風景、景色", part: "noun" },
    { en: "when", jp: "～するとき", part: "conjunction" },
    { en: "Can you ~?", jp: "～してくれませんか", part: "phrase" },
    { en: "I know.", jp: "そうですよね。", part: "phrase" }, // Contextual translation
    { en: "Long time no see.", jp: "久しぶりだね。", part: "phrase" },
    { en: "There you are!", jp: "そこにいたのですか。", part: "phrase" }, // Or "Here you are" context? Image: そこにいたのですか
    { en: "What an honor!", jp: "なんと光栄なことでしょう。", part: "phrase" },
    { en: "What else?", jp: "他には(何かありますか)。", part: "phrase" },

    // Unit 1 (2) ~ Daily Life Scene 1
    { en: "angry", jp: "怒った、腹を立てた", part: "adjective" },
    { en: "ask", jp: "～に頼む", part: "verb" },
    { en: "at first", jp: "最初は", part: "phrase" },
    { en: "be excited about ~", jp: "～にわくわくしている", part: "phrase" },
    { en: "by oneself", jp: "一人で、自力で", part: "phrase" },
    { en: "came", jp: "come の過去形", part: "verb" },
    { en: "cloudy", jp: "曇った", part: "adjective" },
    { en: "come up", jp: "近づく、やって来る", part: "phrase" },
    { en: "drink", jp: "飲み物", part: "noun" },
    { en: "excited", jp: "興奮した、わくわくした", part: "adjective" },
    { en: "find", jp: "～を見つける", part: "verb" },
    { en: "found", jp: "find の過去形", part: "verb" },
    { en: "happen", jp: "起こる、生じる", part: "verb" },
    { en: "have a good time", jp: "楽しい時を過ごす", part: "phrase" },
    { en: "lend", jp: "～を貸す", part: "verb" },
    { en: "made", jp: "make の過去形", part: "verb" },
    { en: "memory", jp: "思い出", part: "noun" },
    { en: "more", jp: "もっと、さらに", part: "adverb" },
    { en: "movie", jp: "映画", part: "noun" },
    { en: "myself", jp: "私自身", part: "pronoun" },
    { en: "nervous", jp: "不安で、緊張して", part: "adjective" },
    { en: "order", jp: "(～を)注文する", part: "verb" },
    { en: "show", jp: "～を示す、～を表す", part: "verb" },
    { en: "something", jp: "何か", part: "pronoun" },
    { en: "sunny", jp: "晴れた、明るく日の照る", part: "adjective" },
    { en: "surprised", jp: "驚いた", part: "adjective" },
    { en: "talk about ~", jp: "～について話す", part: "phrase" },
    { en: "think", jp: "(～と)思う、考える", part: "verb" },
    { en: "Thursday", jp: "木曜日", part: "noun" },
    { en: "today", jp: "今日", part: "noun" },
    // Daily Life Scene 1
    { en: "be there", jp: "そこにいる", part: "phrase" },
    { en: "come with ~", jp: "～と来る[行く]", part: "phrase" },
    { en: "cycling", jp: "サイクリング", part: "noun" },
    { en: "This is ~.", jp: "[電話で]こちらは～です。", part: "phrase" },
    { en: "What's up?", jp: "どうしたの。何があったの。", part: "phrase" },
    { en: "Why don't you ~?", jp: "～してはどうですか。～しませんか。", part: "phrase" },
];

// --- Unit 2 (P19-29) ---
// Image 3: Unit 2 (1) (P19-23)
// Image 4: Unit 2 (2) ~ Active Grammar 1 (P24-29)
const unit2_words = [
    // Unit 2 (1)
    { en: "action", jp: "アクション", part: "noun" },
    { en: "actually", jp: "実は、実際は", part: "adverb" },
    { en: "all right", jp: "申し分ない", part: "adjective" }, // Image: 申し分ない
    { en: "ball", jp: "ボール、玉", part: "noun" },
    { en: "beginner", jp: "初心者", part: "noun" },
    { en: "difficult", jp: "難しい、困難な", part: "adjective" },
    { en: "easy", jp: "簡単な、易しい、楽な", part: "adjective" },
    { en: "important", jp: "重要な、大切な", part: "adjective" },
    { en: "improve", jp: "～を向上させる[改善する]", part: "verb" },
    { en: "on the way home", jp: "家に帰る途中で", part: "phrase" },
    { en: "pass", jp: "[動](ボール)をパスする [名]パス", part: "verb" }, // noun/verb
    { en: "point", jp: "(成績・競技などの)点数", part: "noun" },
    { en: "problem", jp: "問題、課題", part: "noun" },
    { en: "so", jp: "[代用]そのように、そう", part: "adverb" },
    { en: "stop", jp: "～を止める", part: "verb" },
    { en: "surfing", jp: "サーフィン", part: "noun" },
    { en: "try to ~", jp: "～しようと試みる[努力する]", part: "phrase" },
    { en: "win", jp: "(競技・競争)に勝つ", part: "verb" },
    { en: "work", jp: "うまくいく", part: "verb" },
    { en: "Go, ~!", jp: "行け、～！", part: "phrase" },
    { en: "It worked.", jp: "うまくいきました。", part: "phrase" },
    { en: "No problem.", jp: "問題ありません。", part: "phrase" },
    { en: "You think so?", jp: "そう思いますか。", part: "phrase" },

    // Unit 2 (2) ~ Active Grammar 1 ~ Daily Life Scene 2
    { en: "arm", jp: "腕", part: "noun" },
    { en: "be proud of ~", jp: "～を誇りに思っている", part: "phrase" },
    { en: "believe", jp: "(～を)信じる、(～だと)思う", part: "verb" },
    { en: "could", jp: "can の過去形", part: "auxiliary verb" },
    { en: "do a great job", jp: "うまくやってのける", part: "phrase" },
    { en: "each", jp: "おのおの", part: "noun" }, // Image: おのおの
    { en: "each other", jp: "お互い", part: "phrase" },
    { en: "job", jp: "仕事、作業", part: "noun" },
    { en: "learn", jp: "(～を)習う、学ぶ", part: "verb" },
    { en: "make progress", jp: "上達する", part: "phrase" },
    { en: "much", jp: "たくさんの、多くの、多量の", part: "adjective" },
    { en: "nature", jp: "自然", part: "noun" },
    { en: "relax", jp: "くつろぐ", part: "verb" },
    { en: "song", jp: "歌、歌曲", part: "noun" },
    { en: "teach", jp: "～を教える、(人)に教える", part: "verb" },
    { en: "thanks to ~", jp: "～のおかげで", part: "phrase" },
    { en: "that", jp: "(～)ということ", part: "conjunction" },
    { en: "understand", jp: "(～が)わかる、(～を)理解する", part: "verb" },
    { en: "work together", jp: "協力する、団結する", part: "phrase" },
    { en: "Congratulations!", jp: "おめでとう(ございます)。", part: "phrase" },
    { en: "I'm sure ~.", jp: "きっと～だ。", part: "phrase" },
    { en: "Practice makes perfect.", jp: "習うより慣れよ。", part: "phrase" },
    { en: "What do you think?", jp: "どう思いますか。", part: "phrase" },
    { en: "You did it!", jp: "やりましたね。", part: "phrase" },
    // Daily Life Scene 2
    { en: "all over ~", jp: "～じゅうで", part: "phrase" },
    { en: "get", jp: "～をもらう、～を受け取る", part: "verb" },
    { en: "hour", jp: "時間", part: "noun" },
    { en: "～ hour(s) a day", jp: "1日～時間", part: "phrase" },
    // Active Grammar 1
    { en: "began", jp: "begin の過去形", part: "verb" },
    { en: "dream", jp: "(将来の)夢", part: "noun" },
    { en: "finish", jp: "～を終える、～し終える", part: "verb" },
    { en: "hobby", jp: "趣味", part: "noun" },
    { en: "rain", jp: "雨が降る", part: "verb" },
    { en: "wish", jp: "[wish to ～で]～したいと思う", part: "verb" },
];

// --- Unit 3 (P31-35) ---
// Image 2: Unit 3 (1) (P31-35)
const unit3_words = [
    { en: "airport", jp: "空港", part: "noun" },
    { en: "all day", jp: "一日中", part: "phrase" },
    { en: "arrive", jp: "着く、到着する", part: "verb" },
    { en: "be ready for ~", jp: "～の準備ができている", part: "phrase" },
    { en: "care", jp: "世話、注意", part: "noun" },
    { en: "cloud", jp: "雲", part: "noun" },
    { en: "email", jp: "Eメール、電子メール", part: "noun" },
    { en: "forget", jp: "(～を)忘れる", part: "verb" },
    { en: "forward", jp: "先へ", part: "adverb" },
    { en: "I'll", jp: "I will の短縮形", part: "phrase" },
    { en: "invite", jp: "～を招く", part: "verb" },
    { en: "look forward to -ing", jp: "～(すること)を楽しみに待つ", part: "phrase" },
    { en: "mind", jp: "～を気にする", part: "verb" },
    { en: "plan", jp: "計画、予定", part: "noun" },
    { en: "rain", jp: "雨", part: "noun" },
    { en: "rainy", jp: "雨の、雨降りの", part: "adjective" },
    { en: "snow", jp: "雪", part: "noun" },
    { en: "snowy", jp: "雪の、雪の降る", part: "adjective" },
    { en: "subject", jp: "(Eメールの)件名", part: "noun" },
    { en: "the day after tomorrow", jp: "明後日", part: "phrase" },
    { en: "tomorrow", jp: "明日(は)", part: "noun" },
    { en: "weather", jp: "天気、天候", part: "noun" },
    { en: "week", jp: "週", part: "noun" },
    { en: "wind", jp: "風", part: "noun" },
    { en: "windy", jp: "風の強い、風のある", part: "adjective" },
    { en: "won't", jp: "will not の短縮形", part: "phrase" },
    { en: "Are you kidding?", jp: "まさか。冗談でしょう。", part: "phrase" },
    { en: "I'd like to ~.", jp: "～したいです。", part: "phrase" },
    { en: "Take care.", jp: "じゃあ、またね。", part: "phrase" },
];


try {
    let content = fs.readFileSync(targetFile, 'utf8');

    // Find "here_we_go" -> "2"
    const hwgStartRegex = /"here_we_go":\s*\{/;
    const hwgStartMatch = hwgStartRegex.exec(content);
    if (!hwgStartMatch) throw new Error("here_we_go section not found");

    const grade2StartRegex = /"2":\s*\[/;
    const grade2SearchStr = content.substring(hwgStartMatch.index);
    const grade2MatchRelative = grade2StartRegex.exec(grade2SearchStr);

    if (!grade2MatchRelative) throw new Error("Grade 2 section in here_we_go not found");

    const grade2StartIndex = hwgStartMatch.index + grade2MatchRelative.index;

    // Find end of Grade 2 array
    let brace = 0;
    let inStr = false;
    let grade2EndIndex = -1;
    const openBracketIndex = grade2StartIndex + grade2MatchRelative[0].length - 1;

    for (let i = openBracketIndex; i < content.length; i++) {
        if (content[i] === '"' && content[i - 1] !== '\\') inStr = !inStr;
        if (!inStr) {
            if (content[i] === '[') brace++;
            if (content[i] === ']') brace--;
            if (brace === 0) {
                grade2EndIndex = i + 1;
                break;
            }
        }
    }

    if (grade2EndIndex === -1) throw new Error("Could not find end of Grade 2 array");

    const grade2Array = [
        { unit: "Unit 1", pages: "P8〜18", words: unit1_words },
        { unit: "Unit 2", pages: "P19〜29", words: unit2_words },
        { unit: "Unit 3", pages: "P31〜35", words: unit3_words }, // Partial, as per images
    ];

    const newGrade2Json = JSON.stringify(grade2Array, null, 4);

    const newContent = content.substring(0, grade2StartIndex + grade2MatchRelative[0].length - 1) +
        newGrade2Json +
        content.substring(grade2EndIndex);

    fs.writeFileSync(targetFile, newContent);
    console.log("Successfully added Here We Go Grade 2 (Unit 1, 2, 3-partial) data.");

} catch (e) {
    console.error("Error:", e);
    process.exit(1);
}
