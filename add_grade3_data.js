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

// Lesson 3 Data
const lesson3 = {
    unit: "Lesson 3",
    pages: "P27〜35",
    words: [
        { en: "cranes", jp: "crane(ツル)の複数形", part: "noun" }, // inferred title
        { en: "peace", jp: "平和", part: "noun" }, // inferred title
        { en: "atomic", jp: "原子の", part: "adjective" },
        { en: "bomb", jp: "爆弾", part: "noun" },
        { en: "atomic bomb", jp: "原子爆弾", part: "noun" },
        { en: "Atomic Bomb Dome", jp: "原爆ドーム", part: "noun" },
        { en: "dome", jp: "ドーム", part: "noun" },
        { en: "remain", jp: "残る; とどまる", part: "verb" },
        { en: "were", jp: "be(are)の過去形", part: "auxiliary verb" }, // irregular
        { en: "was", jp: "be(is/am)の過去形", part: "auxiliary verb" }, // irregular
        { en: "memorial", jp: "記念の; 追悼の", part: "adjective" },
        { en: "park", jp: "公園", part: "noun" },
        { en: "Peace Memorial Park", jp: "平和記念公園", part: "noun" },
        { en: "give", jp: "(人に情報などを)伝える、言う", part: "verb" },
        { en: "background", jp: "背景", part: "noun" },
        { en: "information", jp: "情報", part: "noun" },
        { en: "depress", jp: "落胆させる、元気をなくさせる", part: "verb" },
        { en: "on display", jp: "展示されて", part: "phrase" },
        { en: "display", jp: "陳列、展示", part: "noun" },
        { en: "moving", jp: "人の心を動かす、人を感動させる", part: "adjective" },
        { en: "flash", jp: "閃光、きらめき", part: "noun" },
        { en: "detail", jp: "細部; 詳細", part: "noun" },
        { en: "life", jp: "一生、生涯; 人生", part: "noun" },
        { en: "booklet", jp: "小冊子、パンフレット", part: "noun" },
        { en: "effect", jp: "影響(力)、効果", part: "noun" },
        { en: "suffer", jp: "(病気などを)わずらう", part: "verb" },
        { en: "from", jp: "…から、…のために", part: "preposition" },
        { en: "suffer from ...", jp: "…に苦しむ", part: "phrase" },
        { en: "instant", jp: "瞬間", part: "noun" },
        { en: "feeling", jp: "感情、気持ち", part: "noun" },
        { en: "folded", jp: "fold(折る)の過去・過去分詞", part: "verb" }, // inferred context
        { en: "paper", jp: "紙", part: "noun" },
        { en: "crane", jp: "ツル(鳥)", part: "noun" },
        { en: "thousand", jp: "千の", part: "adjective" }
    ]
};

const project1 = {
    unit: "Project 1",
    pages: "P36〜37",
    words: [
        { en: "wish", jp: "願い、望み", part: "noun" },
        { en: "subway", jp: "地下鉄", part: "noun" },
        { en: "boat", jp: "ボート、小舟; (一般に)船", part: "noun" },
        { en: "east", jp: "東(の)", part: "noun" }, // adj/noun
        { en: "west", jp: "西(の)", part: "noun" }, // adj/noun
        { en: "north", jp: "北(の)", part: "noun" },
        { en: "factory", jp: "工場", part: "noun" },
        { en: "cracker", jp: "(菓子の)クラッカー", part: "noun" },
        { en: "Asian", jp: "アジアの", part: "adjective" },
        { en: "ninja", jp: "忍者", part: "noun" },
        { en: "fast food", jp: "ファストフード", part: "noun" },
        { en: "soda", jp: "ソーダ(水)、炭酸水", part: "noun" }
    ]
};

const reading1 = {
    unit: "Reading Lesson 1",
    pages: "P38〜41",
    words: [
        { en: "daily", jp: "毎日の; 日々の、日常の", part: "adjective" },
        { en: "affect", jp: "…の心を動かす", part: "verb" },
        { en: "sadness", jp: "悲しみ、悲しさ", part: "noun" },
        { en: "anger", jp: "怒り、立腹", part: "noun" },
        { en: "heal", jp: "治す、いやす", part: "verb" },
        { en: "come from ...", jp: "…から生じる", part: "phrase" },
        { en: "combination", jp: "結合、配合、組み合わせ", part: "noun" },
        { en: "central", jp: "主要な、重要な", part: "adjective" },
        { en: "hold together", jp: "1つにまとめる", part: "phrase" },
        { en: "piece", jp: "(詩・音楽・絵画などの)作品、曲", part: "noun" },
        { en: "music", jp: "曲", part: "noun" }, // context
        { en: "djembe", jp: "ジャンベ", part: "noun" }, // drum
        { en: "Africa", jp: "アフリカ", part: "noun" },
        { en: "West Africa", jp: "アフリカ西部", part: "noun" },
        { en: "illustrate", jp: "(実例などで)説明する、例示する", part: "verb" },
        { en: "produce", jp: "生み出す; 生産する", part: "verb" },
        { en: "basic", jp: "基礎の、基本の", part: "adjective" },
        { en: "combine", jp: "結合する、いっしょにする[なる]、組み合わせる", part: "verb" },
        { en: "create", jp: "作り出す、創造する", part: "verb" },
        { en: "commonly", jp: "一般に", part: "adverb" },
        { en: "wedding", jp: "結婚式、婚礼", part: "noun" },
        { en: "funeral", jp: "葬式、葬儀", part: "noun" },
        { en: "bring together", jp: "まとめる、集める", part: "phrase" },
        { en: "feature", jp: "特徴、特色", part: "noun" },
        { en: "key", jp: "(音楽の)調; (音階などの)主音、キー", part: "noun" },
        { en: "tempo", jp: "拍子、テンポ", part: "noun" },
        { en: "emotion", jp: "感情", part: "noun" },
        { en: "She Loves You", jp: "シー・ラブズ・ユー", part: "noun" },
        { en: "major", jp: "長調の", part: "adjective" }, // music context
        { en: "meanwhile", jp: "一方で", part: "adverb" },
        { en: "Yesterday", jp: "イエスタデイ", part: "noun" },
        { en: "minor", jp: "短調の", part: "adjective" },
        { en: "end", jp: "エンド", part: "noun" },
        { en: "over", jp: "…を超えて、…より多く; …以上", part: "preposition" }, // [の]
        { en: "go back", jp: "もどる", part: "phrase" }, // inferred
        { en: "health", jp: "健康; 健康状態", part: "noun" },
        { en: "wish", jp: "(…を)願う、望む", part: "verb" },
        { en: "receive", jp: "受け取る; もらう", part: "verb" },
        { en: "doubt", jp: "疑う、信用しない", part: "verb" },
        { en: "cause", jp: "引き起こす、…の原因となる", part: "verb" },
        { en: "sickness", jp: "病気", part: "noun" },
        { en: "about", jp: "…ごろに[の]; およそ…で[の]", part: "preposition" },
        { en: "place", jp: "順位; (競走の)…着", part: "noun" },
        { en: "classmate", jp: "同級生、クラスメイト、級友", part: "noun" },
        { en: "come together", jp: "集まる", part: "phrase" },
        { en: "evolution", jp: "進化; 発展", part: "noun" },
        { en: "as well", jp: "…もまた", part: "phrase" },
        { en: "note", jp: "(音楽の)音符; (楽器の)音色", part: "noun" },
        { en: "tap", jp: "軽くたたく", part: "verb" },
        { en: "wide", jp: "(範囲などが)広い", part: "adjective" },
        { en: "variety", jp: "(…の)種類; [a variety of ...の形で]いろいろな(種類の)…、さまざま", part: "noun" },
        { en: "quality", jp: "質、品質", part: "noun" }
    ]
};

// Lesson 6 Data
const lesson6 = {
    unit: "Lesson 6",
    pages: "P67〜73",
    words: [
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
        { en: "recognize", jp: "認識する", part: "verb" },
        { en: "be", jp: "[be + 過去分詞の形で]…される", part: "auxiliary verb" },
        { en: "achieve", jp: "手に入れる、得る", part: "verb" },
        { en: "situation", jp: "立場、状態", part: "noun" }
    ]
};

const project2 = {
    unit: "Project 2",
    pages: "P76〜77",
    words: [
        { en: "alarm", jp: "目覚まし時計; 警報", part: "noun" },
        { en: "within", jp: "[時間・距離]…以内に[で]; [範囲]…の範囲内に[で]", part: "preposition" },
        { en: "hop", jp: "ぴょんととぶ", part: "verb" },
        { en: "around", jp: "あちらこちらを[に]、四方(八方)に", part: "adverb" },
        { en: "buy", jp: "買い物; 買い得品", part: "noun" },
        { en: "habitat", jp: "生息地", part: "noun" },
        { en: "delicate", jp: "(物が)壊れやすい、傷つきやすい", part: "adjective" },
        { en: "path", jp: "(野・森に自然に出来た)小道; (庭・公園の)歩道", part: "noun" },
        { en: "guideline", jp: "指針", part: "noun" }
    ]
};

const reading2 = {
    unit: "Reading Lesson 2",
    pages: "P78〜81",
    words: [
        { en: "honor", jp: "尊敬する、敬意を表す", part: "verb" },
        { en: "achievement", jp: "やりとげたこと、業績、偉業", part: "noun" },
        { en: "Martin Luther King, Jr.", jp: "マーティン・ルーサー・キング・ジュニア", part: "noun" },
        { en: "liberty", jp: "自由", part: "noun" },
        { en: "justice", jp: "正義、正しさ、公平", part: "noun" },
        { en: "narrow", jp: "狭い、細い", part: "adjective" },
        { en: "still", jp: "それでも", part: "adverb" },
        { en: "park", jp: "(自動車などを)駐車する", part: "verb" },
        { en: "front", jp: "前部; 前面、正面", part: "noun" },
        { en: "of", jp: "…から(離れて)", part: "preposition" },
        { en: "in front of ...", jp: "…の前に", part: "phrase" },
        { en: "parking", jp: "駐車", part: "noun" },
        { en: "entrance", jp: "入り口", part: "noun" },
        { en: "appear", jp: "現れる; (テレビなどに)出る", part: "verb" },
        { en: "private", jp: "個人の; 私有の", part: "adjective" },
        { en: "privacy", jp: "私的な自由、プライバシー", part: "noun" }
    ]
};

// Lesson 7 Data
const lesson7 = {
    unit: "Lesson 7",
    pages: "P84〜98",
    words: [
        { en: "would", jp: "(もし…ならば)…するだろうに", part: "auxiliary verb" },
        { en: "machine", jp: "機械", part: "noun" },
        { en: "then", jp: "その場合には、そうすれば", part: "adverb" },
        { en: "goal", jp: "(バスケットボールなどの)ゴール", part: "noun" },
        { en: "exactly", jp: "(答えに使って)そのとおりです", part: "adverb" },
        { en: "Sweden", jp: "スウェーデン", part: "noun" },
        { en: "wish", jp: "…であればなあ、…すればいいと思う", part: "verb" },
        { en: "cleaning", jp: "そうじ; クリーニング", part: "noun" },
        { en: "could", jp: "…できたら; …できるだろうに", part: "auxiliary verb" },
        { en: "wing", jp: "(鳥・飛行機の)翼", part: "noun" },
        { en: "line", jp: "列に並べる", part: "verb" },
        { en: "up", jp: "まとめて、まとまるように", part: "adverb" },
        { en: "line up", jp: "整列させる、並べる", part: "phrase" },
        { en: "neatly", jp: "きちんと、小ぎれいに", part: "adverb" },
        { en: "footprint", jp: "足跡", part: "noun" },
        { en: "sticker", jp: "ステッカー、シール", part: "noun" },
        { en: "encourage ... to ~", jp: "…を~するよう励ます", part: "phrase" },
        { en: "healthy", jp: "健康によい; 健全な", part: "adjective" },
        { en: "instead of ...", jp: "…のかわりに", part: "phrase" },
        { en: "escalator", jp: "エスカレーター", part: "noun" },
        { en: "so", jp: "[目的を表して]…するために", part: "conjunction" },
        { en: "that", jp: "…するために、…する[できる]ように", part: "conjunction" },
        { en: "so that ...", jp: "…するために", part: "phrase" },
        { en: "score", jp: "得点、点数", part: "noun" },
        { en: "nervous", jp: "心配して、不安で", part: "adjective" },
        { en: "past", jp: "過去", part: "noun" },
        { en: "truth", jp: "真実、事実", part: "noun" },
        { en: "period", jp: "時代", part: "noun" },
        { en: "Mars", jp: "火星", part: "noun" },
        { en: "grandchild", jp: "孫", part: "noun" },
        { en: "grandchildren", jp: "grandchild(孫)の複数形", part: "noun" },
        { en: "street", jp: "[Streetの表記で]…通り、…街", part: "noun" },
        { en: "satisfy", jp: "満足させる、満たす", part: "verb" },
        { en: "litter", jp: "ごみくず、がらくた", part: "noun" },
        { en: "law", jp: "法、法律", part: "noun" },
        { en: "(1960)s", jp: "(1960)年代", part: "noun" },
        { en: "control", jp: "支配する、統制する", part: "verb" },
        { en: "limit", jp: "制限する", part: "verb" },
        { en: "black", jp: "黒人の", part: "adjective" },
        { en: "America", jp: "アメリカ(合衆国)、(南・北)アメリカ大陸", part: "noun" },
        { en: "were", jp: "(…に)いた; (…に)あった", part: "verb" }, // be past
        { en: "restroom", jp: "(デパート・劇場などの)洗面所、トイレ", part: "noun" },
        { en: "drinking fountain", jp: "噴水式の水飲み器", part: "noun" },
        { en: "Rosa Parks", jp: "ローザ・パークス", part: "noun" },
        { en: "public", jp: "公共の、公の", part: "adjective" },
        { en: "Montgomery", jp: "モントゴメリー", part: "noun" },
        { en: "Alabama", jp: "アラバマ", part: "noun" },
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
        { en: "courage", jp: "勇気", part: "noun" },
        { en: "movement", jp: "(社会的・宗教的)運動", part: "noun" },
        { en: "March on Washington", jp: "ワシントン大行進", part: "noun" },
        { en: "Dr.", jp: "…博士; (医者の名前につけて)…先生", part: "noun" },
        { en: "great", jp: "偉大な、きわめてすぐれた; 重要な", part: "adjective" },
        { en: "speech", jp: "演説、スピーチ", part: "noun" },
        { en: "make a speech", jp: "演説をする", part: "phrase" },
        { en: "step", jp: "(階段・はしごの)(踏み)段; (ふつう屋外の)階段", part: "noun" },
        { en: "Lincoln Memorial", jp: "リンカーン記念館", part: "noun" },
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
        { en: "that", jp: "…という", part: "conjunction" }, // that clause
        { en: "child", jp: "(親に対して)子、子ども", part: "noun" },
        { en: "nation", jp: "国家、国", part: "noun" },
        { en: "where", jp: "[A where B ... の形で] Bが…する(ところの)A", part: "adverb" },
        { en: "not ... but ~", jp: "…ではなく~", part: "phrase" },
        { en: "judge", jp: "(物のよしあしを)判断する", part: "verb" },
        { en: "by", jp: "…に従って、…によって", part: "preposition" },
        { en: "skin", jp: "皮膚、肌", part: "noun" },
        { en: "content", jp: "中身、内容", part: "noun" }, // "content of their character"
        { en: "character", jp: "(人の)性格", part: "noun" },
        { en: "join", jp: "つなぐ; 合わせる", part: "verb" },
        { en: "join hands with ...", jp: "…と手を取り合う", part: "phrase" },
        { en: "Nobel Peace Prize", jp: "ノーベル平和賞", part: "noun" }
    ]
};

const newUnits = [lesson3, project1, reading1, lesson6, project2, reading2, lesson7];

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
const finalLessons = [];

// Helper checks
function isUnit(text, unitName) {
    return text.includes(`"unit": "${unitName}"`);
}

// Filter existing lessons
// We want to KEEP L1, L2, L4, L5.
// We want to DISCARD old L3, L6, L7, P1, P2, RL1, RL2 if present.
// We will then append our new UNITS.
// Wait, we should insert them in order.

const keyUnits = ["Lesson 1", "Lesson 2", "Lesson 3", "Project 1", "Reading Lesson 1", "Lesson 4", "Lesson 5", "Lesson 6", "Project 2", "Reading Lesson 2", "Lesson 7", "Lesson 8"];

// Map existing to unit names
const map = {};
existingLessons.forEach(l => {
    let name = "Unknown";
    const m = l.match(/"unit": "([^"]+)"/);
    if (m) name = m[1];
    map[name] = l;
});

// Overwrite with new data
newUnits.forEach(u => {
    const json = JSON.stringify(u, null, 16).replace(/\\n/g, '').replace(/\\s+/g, ' ');
    // Pretty print manual
    const pretty = `
            {
                "unit": "${u.unit}",
                "pages": "${u.pages}",
                "words": [
${u.words.map(w => `                    { "en": "${w.en}", "jp": "${w.jp}", "part": "${w.part}" }`).join(',\n')}
                ]
            }`;
    map[u.unit] = pretty;
});

// Rebuild in order
const ordered = [];
keyUnits.forEach(k => {
    if (map[k]) ordered.push(map[k].trim());
});

// Check for any extras in map that are not in keyUnits (e.g. unknown lessons)
for (const k in map) {
    if (!keyUnits.includes(k)) {
        console.log("Preserving extra unit: " + k);
        ordered.push(map[k].trim());
    }
}

const newG3Body = "\n" + ordered.join(",\n") + "\n";
const finalContent = content.substring(0, g3.start + 1) + newG3Body + content.substring(g3.end);

fs.writeFileSync(filePath, finalContent);
console.log("Updated Lessons 3, 6, 7 and related projects.");
