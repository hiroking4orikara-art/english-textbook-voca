const fs = require('fs');
const path = require('path');

const targetFile = path.join(__dirname, 'data.js');

// --- Unit 1 (P8-18) ---
const unit1_words = [
    { en: "back", jp: "(元に)戻って", part: "adverb" },
    { en: "can", jp: "[Can you ~?で] ～してくれませんか。", part: "auxiliary verb" },
    { en: "come out of ~", jp: "～から外へ出る", part: "phrase" },
    { en: "comic book", jp: "漫画本", part: "noun" },
    { en: "down", jp: "落ち込んだ、元気がない", part: "adjective" },
    { en: "else", jp: "その他に", part: "adverb" },
    { en: "feel", jp: "(～と)感じる、～を感じる", part: "verb" },
    { en: "feel down", jp: "落ち込む", part: "phrase" },
    { en: "for the first time in ~", jp: "～ぶりに", part: "phrase" },
    { en: "gift", jp: "贈り物", part: "noun" },
    { en: "half", jp: "半分(の)、2分の1(の)", part: "noun" },
    { en: "half a year", jp: "半年", part: "phrase" },
    { en: "keep", jp: "(日記・記録など)をつける", part: "verb" },
    { en: "look for ~", jp: "～をさがす", part: "phrase" },
    { en: "met", jp: "meet の過去形", part: "verb" },
    { en: "no", jp: "～のない", part: "adjective" },
    { en: "other", jp: "別の、他の", part: "adjective" },
    { en: "read", jp: "read の過去形", part: "verb" },
    { en: "same", jp: "同じ", part: "adjective" },
    { en: "scary", jp: "怖い、恐ろしい", part: "adjective" },
    { en: "view", jp: "眺め、風景、景色", part: "noun" },
    { en: "when", jp: "～するとき", part: "conjunction" },
    { en: "Can you ~?", jp: "～してくれませんか", part: "phrase" },
    { en: "I know.", jp: "そうですよね。", part: "phrase" },
    { en: "Long time no see.", jp: "久しぶりだね。", part: "phrase" },
    { en: "There you are!", jp: "そこにいたのですか。", part: "phrase" },
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
    { en: "Why don't you ~?", jp: "～してはどうですか。～しませんか。", part: "phrase" }
];

// --- Unit 2 (P19-29) ---
const unit2_words = [
    { en: "action", jp: "アクション", part: "noun" },
    { en: "actually", jp: "実は、実際は", part: "adverb" },
    { en: "all right", jp: "申し分ない", part: "adjective" },
    { en: "ball", jp: "ボール、玉", part: "noun" },
    { en: "beginner", jp: "初心者", part: "noun" },
    { en: "difficult", jp: "難しい、困難な", part: "adjective" },
    { en: "easy", jp: "簡単な、易しい、楽な", part: "adjective" },
    { en: "important", jp: "重要な、大切な", part: "adjective" },
    { en: "improve", jp: "～を向上させる[改善する]", part: "verb" },
    { en: "on the way home", jp: "家に帰る途中で", part: "phrase" },
    { en: "pass", jp: "[動](ボール)をパスする [名]パス", part: "verb" },
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
    { en: "each", jp: "おのおの", part: "noun" },
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
    { en: "wish", jp: "[wish to ～で]～したいと思う", part: "verb" }
];

// --- Unit 3 (P31-35) ---
const unit3_words = [
    { en: "a bit", jp: "少し、ちょっと", part: "phrase" },
    { en: "abroad", jp: "外国に[へ・で]", part: "adverb" },
    { en: "airport", jp: "空港", part: "noun" },
    { en: "all day", jp: "一日中", part: "phrase" },
    { en: "anything", jp: "何か", part: "pronoun" },
    { en: "aquarium", jp: "水族館", part: "noun" },
    { en: "arrival", jp: "到着", part: "noun" },
    { en: "arrive", jp: "着く、到着する", part: "verb" },
    { en: "be ready for ~", jp: "～の準備ができている", part: "phrase" },
    { en: "board", jp: "(～に)乗り込む、搭乗する", part: "verb" },
    { en: "both", jp: "両方、2人[つ]とも", part: "noun" },
    { en: "by", jp: "[時]～までに", part: "preposition" },
    { en: "care", jp: "世話、注意", part: "noun" },
    { en: "cloud", jp: "雲", part: "noun" },
    { en: "cool", jp: "涼しい、冷たい", part: "adjective" },
    { en: "email", jp: "Eメール、電子メール", part: "noun" },
    { en: "exit", jp: "出口", part: "noun" },
    { en: "feel free to ~", jp: "遠慮なく～する", part: "phrase" },
    { en: "few", jp: "[a ～で]少数の、いくつかの", part: "adjective" },
    { en: "forget", jp: "(～を)忘れる", part: "verb" },
    { en: "forward", jp: "先へ", part: "adverb" },
    { en: "free", jp: "自由な", part: "adjective" },
    { en: "go straight home", jp: "まっすぐ家に帰る", part: "phrase" },
    { en: "have a picnic", jp: "ピクニックをする", part: "phrase" },
    { en: "he'll", jp: "he will の短縮形", part: "phrase" },
    { en: "I'll", jp: "I will の短縮形", part: "phrase" },
    { en: "if", jp: "もし～ならば", part: "conjunction" },
    { en: "invite", jp: "～を招く", part: "verb" },
    { en: "look forward to -ing", jp: "～(すること)を楽しみに待つ", part: "phrase" },
    { en: "mind", jp: "～を気にする", part: "verb" },
    { en: "pass", jp: "通行証、乗車券", part: "noun" },
    { en: "plan", jp: "計画、予定", part: "noun" },
    { en: "rain", jp: "雨", part: "noun" },
    { en: "rainy", jp: "雨の、雨降りの", part: "adjective" },
    { en: "reply", jp: "返事、返信", part: "noun" },
    { en: "said", jp: "say の過去形", part: "verb" },
    { en: "she'll", jp: "she will の短縮形", part: "phrase" }, // Added
    { en: "show", jp: "(人)を案内する", part: "verb" },
    { en: "show ~ around", jp: "～を案内して回る", part: "phrase" },
    { en: "snow", jp: "雪", part: "noun" },
    { en: "snowy", jp: "雪の、雪の降る", part: "adjective" },
    { en: "stay", jp: "[stay at[in] ~で]～に滞在する、滞在", part: "verb" }, // Image: [stay at[in] ~で]～に滞在する [名]滞在
    { en: "subject", jp: "(Eメールの)件名", part: "noun" },
    { en: "swimming pool", jp: "プール", part: "noun" },
    { en: "the day after tomorrow", jp: "明後日", part: "phrase" },
    { en: "they'll", jp: "they will の短縮形", part: "phrase" }, // Added
    { en: "tomorrow", jp: "明日(は)", part: "noun" },
    { en: "weather", jp: "天気、天候", part: "noun" },
    { en: "we'll", jp: "we will の短縮形", part: "phrase" }, // Added
    { en: "week", jp: "週", part: "noun" },
    { en: "wind", jp: "風", part: "noun" },
    { en: "windy", jp: "風の強い、風のある", part: "adjective" },
    { en: "won't", jp: "will not の短縮形", part: "phrase" },
    { en: "worried", jp: "心配して、不安で", part: "adjective" },
    { en: "you'll", jp: "you will の短縮形", part: "phrase" }, // Added
    { en: "Are you kidding?", jp: "まさか。冗談でしょう。", part: "phrase" },
    { en: "I'd like to ~.", jp: "～したいです。", part: "phrase" },
    { en: "Same here.", jp: "私も同じです。", part: "phrase" },
    { en: "See you soon.", jp: "ではまた。", part: "phrase" },
    { en: "Take care.", jp: "じゃあ、またね。", part: "phrase" },
    { en: "Thanks for ~.", jp: "～をありがとう。", part: "phrase" },
    { en: "Welcome to ~!", jp: "～へようこそ。", part: "phrase" }
];

// --- Let's Read 1 (P42-47) ---
const lets_read1_words = [
    { en: "after a while", jp: "しばらくすると", part: "phrase" },
    { en: "ago", jp: "～前に", part: "adverb" },
    { en: "among", jp: "～に含まれて、～の中に", part: "preposition" },
    { en: "Anything else?", jp: "他に何かありますか。", part: "phrase" },
    { en: "area", jp: "エリア、区域", part: "noun" },
    { en: "a bag of ~", jp: "1袋の～", part: "phrase" },
    { en: "be wrong about ~", jp: "～を考え違いしている", part: "phrase" },
    { en: "boy", jp: "男の子、少年", part: "noun" },
    { en: "cause a scene", jp: "騒ぎを起こす", part: "phrase" },
    { en: "Certainly.", jp: "はい、かしこまりました。", part: "phrase" },
    { en: "country", jp: "国", part: "noun" },
    { en: "decide to ~", jp: "～することに決める", part: "phrase" },
    { en: "each time ~", jp: "～するごとに", part: "phrase" },
    { en: "felt", jp: "feel の過去形", part: "verb" },
    { en: "finally", jp: "やっと(のことで)", part: "adverb" }, // Image: finally (read 1), finally (unit 6) -> read 1: "やっと(のことで)"
    { en: "for now", jp: "今のところ", part: "phrase" },
    { en: "garden", jp: "庭、菜園、花壇", part: "noun" },
    { en: "gave", jp: "give の過去形", part: "verb" },
    { en: "girl", jp: "女の子、少女", part: "noun" },
    { en: "give", jp: "～を与える、～をあげる", part: "verb" },
    { en: "in half", jp: "半分に", part: "phrase" },
    { en: "into", jp: "～の中へ[に]", part: "preposition" },
    { en: "juice", jp: "ジュース", part: "noun" },
    { en: "last", jp: "最後の", part: "adjective" },
    { en: "man", jp: "男性", part: "noun" },
    { en: "mean", jp: "～を意味する", part: "verb" },
    { en: "nothing", jp: "何も～ない", part: "noun" },
    { en: "open", jp: "～を開く", part: "verb" },
    { en: "put", jp: "put の過去形", part: "verb" },
    { en: "put away ~", jp: "～をしまう", part: "phrase" },
    { en: "quickly", jp: "急いで、速く", part: "adverb" },
    { en: "salad", jp: "サラダ", part: "noun" },
    { en: "share ~ with ...", jp: "～を…と分け合う", part: "phrase" },
    { en: "sit down", jp: "座る", part: "phrase" },
    { en: "~, so that ...", jp: "～、それで…", part: "phrase" }, // Grammar?
    { en: "That's all.", jp: "それだけです。", part: "phrase" },
    { en: "thought", jp: "think の過去形", part: "verb" },
    { en: "to one's horror", jp: "ぞっとしたことには", part: "phrase" },
    { en: "until", jp: "～まで(ずっと)", part: "preposition" },
    { en: "without", jp: "～なしに", part: "preposition" },
    { en: "woman", jp: "女性", part: "noun" },
    { en: "Yes, please.", jp: "はい、お願いします。", part: "phrase" },
    { en: "young", jp: "若い", part: "adjective" }
];

// --- Unit 4 (P49-58) ---
const unit4_words = [
    { en: "amazing", jp: "びっくりするような", part: "adjective" },
    { en: "borrow", jp: "～を借りる", part: "verb" },
    { en: "cafe", jp: "カフェ、喫茶店", part: "noun" },
    { en: "check out ~", jp: "～を見てみる、～に注目する", part: "phrase" },
    { en: "clothes", jp: "衣服", part: "noun" },
    { en: "collect", jp: "～を集める", part: "verb" },
    { en: "especially", jp: "特に、とりわけ", part: "adverb" },
    { en: "expensive", jp: "高価な", part: "adjective" },
    { en: "feel like -ing", jp: "～したい気がする", part: "phrase" },
    { en: "first", jp: "まず、最初に、第一に", part: "adverb" },
    { en: "for example", jp: "例えば", part: "phrase" },
    { en: "go in", jp: "中に入る", part: "phrase" },
    { en: "here and there", jp: "あちこちに", part: "phrase" },
    { en: "knee", jp: "ひざ", part: "noun" },
    { en: "make a plan", jp: "計画を立てる", part: "phrase" },
    { en: "near there", jp: "その近くに[で]", part: "phrase" },
    { en: "need to ~", jp: "～する必要がある", part: "phrase" },
    { en: "one of ~", jp: "～のうちの1つ、1人", part: "phrase" },
    { en: "over there", jp: "あそこに、あちらに", part: "phrase" },
    { en: "produce", jp: "～を生産する", part: "verb" },
    { en: "right now", jp: "すぐに", part: "phrase" },
    { en: "rule", jp: "規則、決まり", part: "noun" },
    { en: "send", jp: "～を送る", part: "verb" },
    { en: "shoulder", jp: "肩", part: "noun" },
    { en: "show ~ the way", jp: "～に道を教える", part: "phrase" },
    { en: "soup", jp: "スープ", part: "noun" },
    { en: "spring", jp: "泉", part: "noun" },
    { en: "use", jp: "使うこと、使用、使い道", part: "noun" },
    { en: "wear", jp: "～を着て[身につけて]いる", part: "verb" },
    { en: "while", jp: "～している間に", part: "conjunction" },
    { en: "Here you are.", jp: "さあどうぞ。", part: "phrase" },
    { en: "~, I guess.", jp: "～だと思います。", part: "phrase" },
    { en: "Thanks, but I'm OK.", jp: "ありがとう、でも結構です。", part: "phrase" }
];

// --- Unit 5 (P59-70) ---
const unit5_words = [
    { en: "again", jp: "再び、もう一度", part: "adverb" },
    { en: "Are you OK?", jp: "大丈夫ですか。", part: "phrase" },
    { en: "bottle", jp: "ボトル、びん", part: "noun" },
    { en: "call for ~", jp: "～を求める、～を頼む", part: "phrase" },
    { en: "car", jp: "自動車", part: "noun" },
    { en: "center", jp: "センター、中心施設", part: "noun" },
    { en: "change to ~", jp: "～に乗り換える", part: "phrase" },
    { en: "close", jp: "～を閉める", part: "verb" },
    { en: "depend on ~", jp: "～次第である", part: "phrase" },
    { en: "disaster", jp: "災害", part: "noun" },
    { en: "doctor", jp: "医者、医師", part: "noun" },
    { en: "drop", jp: "体(の一部)を低くする", part: "verb" },
    { en: "early", jp: "早く", part: "adverb" },
    { en: "fire", jp: "火事、火災", part: "noun" },
    { en: "follow", jp: "～の後について行く[来る]", part: "verb" },
    { en: "get into ~", jp: "～の中へ入る", part: "phrase" },
    { en: "get off", jp: "(列車・バスなどから)降りる", part: "verb" },
    { en: "go home", jp: "家に帰る", part: "phrase" },
    { en: "have to ~", jp: "～しなければならない", part: "phrase" },
    { en: "head", jp: "頭、頭部", part: "noun" },
    { en: "headache", jp: "頭痛", part: "noun" },
    { en: "helpful", jp: "役立つ、助けになる", part: "adjective" },
    { en: "hit", jp: "(嵐などが)襲う", part: "verb" },
    { en: "hold on", jp: "しがみつく、つかまる", part: "phrase" },
    { en: "how to ~", jp: "～する方法", part: "phrase" },
    { en: "in a group", jp: "グループで、集団の中で", part: "phrase" },
    { en: "in advance", jp: "前もって、あらかじめ", part: "phrase" },
    { en: "in some cases", jp: "場合によっては", part: "phrase" },
    { en: "keep -ing", jp: "～し続ける", part: "phrase" },
    { en: "leave", jp: "(～を)去る、離れる、～をあとに残す", part: "verb" }, // merged defs
    { en: "list", jp: "リスト、一覧表", part: "noun" },
    { en: "little", jp: "小さい、年少の、若い", part: "adjective" },
    { en: "market", jp: "市場", part: "noun" },
    { en: "must", jp: "～しなければならない", part: "auxiliary verb" },
    { en: "natural", jp: "自然の", part: "adjective" },
    { en: "necessary", jp: "必要な", part: "adjective" },
    { en: "poster", jp: "ポスター", part: "noun" },
    { en: "prepare", jp: "(～を)用意する、準備する", part: "verb" },
    { en: "remember", jp: "[remember to ～で]忘れずに～する", part: "verb" },
    { en: "safe", jp: "安全な、無事な", part: "adjective" },
    { en: "save", jp: "～を救う、～を助ける", part: "verb" },
    { en: "see a doctor", jp: "医師に診てもらう", part: "phrase" },
    { en: "should", jp: "～した方がよい", part: "auxiliary verb" },
    { en: "sick", jp: "病気の", part: "adjective" },
    { en: "situation", jp: "状況", part: "noun" },
    { en: "stay away from ~", jp: "～から離れている", part: "phrase" },
    { en: "subway", jp: "地下鉄", part: "noun" },
    { en: "take a rest", jp: "ひと休みする", part: "phrase" },
    { en: "take care of ~", jp: "～の世話をする", part: "phrase" },
    { en: "tall", jp: "背の高い、(細長く)高い", part: "adjective" },
    { en: "ticket", jp: "切符、チケット", part: "noun" },
    { en: "tower", jp: "塔、タワー", part: "noun" },
    { en: "tree", jp: "木", part: "noun" },
    { en: "type", jp: "タイプ、種類", part: "noun" },
    { en: "umbrella", jp: "傘", part: "noun" },
    { en: "useful", jp: "有用な、役に立つ", part: "adjective" },
    { en: "water", jp: "水", part: "noun" },
    { en: "window", jp: "窓", part: "noun" },
    { en: "Let's see.", jp: "ええっと。", part: "phrase" },
    { en: "May I ~", jp: "～してもよろしいですか。", part: "phrase" },
    { en: "What's the matter?", jp: "どうしましたか。", part: "phrase" },
    { en: "Will you ~?", jp: "～してくれませんか。[依頼]", part: "phrase" },
    { en: "Would you ~?", jp: "～してくれませんか。", part: "phrase" }
];

// --- Unit 6 (P71-81) ---
const unit6_words = [
    { en: "all over the world", jp: "世界中で", part: "phrase" },
    { en: "all the ~", jp: "全ての～", part: "phrase" },
    { en: "another", jp: "別の、他の", part: "adjective" },
    { en: "become", jp: "～になる", part: "verb" },
    { en: "before", jp: "～する前に", part: "conjunction" },
    { en: "body", jp: "体、(文章の)本論", part: "noun" },
    { en: "drive", jp: "車で行く、車を運転する", part: "verb" },
    { en: "earth", jp: "地球", part: "noun" },
    { en: "exam", jp: "試験、テスト", part: "noun" },
    { en: "experience", jp: "経験、体験", part: "noun" },
    { en: "future", jp: "未来の、将来の、これからの", part: "adjective" },
    { en: "glad", jp: "～をうれしく思う", part: "adjective" },
    { en: "I think so.", jp: "そう思います。", part: "phrase" },
    { en: "I'll think about it.", jp: "考えておきます。", part: "phrase" },
    { en: "language", jp: "言語", part: "noun" },
    { en: "learn to ~", jp: "～できるようになる", part: "phrase" },
    { en: "live", jp: "暮らす、生活する", part: "verb" },
    { en: "look up ~", jp: "～を調べる", part: "phrase" },
    { en: "make friends", jp: "友達を作る", part: "phrase" },
    { en: "member", jp: "メンバー、一員", part: "noun" },
    { en: "pass", jp: "(試験)に合格する、～を通過する", part: "verb" },
    { en: "pay attention to ~", jp: "～に注意を払う", part: "phrase" },
    { en: "pick up ~", jp: "～を拾い上げる", part: "phrase" },
    { en: "social", jp: "社会の", part: "adjective" },
    { en: "someone", jp: "だれか、ある人", part: "pronoun" },
    { en: "spend", jp: "(時)を過ごす、～を費やす", part: "verb" },
    { en: "step", jp: "(階段などの)段", part: "noun" },
    { en: "think about ~", jp: "～のことをよく考える", part: "phrase" },
    { en: "train", jp: "訓練を受ける、トレーニングをする", part: "verb" },
    { en: "travel", jp: "旅行する", part: "verb" },
    { en: "volunteer", jp: "進んで申し出る、ボランティアをする", part: "verb" },
    { en: "website", jp: "ウェブサイト", part: "noun" },
    { en: "world", jp: "世界、地球", part: "noun" }
];

// --- Let's Read 2 (P82-89) ---
const lets_read2_words = [
    { en: "able", jp: "[be able to ～で]～することができる", part: "adjective" },
    { en: "above all", jp: "何よりも", part: "phrase" },
    { en: "all of ~", jp: "～の(うちの)全て、みんな", part: "phrase" },
    { en: "American", jp: "アメリカ(人)の", part: "adjective" },
    { en: "ask ~ to ...", jp: "～に…するように頼む", part: "phrase" },
    { en: "be on one's side", jp: "～の味方である", part: "phrase" },
    { en: "became", jp: "become の過去形", part: "verb" },
    { en: "because of ~", jp: "～の理由[おかげ]で", part: "phrase" },
    { en: "continue", jp: "～を続ける", part: "verb" },
    { en: "do one's best", jp: "全力を尽くす", part: "phrase" },
    { en: "event", jp: "出来事", part: "noun" },
    { en: "everything I can", jp: "できること全て", part: "phrase" },
    { en: "experience", jp: "～を経験する", part: "verb" },
    { en: "finally", jp: "最後に", part: "adverb" },
    { en: "just", jp: "本当に、全く", part: "adverb" },
    { en: "large", jp: "大きい、広い", part: "adjective" },
    { en: "may", jp: "～かもしれない", part: "auxiliary verb" },
    { en: "online", jp: "オンラインの[で]", part: "adjective" },
    { en: "opinion", jp: "意見、考え", part: "noun" },
    { en: "price", jp: "価格、値段", part: "noun" },
    { en: "receive", jp: "～を受け取る", part: "verb" },
    { en: "same", jp: "[the ～で]同じこと[もの]", part: "adjective" },
    { en: "side", jp: "(～の)側", part: "noun" },
    { en: "skill", jp: "技量", part: "noun" },
    { en: "speak", jp: "(～を)話す", part: "verb" },
    { en: "spoke", jp: "speak の過去形", part: "verb" },
    { en: "support", jp: "～を支援する、支える", part: "verb" },
    { en: "take away", jp: "～を奪う", part: "phrase" },
    { en: "up close", jp: "近くで[に]", part: "phrase" },
    { en: "visit", jp: "見物、訪問", part: "noun" },
    { en: "way", jp: "やり方、方法、～のように", part: "noun" },
    { en: "word", jp: "語、単語、言葉", part: "noun" }
];

// --- Unit 7 (P91-99) ---
const unit7_words = [
    { en: "answer", jp: "答え", part: "noun" },
    { en: "better", jp: "[goodの比較級]よりよい", part: "adjective" },
    { en: "blow one's lines", jp: "せりふを忘れる", part: "phrase" },
    { en: "break", jp: "小休止、休憩", part: "noun" },
    { en: "calm down", jp: "落ち着く", part: "phrase" },
    { en: "castle", jp: "城", part: "noun" },
    { en: "come up with ~", jp: "～を思いつく", part: "phrase" },
    { en: "friendship", jp: "友情", part: "noun" },
    { en: "international", jp: "国際的な", part: "adjective" },
    { en: "letter", jp: "文字", part: "noun" },
    { en: "normal", jp: "標準の、ふつうの", part: "adjective" },
    { en: "other", jp: "[the ～で](2つのうち)もう一方のもの[人]、[the ～sで](3つ以上のうち)その他全てのもの[人]", part: "noun" },
    { en: "perform", jp: "～を上演する", part: "verb" },
    { en: "play", jp: "劇、芝居", part: "noun" },
    { en: "point", jp: "論点、意見", part: "noun" },
    { en: "question", jp: "質問", part: "noun" },
    { en: "remember", jp: "～を覚えている", part: "verb" },
    { en: "script", jp: "脚本、台本", part: "noun" },
    { en: "size", jp: "大きさ", part: "noun" },
    { en: "take a break", jp: "ひと休みする", part: "phrase" },
    { en: "take place", jp: "起こる、行われる", part: "phrase" },
    { en: "than", jp: "～よりも", part: "conjunction" },
    { en: "What did you say?", jp: "何だって。", part: "phrase" },
    { en: "Yes, but ....", jp: "そうですよね。一方で…。", part: "phrase" }
];

// --- Unit 8 (P101-110) ---
const unit8_words = [
    { en: "apologize (to ~) (for ...)", jp: "(～に)…のことで謝る", part: "phrase" },
    { en: "~ as well as ...", jp: "…だけでなく～も", part: "phrase" },
    { en: "be hard on ~", jp: "～に厳しく当たる", part: "phrase" },
    { en: "build", jp: "～を建てる、～を作る", part: "verb" },
    { en: "chocolate", jp: "チョコレート", part: "noun" },
    { en: "clear", jp: "晴れた", part: "adjective" },
    { en: "Come on.", jp: "さあさあ。", part: "phrase" },
    { en: "create", jp: "～を創り出す", part: "verb" },
    { en: "design", jp: "～をデザインする", part: "verb" },
    { en: "different", jp: "違った、異なった", part: "adjective" },
    { en: "Do you have a second?", jp: "ちょっといいですか。", part: "phrase" },
    { en: "do fine", jp: "ちゃんとする", part: "phrase" },
    { en: "forever", jp: "永遠に", part: "adverb" },
    { en: "go well", jp: "うまくいく", part: "phrase" },
    { en: "I didn't mean it.", jp: "そういうつもりではなかったんだ。", part: "phrase" },
    { en: "I hope you'll like it.", jp: "気に入ってくれたらうれしいです。", part: "phrase" },
    { en: "I love it!", jp: "とても気に入りました。", part: "phrase" },
    { en: "in ~ minute(s)", jp: "あと～分で", part: "phrase" },
    { en: "lose", jp: "～を失う、～をなくす", part: "verb" },
    { en: "make", jp: "～を…にする", part: "verb" },
    { en: "make ~ of ...", jp: "…で～を作る[もとの材料がすぐわかる場合]", part: "phrase" },
    { en: "make up", jp: "仲直りする", part: "phrase" },
    { en: "performance", jp: "公演、上演", part: "noun" },
    { en: "play", jp: "～の役を演じる", part: "verb" },
    { en: "push", jp: "～を押す", part: "verb" },
    { en: "sea", jp: "海", part: "noun" },
    { en: "sky", jp: "空", part: "noun" },
    { en: "soft", jp: "柔らかい", part: "adjective" },
    { en: "stage", jp: "舞台、ステージ", part: "noun" },
    { en: "taken", jp: "take の過去分詞", part: "verb" },
    { en: "try one's best", jp: "全力を尽くす", part: "phrase" },
    { en: "We're on in five minutes.", jp: "あと5分で出番だ。", part: "phrase" },
    { en: "written", jp: "write の過去分詞", part: "verb" },
    { en: "you know", jp: "ほらあの、ねえ", part: "phrase" }
];

// --- Let's Read 3 (P112-117) ---
const lets_read3_words = [
    { en: "around the world", jp: "世界中で", part: "phrase" },
    { en: "be born", jp: "生まれる", part: "phrase" },
    { en: "be careful of ~", jp: "～に気をつける", part: "phrase" },
    { en: "better", jp: "よりよく、より以上に", part: "adverb" },
    { en: "born", jp: "bear の過去分詞", part: "verb" },
    { en: "both ~ and ...", jp: "～も…も(両方とも)", part: "phrase" },
    { en: "careful", jp: "注意深い、慎重な", part: "adjective" },
    { en: "conversation", jp: "会話", part: "noun" },
    { en: "culture", jp: "文化", part: "noun" },
    { en: "day", jp: "時代、時期", part: "noun" },
    { en: "dictionary", jp: "辞書", part: "noun" },
    { en: "difference", jp: "違い", part: "noun" },
    { en: "expression", jp: "表情", part: "noun" },
    { en: "fact", jp: "事実", part: "noun" },
    { en: "hand", jp: "手", part: "noun" },
    { en: "in fact", jp: "実際(は)、実のところ", part: "phrase" },
    { en: "introduce ~ to ...", jp: "～を…に導入する", part: "phrase" },
    { en: "invent", jp: "～を創り出す、発明する", part: "verb" },
    { en: "local", jp: "その土地の、地元の", part: "adjective" },
    { en: "meaning", jp: "意味", part: "noun" },
    { en: "mobile phone", jp: "携帯電話", part: "noun" },
    { en: "modern", jp: "現代の", part: "adjective" },
    { en: "more than ~", jp: "～よりも多い", part: "phrase" },
    { en: "negative", jp: "後ろ向きな", part: "adjective" },
    { en: "population", jp: "人口", part: "noun" },
    { en: "positive", jp: "前向きな、積極的な", part: "adjective" },
    { en: "smartphone", jp: "スマートフォン", part: "noun" },
    { en: "so ~ that ...", jp: "とても～なので…", part: "phrase" },
    { en: "specialty", jp: "特産[名産]品", part: "noun" },
    { en: "study", jp: "～を調べる", part: "verb" },
    { en: "tear", jp: "涙", part: "noun" },
    { en: "tears of joy", jp: "うれし涙", part: "phrase" },
    { en: "That's why ~.", jp: "それが～の理由です。", part: "phrase" },
    { en: "various", jp: "さまざまな", part: "adjective" },
    { en: "wave", jp: "～を振る", part: "verb" }
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
        { unit: "Unit 3", pages: "P31〜41", words: unit3_words },
        { unit: "Let's Read 1 / You Can Do It! 1", pages: "P42〜47", words: lets_read1_words },
        { unit: "Unit 4", pages: "P49〜58", words: unit4_words },
        { unit: "Unit 5", pages: "P59〜70", words: unit5_words },
        { unit: "Unit 6", pages: "P71〜81", words: unit6_words },
        { unit: "Let's Read 2 / Daily Life Scene 7", pages: "P82〜89", words: lets_read2_words },
        { unit: "Unit 7", pages: "P91〜99", words: unit7_words },
        { unit: "Unit 8", pages: "P101〜110", words: unit8_words },
        { unit: "Let's Read 3 / You Can Do It! 3", pages: "P112〜117", words: lets_read3_words }
    ];

    const newGrade2Json = JSON.stringify(grade2Array, null, 4);

    const newContent = content.substring(0, grade2StartIndex + grade2MatchRelative[0].length - 1) +
        newGrade2Json +
        content.substring(grade2EndIndex);

    fs.writeFileSync(targetFile, newContent);
    console.log("Successfully added Here We Go Grade 2 (Full Unit 1-8) data.");

} catch (e) {
    console.error("Error:", e);
    process.exit(1);
}
