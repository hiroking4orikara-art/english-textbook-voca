const fs = require('fs');
const path = require('path');

const targetFile = path.join(__dirname, 'data.js');

// --- Unit 1 (P8-17) ---
const unit1_words = [
    { en: "another", jp: "別のもの[こと]、別の人", part: "pronoun" },
    { en: "carry", jp: "～を運ぶ、持っていく", part: "verb" },
    { en: "clean", jp: "きれいな、清潔な", part: "adjective" },
    { en: "elephant", jp: "ゾウ", part: "noun" },
    { en: "find", jp: "(～だと)わかる", part: "verb" },
    { en: "future", jp: "将来(起こること)", part: "noun" },
    { en: "hope", jp: "希望、望み", part: "noun" },
    { en: "however", jp: "しかしながら", part: "adverb" },
    { en: "internet", jp: "インターネット", part: "noun" },
    { en: "introduce ~ to ...", jp: "～を…に紹介する", part: "phrase" },
    { en: "keep", jp: "～を保つ、～を(ある状態)にしておく", part: "verb" },
    { en: "kill", jp: "～を殺す", part: "verb" },
    { en: "less than ~", jp: "～より少ない", part: "phrase" },
    { en: "make ~ from ...", jp: "…から～を作る[材料が元の形状をとどめない場合]", part: "phrase" },
    { en: "national", jp: "国立の", part: "adjective" },
    { en: "near here", jp: "この近くに[で]", part: "phrase" },
    { en: "news", jp: "ニュース、報道", part: "noun" },
    { en: "no longer", jp: "もはや～ない", part: "phrase" },
    { en: "sell", jp: "～を売る、～を販売している", part: "verb" },
    { en: "so that ~", jp: "～するために", part: "phrase" },
    { en: "sold", jp: "sell の過去形、過去分詞", part: "verb" },
    { en: "spoken", jp: "speak の過去分詞", part: "verb" },
    { en: "system", jp: "方式、システム、装置", part: "noun" },
    { en: "technology", jp: "科学技術", part: "noun" },
    { en: "terrible", jp: "ひどい、悲惨な", part: "adjective" },
    { en: "wildlife", jp: "野生動物", part: "noun" },
    { en: "yet", jp: "[否]まだ(～ない)", part: "adverb" }
];

// --- Unit 2 (P19-28) ---
const unit2_words = [
    { en: "already", jp: "もう、すでに", part: "adverb" },
    { en: "busy", jp: "忙しい", part: "adjective" },
    { en: "careful", jp: "注意深い、慎重な", part: "adjective" },
    { en: "done", jp: "do の過去分詞", part: "verb" },
    { en: "hill", jp: "坂、坂道", part: "noun" },
    { en: "hotel", jp: "ホテル", part: "noun" },
    { en: "I've", jp: "I have の短縮形", part: "phrase" },
    { en: "just", jp: "ちょうど今", part: "adverb" },
    { en: "leave", jp: "出発する", part: "verb" },
    { en: "left", jp: "leave の過去形、過去分詞", part: "verb" },
    { en: "minute", jp: "[ふつう a ～で]ちょっとの間", part: "noun" },
    { en: "reach", jp: "～に着く、到着する", part: "verb" },
    { en: "teeth", jp: "tooth の複数形", part: "noun" },
    { en: "travel back in time", jp: "過去にタイムトラベルをする", part: "phrase" },
    { en: "wait", jp: "待つ", part: "verb" },
    { en: "way", jp: "方向、方角", part: "noun" },
    { en: "whole", jp: "全体、全部", part: "noun" },
    { en: "wrong", jp: "具合が悪い、正常でない", part: "adjective" },
    { en: "yet", jp: "[疑]もう(～したか)", part: "adverb" },
    { en: "Be careful.", jp: "気をつけて。", part: "phrase" },
    { en: "Hurry up.", jp: "急いで。", part: "phrase" },
    { en: "This way.", jp: "こちらです。", part: "phrase" },
    { en: "Wait a minute.", jp: "ちょっと待って。", part: "phrase" },
    { en: "What's wrong?", jp: "どうしましたか。", part: "phrase" },
    // Unit 2 (2) ~ Daily Life Scene 2
    { en: "agree", jp: "賛成する", part: "verb" },
    { en: "agree with ~", jp: "～に賛成する", part: "phrase" },
    { en: "been", jp: "be の過去分詞", part: "verb" },
    { en: "catch up with ~", jp: "～に追いつく", part: "phrase" },
    { en: "change", jp: "変わる", part: "verb" },
    { en: "correct", jp: "正しい、正確な", part: "adjective" },
    { en: "ever", jp: "[疑]これまでに", part: "adverb" },
    { en: "he's", jp: "he has の短縮形", part: "phrase" },
    { en: "like that", jp: "あんなふうな[に]", part: "phrase" },
    { en: "once", jp: "一度、1回", part: "adverb" },
    { en: "reason", jp: "理由、わけ", part: "noun" },
    { en: "recently", jp: "最近、ついこの間", part: "adverb" },
    { en: "return", jp: "戻る、帰る", part: "verb" },
    { en: "seafood", jp: "魚介類、海産物", part: "noun" },
    { en: "seen", jp: "see の過去分詞", part: "verb" },
    { en: "such", jp: "そのような", part: "adjective" },
    { en: "such a ~", jp: "あんな～、そのような～", part: "phrase" },
    { en: "the same as ~", jp: "～と同じ", part: "phrase" },
    { en: "twice", jp: "2度、2回", part: "adverb" },
    { en: "It's no big deal.", jp: "たいしたことないよ。", part: "phrase" },
    { en: "What's up with ~?", jp: "～はどうしたの。", part: "phrase" },
    // Daily Life Scene 2
    { en: "call", jp: "電話をかける", part: "verb" }
];

// --- Unit 3 (P29-39) ---
const unit3_words = [
    { en: "answer", jp: "(～に)答える", part: "verb" },
    { en: "anyone", jp: "[疑]誰か", part: "pronoun" },
    { en: "atomic bomb", jp: "原子爆弾", part: "noun" },
    { en: "be determined to ~", jp: "～することを固く決意している", part: "phrase" },
    { en: "card", jp: "(トランプの)カード", part: "noun" },
    { en: "childhood", jp: "子どもの頃、幼少期", part: "noun" },
    { en: "daughter", jp: "娘", part: "noun" },
    { en: "dome", jp: "ドーム", part: "noun" },
    { en: "drop", jp: "～を落とす、～を投下する", part: "verb" },
    { en: "in line", jp: "列になって、並んで", part: "phrase" },
    { en: "known", jp: "know の過去分詞", part: "verb" },
    { en: "paint", jp: "(絵の具・筆などで)(絵)を描く", part: "verb" },
    { en: "peace", jp: "平和", part: "noun" },
    { en: "realize", jp: "～をはっきり理解する", part: "verb" },
    { en: "remind ~ of ...", jp: "～に…を思い出させる", part: "phrase" },
    { en: "reminder", jp: "思い出させるもの", part: "noun" },
    { en: "since", jp: "～以来、～から", part: "preposition" },
    { en: "textbook", jp: "教科書", part: "noun" },
    { en: "tragic", jp: "悲惨な、痛ましい", part: "adjective" },
    { en: "How long ~?", jp: "どれくらい(の時間[期間])～ですか。", part: "phrase" },
    // Unit 3 (2) ~ Active Grammar 1
    { en: "act", jp: "行動する、実行する", part: "verb" },
    { en: "alone", jp: "～だけで、1人で", part: "adverb" }, // Image: ～だけで，1人で (adj/adv?) usually adj/adv. Text says adverb context usually.
    { en: "build", jp: "～を築き上げる", part: "verb" },
    { en: "crane", jp: "ツル", part: "noun" },
    { en: "fold", jp: "～を折る、～をたたむ", part: "verb" },
    { en: "get older", jp: "年を取る", part: "phrase" },
    { en: "in one's own words", jp: "自分自身の言葉で", part: "phrase" },
    { en: "machine", jp: "機械", part: "noun" },
    { en: "money", jp: "お金", part: "noun" },
    { en: "pain", jp: "苦痛、苦しみ、痛み", part: "noun" },
    { en: "paper", jp: "紙(の)", part: "noun" },
    { en: "pass ~ on (to ...)", jp: "～を(…に)伝える", part: "phrase" },
    { en: "pass down ~", jp: "～(知識など)を渡す", part: "phrase" },
    { en: "past", jp: "[the ～で]過去", part: "noun" },
    { en: "put on ~", jp: "～を着る、～を身につける", part: "phrase" },
    { en: "report", jp: "報告(書)、レポート", part: "noun" },
    { en: "serve", jp: "(人に食べ物)を出す", part: "verb" },
    { en: "~, such as ...", jp: "～たとえば…", part: "phrase" },
    { en: "take action", jp: "行動を起こす", part: "phrase" },
    { en: "think of ~", jp: "～のことを思い浮かべる", part: "phrase" },
    { en: "though", jp: "～にもかかわらず", part: "conjunction" },
    { en: "victim", jp: "犠牲者、被災者", part: "noun" },
    { en: "war", jp: "戦争", part: "noun" },
    { en: "washing machine", jp: "洗濯機", part: "noun" },
    { en: "year by year", jp: "年々(変化して)", part: "phrase" },
    // Active Grammar 1
    { en: "before", jp: "以前に、前に", part: "adverb" }
];


try {
    let content = fs.readFileSync(targetFile, 'utf8');

    // Find "here_we_go"
    const hwgStartRegex = /"here_we_go":\s*\{/;
    const hwgStartMatch = hwgStartRegex.exec(content);
    if (!hwgStartMatch) throw new Error("here_we_go section not found");

    const hwgContent = content.substring(hwgStartMatch.index);

    // Find "3": [] (Grade 3)
    // We expect it to be empty or non-existent?
    // Let's look for "3":
    const grade3StartRegex = /"3":\s*\[/;
    const grade3MatchRelative = grade3StartRegex.exec(hwgContent);

    const grade3Array = [
        { unit: "Unit 1", pages: "P8〜17", words: unit1_words },
        { unit: "Unit 2", pages: "P19〜28", words: unit2_words },
        { unit: "Unit 3", pages: "P29〜39", words: unit3_words }
    ];

    const newGrade3Json = JSON.stringify(grade3Array, null, 4);

    let newContent;

    if (grade3MatchRelative) {
        // Grade 3 exists, replace it
        const grade3StartIndex = hwgStartMatch.index + grade3MatchRelative.index;

        let brace = 0;
        let inStr = false;
        let grade3EndIndex = -1;
        const openBracketIndex = grade3StartIndex + grade3MatchRelative[0].length - 1;

        for (let i = openBracketIndex; i < content.length; i++) {
            if (content[i] === '"' && content[i - 1] !== '\\') inStr = !inStr;
            if (!inStr) {
                if (content[i] === '[') brace++;
                if (content[i] === ']') brace--;
                if (brace === 0) {
                    grade3EndIndex = i + 1;
                    break;
                }
            }
        }

        if (grade3EndIndex === -1) throw new Error("Could not find end of Grade 3 array");

        newContent = content.substring(0, grade3StartIndex + grade3MatchRelative[0].length - 1) +
            newGrade3Json +
            content.substring(grade3EndIndex);

    } else {
        // Grade 3 does not exist, insert it after Grade 2
        // Find end of Grade 2
        // We know Grade 2 exists because we just added it.
        const grade2StartRegex = /"2":\s*\[/;
        const grade2MatchRelative = grade2StartRegex.exec(hwgContent);
        if (!grade2MatchRelative) throw new Error("Grade 2 not found to append after"); // Should ideally exist

        const grade2StartIndex = hwgStartMatch.index + grade2MatchRelative.index;

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

        // Add comma if needed?
        // Actually, if it's the last item in object, we might need a comma before adding "3".
        // Current structure: "2": [...] } (end of here_we_go)
        // We want: "2": [...], "3": [...] }

        newContent = content.substring(0, grade2EndIndex) + ",\n        \"3\": " + newGrade3Json + content.substring(grade2EndIndex);
    }

    fs.writeFileSync(targetFile, newContent);
    console.log("Successfully added Here We Go Grade 3 (Unit 1-3) data.");

} catch (e) {
    console.error("Error:", e);
    process.exit(1);
}
