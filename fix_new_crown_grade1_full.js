const fs = require('fs');
const path = require('path');

const targetFile = path.join(__dirname, 'data.js');

// --- Lesson 1 (P25-34) ---
// Combined from L1(1) and L1(2)
const l1_words = [
    // L1(1)
    { en: "about", jp: "(話題)について(の)、だいたい、約…、ほぼ", part: "preposition" },
    { en: "action", jp: "動き、演技、動作", part: "noun" },
    { en: "after", jp: "…のあとに[の]、…以降に", part: "preposition" },
    { en: "after school", jp: "放課後", part: "phrase" },
    { en: "am", jp: "(…で)ある", part: "verb" },
    { en: "an", jp: "1つの、1人の", part: "noun" },
    { en: "are", jp: "(…で)ある、いる", part: "verb" },
    { en: "at", jp: "[場所]…に、…で", part: "preposition" },
    { en: "at home", jp: "うちに[で]", part: "phrase" },
    { en: "at school", jp: "学校で", part: "phrase" },
    { en: "be good at ...", jp: "…が上手である", part: "phrase" },
    { en: "day", jp: "日、1日", part: "noun" },
    { en: "every", jp: "毎…、…ごとに", part: "adjective" },
    { en: "every day", jp: "毎日", part: "phrase" },
    { en: "fan", jp: "(スポーツなどの)ファン", part: "noun" },
    // L1(2)
    { en: "game", jp: "試合、競技", part: "noun" },
    { en: "have", jp: "持っている、所有している", part: "verb" },
    { en: "hi", jp: "こんにちは、やあ", part: "interjection" },
    { en: "I", jp: "私は、私が", part: "pronoun" },
    { en: "in", jp: "[状態・方法]…で", part: "preposition" },
    { en: "like", jp: "…を好む、…が好きである", part: "verb" },
    { en: "look", jp: "(注意してよく)見る", part: "verb" },
    { en: "look at ...", jp: "…を見る", part: "phrase" },
    { en: "love", jp: "愛する、大好きである", part: "verb" },
    { en: "many", jp: "多くの、たくさんの", part: "adjective" },
    { en: "me", jp: "私を、私に", part: "pronoun" },
    { en: "meet", jp: "会う、出会う", part: "verb" },
    { en: "Ms.", jp: "…さん、…先生(女性への敬称)", part: "noun" },
    { en: "not", jp: "(…で)ない、…しない", part: "adverb" },
    { en: "of", jp: "[内容]…のことを", part: "preposition" },
    { en: "often", jp: "たびたび、よく", part: "adverb" },
    { en: "on", jp: "[手段]…で", part: "preposition" },
    { en: "pet", jp: "ペット", part: "noun" },
    { en: "take a picture", jp: "写真を撮る", part: "phrase" },
    { en: "this", jp: "この、こちらの", part: "adjective" },
    { en: "weekend", jp: "週末", part: "noun" },
    { en: "what", jp: "何を", part: "pronoun" },
    { en: "yes", jp: "はい、ええ、そうです", part: "adverb" },
    { en: "you", jp: "あなたは[が]、あなたたちは[が]", part: "pronoun" },
    { en: "I see.", jp: "わかりました。", part: "phrase" },
    { en: "Me, too.", jp: "私も。", part: "phrase" },
    // Words & Sounds 1
    { en: "eight", jp: "8(の)", part: "noun" },
    { en: "eighteen", jp: "18(の)", part: "noun" },
    { en: "eleven", jp: "11(の)", part: "noun" },
    { en: "fifteen", jp: "15(の)", part: "noun" },
    { en: "five", jp: "5(の)", part: "noun" },
    { en: "four", jp: "4(の)", part: "noun" },
    { en: "fourteen", jp: "14(の)", part: "noun" },
    { en: "how", jp: "どれくらい、どれほど", part: "adverb" },
    { en: "hundred", jp: "100(の)", part: "noun" },
    { en: "nine", jp: "9(の)", part: "noun" },
    { en: "nineteen", jp: "19(の)", part: "noun" },
    { en: "number", jp: "数", part: "noun" },
    { en: "one", jp: "1つ(の)、1人の", part: "noun" },
    { en: "seven", jp: "7(の)", part: "noun" },
    { en: "seventeen", jp: "17(の)", part: "noun" },
    { en: "six", jp: "6(の)", part: "noun" },
    { en: "sixteen", jp: "16(の)", part: "noun" },
    { en: "ten", jp: "10(の)", part: "noun" },
    { en: "thirteen", jp: "13(の)", part: "noun" },
    { en: "thirty", jp: "30(の)", part: "noun" },
    { en: "thousand", jp: "1,000(の)", part: "noun" },
    { en: "three", jp: "3(の)", part: "noun" },
    { en: "twelve", jp: "12(の)", part: "noun" },
    { en: "twenty", jp: "20(の)", part: "noun" },
    { en: "two", jp: "2(の)", part: "noun" },
    { en: "zero", jp: "ゼロ(の)、0", part: "noun" }
];

// --- Lesson 2 (P35-42) ---
const l2_words = [
    { en: "favorite", jp: "お気に入りの、大好きな", part: "adjective" },
    { en: "her", jp: "彼女の", part: "adjective" },
    { en: "his", jp: "彼の", part: "adjective" },
    { en: "is", jp: "(…で)ある", part: "verb" },
    { en: "it", jp: "それは[が]、それを[に]", part: "pronoun" },
    { en: "language", jp: "言語、国語", part: "noun" },
    { en: "move", jp: "動かす、移動させる", part: "verb" },
    { en: "please", jp: "どうぞ、すみませんが", part: "adverb" },
    { en: "popular", jp: "人気のある、流行の", part: "adjective" },
    { en: "singer", jp: "歌手", part: "noun" },
    { en: "smile", jp: "ほほえみ", part: "noun" },
    { en: "song", jp: "歌", part: "noun" },
    { en: "space", jp: "場所、空間", part: "noun" },
    { en: "speak", jp: "話す", part: "verb" },
    { en: "sure", jp: "もちろん、いいですよ", part: "adverb" },
    { en: "teach", jp: "(人に知識などを)教える", part: "verb" },
    { en: "uncle", jp: "おじ", part: "noun" },
    { en: "voice", jp: "声", part: "noun" },
    // Words & Sounds 2
    { en: "April", jp: "4月", part: "noun" },
    { en: "August", jp: "8月", part: "noun" },
    { en: "December", jp: "12月", part: "noun" },
    { en: "February", jp: "2月", part: "noun" },
    { en: "first", jp: "1番目(の)、最初(の)", part: "noun" },
    { en: "January", jp: "1月", part: "noun" },
    { en: "July", jp: "7月", part: "noun" },
    { en: "June", jp: "6月", part: "noun" },
    { en: "March", jp: "3月", part: "noun" },
    { en: "May", jp: "5月", part: "noun" },
    { en: "November", jp: "11月", part: "noun" },
    { en: "October", jp: "10月", part: "noun" },
    { en: "second", jp: "2番目(の)", part: "noun" },
    { en: "September", jp: "9月", part: "noun" },
    { en: "third", jp: "3番目(の)", part: "noun" },
    { en: "when", jp: "いつ", part: "adverb" },
    { en: "your", jp: "あなたの、あなたたちの", part: "adjective" }
];

// --- Lesson 3 (P43-54) ---
const l3_words = [
    { en: "a little", jp: "少し", part: "phrase" },
    { en: "almost", jp: "ほとんど、もう少しで", part: "adverb" },
    { en: "aunt", jp: "おば", part: "noun" },
    { en: "blackboard", jp: "黒板", part: "noun" },
    { en: "camera", jp: "カメラ", part: "noun" },
    { en: "carry", jp: "運ぶ", part: "verb" },
    { en: "character", jp: "人物、登場人物", part: "noun" },
    { en: "correct", jp: "正しい、正確な", part: "adjective" },
    { en: "dictionary", jp: "辞書、辞典", part: "noun" },
    { en: "from", jp: "…から(の)、…出身の", part: "preposition" },
    { en: "gate", jp: "門", part: "noun" },
    { en: "gift", jp: "贈り物", part: "noun" },
    { en: "her", jp: "彼女を、彼女に", part: "pronoun" },
    { en: "him", jp: "彼を、彼に", part: "pronoun" },
    { en: "idea", jp: "思いつき、考え", part: "noun" },
    { en: "instrument", jp: "楽器", part: "noun" },
    { en: "Japanese-style", jp: "日本式の", part: "adjective" },
    { en: "know", jp: "知り合いである、見知っている", part: "verb" },
    { en: "maybe", jp: "たぶん、…かもしれない", part: "adverb" },
    { en: "much", jp: "たいへん、とても", part: "adverb" },
    { en: "musical", jp: "音楽の", part: "adjective" },
    // L3(2) & Take Action
    { en: "nickname", jp: "あだな", part: "noun" },
    { en: "o'clock", jp: "…時", part: "adverb" },
    { en: "online", jp: "[コンピュータ]オンラインの[で]", part: "adjective" },
    { en: "open", jp: "あいている、営業中で", part: "adjective" },
    { en: "right", jp: "正しい、まちがっていない", part: "adjective" },
    { en: "room", jp: "部屋、室", part: "noun" },
    { en: "scary", jp: "恐ろしい、怖い", part: "adjective" },
    { en: "shop", jp: "小売店、店", part: "noun" },
    { en: "statue", jp: "像、彫像", part: "noun" },
    { en: "that", jp: "それは[が]、あれは[が]、その、あの", part: "pronoun" },
    { en: "this", jp: "これは[が]、この人は[が]", part: "pronoun" },
    { en: "traditional", jp: "伝統的な", part: "adjective" },
    { en: "treasure", jp: "財宝、貴重品、宝物", part: "noun" },
    { en: "very much", jp: "とても", part: "phrase" },
    { en: "we", jp: "私たちは、われわれは", part: "pronoun" },
    { en: "what", jp: "何、どんなもの[こと]", part: "pronoun" },
    { en: "white", jp: "白色の", part: "adjective" },
    { en: "who", jp: "だれ、だれが", part: "pronoun" },
    { en: "with", jp: "[手段・道具]…を使って、…で", part: "preposition" },
    { en: "wrong", jp: "間違った[ている]", part: "adjective" },
    { en: "zucchini", jp: "ズッキーニ", part: "noun" },
    { en: "You're right.", jp: "そのとおり。", part: "phrase" },
    // Take Action Talk 1
    { en: "corner", jp: "かど、曲がりかど", part: "noun" },
    { en: "excuse", jp: "許す", part: "verb" },
    { en: "get", jp: "[…に]着く、達する", part: "verb" },
    { en: "get to ...", jp: "…に着く", part: "phrase" },
    { en: "how", jp: "[方法・手段]どうやって、どんなふうに", part: "adverb" },
    { en: "left", jp: "左へ、左の方に、左、左側", part: "adverb" },
    { en: "man", jp: "(おとなの)男性", part: "noun" },
    { en: "men", jp: "man の複数形", part: "noun" },
    { en: "right", jp: "右へ、右の方に[を]、右、右側", part: "adverb" },
    { en: "straight", jp: "まっすぐに", part: "adverb" },
    { en: "street", jp: "通り、街路", part: "noun" },
    { en: "thank", jp: "感謝する、ありがたいと思う", part: "verb" },
    { en: "then", jp: "それから、次に、そのあと(で)", part: "adverb" },
    { en: "turn", jp: "向きを変える、曲がる", part: "verb" },
    { en: "where", jp: "どこに、どこで、どこへ", part: "adverb" },
    { en: "Excuse me.", jp: "すみません。", part: "phrase" },
    { en: "Thank you.", jp: "ありがとう。", part: "phrase" }
];

// --- Lesson 4 (P55-65) - NEW ---
const l4_words = [
    { en: "also", jp: "…もまた、さらに", part: "adverb" },
    { en: "ate", jp: "eat の過去形", part: "verb" },
    { en: "baby", jp: "赤ちゃん、赤ちゃんの", part: "noun" },
    { en: "by", jp: "…によって", part: "preposition" },
    { en: "cousin", jp: "いとこ", part: "noun" },
    { en: "different", jp: "いろいろな、さまざまな", part: "adjective" },
    { en: "family", jp: "家族、一家", part: "noun" },
    { en: "last", jp: "(時間的に)この前の", part: "adjective" },
    { en: "Mr.", jp: "…さん、…先生(男性への敬称)", part: "noun" },
    { en: "myself", jp: "私自身で、自分で", part: "pronoun" },
    { en: "plan", jp: "計画、案", part: "noun" },
    { en: "saw", jp: "see の過去形", part: "verb" },
    { en: "so", jp: "非常に、とても", part: "adverb" },
    { en: "thick", jp: "分厚い", part: "adjective" },
    { en: "top", jp: "いちばん上の部分、頂上", part: "noun" },
    { en: "view", jp: "景色、ながめ", part: "noun" },
    { en: "want", jp: "…することを望む、…したい", part: "verb" },
    { en: "was", jp: "(…で)あった、…でした", part: "verb" },
    { en: "went", jp: "go の過去形", part: "verb" },
    { en: "year", jp: "年、1年(間)", part: "noun" },
    // Take Action! Listen 1
    { en: "dollar", jp: "ドル", part: "noun" },
    { en: "free", jp: "無料の", part: "adjective" },
    // Take Action! Talk 2
    { en: "anything", jp: "何か、何も(…ない)", part: "pronoun" },
    { en: "order", jp: "注文、注文の品", part: "noun" },
    { en: "pick up", jp: "取りに行く、拾い上げる", part: "phrase" },
    { en: "What would you like?", jp: "何になさいますか。", part: "phrase" },
    // Project 1
    { en: "chair", jp: "いす", part: "noun" },
    { en: "desk", jp: "机", part: "noun" },
    { en: "heavy", jp: "重い", part: "adjective" },
    { en: "light", jp: "軽い", part: "adjective" },
    { en: "necessary", jp: "必要な", part: "adjective" },
    { en: "shirt", jp: "ワイシャツ、シャツ", part: "noun" },
    { en: "tell", jp: "言う、話す、知らせる", part: "verb" },
    { en: "train", jp: "列車、電車", part: "noun" },
    { en: "useful", jp: "役に立つ、便利な", part: "adjective" }
];

// --- Lesson 5 (P67-78) - NEW ---
const l5_words = [
    { en: "bottle", jp: "びん、ボトル", part: "noun" },
    { en: "brother", jp: "兄、弟", part: "noun" },
    { en: "bye", jp: "さよなら、じゃあね", part: "interjection" },
    { en: "concert", jp: "演奏会、音楽会", part: "noun" },
    { en: "difficult", jp: "難しい、困難な", part: "adjective" },
    { en: "driver", jp: "運転手", part: "noun" },
    { en: "fact", jp: "事実", part: "noun" },
    { en: "father", jp: "父", part: "noun" },
    { en: "hers", jp: "彼女のもの", part: "pronoun" },
    { en: "key", jp: "鍵", part: "noun" },
    { en: "know", jp: "知っている、知る", part: "verb" },
    { en: "like", jp: "…のように、…のような", part: "preposition" },
    { en: "mine", jp: "私のもの", part: "pronoun" },
    { en: "mother", jp: "母", part: "noun" },
    { en: "ours", jp: "私たちのもの", part: "pronoun" },
    { en: "page", jp: "ページ", part: "noun" },
    { en: "performance", jp: "上演、演奏、演技", part: "noun" },
    { en: "place", jp: "場所、地域", part: "noun" },
    { en: "player", jp: "選手、競技者", part: "noun" },
    { en: "problem", jp: "問題、やっかいなこと", part: "noun" },
    { en: "strange", jp: "奇妙な、不思議な", part: "adjective" },
    { en: "their", jp: "彼(女)らの、それらの", part: "adjective" },
    { en: "them", jp: "彼(女)らを[に]、それらを", part: "pronoun" },
    { en: "they", jp: "彼(女)らは、それらは", part: "pronoun" },
    { en: "thing", jp: "物、事", part: "noun" },
    { en: "tomorrow", jp: "あした(は)、あすは", part: "adverb" },
    { en: "towel", jp: "タオル", part: "noun" },
    { en: "video", jp: "テレビの、動画の", part: "adjective" },
    { en: "wait", jp: "待つ", part: "verb" },
    { en: "wear", jp: "身につけている、着ている", part: "verb" },
    { en: "whose", jp: "だれの", part: "pronoun" },
    { en: "yours", jp: "あなた(たち)のもの", part: "pronoun" },
    // Take Action! Listen 2
    { en: "any", jp: "[肯定文で]どんな…も、どの…も", part: "adjective" },
    { en: "during", jp: "…じゅうずっと", part: "preposition" },
    { en: "each", jp: "それぞれの、各…", part: "adjective" },
    { en: "personal", jp: "個人的な、私的な", part: "adjective" },
    { en: "some", jp: "いくつかの、いくらかの", part: "adjective" },
    { en: "throw", jp: "投げること、投球", part: "noun" },
    { en: "under", jp: "…の下に、…の下を", part: "preposition" }
];

// --- Lesson 6 (P79-90) ---
const l6_words = [
    { en: "activity", jp: "活動", part: "noun" },
    { en: "agree", jp: "賛成する、同意する", part: "verb" },
    { en: "all", jp: "すべての、全部の", part: "adjective" },
    { en: "best", jp: "最もよい、最高の", part: "adjective" },
    { en: "between", jp: "…の間に[で、を、の]", part: "preposition" },
    { en: "boy", jp: "男の子、少年", part: "noun" },
    { en: "break", jp: "休憩", part: "noun" },
    { en: "bring", jp: "持ってくる、連れてくる", part: "verb" },
    { en: "buy", jp: "買う", part: "verb" },
    { en: "cafeteria", jp: "カフェテリア", part: "noun" },
    { en: "ceremony", jp: "式、式典", part: "noun" },
    { en: "choose", jp: "選ぶ、選択する", part: "verb" },
    { en: "class", jp: "授業", part: "noun" },
    { en: "common", jp: "ふつうの、ありふれた", part: "adjective" },
    { en: "contest", jp: "コンテスト、コンクール", part: "noun" },
    { en: "dear", jp: "親愛なる…", part: "adjective" },
    { en: "different", jp: "違った、別の", part: "adjective" },
    { en: "event", jp: "(重要な)出来事、行事", part: "noun" },
    { en: "everyone", jp: "だれでも、みんな", part: "pronoun" },
    { en: "excited", jp: "興奮した、わくわくした", part: "adjective" },
    { en: "flute", jp: "フルート", part: "noun" },
    { en: "foreign", jp: "外国の", part: "adjective" },
    { en: "girl", jp: "女の子、少女", part: "noun" },
    { en: "graduation", jp: "卒業", part: "noun" },
    { en: "graduation ceremony", jp: "卒業式", part: "phrase" },
    { en: "has", jp: "have の3人称単数現在形", part: "verb" },
    { en: "hold", jp: "持っている", part: "verb" },
    { en: "kind", jp: "種類、種", part: "noun" },
    { en: "life", jp: "生活、暮らし", part: "noun" },
    { en: "menu", jp: "献立表、メニュー", part: "noun" },
    { en: "next", jp: "次の、今度の", part: "adjective" },
    // L6(2)
    { en: "now", jp: "今、今は、現在は", part: "adverb" },
    { en: "or", jp: "または、あるいは", part: "conjunction" },
    { en: "other", jp: "ほかのもの[人]", part: "pronoun" },
    { en: "our", jp: "私たちの、われわれの", part: "adjective" },
    { en: "own", jp: "自分(自身)の、独特の", part: "adjective" },
    { en: "point", jp: "さし示す、指さす", part: "verb" },
    { en: "poster", jp: "ポスター", part: "noun" },
    { en: "schedule", jp: "[…の]スケジュール、(学校の)時間割", part: "noun" },
    { en: "some..., other(s) ...", jp: "…もいれば[あれば]、～もいる[ある]", part: "phrase" },
    { en: "story", jp: "物語、話", part: "noun" },
    { en: "student", jp: "学生、生徒", part: "noun" },
    { en: "these", jp: "これらの、この", part: "adjective" },
    { en: "trip", jp: "旅行", part: "noun" },
    { en: "vacation", jp: "休暇、休み", part: "noun" },
    { en: "which", jp: "どちらを、どれを", part: "pronoun" },
    // Listen 3
    { en: "candle", jp: "ろうそく", part: "noun" },
    { en: "farmer", jp: "農場主、農場経営者", part: "noun" },
    { en: "local", jp: "地域の、その地方(特有)の", part: "adjective" },
    { en: "soap", jp: "せっけん", part: "noun" },
    { en: "specialize in ...", jp: "[…を]専門に扱う", part: "phrase" },
    { en: "stand", jp: "売店、屋台", part: "noun" },
    { en: "support", jp: "支持する、支援する", part: "verb" },
    // Talk 3
    { en: "ankle", jp: "足首、くるぶし", part: "noun" },
    { en: "bench", jp: "長いす、ベンチ", part: "noun" },
    { en: "down", jp: "下へ[に]、下の方へ[に]", part: "adverb" },
    { en: "feel", jp: "(体や心に)感じる", part: "verb" },
    { en: "fever", jp: "熱", part: "noun" },
    { en: "find", jp: "見つける、見いだす", part: "verb" },
    { en: "headache", jp: "頭痛", part: "noun" },
    { en: "matter", jp: "問題、困った事", part: "noun" },
    { en: "noon", jp: "正午、真昼、昼の12時", part: "noun" },
    { en: "OK", jp: "よろしい、問題ない", part: "adjective" },
    { en: "rest", jp: "休息、休養、休憩", part: "noun" },
    { en: "sick", jp: "病気の、気分が悪い", part: "adjective" },
    { en: "sit", jp: "すわっている、すわる", part: "verb" },
    { en: "stomachache", jp: "腹痛、胃痛", part: "noun" },
    { en: "Let's ...", jp: "…しましょう。", part: "phrase" }
];

// --- Lesson 7 (P91-97) ---
const l7_words = [
    { en: "again and again", jp: "何度も何度も", part: "phrase" },
    { en: "age", jp: "年齢", part: "noun" },
    { en: "anymore", jp: "[疑/否]もはや、これ以上", part: "adverb" },
    { en: "at first", jp: "最初は", part: "phrase" },
    { en: "bad", jp: "悪い、よくない", part: "adjective" },
    { en: "became", jp: "become の過去形", part: "verb" },
    { en: "become", jp: "…になる", part: "verb" },
    { en: "but", jp: "しかし", part: "conjunction" },
    { en: "change", jp: "変える、変わる、変化する", part: "verb" },
    { en: "could", jp: "…することができた", part: "auxiliary verb" },
    { en: "each other", jp: "おたいがい(を[に])", part: "phrase" },
    { en: "even", jp: "…でさえ、…でも", part: "adverb" },
    { en: "finally", jp: "ついに、最後に", part: "adverb" },
    { en: "gave", jp: "give の過去形", part: "verb" },
    { en: "had", jp: "have の過去形", part: "verb" },
    { en: "hand", jp: "手", part: "noun" },
    { en: "help", jp: "手伝い、助け", part: "noun" },
    { en: "join", jp: "参加する、加わる", part: "verb" },
    { en: "learn", jp: "学ぶ、習う", part: "verb" },
    { en: "made", jp: "make の過去形", part: "verb" },
    { en: "mind", jp: "心、精神、考え", part: "noun" },
    { en: "national", jp: "国の、国立の", part: "adjective" },
    { en: "one by one", jp: "1つ[1人]ずつ", part: "phrase" },
    { en: "only", jp: "ただ…だけ", part: "adverb" },
    { en: "people", jp: "人々、世間(の人々)", part: "noun" },
    { en: "quickly", jp: "すばやく、速く", part: "adverb" },
    { en: "reach", jp: "…に着く、到達する", part: "verb" },
    { en: "show", jp: "見せる、示す", part: "verb" },
    { en: "start", jp: "始める、始まる", part: "verb" },
    { en: "themselves", jp: "彼(女)[それ]ら自身[体](を[に])", part: "pronoun" },
    { en: "try", jp: "努力する、努める", part: "verb" },
    { en: "way", jp: "方法、やり方、しかた", part: "noun" }
];

// --- Project 2 / Reading Lesson 1 (P100-103) - NEW ---
const project2_reading1_words = [
    // Project 2
    { en: "care", jp: "世話、保護", part: "noun" },
    { en: "climb", jp: "登る、よじ登る", part: "verb" },
    { en: "floor", jp: "床", part: "noun" },
    { en: "fly", jp: "飛ぶ", part: "verb" },
    { en: "help", jp: "(人を)手伝う、助ける", part: "verb" },
    { en: "include", jp: "含む、含める", part: "verb" },
    { en: "look like ...", jp: "…のように見える", part: "phrase" },
    { en: "lot", jp: "(a lot または lots)たくさん", part: "noun" },
    { en: "a lot of ...", jp: "たくさんの…", part: "phrase" },
    { en: "meter", jp: "メートル", part: "noun" },
    { en: "size", jp: "大きさ", part: "noun" },
    { en: "take care of ...", jp: "…の世話をする", part: "phrase" },
    { en: "tall", jp: "背が高い", part: "adjective" },
    { en: "teacher", jp: "先生、教師", part: "noun" },
    { en: "topic", jp: "話題、(講演などの)テーマ", part: "noun" },
    { en: "tree", jp: "木、樹木", part: "noun" },
    { en: "window", jp: "窓", part: "noun" },
    // Reading Lesson 1
    { en: "anyway", jp: "ところで", part: "adverb" },
    { en: "around", jp: "…のまわりを[に]", part: "preposition" },
    { en: "ask", jp: "たずねる、問う", part: "verb" },
    { en: "careful", jp: "注意深い、慎重な", part: "adjective" },
    { en: "fall", jp: "落ちる", part: "verb" },
    { en: "follow", jp: "ついて行く、追う", part: "verb" },
    { en: "hate", jp: "憎む、ひどく嫌う", part: "verb" },
    { en: "hole", jp: "穴", part: "noun" },
    { en: "into", jp: "…の中へ[に]", part: "preposition" },
    { en: "late", jp: "(本来の時間・予定より)遅い、(時間に)遅れた", part: "adjective" },
    { en: "lovely", jp: "愛らしい、かわいい", part: "adjective" },
    { en: "mean", jp: "意味する、…の意味である", part: "verb" },
    { en: "name", jp: "名前", part: "noun" },
    { en: "not ... at all", jp: "少しも…ない", part: "phrase" },
    { en: "said", jp: "say の過去形", part: "verb" },
    { en: "sat", jp: "sit の過去形", part: "verb" },
    { en: "say", jp: "言う、話す、述べる", part: "verb" },
    { en: "something", jp: "何か、あるもの", part: "pronoun" },
    { en: "stop", jp: "やめる、やめさせる", part: "verb" },
    { en: "terrible", jp: "恐ろしい、ひどい", part: "adjective" },
    { en: "wall", jp: "へい、城壁", part: "noun" },
    { en: "Of course.", jp: "もちろん。", part: "phrase" }
];

// --- Lesson 8 (P105-116) ---
const l8_words = [
    { en: "across", jp: "…を横切って、…の向こう側へ", part: "preposition" },
    { en: "along", jp: "(道・川など)に沿って", part: "preposition" },
    { en: "at that time", jp: "その時には", part: "phrase" },
    { en: "bus", jp: "バス", part: "noun" },
    { en: "city", jp: "市の、都会の", part: "adjective" },
    { en: "die", jp: "死ぬ、(植物が)枯れる", part: "verb" },
    { en: "drank", jp: "drink の過去形", part: "verb" },
    { en: "drop", jp: "落とす、落ちる", part: "verb" },
    { en: "garden", jp: "庭、庭園", part: "noun" },
    { en: "held", jp: "hold の過去形", part: "verb" },
    { en: "light", jp: "明かり、電灯", part: "noun" },
    { en: "lonely", jp: "孤独な、さびしい", part: "adjective" },
    { en: "luck", jp: "運、幸運", part: "noun" },
    { en: "match", jp: "試合、競技", part: "noun" },
    { en: "miss", jp: "機会を逃す", part: "verb" },
    { en: "moment", jp: "ちょっとの時間、瞬間", part: "noun" },
    { en: "neighbor", jp: "近所の人", part: "noun" },
    { en: "peace", jp: "平和", part: "noun" },
    { en: "quite", jp: "ほんとに、とても", part: "adverb" },
    { en: "radio", jp: "ラジオ(放送)", part: "noun" },
    { en: "rainy", jp: "雨の、雨降りの", part: "adjective" },
    { en: "ran", jp: "run の過去形", part: "verb" },
    { en: "remember", jp: "覚えている、思い出す", part: "verb" },
    { en: "rode", jp: "ride の過去形", part: "verb" },
    { en: "snow", jp: "雪", part: "noun" },
    { en: "spend", jp: "(時間を)過ごす、費やす", part: "verb" },
    { en: "spent", jp: "spend の過去形", part: "verb" },
    { en: "stay", jp: "とどまる、滞在する", part: "verb" },
    { en: "sunny", jp: "日の照っている、晴れた", part: "adjective" },
    { en: "surprised", jp: "驚いた", part: "adjective" },
    { en: "today", jp: "今日(は)", part: "adverb" },
    { en: "took", jp: "take の過去形", part: "verb" },
    { en: "touch one's heart", jp: "感動させる", part: "phrase" },
    { en: "travel", jp: "旅行する、旅をする", part: "verb" },
    { en: "visit", jp: "(人を)訪問する、訪ねる", part: "verb" },
    { en: "war", jp: "戦争", part: "noun" },
    { en: "win", jp: "勝つ", part: "verb" },
    { en: "won", jp: "win の過去形", part: "verb" },
    { en: "wonderful", jp: "すばらしい、とてもすてきな", part: "adjective" },
    { en: "wore", jp: "wear の過去形", part: "verb" },
    // Listen 4
    { en: "college", jp: "大学", part: "noun" },
    { en: "land", jp: "(畑・敷地としての)土地", part: "noun" }
];

// --- Lesson 9 (P117-123) ---
const l9_words = [
    { en: "bring", jp: "(知らせなどを)もたらす", part: "verb" },
    { en: "chose", jp: "choose の過去形", part: "verb" },
    { en: "city", jp: "市、都市", part: "noun" },
    { en: "company", jp: "会社", part: "noun" },
    { en: "disaster", jp: "大災害、惨事", part: "noun" },
    { en: "easily", jp: "楽々と、容易に", part: "adverb" },
    { en: "everybody", jp: "だれでも、みんな", part: "pronoun" },
    { en: "example", jp: "例、実例", part: "noun" },
    { en: "for the first time", jp: "初めて", part: "phrase" },
    { en: "found", jp: "find の過去形", part: "verb" },
    { en: "group", jp: "集団、グループ", part: "noun" },
    { en: "important", jp: "重要な、重大な", part: "adjective" },
    { en: "in addition", jp: "さらに", part: "phrase" },
    { en: "keep", jp: "持ち続ける、保存する", part: "verb" },
    { en: "look for ...", jp: "…をさがす", part: "phrase" },
    { en: "natural", jp: "天然の、自然の", part: "adjective" },
    { en: "near", jp: "…の近くに、…の近くの", part: "preposition" },
    { en: "need", jp: "…が必要である", part: "verb" },
    { en: "part", jp: "役割", part: "noun" },
    { en: "prepare", jp: "用意する、準備をする", part: "verb" },
    { en: "probably", jp: "おそらく、たぶん", part: "adverb" },
    { en: "put", jp: "置く、付ける", part: "verb" },
    { en: "recommend", jp: "推薦する、推奨する", part: "verb" },
    { en: "region", jp: "地域、地方", part: "noun" },
    { en: "type", jp: "型、タイプ、種類", part: "noun" },
    { en: "warm", jp: "暖[温]かい", part: "adjective" },
    { en: "work", jp: "働く、仕事をする", part: "verb" }
];

// --- Take Action! Listen 5 / Talk 4 / Project 3 (P126-129) ---
const project3_words = [
    // Listen 5
    { en: "clear", jp: "澄んだ、晴れた、快晴の", part: "adjective" },
    { en: "cloudy", jp: "くもりの、くもった", part: "adjective" },
    { en: "degree", jp: "(温度、角度などの)度", part: "noun" },
    { en: "holiday", jp: "祝日、休日", part: "noun" },
    { en: "low", jp: "低い水準[数値]", part: "noun" },
    { en: "news", jp: "知らせ、ニュース、報道", part: "noun" },
    { en: "rain", jp: "雨が降る", part: "verb" },
    // Talk 4
    { en: "busy", jp: "忙しい", part: "adjective" },
    { en: "cut", jp: "切る、刈る", part: "verb" },
    { en: "fire", jp: "火、炎", part: "noun" },
    { en: "sorry", jp: "すまなく思って、後悔して", part: "adjective" },
    { en: "All right.", jp: "よろしい。", part: "phrase" },
    { en: "No problem.", jp: "いいですよ。問題ない。", part: "phrase" },
    // Project 3
    { en: "ago", jp: "(今から)…前に", part: "adverb" },
    { en: "bamboo", jp: "竹", part: "noun" },
    { en: "came", jp: "come の過去形", part: "verb" },
    { en: "come", jp: "来る、到着する", part: "verb" },
    { en: "child", jp: "子ども", part: "noun" },
    { en: "children", jp: "child の複数形", part: "noun" },
    { en: "collect", jp: "集める、収集する", part: "verb" },
    { en: "disappear", jp: "見えなくなる、姿を消す", part: "verb" },
    { en: "empty", jp: "からの", part: "adjective" },
    { en: "everything", jp: "すべてのこと[物]、何もかも", part: "pronoun" },
    { en: "few", jp: "少数[少し]の(…しかない)", part: "adjective" },
    { en: "a few ...", jp: "少数の…", part: "phrase" },
    { en: "forest", jp: "森林", part: "noun" },
    { en: "full", jp: "いっぱいの、満ちた", part: "adjective" },
    { en: "grew", jp: "grow の過去形", part: "verb" },
    { en: "grow", jp: "成長する、伸びる", part: "verb" },
    { en: "grow into ...", jp: "成長して…になる", part: "phrase" },
    { en: "moon", jp: "(天体の)月", part: "noun" },
    { en: "off", jp: "離れて、去って", part: "adverb" },
    { en: "once", jp: "かつて、昔", part: "adverb" },
    { en: "once upon a time", jp: "昔々", part: "phrase" },
    { en: "poor", jp: "貧乏な、貧しい", part: "adjective" },
    { en: "respond", jp: "[…に]答える", part: "verb" },
    { en: "shine", jp: "輝く、光る", part: "verb" },
    { en: "smoke", jp: "煙", part: "noun" },
    { en: "soon", jp: "もうすぐ、まもなく", part: "adverb" },
    { en: "special", jp: "特別の、大事な", part: "adjective" },
    { en: "there", jp: "そこに[で、へ]、あそこに[で、へ]", part: "adverb" },
    { en: "together", jp: "いっしょに", part: "adverb" },
    { en: "turtle", jp: "カメ", part: "noun" },
    { en: "village", jp: "村、村落", part: "noun" },
    { en: "villager", jp: "村人、村民", part: "noun" },
    { en: "welcome", jp: "歓迎する、迎える", part: "verb" },
    { en: "wife", jp: "妻", part: "noun" },
    { en: "woman", jp: "(おとなの)女性", part: "noun" },
    { en: "women", jp: "woman の複数形", part: "noun" },
    { en: "wood", jp: "木、まき、たきぎ", part: "noun" }
];

// --- Reading Lesson 2 (P130-132) ---
const reading2_words = [
    { en: "beat", jp: "打つ、たたく、打ちつける", part: "verb" },
    { en: "boom", jp: "とどろき、ブーンという音", part: "noun" },
    { en: "bright", jp: "ぴかぴか光る、輝く", part: "adjective" },
    { en: "celebrate", jp: "祝う", part: "verb" },
    { en: "cloud", jp: "雲", part: "noun" },
    { en: "cover", jp: "おおう", part: "verb" },
    { en: "crop", jp: "農作物、作物", part: "noun" },
    { en: "down", jp: "…の下に[へ]、…を下って", part: "preposition" },
    { en: "dry", jp: "乾いた、乾燥した", part: "adjective" },
    { en: "field", jp: "農地、牧草地、野原", part: "noun" },
    { en: "happen", jp: "起こる、生じる", part: "verb" },
    { en: "island", jp: "島", part: "noun" },
    { en: "job", jp: "仕事、務め", part: "noun" },
    { en: "large", jp: "大きい、広い、大規模な", part: "adjective" },
    { en: "light up ...", jp: "…を照らす、明るくする", part: "phrase" },
    { en: "lightning", jp: "いなずま、電光", part: "noun" },
    { en: "noise", jp: "物音、騒音", part: "noun" },
    { en: "push", jp: "押す", part: "verb" },
    { en: "rain", jp: "雨", part: "noun" },
    { en: "ready", jp: "用意ができて、準備ができて", part: "adjective" },
    { en: "roll", jp: "ころがる、ころがっていく", part: "verb" },
    { en: "sky", jp: "空", part: "noun" },
    { en: "sleep", jp: "眠る、睡眠をとる", part: "verb" },
    { en: "stone", jp: "石、小石", part: "noun" },
    { en: "sun", jp: "太陽", part: "noun" },
    { en: "thunder", jp: "雷、雷鳴", part: "noun" },
    { en: "wake up ...", jp: "を…起こす", part: "phrase" },
    { en: "wise", jp: "賢い、賢明な、分別のある", part: "adjective" },
    { en: "woke", jp: "wake の過去形", part: "verb" },
    { en: "young", jp: "若い、幼い", part: "adjective" }
];


try {
    let content = fs.readFileSync(targetFile, 'utf8');

    const ncStartRegex = /"new_crown":\s*\{/;
    const ncStartMatch = ncStartRegex.exec(content);
    if (!ncStartMatch) throw new Error("new_crown section not found");

    const grade1StartRegex = /"1":\s*\[/;
    const grade1SearchStr = content.substring(ncStartMatch.index);
    const grade1MatchRelative = grade1StartRegex.exec(grade1SearchStr);

    if (!grade1MatchRelative) throw new Error("Grade 1 section in new_crown not found");

    const grade1StartIndex = ncStartMatch.index + grade1MatchRelative.index;

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

    const grade1Array = [
        { unit: "Lesson 1", pages: "P25〜34", words: l1_words }, // Combined L1(1) and L1(2)
        { unit: "Lesson 2", pages: "P35〜42", words: l2_words },
        { unit: "Lesson 3", pages: "P43〜54", words: l3_words },
        { unit: "Lesson 4", pages: "P55〜65", words: l4_words }, // Includes Take Action 1,2 + Project 1
        { unit: "Lesson 5", pages: "P67〜78", words: l5_words }, // Includes Take Action Listen 2
        { unit: "Lesson 6", pages: "P79〜90", words: l6_words },
        { unit: "Lesson 7", pages: "P91〜97", words: l7_words },
        { unit: "Project 2 / Reading Lesson 1", pages: "P100〜103", words: project2_reading1_words }, // New Unit
        { unit: "Lesson 8", pages: "P105〜116", words: l8_words },
        { unit: "Lesson 9", pages: "P117〜123", words: l9_words },
        { unit: "Take Action! Listen 5 / Talk 4 / Project 3", pages: "P126〜129", words: project3_words },
        { unit: "Reading Lesson 2", pages: "P130〜132", words: reading2_words }
    ];

    const newGrade1Json = JSON.stringify(grade1Array, null, 4);

    const newContent = content.substring(0, grade1StartIndex + grade1MatchRelative[0].length - 1) +
        newGrade1Json +
        content.substring(grade1EndIndex);

    fs.writeFileSync(targetFile, newContent);
    console.log("Successfully fixed New Crown Grade 1 data using provided images (L1-L9 full set).");

} catch (e) {
    console.error("Error:", e);
    process.exit(1);
}
