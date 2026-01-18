const fs = require('fs');
const path = require('path');

const targetFile = path.join(__dirname, 'data.js');

// Unit 1 (p.26-35)
const u1_words = [
    { en: "about", jp: "～について(の)", part: "preposition" },
    { en: "all", jp: "全て、みんな", part: "noun" }, // Image: "全て、みんな" usually pronoun/adj, but context based.
    { en: "beautiful", jp: "美しい", part: "adjective" },
    { en: "but", jp: "しかし、けれども", part: "conjunction" },
    { en: "class", jp: "授業、授業時間", part: "noun" },
    { en: "cool", jp: "かっこいい、すごい", part: "adjective" },
    { en: "drum", jp: "ドラム、太鼓", part: "noun" },
    { en: "fall", jp: "秋", part: "noun" },
    { en: "hello", jp: "やあ、こんにちは", part: "interjection" },
    { en: "here", jp: "ここに、ここで、こちらへ", part: "adverb" },
    { en: "Japan", jp: "日本", part: "noun" },
    { en: "live", jp: "住む、住んでいる", part: "verb" },
    { en: "look", jp: "見る", part: "verb" },
    { en: "Ms.", jp: "[女性]～さん、～先生", part: "noun" },
    { en: "not ... very much", jp: "そんなに～でない", part: "phrase" }, // "not ~ very much"
    { en: "season", jp: "季節", part: "noun" },
    { en: "student", jp: "生徒、学生", part: "noun" },
    { en: "swim", jp: "泳ぐ、水泳をする", part: "verb" },
    { en: "there", jp: "そこで、そこに", part: "adverb" },
    { en: "thing", jp: "もの、こと", part: "noun" },
    { en: "this", jp: "これ", part: "pronoun" },
    { en: "very", jp: "とても、[否]あまり", part: "adverb" },
    { en: "winter", jp: "冬", part: "noun" },
    { en: "~ year(s) old", jp: "～歳", part: "phrase" },
    { en: "Call me ...", jp: "私を～と呼んでください。", part: "phrase" },
    { en: "Here we go!", jp: "さあ、行こう[始めよう]。", part: "phrase" },
    { en: "How about ...?", jp: "～はどうですか。", part: "phrase" },
    { en: "I'm from ...", jp: "私は～出身です。", part: "phrase" },
    { en: "Nice to meet you.", jp: "初めまして。よろしく。", part: "phrase" },
    { en: "Thanks.", jp: "ありがとう。", part: "phrase" },
    { en: "Why? [Why not?]", jp: "どうして(ですか)。", part: "phrase" }
];

// Unit 2 (p.36-44)
const u2_words = [
    { en: "after", jp: "～の後に、～の次に", part: "preposition" },
    { en: "always", jp: "いつも、常に", part: "adverb" },
    { en: "be interested in", jp: "～に興味をもっている", part: "phrase" },
    { en: "come in", jp: "入る、入ってくる", part: "phrase" },
    { en: "father", jp: "父親", part: "noun" },
    { en: "free", jp: "手が空いている、暇な", part: "adjective" },
    { en: "Friday", jp: "金曜日", part: "noun" },
    { en: "great", jp: "すばらしい", part: "adjective" },
    { en: "listen to", jp: "～を聞く", part: "phrase" },
    { en: "little", jp: "[a littleで]少しは", part: "adjective" }, // Image: "[a little で]少しは"
    { en: "Monday", jp: "月曜日", part: "noun" },
    { en: "Mr.", jp: "[男性]～さん、～先生", part: "noun" },
    { en: "never", jp: "決して～しない", part: "adverb" },
    { en: "new", jp: "新しい、新入りの", part: "adjective" },
    { en: "night", jp: "夜", part: "noun" },
    { en: "practice", jp: "(～を)練習する", part: "verb" },
    { en: "read", jp: "(～を)読む", part: "verb" },
    { en: "rice", jp: "米、ごはん、ライス", part: "noun" },
    { en: "ride", jp: "～に乗る", part: "verb" },
    { en: "say", jp: "(～を)言う、(…と)述べる", part: "verb" },
    { en: "school", jp: "学校", part: "noun" },
    { en: "sometimes", jp: "ときどき", part: "adverb" },
    { en: "team", jp: "チーム", part: "noun" },
    { en: "usually", jp: "普通は、いつもは", part: "adverb" },
    { en: "very much", jp: "とても", part: "phrase" },
    { en: "watch", jp: "～を(じっと)見る、注意して見る", part: "verb" },
    { en: "Wednesday", jp: "水曜日", part: "noun" },
    { en: "with", jp: "[同伴]～といっしょに", part: "preposition" },
    { en: "write", jp: "(～を)書く", part: "verb" },
    { en: "Here's ...", jp: "ここに～がある。", part: "phrase" }
];

// Unit 3 (p.46-59)
const u3_words = [
    // Unit 3 (1)
    { en: "also", jp: "～もまた、さらに", part: "adverb" },
    { en: "beach", jp: "浜辺、ビーチ", part: "noun" },
    { en: "climb", jp: "(～に)登る", part: "verb" },
    { en: "do one's homework", jp: "宿題をする", part: "phrase" },
    { en: "during", jp: "～の間ずっと、～の間に", part: "preposition" },
    { en: "eat", jp: "(～を)食べる、食事をする", part: "verb" },
    { en: "every", jp: "毎～", part: "adjective" },
    { en: "every year", jp: "毎年", part: "phrase" },
    { en: "family", jp: "家族", part: "noun" },
    { en: "festival", jp: "祭り、催し", part: "noun" },
    { en: "get", jp: "～(の状態)になる", part: "verb" },
    { en: "get up", jp: "起きる、起床する", part: "phrase" },
    { en: "go", jp: "[go -ingで]～しに行く", part: "verb" },
    { en: "grandfather", jp: "祖父", part: "noun" },
    { en: "have", jp: "～を受ける", part: "verb" },
    // "have" listed twice? Image: "have... ~を行う、~をする"
    { en: "have", jp: "～を行う、～をする", part: "verb" },
    { en: "home", jp: "家に[へ]", part: "adverb" },
    { en: "homework", jp: "宿題", part: "noun" },
    { en: "just", jp: "ただ～だけ、～にすぎない", part: "adverb" },
    { en: "late", jp: "(平常・定刻より)遅く", part: "adverb" },
    { en: "lesson", jp: "授業", part: "noun" },
    { en: "library", jp: "図書館", part: "noun" },
    { en: "practice", jp: "練習", part: "noun" },
    { en: "see", jp: "～を見る、～を見物する", part: "verb" },
    { en: "sound", jp: "～に思われる、～に聞こえる", part: "verb" },
    { en: "stay", jp: "(場所に)とどまる、いる", part: "verb" },
    { en: "try", jp: "(～を)試みる", part: "verb" },
    { en: "video", jp: "動画、ビデオ", part: "noun" },
    { en: "visit", jp: "～を訪ねる", part: "verb" },
    { en: "walk", jp: "(動物)を散歩させる", part: "verb" },
    { en: "weekend", jp: "週末", part: "noun" },
    { en: "year", jp: "1年、年間、年度", part: "noun" },
    { en: "Sounds fun.", jp: "楽しそう。", part: "phrase" },

    // Unit 3 (2)
    { en: "computer", jp: "コンピュータ", part: "noun" },
    { en: "dance", jp: "ダンス、踊り", part: "noun" },
    { en: "get", jp: "～を得る、～を手に入れる", part: "verb" },
    { en: "heavy", jp: "重い", part: "adjective" },
    { en: "like", jp: "～に似た、～のような", part: "preposition" },
    { en: "love", jp: "～が大好きである", part: "verb" },
    { en: "of course", jp: "もちろん", part: "phrase" },
    { en: "OK", jp: "それでは、じゃあ", part: "adverb" },
    { en: "one", jp: "(～な)もの[1つ[人]]", part: "pronoun" },
    { en: "picture", jp: "写真", part: "noun" },
    { en: "take a picture", jp: "写真を撮る", part: "phrase" },
    { en: "that", jp: "あれ[それ]、あの[その]", part: "pronoun" },
    { en: "they", jp: "それら[彼(女)ら]は", part: "pronoun" },
    { en: "those", jp: "それら、あれら", part: "pronoun" },
    { en: "too", jp: "あまりにも～、～すぎる", part: "adverb" },
    { en: "use", jp: "～を使う", part: "verb" },
    { en: "want", jp: "～がほしい、～をほしがる", part: "verb" },
    { en: "Oh, no.", jp: "まさか。ひどい。", part: "phrase" },
    { en: "Really?", jp: "えっ、本当？", part: "phrase" },

    // Let's Read 1
    { en: "book", jp: "本", part: "noun" },
    { en: "every day", jp: "毎日", part: "phrase" },
    { en: "fly", jp: "飛ぶ", part: "verb" },
    { en: "jump", jp: "跳ぶ、跳びはねる", part: "verb" },
    { en: "look at", jp: "～を見る", part: "phrase" },
    { en: "minute", jp: "(時間の)分", part: "noun" },
    { en: "or", jp: "～か…", part: "conjunction" },
    { en: "turn around", jp: "～の向きをぐるりと変える", part: "phrase" },
    { en: "walk", jp: "歩く、歩いて行く", part: "verb" },

    // You Can Do It! 1
    { en: "be", jp: "～である", part: "verb" },
    { en: "kind", jp: "種類", part: "noun" },
    { en: "pianist", jp: "ピアニスト", part: "noun" },
    { en: "~, right?", jp: "～ですよね。", part: "phrase" },
    { en: "What kind of ...?", jp: "どんな種類の～ですか。", part: "phrase" }
];

// Unit 4 (p.60-65) - Only Part 1 words listed in image? No, looks like full Unit 4 (1). List goes down to "Let's ~".
const u4_words = [
    { en: "actor", jp: "俳優", part: "noun" },
    { en: "art", jp: "[教科の]美術、芸術", part: "noun" },
    { en: "ask", jp: "(人)にたずねる、～に質問する", part: "verb" },
    { en: "character", jp: "登場人物、キャラクター", part: "noun" },
    { en: "famous", jp: "有名な", part: "adjective" },
    { en: "funny", jp: "おかしい、おもしろい", part: "adjective" },
    { en: "he", jp: "彼は、彼が", part: "pronoun" },
    { en: "her", jp: "彼女の", part: "adjective" },
    { en: "he's", jp: "he is の短縮形", part: "phrase" }, // part: phrase/aux
    { en: "him", jp: "彼を、彼に", part: "pronoun" },
    { en: "his", jp: "彼の", part: "adjective" },
    { en: "Japanese", jp: "国語(の)、日本語(の)", part: "noun" },
    { en: "junior high school", jp: "中学校", part: "noun" },
    { en: "kind", jp: "親切な、思いやりのある", part: "adjective" },
    { en: "main", jp: "主な、主要な", part: "adjective" },
    { en: "maybe", jp: "もしかしたら、～かな", part: "adverb" },
    { en: "P.E.", jp: "[教科の]体育", part: "noun" },
    { en: "player", jp: "選手、競技者", part: "noun" },
    { en: "popular", jp: "人気のある", part: "adjective" },
    { en: "science", jp: "科学", part: "noun" }, // "理科"? Image says "科学" (top chopped, likely "理科、科学" or just "科学"). Wait, default for JHS is "理科". Image shows "科学".
    { en: "she", jp: "彼女は、彼女が", part: "pronoun" },
    { en: "she's", jp: "she is の短縮形", part: "phrase" },
    { en: "singer", jp: "歌手", part: "noun" },
    { en: "social studies", jp: "社会科", part: "noun" },
    { en: "strict", jp: "厳しい、厳格な", part: "adjective" },
    { en: "strong", jp: "強い、たくましい", part: "adjective" },
    { en: "study", jp: "[しばしば ~iesで] 科目、～学", part: "noun" },
    { en: "teacher", jp: "先生、教師", part: "noun" },
    { en: "who", jp: "誰、誰が", part: "pronoun" },
    { en: "~, isn't he?", jp: "(彼は)～ですよね。", part: "phrase" },
    { en: "Let's ~.", jp: "～しよう。", part: "phrase" }
];


try {
    let content = fs.readFileSync(targetFile, 'utf8');

    // Here We Go starts at "here_we_go": { "1": [ ...
    // I need to locate the "here_we_go" block and the "1" block.

    // Simple regex approach won't work easily if we want to replace the whole 1st grade array cleanly.
    // Let's find "here_we_go": {
    const hwgStartRegex = /"here_we_go":\s*\{/;
    const hwgStartMatch = hwgStartRegex.exec(content);
    if (!hwgStartMatch) throw new Error("here_we_go section not found");

    // We can assume the structure ` "1": [ ... ], "2": [ ... ], "3": [ ... ]` inside.
    // Let's find `"1": [` inside `here_we_go`.

    const grade1StartRegex = /"1":\s*\[/;
    // Search FROM the hwg start
    const grade1SearchStr = content.substring(hwgStartMatch.index);
    const grade1MatchRelative = grade1StartRegex.exec(grade1SearchStr);

    if (!grade1MatchRelative) throw new Error("Grade 1 section in here_we_go not found");

    const grade1StartIndex = hwgStartMatch.index + grade1MatchRelative.index;

    // Find value of Grade 1 array matching brackets
    let brace = 0;
    let inStr = false;
    let grade1EndIndex = -1;
    // Start scanning from the opening bracket of "1": [
    const openBracketIndex = grade1StartIndex + grade1MatchRelative[0].length - 1; // index of '['

    for (let i = openBracketIndex; i < content.length; i++) {
        if (content[i] === '"' && content[i - 1] !== '\\') inStr = !inStr;
        if (!inStr) {
            if (content[i] === '[') brace++;
            if (content[i] === ']') brace--;
            if (brace === 0) {
                grade1EndIndex = i + 1; // include closing ']'
                break;
            }
        }
    }

    if (grade1EndIndex === -1) throw new Error("Could not find end of Grade 1 array");

    // Create new Grade 1 array
    const grade1Array = [
        {
            unit: "Unit 1",
            pages: "P26〜35",
            words: u1_words
        },
        {
            unit: "Unit 2",
            pages: "P36〜44",
            words: u2_words
        },
        {
            unit: "Unit 3",
            pages: "P46〜59",
            words: u3_words
        },
        {
            unit: "Unit 4",
            pages: "P60〜65",
            words: u4_words
        }
    ];

    const newGrade1Json = JSON.stringify(grade1Array, null, 4);

    const newContent = content.substring(0, grade1StartIndex + grade1MatchRelative[0].length - 1) +
        newGrade1Json +
        content.substring(grade1EndIndex);

    fs.writeFileSync(targetFile, newContent);
    console.log("Successfully updated Here We Go Grade 1 Units 1-4.");

} catch (e) {
    console.error("Error:", e);
    process.exit(1);
}
