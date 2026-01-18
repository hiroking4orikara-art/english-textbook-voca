const fs = require('fs');
const path = require('path');

const targetFile = path.join(__dirname, 'data.js');

// --- Unit 1 ---
const u1_words = [
    { en: "about", jp: "～について(の)", part: "preposition" },
    { en: "all", jp: "全て、みんな", part: "noun" },
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
    { en: "not ... very much", jp: "そんなに～でない", part: "phrase" },
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

// --- Unit 2 ---
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
    { en: "little", jp: "[a littleで]少しは", part: "adjective" },
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

// --- Unit 3 ---
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
    { en: "have", jp: "～を受ける；～を行う、～をする", part: "verb" },
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

// --- Unit 4 ---
const u4_words = [
    // Unit 4 (1)
    { en: "actor", jp: "俳優", part: "noun" },
    { en: "art", jp: "[教科の]美術、芸術", part: "noun" },
    { en: "ask", jp: "(人)にたずねる、～に質問する", part: "verb" },
    { en: "character", jp: "登場人物、キャラクター", part: "noun" },
    { en: "famous", jp: "有名な", part: "adjective" },
    { en: "funny", jp: "おかしい、おもしろい", part: "adjective" },
    { en: "he", jp: "彼は、彼が", part: "pronoun" },
    { en: "her", jp: "彼女の", part: "adjective" },
    { en: "he's", jp: "he is の短縮形", part: "phrase" },
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
    { en: "science", jp: "理科、科学", part: "noun" },
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
    { en: "Let's ~.", jp: "～しよう。", part: "phrase" },

    // Unit 4 (2)
    { en: "be good at", jp: "～が上手だ、うまい", part: "phrase" },
    { en: "building", jp: "建物", part: "noun" },
    { en: "classmate", jp: "同級生", part: "noun" },
    { en: "classroom", jp: "教室", part: "noun" },
    { en: "floor", jp: "(建物の個々の)階", part: "noun" },
    { en: "guess", jp: "推測する、言い当てる", part: "verb" },
    { en: "gym", jp: "体育館、ジム", part: "noun" },
    { en: "hospital", jp: "病院", part: "noun" },
    { en: "in front of", jp: "～の前に[で・の]", part: "phrase" },
    { en: "introduce", jp: "～を紹介する", part: "verb" },
    { en: "neighbor", jp: "近所の人、隣人", part: "noun" },
    { en: "over here", jp: "こちらに", part: "phrase" },
    { en: "restaurant", jp: "レストラン", part: "noun" },
    { en: "small", jp: "小さい", part: "adjective" },
    { en: "bag", jp: "かばん、バッグ", part: "noun" },
    { en: "chair", jp: "椅子", part: "noun" },
    { en: "desk", jp: "机", part: "noun" },
    { en: "mine", jp: "私のもの", part: "pronoun" },
    { en: "under", jp: "～の(真)下に", part: "preposition" },
    { en: "whose", jp: "誰の、誰のもの", part: "pronoun" },
    { en: "yours", jp: "あなた(たち)のもの", part: "pronoun" },

    // Active Grammar 2 / Daily Life Scene 1
    { en: "hers", jp: "彼女のもの", part: "pronoun" },
    { en: "its", jp: "その、それの", part: "pronoun" }, // Image: "その、それの" (possessive adj, not pronoun usually, but listed here)
    { en: "ours", jp: "私たちのもの", part: "pronoun" },
    { en: "their", jp: "彼[彼女、それ]らの", part: "adjective" },
    { en: "theirs", jp: "彼[彼女、それ]らのもの", part: "pronoun" },
    { en: "them", jp: "彼[彼女、それ]らを[に]", part: "pronoun" },
    { en: "these", jp: "[this の複数形]これら", part: "pronoun" },
    { en: "us", jp: "私たちを[に]", part: "pronoun" },
    { en: "any", jp: "[疑]いくつかの、何らかの", part: "adjective" }
];

// --- Unit 5 ---
const u5_words = [
    // Unit 5 (1)
    { en: "after school", jp: "放課後(に)", part: "phrase" },
    { en: "anything", jp: "何でも", part: "pronoun" },
    { en: "begin", jp: "(～を)始める", part: "verb" },
    { en: "call", jp: "電話(をかけること)、通話", part: "noun" },
    { en: "camera", jp: "カメラ", part: "noun" },
    { en: "choose", jp: "～を選ぶ", part: "verb" },
    { en: "cooking", jp: "料理(用の)", part: "noun" },
    { en: "dish", jp: "料理、食べ物", part: "noun" },
    { en: "face", jp: "顔", part: "noun" },
    { en: "front", jp: "前の、表の、正面の", part: "adjective" },
    { en: "have", jp: "～を食べる、～を飲む", part: "verb" },
    { en: "know", jp: "(～を)知る、わかっている", part: "verb" },
    { en: "life", jp: "生活", part: "noun" },
    { en: "lunch", jp: "昼食、ランチ", part: "noun" },
    { en: "near", jp: "～の近くに", part: "preposition" },
    { en: "next to", jp: "～の隣に[の]", part: "phrase" },
    { en: "now", jp: "今(では)、現在(では)", part: "adverb" },
    { en: "nurse", jp: "看護師", part: "noun" },
    { en: "nurse's office", jp: "保健室", part: "noun" },
    { en: "pizza", jp: "ピザ", part: "noun" },
    { en: "room", jp: "部屋、～室", part: "noun" },
    { en: "see", jp: "～に会う、～が見える", part: "verb" },
    { en: "shy", jp: "恥ずかしがりの、人見知りの", part: "adjective" },
    { en: "turn on", jp: "～(明かりなど)をつける", part: "phrase" },
    { en: "where", jp: "どこで[に、へ]", part: "adverb" },
    { en: "Good to see you.", jp: "お会いできてうれしいです。", part: "phrase" },
    { en: "Sorry.", jp: "ごめんなさい。すみません。", part: "phrase" },
    { en: "Sure.", jp: "いいですよ。もちろん。", part: "phrase" },

    // Unit 5 (2)
    { en: "after that", jp: "その後", part: "phrase" },
    { en: "afternoon", jp: "午後", part: "noun" },
    { en: "at noon", jp: "正午に", part: "phrase" },
    { en: "before", jp: "～の前に", part: "preposition" },
    { en: "dinner", jp: "夕食、ディナー", part: "noun" },
    { en: "evening", jp: "夕方、夕暮れ、晩", part: "noun" },
    { en: "from ... to ~", jp: "…から～まで", part: "phrase" },
    { en: "go to bed", jp: "寝る、就寝する", part: "phrase" },
    { en: "match", jp: "試合", part: "noun" },
    { en: "miss", jp: "～を逃す、～を見落とす", part: "verb" },
    { en: "morning", jp: "朝、午前(中)", part: "noun" },
    { en: "photo", jp: "写真", part: "noun" },
    { en: "p.m.", jp: "午後", part: "adverb" },
    { en: "show", jp: "～を見せる", part: "verb" },
    { en: "some", jp: "[肯定文で]いくらかの、多少の", part: "adjective" },
    { en: "Sunday", jp: "日曜日", part: "noun" },
    { en: "take a bath", jp: "風呂に入る", part: "phrase" },
    { en: "tennis", jp: "テニス", part: "noun" },
    { en: "wheelchair", jp: "車いす", part: "noun" },
    { en: "write in one's diary", jp: "日記をつける", part: "phrase" },
    { en: "Good luck!", jp: "成功を祈ります。", part: "phrase" },

    // Daily Life Scene 2
    { en: "chicken", jp: "とり肉", part: "noun" },
    { en: "in total", jp: "全体で", part: "phrase" },
    { en: "piece", jp: "1つ、1切れ、1枚", part: "noun" },
    { en: "please", jp: "どうか、どうぞ", part: "adverb" },
    { en: "tea", jp: "お茶、紅茶", part: "noun" },
    { en: "thousand", jp: "1,000(の)", part: "noun" },
    { en: "vegetable", jp: "野菜", part: "noun" },
    { en: "which", jp: "どちら、どれ", part: "pronoun" }
];

// --- Unit 6 ---
const u6_words = [
    // Unit 6 (1)
    { en: "a lot of", jp: "たくさんの～", part: "phrase" },
    { en: "active", jp: "活発な、元気な", part: "adjective" },
    { en: "aunt", jp: "おば", part: "noun" },
    { en: "breakfast", jp: "朝食", part: "noun" },
    { en: "brother", jp: "兄、弟、兄弟", part: "noun" },
    { en: "cheer", jp: "元気づく", part: "verb" },
    { en: "child", jp: "(親に対して)子", part: "noun" },
    { en: "children", jp: "child の複数形", part: "noun" },
    { en: "cook", jp: "(～を)料理する、～を作る", part: "verb" },
    { en: "cousin", jp: "いとこ", part: "noun" },
    { en: "dad", jp: "お父さん、パパ", part: "noun" },
    { en: "give", jp: "屈する", part: "verb" },
    { en: "give up", jp: "あきらめる", part: "phrase" },
    { en: "grandma", jp: "おばあちゃん", part: "noun" },
    { en: "grandmother", jp: "祖母", part: "noun" },
    { en: "grandpa", jp: "おじいちゃん", part: "noun" },
    { en: "has", jp: "have の3人称単数現在形", part: "verb" },
    { en: "mom", jp: "お母さん、ママ", part: "noun" },
    { en: "mother", jp: "母親", part: "noun" },
    { en: "omelet", jp: "オムレツ", part: "noun" },
    { en: "parent", jp: "親、[~sで]両親", part: "noun" },
    { en: "quiet", jp: "静かな", part: "adjective" },
    { en: "sister", jp: "姉、妹、姉妹", part: "noun" },
    { en: "these", jp: "これらの", part: "adjective" },
    { en: "these days", jp: "このごろ、最近", part: "phrase" },
    { en: "uncle", jp: "おじ", part: "noun" },
    { en: "Cheer up.", jp: "元気を出して。", part: "phrase" },

    // Unit 6 (2)
    { en: "a little bit", jp: "ほんの少し、ちょっと", part: "phrase" },
    { en: "almost", jp: "ほとんど、もう少しで", part: "adverb" },
    { en: "and", jp: "それから、そして、だから", part: "conjunction" },
    { en: "at home", jp: "家で[に]", part: "phrase" },
    { en: "bicycle", jp: "自転車", part: "noun" },
    { en: "clear", jp: "～を片づける、～をきれいにする", part: "verb" },
    { en: "dish", jp: "皿、[the ~esで]食器類", part: "noun" },
    { en: "either", jp: "[... not ~ either で]…もまた～しない[でない]", part: "adverb" },
    { en: "effort", jp: "努力、労力", part: "noun" },
    { en: "go to school", jp: "学校に行く、通学する", part: "phrase" },
    { en: "have", jp: "(友人・親類などが)いる、～を(ペットとして)飼う", part: "verb" },
    { en: "have a cold", jp: "風邪をひいている", part: "phrase" },
    { en: "help", jp: "(～を)助ける[手伝う]", part: "verb" },
    { en: "home", jp: "家、自宅", part: "noun" },
    { en: "in bed", jp: "(ベッドで)寝ている", part: "phrase" },
    { en: "little", jp: "[a little ~ で]少しの～", part: "adjective" },
    { en: "lot", jp: "[a lot で]よく、大いに", part: "adverb" },
    { en: "need", jp: "～を必要とする", part: "verb" },
    { en: "play", jp: "遊ぶ", part: "verb" },
    { en: "rest", jp: "休息、休憩", part: "noun" },
    { en: "set", jp: "(食卓の)準備をする", part: "verb" },
    { en: "sleep", jp: "眠る", part: "verb" },
    { en: "station", jp: "駅", part: "noun" },
    { en: "sure", jp: "(～を)確信して、確かで", part: "adjective" },
    { en: "table", jp: "テーブル", part: "noun" },
    { en: "take", jp: "～を持って行く", part: "verb" },
    { en: "take a lesson", jp: "授業を受ける", part: "phrase" },
    { en: "take out", jp: "～を出す、～を取り出す", part: "phrase" },
    { en: "train", jp: "列車、電車", part: "noun" },
    { en: "wash", jp: "～を洗う", part: "verb" },
    { en: "well", jp: "よく、十分に、しっかり", part: "adverb" },
    { en: "work hard", jp: "懸命に働く[勉強する]", part: "phrase" },
    { en: "worry", jp: "心配する、気にする", part: "verb" },
    { en: "All right.", jp: "よろしい。はい。結構です。", part: "phrase" },
    { en: "Don't worry.", jp: "心配しないでください。", part: "phrase" },
    { en: "I don't know.", jp: "わかりません。", part: "phrase" }
];

// --- Daily Life Scene 3 / You Can Do It! 2 ---
const dls3_words = [
    { en: "bus", jp: "バス", part: "noun" },
    { en: "bye", jp: "ではまた、じゃあね", part: "interjection" },
    { en: "help", jp: "助け、援助、救助", part: "noun" },
    { en: "let", jp: "～させる", part: "verb" },
    { en: "No.=number", jp: "番号、～番", part: "noun" },
    { en: "o'clock", jp: "～時", part: "adverb" },
    { en: "so", jp: "それで、だから", part: "conjunction" },
    { en: "trip", jp: "旅行", part: "noun" },
    { en: "which", jp: "どちらの、どの", part: "adjective" },
    { en: "Excuse me.", jp: "すみません。", part: "phrase" },
    { en: "Have a nice trip!", jp: "よい旅を。", part: "phrase" },
    { en: "Let me see.", jp: "ええっと。", part: "phrase" },
    { en: "What time ...?", jp: "何時に～ですか。", part: "phrase" },
    { en: "You're welcome.", jp: "どういたしまして。", part: "phrase" },

    // Daily Life Scene 4 (Right side of p.94)
    { en: "along", jp: "～に沿って、～を通って", part: "preposition" },
    { en: "corner", jp: "(道の)曲がり角", part: "noun" },
    { en: "get to", jp: "～に着く", part: "phrase" },
    { en: "here", jp: "ここ", part: "noun" },
    { en: "how", jp: "どのようにして", part: "adverb" },
    { en: "left", jp: "左", part: "noun" },
    { en: "long", jp: "(時間・物・距離が)長い", part: "adjective" },
    { en: "museum", jp: "博物館", part: "noun" },
    { en: "on foot", jp: "徒歩で", part: "phrase" },
    { en: "right", jp: "右へ[に]", part: "adverb" },
    { en: "straight", jp: "まっすぐに、一直線に", part: "adverb" },
    { en: "street", jp: "通り", part: "noun" },
    { en: "take", jp: "(乗り物)に乗って行く、(時間・労力など)～がかかる", part: "verb" },
    { en: "turn", jp: "曲がる", part: "verb" },
    { en: "How ...?", jp: "どのように～ですか。", part: "phrase" }, // How ~?

    // You Can Do It! 2
    { en: "appear", jp: "現れる、(～に)出る", part: "verb" },
    { en: "as", jp: "～として", part: "preposition" },
    { en: "guest", jp: "招待客、ゲスト", part: "noun" },
    { en: "special", jp: "特別な[の]", part: "adjective" },
    { en: "talk", jp: "話す、しゃべる", part: "verb" },
    { en: "today", jp: "今日(は)", part: "adverb" }, // noun/adverb
    { en: "welcome", jp: "～を歓迎する、～を出迎える", part: "verb" }
];

// --- Unit 7 ---
const u7_words = [
    // Unit 7 (1)
    { en: "ate", jp: "eat の過去形", part: "verb" },
    { en: "bought", jp: "buy の過去形", part: "verb" },
    { en: "buy", jp: "～を買う", part: "verb" },
    { en: "by the way", jp: "ところで", part: "phrase" },
    { en: "clean", jp: "～をきれいにする[掃除する]", part: "verb" },
    { en: "clean up", jp: "～を掃除する", part: "phrase" },
    { en: "drink", jp: "～を飲む", part: "verb" },
    { en: "fly", jp: "～を飛ばす、(たこなど)を揚げる", part: "verb" },
    { en: "house", jp: "家", part: "noun" },
    { en: "interesting", jp: "興味を引き起こす、おもしろい", part: "adjective" },
    { en: "Japanese", jp: "日本(の)、日本人(の)", part: "adjective" },
    { en: "poor", jp: "哀れな、かわいそうな", part: "adjective" },
    { en: "saw", jp: "see の過去形", part: "verb" },
    { en: "shopping", jp: "買い物、ショッピング", part: "noun" },
    { en: "show", jp: "(テレビ・ラジオなどの)番組", part: "noun" },
    { en: "sign", jp: "しるし、前兆", part: "noun" },
    { en: "stay", jp: "～の(状態の)ままでいる", part: "verb" },
    { en: "stay up", jp: "(寝ないで)起きている", part: "phrase" },
    { en: "take part in", jp: "～に参加する", part: "phrase" },
    { en: "tell", jp: "(人)に話す、～を伝える", part: "verb" },
    { en: "temple", jp: "寺、寺院", part: "noun" },
    { en: "told", jp: "tell の過去形", part: "verb" },
    { en: "took", jp: "take の過去形", part: "verb" },
    { en: "traditional", jp: "伝統的な", part: "adjective" },
    { en: "TV", jp: "テレビ", part: "noun" },
    { en: "volunteer", jp: "ボランティア", part: "noun" },
    { en: "yesterday", jp: "昨日(は)", part: "adverb" },
    { en: "Happy New Year.", jp: "新年おめでとう。", part: "phrase" },
    { en: "How ...!", jp: "なんて～だ。", part: "phrase" },
    { en: "How are you doing?", jp: "調子はどうですか。お元気ですか。", part: "phrase" },
    { en: "That's too bad.", jp: "残念です。気の毒に。", part: "phrase" },
    { en: "Why ...?", jp: "なぜ～なのですか。", part: "phrase" },
    { en: "Because ...", jp: "…だからです。", part: "conjunction" },

    // Unit 7 (2)
    { en: "boat", jp: "ボート", part: "noun" },
    { en: "celebrate", jp: "～を祝う", part: "verb" },
    { en: "city", jp: "都市、市、(大きな)町", part: "noun" },
    { en: "dear", jp: "[手紙などで]～様、親愛なる～", part: "adjective" },
    { en: "delicious", jp: "とてもおいしい", part: "adjective" },
    { en: "different", jp: "いろいろな", part: "adjective" },
    { en: "exciting", jp: "胸をわくわくさせる", part: "adjective" },
    { en: "for the first time", jp: "初めて", part: "phrase" },
    { en: "get well", jp: "元気になる", part: "phrase" },
    { en: "had", jp: "have の過去形", part: "verb" },
    { en: "have a fever", jp: "(高)熱がある", part: "phrase" },
    { en: "hear", jp: "～を聞く、～が聞こえる", part: "verb" },
    { en: "hope", jp: "～を望む、～を願う", part: "verb" },
    { en: "lots of", jp: "たくさんの～", part: "phrase" },
    { en: "miss", jp: "～がいないのを寂しく思う", part: "verb" },
    { en: "party", jp: "パーティー", part: "noun" },
    { en: "people", jp: "人々", part: "noun" },
    { en: "present", jp: "贈り物、プレゼント", part: "noun" },
    { en: "soon", jp: "早く、すぐ", part: "adverb" },
    { en: "still", jp: "まだ、なお、相変わらず", part: "adverb" },
    { en: "take a photo", jp: "写真を撮る", part: "phrase" },
    { en: "this year", jp: "今年", part: "noun" },
    { en: "tradition", jp: "伝統、慣習", part: "noun" },
    { en: "were", jp: "are の過去形", part: "verb" },
    { en: "wish", jp: "願いごと、願い、望み", part: "noun" },
    { en: "wonderful", jp: "すばらしい、すてきな", part: "adjective" },
    { en: "Best wishes,", jp: "ご多幸を祈って。", part: "phrase" },
    { en: "Lucky you!", jp: "ついてるね。運がいいね。", part: "phrase" },
    { en: "Sorry to hear that.", jp: "それはお気の毒です。", part: "phrase" },
    { en: "Thank you for ...", jp: "～をありがとう(ございます)。", part: "phrase" },
    { en: "What (a) ...!", jp: "なんて～なんだ。", part: "phrase" },

    // Daily Life Scene 5
    { en: "age", jp: "年齢", part: "noun" },
    { en: "bring", jp: "～を持ってくる", part: "verb" },
    { en: "card", jp: "カード、はがき", part: "noun" },
    { en: "information", jp: "情報", part: "noun" },
    { en: "more", jp: "より多い、より多量の", part: "adjective" },
    { en: "only", jp: "ただ～だけ", part: "adverb" },
    { en: "own", jp: "自分自身の", part: "adjective" },
    { en: "person", jp: "人、人間、一個", part: "noun" },
    { en: "Saturday", jp: "土曜日", part: "noun" },
    { en: "shop", jp: "店、商店", part: "noun" },
    { en: "up to", jp: "(最高)～まで", part: "phrase" },
    { en: "yourself", jp: "あなた自身", part: "pronoun" }
];

// --- Unit 8 ---
const u8_words = [
    // Unit 8 (1)
    { en: "album", jp: "アルバム", part: "noun" },
    { en: "everything", jp: "全ての事[もの]", part: "pronoun" },
    { en: "far", jp: "遠くに、はるかに", part: "adverb" },
    { en: "fine", jp: "すばらしい、立派な", part: "adjective" },
    { en: "get ready", jp: "準備をする", part: "phrase" },
    { en: "hello", jp: "(電話で)もしもし", part: "interjection" },
    { en: "how's", jp: "how is の短縮形", part: "phrase" },
    { en: "kitchen", jp: "台所、キッチン", part: "noun" },
    { en: "later", jp: "後で、のちほど", part: "adverb" },
    { en: "message", jp: "メッセージ", part: "noun" },
    { en: "pretty", jp: "かわいい", part: "adjective" },
    { en: "put", jp: "～を置く、～を取り付ける", part: "verb" },
    { en: "put up", jp: "～を取り付ける", part: "phrase" },
    { en: "ready", jp: "準備ができた", part: "adjective" },
    { en: "stand", jp: "立つ、立っている", part: "verb" },
    { en: "welcome", jp: "ようこそ、いらっしゃい", part: "interjection" },
    { en: "we're", jp: "we are の短縮形", part: "phrase" },
    { en: "And you?", jp: "あなたはどうですか。", part: "phrase" },
    { en: "How's everything?", jp: "うまくいっていますか。調子はどうですか。", part: "phrase" },
    { en: "~, OK?", jp: "～で、いいですか。", part: "phrase" },
    { en: "See you later.", jp: "またね。さよなら。", part: "phrase" },
    { en: "So far, so good.", jp: "今のところ順調だ。", part: "phrase" },
    { en: "That's right.", jp: "そのとおりです。", part: "phrase" },

    // Unit 8 (2)
    { en: "have no idea", jp: "全然わからない", part: "phrase" },
    { en: "inside", jp: "内側に、内部に", part: "adverb" },
    { en: "last", jp: "この前の、昨～、先～", part: "adjective" },
    { en: "last night", jp: "昨夜", part: "noun" },
    { en: "late", jp: "遅れた、遅い", part: "adjective" },
    { en: "no", jp: "[否]少しの～もない", part: "adjective" },
    { en: "program", jp: "番組", part: "noun" },
    { en: "shop", jp: "買い物をする", part: "verb" },
    { en: "so much", jp: "とても、すごく、本当に", part: "phrase" },
    { en: "story", jp: "物語、筋、ストーリー", part: "noun" },
    { en: "surprise", jp: "びっくりさせること[もの]", part: "noun" },
    { en: "then", jp: "そのとき、あのとき(は)", part: "adverb" },
    { en: "tonight", jp: "今夜(は)", part: "adverb" },
    { en: "Happy Birthday.", jp: "誕生日おめでとう。", part: "phrase" },
    { en: "I'm [We're] home.", jp: "ただいま。", part: "phrase" },
    { en: "Surprise!", jp: "ほら、どうだ(驚いたでしょう)。", part: "interjection" },

    // Let's Read 2
    { en: "away", jp: "あちらへ、向こうへ", part: "adverb" },
    { en: "back", jp: "背中", part: "noun" },
    { en: "catch", jp: "～を捕まえる", part: "verb" },
    { en: "caught", jp: "catch の過去形", part: "verb" },
    { en: "chew on", jp: "～をかむ", part: "phrase" },
    { en: "climb up", jp: "よじ登る", part: "phrase" },
    { en: "cry", jp: "鳴き声", part: "noun" },
    { en: "get away", jp: "逃げ出す", part: "phrase" },
    { en: "got", jp: "get の過去形", part: "verb" },
    { en: "heard", jp: "hear の過去形", part: "verb" },
    { en: "keep", jp: "～を守る", part: "verb" },
    { en: "keep one's promise", jp: "約束を守る", part: "phrase" },
    { en: "kept", jp: "keep の過去形", part: "verb" },
    { en: "lion", jp: "ライオン", part: "noun" },
    { en: "look", jp: "～に見える", part: "verb" },
    { en: "may", jp: "～してよい", part: "auxiliary verb" },
    { en: "one day", jp: "ある日", part: "phrase" },
    { en: "someday", jp: "いつの日か", part: "adverb" },
    { en: "true", jp: "真実の、本当の", part: "adjective" },

    // You Can Do It! 3
    { en: "anyone", jp: "誰でも", part: "pronoun" },
    { en: "open", jp: "開いた、公開の", part: "adjective" },
    { en: "school lunch", jp: "学校給食", part: "noun" },
    { en: "topic", jp: "話題、トピック", part: "noun" }
];


try {
    let content = fs.readFileSync(targetFile, 'utf8');

    // Find "here_we_go"
    const hwgStartRegex = /"here_we_go":\s*\{/;
    const hwgStartMatch = hwgStartRegex.exec(content);
    if (!hwgStartMatch) throw new Error("here_we_go section not found");

    // We assume the structure: "here_we_go": { "1": [ ... ], "2": [], "3": [] }
    // We want to replace the entire "1": [ ... ] block.

    const grade1StartRegex = /"1":\s*\[/;
    const grade1SearchStr = content.substring(hwgStartMatch.index);
    const grade1MatchRelative = grade1StartRegex.exec(grade1SearchStr);

    if (!grade1MatchRelative) throw new Error("Grade 1 section in here_we_go not found");

    const grade1StartIndex = hwgStartMatch.index + grade1MatchRelative.index;

    // Find matching bracket for Grade 1
    let brace = 0;
    let inStr = false;
    let grade1EndIndex = -1;
    const openBracketIndex = grade1StartIndex + grade1MatchRelative[0].length - 1;

    for (let i = openBracketIndex; i < content.length; i++) {
        if (content[i] === '"' && content[i - 1] !== '\\') inStr = !inStr;
        if (!inStr) {
            if (content[i] === '[') brace++;
            if (content[i] === ']') brace--;
            if (brace === 0) {
                grade1EndIndex = i + 1;
                break;
            }
        }
    }

    if (grade1EndIndex === -1) throw new Error("Could not find end of Grade 1 array");

    // Construct new array
    const grade1Array = [
        { unit: "Unit 1", pages: "P26〜35", words: u1_words },
        { unit: "Unit 2", pages: "P36〜44", words: u2_words },
        { unit: "Unit 3", pages: "P46〜59", words: u3_words },
        { unit: "Unit 4", pages: "P60〜71", words: u4_words },
        { unit: "Unit 5", pages: "P72〜83", words: u5_words },
        { unit: "Unit 6", pages: "P84〜99", words: u6_words }, // Including Daily Life Scene 3? No, let's separate extended sections if requested.
        // User request: "Unit number changes" -> Group. 
        // Daily Life Scene 3 is P94. Unit 6 ends P93. Unit 7 starts P100.
        // I'll group DLS3 (P94) with Unit 6 or keep separate. 
        // In my logic above, I separated dls3_words. I'll append it to a "Review / Extra" unit or "Unit 6+"?
        // Let's call it "Daily Life Scene 3 & You Can Do It! 2" as its own unit, as it's structurally signficant.
        // But the user said "until unit number changes". 
        // If I put it in Unit 6, the pages become P84-99.
        // If I put it separate, it's clearer. I'll put it separate.
        { unit: "Daily Life Scene 3 / You Can Do It! 2", pages: "P94〜99", words: dls3_words },
        { unit: "Unit 7", pages: "P100〜113", words: u7_words },
        { unit: "Unit 8", pages: "P114〜129", words: u8_words }
    ];

    const newGrade1Json = JSON.stringify(grade1Array, null, 4);

    const newContent = content.substring(0, grade1StartIndex + grade1MatchRelative[0].length - 1) +
        newGrade1Json +
        content.substring(grade1EndIndex);

    fs.writeFileSync(targetFile, newContent);
    console.log("Successfully updated Here We Go Grade 1 (Units 1-8).");

} catch (e) {
    console.error("Error:", e);
    process.exit(1);
}
