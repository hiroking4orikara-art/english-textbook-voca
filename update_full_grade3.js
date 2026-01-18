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

// === NEW DATA DEFINITIONS ===

const lesson2 = {
    unit: "Lesson 2",
    pages: "P15〜26",
    words: [
        { en: "power", jp: "力", part: "noun" }, { en: "have", jp: "ずっと…している", part: "auxiliary verb" },
        { en: "been", jp: "(今まで)…し続けている", part: "auxiliary verb" }, { en: "discuss", jp: "話し合う、討議[論議]する", part: "verb" },
        { en: "album", jp: "アルバム", part: "noun" }, { en: "used", jp: "中古の、使用済みの", part: "adjective" },
        { en: "between", jp: "(2つ以上の選択肢)の中から", part: "preposition" }, { en: "Shake It Off", jp: "シェイク・イット・オフ", part: "noun" },
        { en: "catchy", jp: "人の心をひき寄せる、(曲が)覚えやすい", part: "adjective" }, { en: "audience", jp: "聴衆、観客", part: "noun" },
        { en: "along", jp: "(人と)いっしょに", part: "adverb" }, { en: "sing along", jp: "いっしょに歌う", part: "phrase" },
        { en: "sound like ...", jp: "…のように思われる", part: "phrase" }, { en: "consider", jp: "よく考える、熟慮する、考慮に入れる", part: "verb" },
        { en: "Count on Me", jp: "カウント・オン・ミー", part: "noun" }, { en: "lately", jp: "最近、近ごろ", part: "adverb" },
        { en: "friendship", jp: "友情", part: "noun" }, { en: "lyric", jp: "歌詞", part: "noun" },
        { en: "move", jp: "(心を)動かす、感動させる", part: "verb" }, { en: "set", jp: "セット、組、そろい", part: "noun" },
        { en: "problem", jp: "(数学・理科などの)問題", part: "noun" }, { en: "folk", jp: "みなさん、みんな", part: "noun" },
        { en: "American", jp: "アメリカの、米国の; アメリカ人の", part: "adjective" }, { en: "Bruno", jp: "ブルーノ", part: "noun" },
        { en: "Mars", jp: "マーズ", part: "noun" }, { en: "alone", jp: "ひとりで、単独で", part: "adjective" },
        { en: "true", jp: "ほんとうの[で]、真実の[で]、真の", part: "adjective" }, { en: "playlist", jp: "プレイリスト", part: "noun" },
        { en: "those", jp: "その; それらの; あの; あれらの", part: "adjective" }, { en: "remind", jp: "思い出させる", part: "verb" },
        { en: "remind ... of ~", jp: "…に~を思い起こさせる", part: "phrase" }, { en: "title", jp: "タイトル、題名", part: "noun" },
        { en: "summertime", jp: "夏、夏季", part: "noun" }, { en: "it", jp: "[あとにくるto doを受けて形式的な主語になる]", part: "pronoun" },
        { en: "for", jp: "[不定詞の意味上の主語を表して]…にとって", part: "preposition" }, { en: "impossible", jp: "不可能な; ありえない", part: "adjective" },
        { en: "melody", jp: "旋律、メロディー", part: "noun" }, { en: "complex", jp: "複雑な", part: "adjective" },
        { en: "rhythm", jp: "リズム、調子", part: "noun" }, { en: "debut", jp: "デビューする", part: "verb" },
        { en: "number", jp: "…番、(電話などの)番号", part: "noun" }, { en: "Billboard Hot 100", jp: "ビルボード・ホット100", part: "noun" },
        { en: "unhappy", jp: "不幸な; 悲しい", part: "adjective" }, { en: "Help!", jp: "ヘルプ!", part: "noun" },
        { en: "The Beatles", jp: "ビートルズ", part: "noun" }, { en: "word", jp: "単語、ことば", part: "noun" },
        { en: "throughout", jp: "…じゅう、…を通じて", part: "preposition" }, { en: "person", jp: "人、個人、人物", part: "noun" },
        { en: "down", jp: "(勢いが)落ちて; (気持ちが)沈んで", part: "adverb" }, { en: "ask", jp: "たのむ、求める", part: "verb" },
        { en: "ask for ...", jp: "…を求める", part: "phrase" }, { en: "contrast", jp: "対照、対比", part: "noun" },
        { en: "in contrast", jp: "(…と)対照的に", part: "phrase" }, { en: "upbeat", jp: "楽しい; 陽気な", part: "adjective" },
        { en: "concern", jp: "心配", part: "noun" }, { en: "better", jp: "(健康状態が)もっとよい、より元気な", part: "adjective" },
        { en: "afraid", jp: "恐れて、こわがって; 心配して", part: "adjective" }, { en: "be afraid of ...", jp: "…を恐れる", part: "phrase" },
        { en: "passion", jp: "情熱", part: "noun" }, { en: "fight", jp: "たたかい; 奮闘", part: "noun" },
        { en: "roller", jp: "[roller coasterで]ジェットコースター", part: "noun" }, { en: "coaster", jp: "[roller coasterで]ジェットコースター", part: "noun" },
        { en: "roller coaster", jp: "ジェットコースター", part: "noun" }, { en: "numbered", jp: "番号のふられた、数字の書かれた", part: "adjective" },
        { en: "line", jp: "列; 行列", part: "noun" }, { en: "haunted", jp: "幽霊の出る", part: "adjective" },
        { en: "house", jp: "(いろいろな目的に使われる)建物、小屋", part: "noun" }, { en: "close", jp: "(施設などを)閉鎖する", part: "verb" },
        { en: "daytime", jp: "日中、昼間", part: "noun" }, { en: "double", jp: "2倍の", part: "adjective" },
        { en: "free", jp: "自由な", part: "adjective" }, { en: "feel free to ...", jp: "遠慮なく…する、気軽に…する", part: "phrase" },
        { en: "go-cart", jp: "ゴーカート", part: "noun" }, { en: "Ferris wheel", jp: "観覧車", part: "noun" },
        { en: "next", jp: "次に; 今度", part: "adverb" }, { en: "app", jp: "アプリ、アプリケーション", part: "noun" },
        { en: "accoring", jp: "…によれば", part: "adverb" }, { en: "to", jp: "…に合わせて、…に合って", part: "preposition" },
        { en: "according to ...", jp: "…によれば", part: "phrase" }
    ]
};

const lesson3 = {
    unit: "Lesson 3",
    pages: "P27〜35",
    words: [
        { en: "cranes", jp: "crane(ツル)の複数形", part: "noun" }, { en: "peace", jp: "平和", part: "noun" },
        { en: "atomic", jp: "原子の", part: "adjective" }, { en: "bomb", jp: "爆弾", part: "noun" },
        { en: "atomic bomb", jp: "原子爆弾", part: "noun" }, { en: "Atomic Bomb Dome", jp: "原爆ドーム", part: "noun" },
        { en: "dome", jp: "ドーム", part: "noun" }, { en: "remain", jp: "残る; とどまる", part: "verb" },
        { en: "were", jp: "be(are)の過去形", part: "auxiliary verb" }, { en: "was", jp: "be(is/am)の過去形", part: "auxiliary verb" },
        { en: "memorial", jp: "記念の; 追悼の", part: "adjective" }, { en: "park", jp: "公園", part: "noun" },
        { en: "Peace Memorial Park", jp: "平和記念公園", part: "noun" }, { en: "give", jp: "(人に情報などを)伝える、言う", part: "verb" },
        { en: "background", jp: "背景", part: "noun" }, { en: "information", jp: "情報", part: "noun" },
        { en: "depress", jp: "落胆させる、元気をなくさせる", part: "verb" }, { en: "on display", jp: "展示されて", part: "phrase" },
        { en: "display", jp: "陳列、展示", part: "noun" }, { en: "moving", jp: "人の心を動かす、人を感動させる", part: "adjective" },
        { en: "flash", jp: "閃光、きらめき", part: "noun" }, { en: "detail", jp: "細部; 詳細", part: "noun" },
        { en: "life", jp: "一生、生涯; 人生", part: "noun" }, { en: "booklet", jp: "小冊子、パンフレット", part: "noun" },
        { en: "effect", jp: "影響(力)、効果", part: "noun" }, { en: "suffer", jp: "(病気などを)わずらう", part: "verb" },
        { en: "from", jp: "…から、…のために", part: "preposition" }, { en: "suffer from ...", jp: "…に苦しむ", part: "phrase" },
        { en: "instant", jp: "瞬間", part: "noun" }, { en: "feeling", jp: "感情、気持ち", part: "noun" },
        { en: "folded", jp: "fold(折る)の過去・過去分詞", part: "verb" }, { en: "paper", jp: "紙", part: "noun" },
        { en: "crane", jp: "ツル(鳥)", part: "noun" }, { en: "thousand", jp: "千の", part: "adjective" }
    ]
};

const project1 = {
    unit: "Project 1",
    pages: "P36〜37",
    words: [
        { en: "wish", jp: "願い、望み", part: "noun" }, { en: "subway", jp: "地下鉄", part: "noun" },
        { en: "boat", jp: "ボート、小舟; (一般に)船", part: "noun" }, { en: "east", jp: "東(の)", part: "noun" },
        { en: "west", jp: "西(の)", part: "noun" }, { en: "north", jp: "北(の)", part: "noun" },
        { en: "factory", jp: "工場", part: "noun" }, { en: "cracker", jp: "(菓子の)クラッカー", part: "noun" },
        { en: "Asian", jp: "アジアの", part: "adjective" }, { en: "ninja", jp: "忍者", part: "noun" },
        { en: "fast food", jp: "ファストフード", part: "noun" }, { en: "soda", jp: "ソーダ(水)、炭酸水", part: "noun" }
    ]
};

const reading1 = {
    unit: "Reading Lesson 1",
    pages: "P38〜41",
    words: [
        { en: "daily", jp: "毎日の; 日々の、日常の", part: "adjective" }, { en: "affect", jp: "…の心を動かす", part: "verb" },
        { en: "sadness", jp: "悲しみ、悲しさ", part: "noun" }, { en: "anger", jp: "怒り、立腹", part: "noun" },
        { en: "heal", jp: "治す、いやす", part: "verb" }, { en: "come from ...", jp: "…から生じる", part: "phrase" },
        { en: "combination", jp: "結合、配合、組み合わせ", part: "noun" }, { en: "central", jp: "主要な、重要な", part: "adjective" },
        { en: "hold together", jp: "1つにまとめる", part: "phrase" }, { en: "piece", jp: "(詩・音楽・絵画などの)作品、曲", part: "noun" },
        { en: "music", jp: "曲", part: "noun" }, { en: "djembe", jp: "ジャンベ", part: "noun" },
        { en: "Africa", jp: "アフリカ", part: "noun" }, { en: "West Africa", jp: "アフリカ西部", part: "noun" },
        { en: "illustrate", jp: "(実例などで)説明する、例示する", part: "verb" }, { en: "produce", jp: "生み出す; 生産する", part: "verb" },
        { en: "basic", jp: "基礎の、基本の", part: "adjective" }, { en: "combine", jp: "結合する、いっしょにする[なる]、組み合わせる", part: "verb" },
        { en: "create", jp: "作り出す、創造する", part: "verb" }, { en: "commonly", jp: "一般に", part: "adverb" },
        { en: "wedding", jp: "結婚式、婚礼", part: "noun" }, { en: "funeral", jp: "葬式、葬儀", part: "noun" },
        { en: "bring together", jp: "まとめる、集める", part: "phrase" }, { en: "feature", jp: "特徴、特色", part: "noun" },
        { en: "key", jp: "(音楽の)調; (音階などの)主音、キー", part: "noun" }, { en: "tempo", jp: "拍子、テンポ", part: "noun" },
        { en: "emotion", jp: "感情", part: "noun" }, { en: "She Loves You", jp: "シー・ラブズ・ユー", part: "noun" },
        { en: "major", jp: "長調の", part: "adjective" }, { en: "meanwhile", jp: "一方で", part: "adverb" },
        { en: "Yesterday", jp: "イエスタデイ", part: "noun" }, { en: "minor", jp: "短調の", part: "adjective" },
        { en: "end", jp: "エンド", part: "noun" }, { en: "over", jp: "…を超えて、…より多く; …以上", part: "preposition" },
        { en: "go back", jp: "もどる", part: "phrase" }, { en: "health", jp: "健康; 健康状態", part: "noun" },
        { en: "wish", jp: "(…を)願う、望む", part: "verb" }, { en: "receive", jp: "受け取る; もらう", part: "verb" },
        { en: "doubt", jp: "疑う、信用しない", part: "verb" }, { en: "cause", jp: "引き起こす、…の原因となる", part: "verb" },
        { en: "sickness", jp: "病気", part: "noun" }, { en: "about", jp: "…ごろに[の]; およそ…で[の]", part: "preposition" },
        { en: "place", jp: "順位; (競走の)…着", part: "noun" }, { en: "classmate", jp: "同級生、クラスメイト、級友", part: "noun" },
        { en: "come together", jp: "集まる", part: "phrase" }, { en: "evolution", jp: "進化; 発展", part: "noun" },
        { en: "as well", jp: "…もまた", part: "phrase" }, { en: "note", jp: "(音楽の)音符; (楽器の)音色", part: "noun" },
        { en: "tap", jp: "軽くたたく", part: "verb" }, { en: "wide", jp: "(範囲などが)広い", part: "adjective" },
        { en: "variety", jp: "(…の)種類; [a variety of ...の形で]いろいろな(種類の)…、さまざま", part: "noun" },
        { en: "quality", jp: "質、品質", part: "noun" }
    ]
};

const lesson6 = {
    unit: "Lesson 6",
    pages: "P67〜73",
    words: [
        { en: "fair", jp: "公正な、公平な", part: "adjective" }, { en: "ladle", jp: "おたま、ひしゃく", part: "noun" },
        { en: "flea", jp: "[昆虫の]ノミ", part: "noun" }, { en: "flea market", jp: "ノミの市、フリーマーケット", part: "noun" },
        { en: "cutlet", jp: "切り身; カツレツ", part: "noun" }, { en: "left-handed", jp: "左ききの", part: "adjective" },
        { en: "right-handed", jp: "右ききの", part: "adjective" }, { en: "struggle", jp: "たたかう; 奮闘する", part: "verb" },
        { en: "struggle with ...", jp: "(困難など)とたたかう", part: "phrase" }, { en: "difficulty", jp: "やっかいな事柄、難題", part: "noun" },
        { en: "I mean", jp: "つまりその", part: "phrase" }, { en: "left-handedness", jp: "左きき", part: "noun" },
        { en: "aware", jp: "気づいて、知って", part: "adjective" }, { en: "be aware of ...", jp: "…に気づいている", part: "phrase" },
        { en: "ever", jp: "[比較のことばとともに用いて]今までに(…したうちで)", part: "adverb" }, { en: "meat", jp: "食用肉", part: "noun" },
        { en: "What else ...?", jp: "ほかに何か…はありますか。", part: "phrase" }, { en: "allergy", jp: "アレルギー", part: "noun" },
        { en: "egg-free", jp: "卵を使用していない", part: "adjective" }, { en: "fairness", jp: "公正、公平", part: "noun" },
        { en: "treat", jp: "(人を)扱う、待遇する", part: "verb" }, { en: "equally", jp: "平等に、等しく", part: "adverb" },
        { en: "resource", jp: "資源、資産", part: "noun" }, { en: "distribute", jp: "配る、分配する", part: "verb" },
        { en: "number", jp: "[…の]総数、数量", part: "noun" }, { en: "seem", jp: "…のように見える", part: "verb" },
        { en: "unfair", jp: "不公平な; 不正な", part: "adjective" }, { en: "result", jp: "結果; 成果", part: "noun" },
        { en: "same", jp: "同じ物[事]", part: "pronoun" }, { en: "next", jp: "となりの、最も近い", part: "adjective" },
        { en: "middle", jp: "真ん中", part: "noun" }, { en: "recognize", jp: "認識する", part: "verb" },
        { en: "be", jp: "[be + 過去分詞の形で]…される", part: "auxiliary verb" }, { en: "achieve", jp: "手に入れる、得る", part: "verb" },
        { en: "situation", jp: "立場、状態", part: "noun" }
    ]
};

const project2 = {
    unit: "Project 2",
    pages: "P76〜77",
    words: [
        { en: "alarm", jp: "目覚まし時計; 警報", part: "noun" }, { en: "within", jp: "[時間・距離]…以内に[で]; [範囲]…の範囲内に[で]", part: "preposition" },
        { en: "hop", jp: "ぴょんととぶ", part: "verb" }, { en: "around", jp: "あちらこちらを[に]、四方(八方)に", part: "adverb" },
        { en: "buy", jp: "買い物; 買い得品", part: "noun" }, { en: "habitat", jp: "生息地", part: "noun" },
        { en: "delicate", jp: "(物が)壊れやすい、傷つきやすい", part: "adjective" }, { en: "path", jp: "(野・森に自然に出来た)小道; (庭・公園の)歩道", part: "noun" },
        { en: "guideline", jp: "指針", part: "noun" }
    ]
};

const reading2 = {
    unit: "Reading Lesson 2",
    pages: "P78〜81",
    words: [
        { en: "honor", jp: "尊敬する、敬意を表す", part: "verb" }, { en: "achievement", jp: "やりとげたこと、業績、偉業", part: "noun" },
        { en: "Martin Luther King, Jr.", jp: "マーティン・ルーサー・キング・ジュニア", part: "noun" }, { en: "liberty", jp: "自由", part: "noun" },
        { en: "justice", jp: "正義、正しさ、公平", part: "noun" }, { en: "narrow", jp: "狭い、細い", part: "adjective" },
        { en: "still", jp: "それでも", part: "adverb" }, { en: "park", jp: "(自動車などを)駐車する", part: "verb" },
        { en: "front", jp: "前部; 前面、正面", part: "noun" }, { en: "of", jp: "…から(離れて)", part: "preposition" },
        { en: "in front of ...", jp: "…の前に", part: "phrase" }, { en: "parking", jp: "駐車", part: "noun" },
        { en: "entrance", jp: "入り口", part: "noun" }, { en: "appear", jp: "現れる; (テレビなどに)出る", part: "verb" },
        { en: "private", jp: "個人の; 私有の", part: "adjective" }, { en: "privacy", jp: "私的な自由、プライバシー", part: "noun" }
    ]
};

const lesson7 = {
    unit: "Lesson 7",
    pages: "P84〜98",
    words: [
        { en: "would", jp: "(もし…ならば)…するだろうに", part: "auxiliary verb" }, { en: "machine", jp: "機械", part: "noun" },
        { en: "then", jp: "その場合には、そうすれば", part: "adverb" }, { en: "goal", jp: "(バスケットボールなどの)ゴール", part: "noun" },
        { en: "exactly", jp: "(答えに使って)そのとおりです", part: "adverb" }, { en: "Sweden", jp: "スウェーデン", part: "noun" },
        { en: "wish", jp: "…であればなあ、…すればいいと思う", part: "verb" }, { en: "cleaning", jp: "そうじ; クリーニング", part: "noun" },
        { en: "could", jp: "…できたら; …できるだろうに", part: "auxiliary verb" }, { en: "wing", jp: "(鳥・飛行機の)翼", part: "noun" },
        { en: "line", jp: "列に並べる", part: "verb" }, { en: "up", jp: "まとめて、まとまるように", part: "adverb" },
        { en: "line up", jp: "整列させる、並べる", part: "phrase" }, { en: "neatly", jp: "きちんと、小ぎれいに", part: "adverb" },
        { en: "footprint", jp: "足跡", part: "noun" }, { en: "sticker", jp: "ステッカー、シール", part: "noun" },
        { en: "encourage ... to ~", jp: "…を~するよう励ます", part: "phrase" }, { en: "healthy", jp: "健康によい; 健全な", part: "adjective" },
        { en: "instead of ...", jp: "…のかわりに", part: "phrase" }, { en: "escalator", jp: "エスカレーター", part: "noun" },
        { en: "so", jp: "[目的を表して]…するために", part: "conjunction" }, { en: "that", jp: "…するために、…する[できる]ように", part: "conjunction" },
        { en: "so that ...", jp: "…するために", part: "phrase" }, { en: "score", jp: "得点、点数", part: "noun" },
        { en: "nervous", jp: "心配して、不安で", part: "adjective" }, { en: "past", jp: "過去", part: "noun" },
        { en: "truth", jp: "真実、事実", part: "noun" }, { en: "period", jp: "時代", part: "noun" },
        { en: "Mars", jp: "火星", part: "noun" }, { en: "grandchild", jp: "孫", part: "noun" },
        { en: "grandchildren", jp: "grandchild(孫)の複数形", part: "noun" }, { en: "street", jp: "[Streetの表記で]…通り、…街", part: "noun" },
        { en: "satisfy", jp: "満足させる、満たす", part: "verb" }, { en: "litter", jp: "ごみくず、がらくた", part: "noun" },
        { en: "law", jp: "法、法律", part: "noun" }, { en: "(1960)s", jp: "(1960)年代", part: "noun" },
        { en: "control", jp: "支配する、統制する", part: "verb" }, { en: "limit", jp: "制限する", part: "verb" },
        { en: "black", jp: "黒人の", part: "adjective" }, { en: "America", jp: "アメリカ(合衆国)、(南・北)アメリカ大陸", part: "noun" },
        { en: "were", jp: "(…に)いた; (…に)あった", part: "verb" },
        { en: "restroom", jp: "(デパート・劇場などの)洗面所、トイレ", part: "noun" }, { en: "drinking fountain", jp: "噴水式の水飲み器", part: "noun" },
        { en: "Rosa Parks", jp: "ローザ・パークス", part: "noun" }, { en: "public", jp: "公共の、公の", part: "adjective" },
        { en: "Montgomery", jp: "モントゴメリー", part: "noun" }, { en: "Alabama", jp: "アラバマ", part: "noun" },
        { en: "boycott", jp: "ボイコット", part: "noun" }, { en: "arrest", jp: "逮捕", part: "noun" },
        { en: "upset", jp: "動転させる、うろたえさせる; 心配させる", part: "verb" }, { en: "leader", jp: "指導者、リーダー", part: "noun" },
        { en: "civil", jp: "市民の、公民の", part: "adjective" }, { en: "right", jp: "(正当な)権利", part: "noun" },
        { en: "civil rights", jp: "公民権", part: "noun" }, { en: "stand", jp: "耐える、がまんする", part: "verb" },
        { en: "take", jp: "(人が席・地位などに)つく", part: "verb" }, { en: "be free to ...", jp: "自由に…することができる", part: "phrase" },
        { en: "anywhere", jp: "[肯定文で用いて]どこに[へ]でも", part: "adverb" }, { en: "success", jp: "成功", part: "noun" },
        { en: "beginning", jp: "初め、最初; 始まり", part: "noun" }, { en: "courage", jp: "勇気", part: "noun" },
        { en: "movement", jp: "(社会的・宗教的)運動", part: "noun" }, { en: "March on Washington", jp: "ワシントン大行進", part: "noun" },
        { en: "Dr.", jp: "…博士; (医者の名前につけて)…先生", part: "noun" }, { en: "great", jp: "偉大な、きわめてすぐれた; 重要な", part: "adjective" },
        { en: "speech", jp: "演説、スピーチ", part: "noun" }, { en: "make a speech", jp: "演説をする", part: "phrase" },
        { en: "step", jp: "(階段・はしごの)(踏み)段; (ふつう屋外の)階段", part: "noun" }, { en: "Lincoln Memorial", jp: "リンカーン記念館", part: "noun" },
        { en: "head", jp: "[…の方向に]向かう", part: "verb" }, { en: "white", jp: "白人", part: "noun" },
        { en: "Whites Only", jp: "白人専用", part: "noun" }, { en: "section", jp: "(切って分けられた)部分; 区域", part: "noun" },
        { en: "fill", jp: "いっぱいにする; いっぱいになる", part: "verb" }, { en: "fill up", jp: "いっぱいに満ちる", part: "phrase" },
        { en: "white", jp: "白色人種の", part: "adjective" }, { en: "Mrs.", jp: "…夫人、…さん; …先生", part: "noun" },
        { en: "give up ...", jp: "…を手放す", part: "phrase" }, { en: "or", jp: "[命令文などのあとで用いて]さもないと", part: "conjunction" },
        { en: "call", jp: "電話をかける", part: "verb" }, { en: "refuse", jp: "断る、拒否する", part: "verb" },
        { en: "arrest", jp: "逮捕する", part: "verb" }, { en: "that", jp: "…という", part: "conjunction" },
        { en: "child", jp: "(親に対して)子、子ども", part: "noun" }, { en: "nation", jp: "国家、国", part: "noun" },
        { en: "where", jp: "[A where B ... の形で] Bが…する(ところの)A", part: "adverb" },
        { en: "not ... but ~", jp: "…ではなく~", part: "phrase" },
        { en: "judge", jp: "(物のよしあしを)判断する", part: "verb" }, { en: "by", jp: "…に従って、…によって", part: "preposition" },
        { en: "skin", jp: "皮膚、肌", part: "noun" }, { en: "content", jp: "中身、内容", part: "noun" },
        { en: "character", jp: "(人の)性格", part: "noun" }, { en: "join", jp: "つなぐ; 合わせる", part: "verb" },
        { en: "join hands with ...", jp: "…と手を取り合う", part: "phrase" }, { en: "Nobel Peace Prize", jp: "ノーベル平和賞", part: "noun" }
    ]
};

const lesson8 = {
    unit: "Lesson 8",
    pages: "P99〜114",
    words: [
        { en: "prize", jp: "賞(品)、景品", part: "noun" }, { en: "accept", jp: "受け入れる", part: "verb" },
        { en: "academy", jp: "学院、専門学校", part: "noun" }, { en: "bit", jp: "少し、少量", part: "noun" },
        { en: "a bit", jp: "少し、ちょっと", part: "phrase" }, { en: "talented", jp: "才能のある", part: "adjective" },
        { en: "up", jp: "の方へ; …へ、…に近づいて", part: "adverb" }, { en: "keep up with ...", jp: "…について行く", part: "phrase" },
        { en: "compare", jp: "比較する、比べる", part: "verb" }, { en: "besides", jp: "さらに; その上", part: "adverb" },
        { en: "such", jp: "そんなに[こんなに]", part: "adjective" }, { en: "textbook", jp: "教科書", part: "noun" },
        { en: "research", jp: "研究; 調査、探究", part: "noun" }, { en: "deepen", jp: "深くする、深める", part: "verb" },
        { en: "connection", jp: "[…との; …の間の]関係、つながり", part: "noun" }, { en: "with", jp: "…と(くっついて)", part: "preposition" },
        { en: "figure", jp: "思う", part: "verb" }, { en: "figure out", jp: "理解する", part: "phrase" },
        { en: "motivate", jp: "やる気を起こさせる、動機づける", part: "verb" }, { en: "motivate ... to ~", jp: "…をかり立てて~させる", part: "phrase" },
        { en: "best", jp: "[the bestで]最善(のもの)", part: "noun" }, { en: "do one's best", jp: "全力を尽くす", part: "phrase" },
        { en: "biomimetics", jp: "生体模倣技術", part: "noun" }, { en: "following", jp: "次の、次に続く", part: "adjective" },
        { en: "clarify", jp: "明らかにする、解明する", part: "verb" }, { en: "method", jp: "(体系的・科学的)方法、方式", part: "noun" },
        { en: "biomimetic", jp: "生体模倣技術を使った", part: "adjective" }, { en: "fastener", jp: "留めるもの、留め金", part: "noun" },
        { en: "hook-and-loop fastener", jp: "面ファスナー", part: "noun" }, { en: "wallet", jp: "さいふ、札入れ", part: "noun" },
        { en: "Swiss", jp: "スイスの; スイス人の", part: "adjective" }, { en: "engineer", jp: "技師、エンジニア", part: "noun" },
        { en: "while", jp: "…する[している]間に", part: "conjunction" }, { en: "through", jp: "(穴・物の内部・場所)を通り抜けて、…を通って", part: "preposition" },
        { en: "wood", jp: "[しばしば複数形のwoodsで]小さな森、林", part: "noun" }, { en: "bur", jp: "(植物の)イガ", part: "noun" },
        { en: "stick", jp: "くっつく", part: "verb" }, { en: "to", jp: "…に; [付加]…(の上)に", part: "preposition" },
        { en: "clothing", jp: "[集合的に用いて]衣類、衣料品、衣服", part: "noun" }, { en: "fur", jp: "柔らかい毛", part: "noun" },
        { en: "closely", jp: "綿密に、注意して、接近して", part: "adverb" }, { en: "hook", jp: "(物をつり下げる)かぎ、留め金", part: "noun" },
        { en: "onto", jp: "…の上に[へ]", part: "preposition" }, { en: "loop", jp: "輪; 環状の物", part: "noun" },
        { en: "go", jp: "動く、移動する", part: "verb" }, { en: "tunnel", jp: "トンネル", part: "noun" },
        { en: "annoy", jp: "いらいらさせる、うるさがらせる、むっとさせる", part: "verb" }, { en: "kingfisher", jp: "カワセミ", part: "noun" },
        { en: "pointy", jp: "先の「とがった", part: "adjective" }, { en: "beak", jp: "くちばし", part: "noun" },
        { en: "of", jp: "…から(出た); …の理由で、…のために", part: "preposition" }, { en: "because of ...", jp: "…のために", part: "phrase" },
        { en: "dive", jp: "飛び込む、(飛行機・鳥などが)急降下する", part: "verb" }, { en: "smoothly", jp: "なめらかに; 円滑に", part: "adverb" },
        { en: "water", jp: "[the waterで](空や陸に対して)水(圏); 水中; 水面", part: "noun" }, { en: "much", jp: "多量、たくさん", part: "pronoun" },
        { en: "splash", jp: "(水・泥などの)はね、水しぶき", part: "noun" },
        { en: "test", jp: "実験する、試す", part: "verb" }, { en: "imitate", jp: "まねる、模造する", part: "verb" },
        { en: "lower", jp: "下げる; 減らす; 下がる; 減る", part: "verb" }, { en: "now", jp: "今、現在", part: "noun" },
        { en: "non-governmental", jp: "政府の関係しない、民間の", part: "adjective" }, { en: "organization", jp: "組織、団体", part: "noun" },
        { en: "NGO", jp: "非政府組織", part: "noun" }, { en: "serious", jp: "重大な; (病状など)重い", part: "adjective" },
        { en: "communicate", jp: "(意思・考え・情報などを)伝達する、知らせる", part: "verb" }, { en: "medical", jp: "医学の、医療の", part: "adjective" },
        { en: "treatment", jp: "治療、手当", part: "noun" }, { en: "patient", jp: "患者、病人", part: "noun" },
        { en: "challenging", jp: "困難だけどやりがいのある; 挑戦的な", part: "adjective" }, { en: "clearly", jp: "はっきりと、明確に", part: "adverb" },
        { en: "understanding", jp: "理解、理解し合うこと", part: "noun" },
        { en: "work", jp: "作品", part: "noun" }, { en: "nod", jp: "うなずく、会釈する", part: "verb" },
        { en: "recently", jp: "近ごろ、最近", part: "adverb" }, { en: "deeply", jp: "深く", part: "adverb" },
        { en: "expect", jp: "予期する、予想する", part: "verb" }, { en: "e-mail", jp: "Eメール", part: "noun" },
        { en: "Amir", jp: "アミール", part: "noun" }, { en: "beauty", jp: "美、美しさ", part: "noun" },
        { en: "taste", jp: "味; 味覚", part: "noun" }, { en: "Dubai", jp: "ドバイ", part: "noun" },
        { en: "offer", jp: "申し出、提案", part: "noun" }
    ]
};

const reading3 = {
    unit: "Reading Lesson 3",
    pages: "P130〜136",
    words: [
        { en: "including", jp: "…を含めて", part: "preposition" }, { en: "Leonardo da Vinci", jp: "レオナルド・ダ・ビンチ", part: "noun" },
        { en: "observe", jp: "観察する", part: "verb" }, { en: "flying", jp: "飛行(用)の", part: "adjective" },
        { en: "mimic", jp: "まねをする", part: "verb" }, { en: "inspire", jp: "奮い立たせる、霊感[インスピレーション]を与える", part: "verb" },
        { en: "instance", jp: "例、実例", part: "noun" }, { en: "academic", jp: "学問の、学問的な", part: "adjective" },
        { en: "field", jp: "分野", part: "noun" }, { en: "speed", jp: "速度、速力、スピード", part: "noun" },
        { en: "pressure", jp: "圧力", part: "noun" }, { en: "inside", jp: "…の内側に; …の内部に[を]", part: "preposition" },
        { en: "grow", jp: "増大[増加、発展]する", part: "verb" }, { en: "increase", jp: "増やす; 増える、増加する", part: "verb" },
        { en: "slow", jp: "速度を落とす", part: "verb" }, { en: "down", jp: "(数量・程度・質などが)下がって、減って", part: "adverb" },
        { en: "slow down", jp: "速度を落とす", part: "phrase" }, { en: "before", jp: "…する前に", part: "conjunction" },
        { en: "travel", jp: "旅行、移動", part: "noun" }, { en: "himself", jp: "彼自身を[に]; 自分を[に]", part: "pronoun" },
        { en: "say to oneself", jp: "ひとりごとを言う", part: "phrase" }, { en: "manage", jp: "何とかうまく…する; どうにかやっていく", part: "verb" },
        { en: "sudden", jp: "突然の、急の", part: "adjective" }, { en: "save", jp: "節約する、使わないようにする", part: "verb" },
        { en: "energy", jp: "エネルギー", part: "noun" }, { en: "due", jp: "[due to ... の形で用いて]…が原因で、…のために[に]", part: "adjective" },
        { en: "due to ...", jp: "…のために", part: "phrase" }, { en: "produce", jp: "引き起こす、もたらす", part: "verb" },
        { en: "nearby", jp: "近くに、近くで", part: "adverb" }, { en: "traveler", jp: "旅行者", part: "noun" },
        { en: "living", jp: "生きている", part: "adjective" }, { en: "evolve", jp: "進化させる; 進化する", part: "verb" },
        { en: "develop", jp: "発達[発育、発展]させる; 発達[発育、発展]する", part: "verb" },
        { en: "specific", jp: "特定の", part: "adjective" }, { en: "adaptation", jp: "適応、順応", part: "noun" },
        { en: "seed", jp: "(野菜・花などの小さな)種", part: "noun" }, { en: "human", jp: "人間", part: "noun" },
        { en: "engineering", jp: "工学", part: "noun" }, { en: "wisdom", jp: "(長年の経験に基づく)賢明(さ)、知恵", part: "noun" },
        { en: "broaden", jp: "広げる", part: "verb" }
    ]
};

const project3 = {
    unit: "Project 3",
    pages: "P106〜107",
    words: [
        { en: "exchange", jp: "交換する、やり取りする", part: "verb" }, { en: "chat", jp: "雑談、おしゃべり; [コンピュータ用語で]チャット", part: "noun" },
        { en: "little", jp: "[a littleで]少しの", part: "adjective" }, { en: "Arabic", jp: "アラビア語", part: "noun" },
        { en: "business", jp: "商売、ビジネス、会社", part: "noun" }, { en: "international", jp: "国際的な", part: "adjective" },
        { en: "door", jp: "[…への]門戸、道; 方法", part: "noun" }, { en: "unexpected", jp: "予期しない、思いがけない、意外な", part: "adjective" },
        { en: "yearly", jp: "年1回の、毎年の", part: "adjective" }, { en: "weekday", jp: "平日", part: "noun" },
        { en: "guess", jp: "(…と)思う", part: "verb" }, { en: "with", jp: "…を伴って", part: "preposition" },
        { en: "care", jp: "注意、用心、心遣い", part: "noun" }, { en: "attention", jp: "注意; 関心; 配慮", part: "noun" },
        { en: "architecture", jp: "建築学", part: "noun" }, { en: "stressed", jp: "とても不安[心配]な、ストレスのたまった", part: "adjective" },
        { en: "K-pop", jp: "韓国のポピュラー音楽(の)", part: "noun" }, { en: "through", jp: "(状態・過程)を経験して、…を経て", part: "preposition" },
        { en: "get through", jp: "乗り切る", part: "phrase" }, { en: "star", jp: "(映画・スポーツなどの)スター、人気者", part: "noun" },
        { en: "upload", jp: "(プログラム・データなどを)アップロードする", part: "verb" }, { en: "post", jp: "(ウェブ上の)投稿", part: "noun" },
        { en: "message", jp: "伝言、ことづて", part: "noun" }, { en: "Korean", jp: "韓国語", part: "noun" },
        { en: "beforehand", jp: "前もって、あらかじめ", part: "adverb" }
    ]
};

// === UPDATE LOGIC ===

const g3 = getSection(content, '3');
if (!g3) { console.error("No Grade 3 section"); process.exit(1); }

function parseLessons(text) {
    const lessons = [];
    let balance = 0;
    let buffer = '';
    let inLesson = false;
    for (const line of text.split('\n')) {
        const clean = line.replace(/\/\/.*$/, ''); // ignore comments
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
const map = {};
// Preserve existing lessons
existingLessons.forEach(l => {
    let name = "Unknown";
    const m = l.match(/"unit": "([^"]+)"/);
    if (m) name = m[1];
    map[name] = l;
});

// Update with new data (stringify to be safe)
[lesson2, lesson3, project1, reading1, lesson6, project2, reading2, lesson7, lesson8, reading3, project3].forEach(u => {
    // Generate JSON string manually using JSON.stringify for values
    const unitStr = `
            {
                "unit": "${u.unit}",
                "pages": "${u.pages}",
                "words": [
${u.words.map(w => `                    { "en": ${JSON.stringify(w.en)}, "jp": ${JSON.stringify(w.jp)}, "part": ${JSON.stringify(w.part)} }`).join(',\n')}
                ]
            }`;
    map[u.unit] = unitStr;
});

// Order
const order = [
    "Lesson 1", "Lesson 2", "Lesson 3", "Project 1", "Reading Lesson 1",
    "Lesson 4", "Lesson 5", "Lesson 6", "Project 2", "Reading Lesson 2",
    "Lesson 7", "Lesson 8", "Project 3", "Reading Lesson 3"
];

const finalBodyList = [];
order.forEach(k => {
    if (map[k]) finalBodyList.push(map[k].trim());
});

// Add any extras
for (const k in map) {
    if (!order.includes(k)) {
        console.log("Preserving extra:", k);
        finalBodyList.push(map[k].trim());
    }
}

const newG3Body = "\n" + finalBodyList.join(",\n") + "\n";
const finalContent = content.substring(0, g3.start + 1) + newG3Body + content.substring(g3.end);

fs.writeFileSync(filePath, finalContent);
console.log("Updated Grade 3 with all new lessons.");
