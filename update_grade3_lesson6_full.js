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

// Full transcription of Lesson 6 from 12 images
const l6Words = [
    // Image 11 (Start of L6)
    { en: "fair", jp: "公正な、公平な", part: "adjective" },
    { en: "ladle", jp: "おたま、ひしゃく", part: "noun" },
    { en: "flea", jp: "[昆虫の]ノミ", part: "noun" },
    { en: "flea market", jp: "ノミの市、フリーマーケット", part: "noun" },
    { en: "cutlet", jp: "切り身; カツレツ", part: "noun" },
    { en: "left-handed", jp: "左ききの", part: "adjective" },
    { en: "right-handed", jp: "右ききの", part: "adjective" },
    { en: "struggle", jp: "たたかう; 奮闘する", part: "verb" },
    { en: "struggle with ...", jp: "(困難など)とたたかう", part: "phrase" },
    { en: "difficulty", jp: "やっかいな事柄、難題", part: "noun" },

    // Image 1
    { en: "I mean", jp: "つまりその", part: "phrase" },
    { en: "left-handedness", jp: "左きき", part: "noun" },
    { en: "aware", jp: "気づいて、知って", part: "adjective" },
    { en: "be aware of ...", jp: "…に気づいている", part: "phrase" },
    { en: "ever", jp: "[比較のことばとともに用いて]今までに(…したうちで)", part: "adverb" },
    { en: "meat", jp: "食用肉", part: "noun" },
    { en: "What else ...?", jp: "ほかに何か…はありますか。", part: "phrase" },
    { en: "allergy", jp: "アレルギー", part: "noun" },
    { en: "egg-free", jp: "卵を使用していない", part: "adjective" },
    { en: "fairness", jp: "公正、公平", part: "noun" },

    // Image 2
    { en: "treat", jp: "(人を)扱う、待遇する", part: "verb" },
    { en: "equally", jp: "平等に、等しく", part: "adverb" },
    { en: "resource", jp: "資源、資産", part: "noun" },
    { en: "distribute", jp: "配る、分配する", part: "verb" },
    { en: "number", jp: "[…の]総数、数量", part: "noun" },
    { en: "seem", jp: "…のように見える", part: "verb" },
    { en: "unfair", jp: "不公平な; 不正な", part: "adjective" },
    { en: "result", jp: "結果; 成果", part: "noun" },
    { en: "same", jp: "同じ物[事]", part: "pronoun" },
    { en: "next", jp: "となりの、最も近い", part: "adjective" },
    { en: "middle", jp: "真ん中", part: "noun" },

    // Image 3
    { en: "recognize", jp: "認識する", part: "verb" },
    { en: "be", jp: "[be + 過去分詞の形で]…される", part: "auxiliary verb" },
    { en: "achieve", jp: "手に入れる、得る", part: "verb" },
    { en: "situation", jp: "立場、状態", part: "noun" },

    // Project 2 (Image 3 bottom onwards)
    { en: "alarm", jp: "目覚まし時計; 警報", part: "noun" },
    { en: "within", jp: "[時間・距離]…以内に[で]; [範囲]…の範囲内に[で]", part: "preposition" },
    { en: "hop", jp: "ぴょんととぶ", part: "verb" },
    { en: "around", jp: "あちらこちらを[に]、四方(八方)に", part: "adverb" },
    { en: "buy", jp: "買い物; 買い得品", part: "noun" },

    // Image 4
    { en: "might", jp: "[可能性]…かもしれない", part: "auxiliary verb" },
    { en: "apartment", jp: "[米で](アパート内の)1世帯分の部屋; アパート、マンション、共同住宅", part: "noun" },
    { en: "otherwise", jp: "もしそうでなければ、そうしなければ", part: "adverb" },
    { en: "annoying", jp: "しゃくにさわる、うるさい、迷惑な", part: "adjective" },
    { en: "battery", jp: "電池、バッテリー", part: "noun" },
    { en: "last", jp: "続く", part: "verb" },
    { en: "although", jp: "…だけれども、…という事実に関わらず", part: "conjunction" },
    { en: "backlight", jp: "バックライト", part: "noun" },
    { en: "dark", jp: "暗やみ", part: "noun" },
    { en: "bedroom", jp: "寝室", part: "noun" },
    { en: "bathroom", jp: "浴室", part: "noun" },
    { en: "at", jp: "[値段・程度・割合・速度などが]…で", part: "preposition" },

    // Image 5
    { en: "discount", jp: "割引、割引額", part: "noun" },
    { en: "sale", jp: "販売", part: "noun" },
    { en: "model", jp: "模型; 型", part: "noun" },
    { en: "simple", jp: "質素な、はででない; 簡素な", part: "adjective" },
    { en: "compact", jp: "小型の", part: "adjective" },
    { en: "function", jp: "機能", part: "noun" },

    // Reading Lesson 2 Start (Image 5 bottom)
    { en: "honor", jp: "尊敬する、敬意を表す", part: "verb" },
    { en: "achievement", jp: "やりとげたこと、業績、偉業", part: "noun" },
    { en: "Martin Luther King, Jr.", jp: "マーティン・ルーサー・キング・ジュニア", part: "noun" },
    { en: "liberty", jp: "自由", part: "noun" },
    { en: "justice", jp: "正義、正しさ、公平", part: "noun" },

    // Image 6
    { en: "courage", jp: "勇気", part: "noun" },
    { en: "movement", jp: "(社会的・宗教的)運動", part: "noun" },
    { en: "March on Washington", jp: "ワシントン大行進", part: "noun" },
    { en: "Dr.", jp: "…博士; (医者の名前につけて)…先生", part: "noun" },
    { en: "great", jp: "偉大な、きわめてすぐれた; 重要な", part: "adjective" },
    { en: "speech", jp: "演説、スピーチ", part: "noun" },
    { en: "make a speech", jp: "演説をする", part: "phrase" },
    { en: "step", jp: "(階段・はしごの)(踏み)段; (ふつう屋外の)階段", part: "noun" },
    { en: "Lincoln Memorial", jp: "リンカーン記念館", part: "noun" },

    // Image 7
    { en: "head", jp: "[…の方向に]向かう", part: "verb" },
    { en: "white", jp: "白人", part: "noun" },
    { en: "Whites Only", jp: "白人専用", part: "noun" },
    { en: "section", jp: "(切って分けられた)部分; 区域", part: "noun" },
    { en: "fill", jp: "いっぱいにする; いっぱいになる", part: "verb" },
    { en: "fill up", jp: "いっぱいに満ちる", part: "phrase" },
    { en: "white", jp: "白色人種の", part: "adjective" },
    { en: "Mrs.", jp: "…夫人、…さん; …先生", part: "noun" },
    { en: "give up ...", jp: "…を手放す", part: "phrase" },
    { en: "or", jp: "[命令文などのあとで用いて]さもないと", part: "conjunction" },
    { en: "call", jp: "電話をかける", part: "verb" },
    { en: "refuse", jp: "断る、拒否する", part: "verb" },
    { en: "arrest", jp: "逮捕する", part: "verb" },

    // Image 8
    { en: "boycott", jp: "ボイコット", part: "noun" },
    { en: "arrest", jp: "逮捕", part: "noun" },
    { en: "upset", jp: "動転させる、うろたえさせる; 心配させる", part: "verb" },
    { en: "leader", jp: "指導者、リーダー", part: "noun" },
    { en: "civil", jp: "市民の、公民の", part: "adjective" },
    { en: "right", jp: "(正当な)権利", part: "noun" },
    { en: "civil rights", jp: "公民権", part: "noun" },
    { en: "stand", jp: "耐える、がまんする", part: "verb" },
    { en: "take", jp: "(人が席・地位などに)つく", part: "verb" },
    { en: "be free to ...", jp: "自由に…することができる", part: "phrase" },
    { en: "anywhere", jp: "[肯定文で用いて]どこに[へ]でも", part: "adverb" },
    { en: "success", jp: "成功", part: "noun" },
    { en: "beginning", jp: "初め、最初; 始まり", part: "noun" },

    // Image 9
    { en: "that", jp: "…という", part: "conjunction" },
    { en: "child", jp: "(親に対して)子、子ども", part: "noun" },
    { en: "nation", jp: "国家、国", part: "noun" },
    { en: "where", jp: "[A where B ... の形で] Bが…する(ところの)A", part: "adverb" },
    { en: "not ... but ~", jp: "…ではなく~", part: "phrase" },
    { en: "judge", jp: "(物のよしあしを)判断する", part: "verb" },
    { en: "by", jp: "…に従って、…によって", part: "preposition" },
    { en: "skin", jp: "皮膚、肌", part: "noun" },
    { en: "content", jp: "中身、内容", part: "noun" },
    { en: "character", jp: "(人の)性格", part: "noun" },
    { en: "join", jp: "つなぐ; 合わせる", part: "verb" },
    { en: "join hands with ...", jp: "…と手を取り合う", part: "phrase" },
    { en: "Nobel Peace Prize", jp: "ノーベル平和賞", part: "noun" },

    // Image 10
    { en: "law", jp: "法、法律", part: "noun" },
    { en: "(1960)s", jp: "(1960)年代", part: "noun" },
    { en: "control", jp: "支配する、統制する", part: "verb" },
    { en: "limit", jp: "制限する", part: "verb" },
    { en: "black", jp: "黒人の", part: "adjective" },
    { en: "America", jp: "アメリカ(合衆国)、(南・北)アメリカ大陸", part: "noun" },
    { en: "were", jp: "(…に)いた; (…に)あった", part: "verb" },
    { en: "restroom", jp: "(デパート・劇場などの)洗面所、トイレ", part: "noun" },
    { en: "drinking fountain", jp: "噴水式の水飲み器", part: "noun" },
    { en: "Rosa Parks", jp: "ローザ・パークス", part: "noun" },
    { en: "public", jp: "公共の、公の", part: "adjective" },
    { en: "Montgomery", jp: "モントゴメリー", part: "noun" },
    { en: "Alabama", jp: "アラバマ", part: "noun" },

    // Image 12 (Final Words)
    { en: "... year(s) later", jp: "…年後", part: "phrase" }, // Implied phrase
    { en: "kill", jp: "殺す", part: "verb" },
    { en: "death", jp: "死; 死亡", part: "noun" },
    { en: "live", jp: "(思い出などが)生きている", part: "verb" }
];

const newWordsBlock = "\n" + l6Words.map(w => `                    { "en": ${JSON.stringify(w.en)}, "jp": ${JSON.stringify(w.jp)}, "part": ${JSON.stringify(w.part)} }`).join(',\n') + "\n                ";

const finalContent = content.substring(0, wordsStartIndex) + newWordsBlock + content.substring(wordsEndIndex);
fs.writeFileSync(filePath, finalContent);
console.log("Updated Lesson 6 with full 12-image set.");
