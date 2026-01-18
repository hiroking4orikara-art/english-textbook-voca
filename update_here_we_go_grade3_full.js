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
    { en: "alone", jp: "～だけで、1人で", part: "adverb" },
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

// --- Let's Read 1 (P40-45) ---
const lets_read1_words = [
    { en: "a piece of ~", jp: "1枚の～", part: "phrase" },
    { en: "ask for ~", jp: "～を求める", part: "phrase" },
    { en: "by hand", jp: "手書きで", part: "phrase" },
    { en: "end", jp: "終わる", part: "verb" },
    { en: "escape", jp: "逃げる", part: "verb" },
    { en: "even", jp: "～でさえ、～までも", part: "adverb" },
    { en: "fight", jp: "(～と)戦う", part: "verb" },
    { en: "foreign", jp: "外国の", part: "adjective" },
    { en: "forgive", jp: "～を許す", part: "verb" },
    { en: "get on ~", jp: "～に乗る", part: "phrase" },
    { en: "hand ~ out", jp: "～を配る、～を手渡す", part: "phrase" },
    { en: "join hands", jp: "手を組む、手を取り合う", part: "phrase" },
    { en: "knew", jp: "know の過去形", part: "verb" },
    { en: "outside", jp: "外に", part: "adverb" },
    { en: "pass", jp: "通り過ぎる、通る", part: "verb" },
    { en: "pass through ~", jp: "～を通り抜ける", part: "phrase" },
    { en: "pray", jp: "祈る", part: "verb" },
    { en: "refuse", jp: "(～を)断る、拒絶する", part: "verb" },
    { en: "risk", jp: "危険性", part: "noun" },
    { en: "short", jp: "短い", part: "adjective" },
    { en: "shouldn't", jp: "should not の短縮形", part: "phrase" },
    { en: "silence", jp: "沈黙", part: "noun" },
    { en: "through", jp: "～を通り抜けて", part: "preposition" },
    { en: "wife", jp: "妻", part: "noun" },
    { en: "with tears in one's eyes", jp: "目に涙をためて", part: "phrase" },
    { en: "wrote", jp: "write の過去形", part: "verb" },
    { en: "year", jp: "[～sで]長い年月、長年", part: "noun" },
    { en: "against", jp: "～に反対して", part: "preposition" },
    { en: "attractive", jp: "魅力的な", part: "adjective" },
    { en: "convenient", jp: "便利な", part: "adjective" },
    { en: "disagree", jp: "意見が異なる", part: "verb" },
    { en: "health", jp: "健康、健康状態", part: "noun" },
    { en: "move to ~", jp: "～に引っ越す", part: "phrase" },
    { en: "sleep", jp: "睡眠、眠り", part: "noun" },
    { en: "uniform", jp: "制服", part: "noun" }
];

// --- Unit 4 (P47-55) ---
const unit4_words = [
    { en: "a part of ~", jp: "～の一部", part: "phrase" },
    { en: "automatically", jp: "自動で", part: "adverb" },
    { en: "cleaning robot", jp: "ロボット掃除機", part: "noun" },
    { en: "command", jp: "指令、命令", part: "noun" },
    { en: "common", jp: "普通の、よくある", part: "adjective" },
    { en: "customer", jp: "客、顧客", part: "noun" },
    { en: "daily", jp: "日常の、毎日の", part: "adjective" },
    { en: "device", jp: "装置、道具、デバイス", part: "noun" },
    { en: "discussion", jp: "議論、討論", part: "noun" },
    { en: "easily", jp: "簡単に、楽に", part: "adverb" },
    { en: "in my opinion", jp: "私の考えでは", part: "phrase" },
    { en: "in the near future", jp: "近い将来", part: "phrase" },
    { en: "lately", jp: "最近、近頃", part: "adverb" },
    { en: "near", jp: "近い", part: "adjective" },
    { en: "quite", jp: "非常に、とても", part: "adverb" },
    { en: "rely on ~", jp: "～に頼る、～を当てにする", part: "phrase" },
    { en: "robot", jp: "ロボット", part: "noun" },
    { en: "run", jp: "～を経営する", part: "verb" },
    { en: "search engine", jp: "検索エンジン", part: "noun" },
    { en: "translation", jp: "翻訳", part: "noun" },
    { en: "weekday", jp: "平日", part: "noun" },
    { en: "~ has a good point, but ....", jp: "～はいいところをついていると思うけれど…。", part: "phrase" },
    // Unit 4 (2)
    { en: "broaden", jp: "～を広げる、深める", part: "verb" },
    { en: "carpet", jp: "じゅうたん", part: "noun" },
    { en: "cold", jp: "冷たい、寒い", part: "adjective" },
    { en: "directly", jp: "直接、じかに", part: "adverb" },
    { en: "disappear", jp: "見えなくなる", part: "verb" },
    { en: "hate", jp: "～をひどく嫌う", part: "verb" },
    { en: "like", jp: "～と同じように", part: "preposition" },
    { en: "make", jp: "[make+人・もの+動詞の原形] (人・もの)に～させる", part: "verb" },
    { en: "not all ~", jp: "全てが～とは限らない", part: "phrase" },
    { en: "on the other hand", jp: "一方で、他方では", part: "phrase" },
    { en: "other", jp: "[the ～で](2つのうち)もう一方の、[the ～sで](3つ以上のうち)その他全ての", part: "pronoun" }, // Image: [the ～で]... [the ～sで]...
    { en: "remember", jp: "～を思い出す[思い起こす]", part: "verb" },
    { en: "somewhere", jp: "どこかに", part: "adverb" },
    { en: "take time", jp: "時間がかかる", part: "phrase" },
    { en: "those", jp: "[those who ～で](～する)人たち", part: "pronoun" },
    { en: "too", jp: "あまりにも～、～すぎる", part: "adverb" },
    { en: "too ~ to ...", jp: "…するには～すぎる", part: "phrase" },
    { en: "tool", jp: "道具、手段、ツール", part: "noun" },
    { en: "translate", jp: "～を翻訳する", part: "verb" },
    { en: "understanding", jp: "理解(すること)", part: "noun" },
    { en: "view", jp: "見方、考え方", part: "noun" },
    { en: "Go ahead.", jp: "どうぞ。", part: "phrase" }
];

// --- Unit 5 (P61-70) ---
const unit5_words = [
    { en: "accessory", jp: "アクセサリー", part: "noun" },
    { en: "adventure", jp: "冒険、はらはらする経験", part: "noun" },
    { en: "affect", jp: "～に影響する", part: "verb" },
    { en: "challenging", jp: "意欲をそそる、困難な", part: "adjective" },
    { en: "change", jp: "～を変える", part: "verb" },
    { en: "come true", jp: "実現する", part: "phrase" },
    { en: "company", jp: "会社", part: "noun" },
    { en: "contest", jp: "コンテスト", part: "noun" },
    { en: "developing", jp: "発展[開発]途上の", part: "adjective" },
    { en: "enough", jp: "十分な、必要なだけの", part: "adjective" }, // Image: "十分な" (adj), and also "enough ~ to ..." below
    { en: "enough ~ to ...", jp: "…するのに十分な～", part: "phrase" },
    { en: "explain", jp: "～を説明する", part: "verb" },
    { en: "fair", jp: "公平な、公正な", part: "adjective" },
    { en: "farmer", jp: "農家、農場主", part: "noun" },
    { en: "give", jp: "(スピーチ・演技など)を行う", part: "verb" },
    { en: "in this way", jp: "このようにして", part: "phrase" },
    { en: "income", jp: "収入", part: "noun" },
    { en: "Korean", jp: "韓国の", part: "adjective" },
    { en: "little", jp: "ほとんどない", part: "adjective" },
    { en: "low", jp: "低い", part: "adjective" },
    { en: "make a choice", jp: "選択する", part: "phrase" },
    { en: "make a suggestion", jp: "提案をする", part: "phrase" },
    { en: "picture", jp: "画像、画面", part: "noun" },
    { en: "producer", jp: "生産者", part: "noun" },
    { en: "product", jp: "製品", part: "noun" },
    { en: "recommend", jp: "～を勧める", part: "verb" },
    { en: "solve", jp: "～を解決する", part: "verb" },
    { en: "sustainable", jp: "持続可能な", part: "adjective" },
    { en: "trade", jp: "取引、貿易", part: "noun" },
    { en: "T-shirt", jp: "Tシャツ", part: "noun" },
    { en: "I was impressed.", jp: "感動しました。", part: "phrase" },
    // Unit 5 (2) ~ Daily Life Scene 4 (P66-70)
    { en: "access", jp: "(面会・利用などの)権利、機会", part: "noun" },
    { en: "across", jp: "～と出くわして", part: "preposition" },
    { en: "Africa", jp: "アフリカ", part: "noun" },
    { en: "around", jp: "約～、およそ～、～頃", part: "adverb" },
    { en: "Asia", jp: "アジア", part: "noun" },
    { en: "care for ~", jp: "～の世話をする", part: "phrase" },
    { en: "come across ~", jp: "～をふと見つける", part: "phrase" },
    { en: "education", jp: "教育", part: "noun" },
    { en: "electricity", jp: "電力", part: "noun" },
    { en: "get to know ~", jp: "～と知り合いになる", part: "phrase" },
    { en: "graph", jp: "グラフ", part: "noun" },
    { en: "have access to ~", jp: "～を利用することができる", part: "phrase" },
    { en: "housework", jp: "家事", part: "noun" },
    { en: "in particular", jp: "特に、とりわけ", part: "phrase" },
    { en: "in the past ~ years", jp: "この～年で", part: "phrase" },
    { en: "instead of ~", jp: "～の代わりに", part: "phrase" },
    { en: "large", jp: "多い、多数の、多量の", part: "adjective" },
    { en: "lead to ~", jp: "～につながる", part: "phrase" },
    { en: "marriage", jp: "結婚", part: "noun" },
    { en: "marry", jp: "結婚する", part: "verb" },
    { en: "million", jp: "100万(の)", part: "noun" },
    { en: "particular", jp: "ある特定の", part: "adjective" },
    { en: "past", jp: "過ぎたばかりの、この～", part: "adjective" },
    { en: "poverty", jp: "貧乏、貧困", part: "noun" },
    { en: "region", jp: "地域、地方", part: "noun" },
    { en: "Spanish", jp: "スペイン語(の)", part: "noun" },
    { en: "third", jp: "第三に、3番目に", part: "adverb" },
    { en: "those", jp: "それらの、あれらの", part: "pronoun" },
    { en: "to begin with", jp: "第一に、初めに", part: "phrase" },
    { en: "under", jp: "～より少なく、～未満の", part: "preposition" },
    { en: "viewpoint", jp: "観点、立場", part: "noun" },
    // Daily Life Scene 4
    { en: "campaign", jp: "キャンペーン", part: "noun" },
    { en: "plastic", jp: "プラスチック(製の)", part: "noun" },
    { en: "recycle", jp: "～を再生利用する", part: "verb" }
];

// --- Unit 6 (P71-83) ---
const unit6_words = [
    { en: "animated movie", jp: "アニメ映画", part: "noun" },
    { en: "at the beginning of ~", jp: "～の初めに", part: "phrase" },
    { en: "be in trouble", jp: "困ったことになっている", part: "phrase" },
    { en: "beginning", jp: "最初、始まり", part: "noun" },
    { en: "best", jp: "最もよく、最も多く", part: "adverb" },
    { en: "conductor", jp: "指揮者", part: "noun" },
    { en: "direct", jp: "～を監督する", part: "verb" },
    { en: "heal", jp: "～を治す、救う、癒やす", part: "verb" },
    { en: "hear of ~", jp: "～のことを耳にする", part: "phrase" },
    { en: "hurt", jp: "～にけがをさせる、～を痛める", part: "verb" },
    { en: "London", jp: "ロンドン[英国の首都]", part: "noun" },
    { en: "magic trick", jp: "手品", part: "noun" },
    { en: "magician", jp: "手品師", part: "noun" },
    { en: "news", jp: "(個人的な)知らせ、情報", part: "noun" },
    { en: "strange", jp: "奇妙な、変な", part: "adjective" },
    { en: "tale", jp: "物語", part: "noun" },
    { en: "trouble", jp: "心配事、困ること", part: "noun" },
    { en: "won", jp: "win の過去形、過去分詞", part: "verb" },
    { en: "We could try that.", jp: "やってみたらどうだろう。", part: "phrase" },
    // You Can Do It! 2
    { en: "agricultural", jp: "農業の", part: "adjective" },
    { en: "crop", jp: "作物、収穫物", part: "noun" },
    { en: "grew", jp: "grow の過去形", part: "verb" },
    { en: "grow", jp: "～を育てる、～を栽培する", part: "verb" },
    { en: "kilogram", jp: "キログラム", part: "noun" },
    { en: "New Zealand", jp: "ニュージーランド", part: "noun" },
    { en: "reduce", jp: "～を減少させる", part: "verb" },
    { en: "rice", jp: "稲", part: "noun" },
    { en: "seed", jp: "種、種子", part: "noun" }
];

// --- Unit 7 (P85-91) ---
const unit7_words = [
    { en: "all year round", jp: "1年中", part: "phrase" },
    { en: "be different from ~", jp: "～と違っている", part: "phrase" },
    { en: "be full of ~", jp: "～でいっぱいである", part: "phrase" },
    { en: "come back", jp: "帰る、戻る", part: "phrase" },
    { en: "everywhere", jp: "どこでも", part: "adverb" },
    { en: "find ~ out", jp: "～を知る", part: "phrase" },
    { en: "go back to ~", jp: "～に戻る", part: "phrase" },
    { en: "graduate", jp: "卒業する", part: "verb" },
    { en: "Hawaii", jp: "ハワイ", part: "noun" },
    { en: "in a panic", jp: "あわてふためいて", part: "phrase" },
    { en: "in ~'s place", jp: "～の立場に(あったら)", part: "phrase" },
    { en: "lonely", jp: "ひとりぼっちの、孤独な", part: "adjective" },
    { en: "make a speech", jp: "スピーチをする", part: "phrase" },
    { en: "period", jp: "時代", part: "noun" },
    { en: "possible", jp: "可能な、ありうる", part: "adjective" },
    { en: "round", jp: "ぐるりと、巡って", part: "adverb" },
    { en: "sign language", jp: "手話", part: "noun" },
    { en: "speak to ~", jp: "～と話す", part: "phrase" },
    { en: "speech", jp: "スピーチ", part: "noun" },
    { en: "suddenly", jp: "突然、不意に", part: "adverb" },
    { en: "truth", jp: "真実", part: "noun" },
    { en: "unforgettable", jp: "忘れられない", part: "adjective" },
    { en: "wish", jp: "～であれば[すれば]いいのに", part: "verb" },
    { en: "worry", jp: "心配、不安", part: "noun" },
    { en: "I have no worries.", jp: "何も不安はありません。", part: "phrase" },
    { en: "The truth is (that) ~.", jp: "実は～である。", part: "phrase" }
];

// --- Let's Read 3 / Active Grammar 3 (P92-96) ---
const lets_read3_words = [
    { en: "across", jp: "～じゅうに、～のあちこちで", part: "preposition" },
    { en: "afraid", jp: "(～が)怖い", part: "adjective" },
    { en: "again and again", jp: "何度も、くり返して", part: "phrase" },
    { en: "air", jp: "空気", part: "noun" },
    { en: "and yet", jp: "それなのに", part: "phrase" },
    { en: "as if ~", jp: "まるで～(である)かのように", part: "phrase" },
    { en: "be afraid to ~", jp: "～するのが怖い、怖くて～できない", part: "phrase" },
    { en: "be willing to ~", jp: "～しようという気持ちがある", part: "phrase" },
    { en: "break", jp: "～を壊す", part: "verb" },
    { en: "breathe", jp: "～を吸いこむ、呼吸する", part: "verb" },
    { en: "bring back ~ / bring ~ back", jp: "～を生き返らせる", part: "phrase" },
    { en: "business", jp: "ビジネス、事業", part: "noun" },
    { en: "chemical", jp: "化学物質", part: "noun" },
    { en: "creature", jp: "生き物", part: "noun" },
    { en: "dead", jp: "死んだ、死んでいる", part: "adjective" },
    { en: "do the best", jp: "全力[最善]を尽くす", part: "phrase" },
    { en: "dying", jp: "死にかけている", part: "adjective" },
    { en: "extinct", jp: "絶滅した", part: "adjective" },
    { en: "government", jp: "政府", part: "noun" },
    { en: "hole", jp: "穴", part: "noun" },
    { en: "kindergarten", jp: "幼稚園", part: "noun" },
    { en: "medicine", jp: "薬", part: "noun" },
    { en: "northern", jp: "北の、北部の", part: "adjective" },
    { en: "once", jp: "かつて、以前", part: "adverb" },
    { en: "planet", jp: "惑星、[the ～で]地球", part: "noun" },
    { en: "rich", jp: "裕福な", part: "adjective" },
    { en: "solution", jp: "解決法", part: "noun" },
    { en: "stop", jp: "～をやめる、～を中止する", part: "verb" },
    { en: "sun", jp: "日光、日なた", part: "noun" },
    { en: "teach ~ not to ...", jp: "～に…しないように教える", part: "phrase" },
    { en: "throw", jp: "放る", part: "verb" },
    { en: "throw away", jp: "捨てる", part: "phrase" },
    { en: "waste", jp: "ごみ、廃棄物", part: "noun" },
    { en: "wealth", jp: "富", part: "noun" },
    { en: "work ~ out", jp: "～を解決する", part: "phrase" },
    { en: "yet", jp: "[副]それでもまだ、依然として [接]けれども、それにもかかわらず", part: "adverb" }, // Image: [副]... [接]...
    // Active Grammar 3
    { en: "bird", jp: "鳥", part: "noun" },
    { en: "fly", jp: "飛ぶ、飛行機で行く", part: "verb" }
];

// --- Unit 8 (P97-105) ---
const unit8_words = [
    { en: "be plain to see", jp: "一目瞭然である", part: "phrase" },
    { en: "blossom", jp: "(木の)花", part: "noun" },
    { en: "cheerful", jp: "陽気な、元気のいい", part: "adjective" },
    { en: "cherry blossom", jp: "桜の花", part: "noun" },
    { en: "enter", jp: "～に入る、～に入学する", part: "verb" },
    { en: "ever", jp: "[否]絶対に(～ない)", part: "adverb" },
    { en: "gather", jp: "集まる", part: "verb" },
    { en: "get together", jp: "集まる", part: "phrase" },
    { en: "go one's own way", jp: "自分の道を進む、思い通りにする", part: "phrase" },
    { en: "goodbye", jp: "[間]さようなら [名]別れの挨拶", part: "interjection" },
    { en: "hospitality", jp: "親切なもてなし", part: "noun" },
    { en: "keep in touch", jp: "連絡を取り合う", part: "phrase" },
    { en: "laugh", jp: "笑う", part: "verb" },
    { en: "letter", jp: "手紙", part: "noun" },
    { en: "lost", jp: "途方に暮れた、不安な", part: "adjective" },
    { en: "not only ~, but also ...", jp: "～ばかりでなく…も、～どころか…", part: "phrase" },
    { en: "plain", jp: "明白な、はっきりした", part: "adjective" },
    { en: "step", jp: "歩み、一歩", part: "noun" },
    { en: "take a step forward", jp: "1歩前に踏み出す", part: "phrase" },
    { en: "touch", jp: "接触", part: "noun" },
    { en: "until then", jp: "そのときまで(ずっと)", part: "phrase" },
    { en: "usual", jp: "いつもの", part: "adjective" },
    { en: "within", jp: "～以内で[に]", part: "preposition" },
    { en: "Have a safe trip!", jp: "(道中)気をつけてね。", part: "phrase" },
    { en: "Me, neither.", jp: "[否定の後で]私も。", part: "phrase" },
    // You Can Do It! 3
    { en: "advice", jp: "助言、アドバイス", part: "noun" },
    { en: "fail", jp: "失敗する", part: "verb" },
    { en: "go wrong", jp: "間違える、失敗する", part: "phrase" },
    { en: "honest", jp: "正直な、誠実な", part: "adjective" },
    { en: "in need", jp: "困って、必要で", part: "phrase" },
    { en: "take it easy", jp: "あせらずのんびりやる", part: "phrase" }
];


try {
    let content = fs.readFileSync(targetFile, 'utf8');

    // Find "here_we_go"
    const hwgStartRegex = /"here_we_go":\s*\{/;
    const hwgStartMatch = hwgStartRegex.exec(content);
    if (!hwgStartMatch) throw new Error("here_we_go section not found");

    const hwgContent = content.substring(hwgStartMatch.index);
    const grade3StartRegex = /"3":\s*\[/;
    const grade3MatchRelative = grade3StartRegex.exec(hwgContent);

    const grade3Array = [
        { unit: "Unit 1", pages: "P8〜17", words: unit1_words },
        { unit: "Unit 2", pages: "P19〜28", words: unit2_words },
        { unit: "Unit 3", pages: "P29〜39", words: unit3_words },
        { unit: "Let's Read 1 / You Can Do It! 1", pages: "P40〜45", words: lets_read1_words },
        { unit: "Unit 4", pages: "P47〜55", words: unit4_words },
        { unit: "Unit 5", pages: "P61〜70", words: unit5_words },
        { unit: "Unit 6 / You Can Do It! 2", pages: "P71〜83", words: unit6_words },
        { unit: "Unit 7", pages: "P85〜91", words: unit7_words },
        { unit: "Let's Read 3 / Active Grammar 3", pages: "P92〜96", words: lets_read3_words },
        { unit: "Unit 8 / You Can Do It! 3", pages: "P97〜105", words: unit8_words }
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
        const grade2StartRegex = /"2":\s*\[/;
        const grade2MatchRelative = grade2StartRegex.exec(hwgContent);
        if (!grade2MatchRelative) throw new Error("Grade 2 not found to append after");

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

        newContent = content.substring(0, grade2EndIndex) + ",\n        \"3\": " + newGrade3Json + content.substring(grade2EndIndex);
    }

    fs.writeFileSync(targetFile, newContent);
    console.log("Successfully added Here We Go Grade 3 (Unit 1-8) data.");

} catch (e) {
    console.error("Error:", e);
    process.exit(1);
}
