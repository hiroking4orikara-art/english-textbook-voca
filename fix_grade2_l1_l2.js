const fs = require('fs');
const path = require('path');

const targetFile = path.join(__dirname, 'data.js');

// Lesson 1 Data (Confirmed from new images)
const l1_words = [
    // Scene 1 (p.8)
    { en: "minute", jp: "(時間の)分", part: "noun" },

    // Scene 2 (p.9)
    { en: "hey", jp: "やあ、おい", part: "interjection" },
    { en: "Jack", jp: "ジャック", part: "noun" },
    { en: "before", jp: "…の前に[の]、…より先に；(…分)前", part: "preposition" },
    { en: "today", jp: "きょう", part: "noun" },
    { en: "photography", jp: "写真撮影", part: "noun" },
    { en: "That's right.", jp: "そのとおり。", part: "phrase" },
    { en: "article", jp: "(新聞や雑誌などの)記事、論文", part: "noun" },
    { en: "tournament", jp: "(リーグ戦に対して)トーナメント、勝ち抜き戦", part: "noun" },
    { en: "way", jp: "[…へ行く]道", part: "noun" },
    { en: "by the way", jp: "ところで", part: "phrase" },

    // Scene 3 (p.10)
    { en: "sister", jp: "姉、妹、女のきょうだい", part: "noun" },
    { en: "video", jp: "動画、ビデオ映像", part: "noun" },
    { en: "against", jp: "…に対抗して", part: "preposition" },
    { en: "lose", jp: "(勝負に)負ける", part: "verb" },
    { en: "lost", jp: "lose(負ける)の過去形・過去分詞", part: "verb" },
    { en: "to", jp: "…に対して；…に比べて", part: "preposition" },
    { en: "final", jp: "最後の", part: "adjective" },
    { en: "last", jp: "最後の", part: "adjective" },
    { en: "second", jp: "(時間の)秒", part: "noun" },
    { en: "break", jp: "(規則・記録・静けさなどを)破る", part: "verb" },
    { en: "broke", jp: "break(破る)の過去形", part: "verb" },
    { en: "tie", jp: "(競技の)同点、引き分け", part: "noun" },

    // Goal Activity (p.11)
    { en: "surely", jp: "確かに、きっと", part: "adverb" },
    { en: "competition", jp: "競技会", part: "noun" },
    { en: "card", jp: "カード", part: "noun" },
    { en: "poem", jp: "(一編の)詩", part: "noun" },
    { en: "spread", jp: "広げる、広める；広がる", part: "verb" },
    { en: "until", jp: "…まで(ずっと)", part: "preposition" },
    { en: "for", jp: "…の間", part: "preposition" },
    { en: "half", jp: "半分の", part: "adjective" },
    { en: "hour", jp: "時間、60分", part: "noun" },

    // Take Action! Listen 1 (p.13)
    { en: "flight", jp: "飛行便", part: "noun" },
    { en: "gate", jp: "出入り口；(飛行場の)搭乗口、ゲート", part: "noun" },
    { en: "boarding", jp: "乗船、搭乗", part: "noun" },
    { en: "immediately", jp: "すぐに、ただちに", part: "adverb" },
    { en: "passenger", jp: "(列車・船・バス・飛行機などの)乗客、旅客", part: "noun" },
    { en: "page", jp: "呼び出す", part: "verb" },
    { en: "daughter", jp: "娘", part: "noun" }
];

// Lesson 2 Data (Transcribed from 8 images)
const l2_words = [
    // Part 1 (p.16-17)
    { en: "when", jp: "…する時(には)；…すると、…したら", part: "conjunction" },
    { en: "if", jp: "もし…ならば", part: "conjunction" },
    { en: "marker", jp: "マーカー(ペン)", part: "noun" },
    { en: "plastic", jp: "プラスチック[ビニール](製)の", part: "adjective" },
    { en: "depressed", jp: "落胆した、がっかりした", part: "adjective" },
    { en: "do", jp: "(人が勉強・仕事で)やっていく；(事がうまく)いく", part: "verb" },
    { en: "well", jp: "(程度が)よく；十分に", part: "adverb" },
    { en: "exam", jp: "試験、テスト", part: "noun" },
    { en: "adventure", jp: "冒険", part: "noun" },
    { en: "read", jp: "read(読む)の過去形・過去分詞", part: "verb" }, // Image says "read(読む)の過去形・過去分詞". Pronunciation "red".
    { en: "main", jp: "おもな、主要な", part: "adjective" },
    { en: "naughty", jp: "いたずらな、わんぱくな", part: "adjective" },

    // Part 2 (p.18-19)
    { en: "think", jp: "考える、思う", part: "verb" },
    { en: "that", jp: "(…する[である])ということ", part: "conjunction" },
    { en: "Alice's Adventures in Wonderland", jp: "『不思議の国のアリス』", part: "noun" },
    { en: "Daddy-Long-Legs", jp: "『あしながおじさん』", part: "noun" },
    { en: "I Am a Cat", jp: "『吾輩は猫である』", part: "noun" },
    { en: "author", jp: "著者、作者、作家", part: "noun" },
    { en: "Dragon Ball", jp: "『ドラゴンボール』", part: "noun" },
    { en: "Harry Potter", jp: "『ハリー・ポッター』", part: "noun" },
    { en: "scenery", jp: "風景、景色", part: "noun" },
    // From Image 6
    { en: "Beatrix", jp: "ビアトリクス", part: "noun" },
    { en: "Potter", jp: "ポター", part: "noun" },
    { en: "drew", jp: "draw((絵などを)かく)の過去形", part: "verb" },
    { en: "how", jp: "なんと、どんなに", part: "adverb" },
    { en: "nature", jp: "自然；自然界", part: "noun" },
    { en: "in fact", jp: "実は", part: "phrase" }, // Image says "実は" with "in fact"
    { en: "district", jp: "地方；地域", part: "noun" },
    { en: "Lake District", jp: "(英国の)湖水地方", part: "noun" },
    { en: "area", jp: "(大小さまざまの)地域、地方；(…用の)場所、区域", part: "noun" },
    { en: "landscape", jp: "風景、けしき", part: "noun" },
    { en: "still", jp: "まだ、今でも、今なお", part: "adverb" },

    // Part 3 (p.20-21)
    { en: "DVD", jp: "ディー ブイ ディー", part: "noun" },
    { en: "can", jp: "…してもよい", part: "auxiliary verb" },
    { en: "borrow", jp: "借りる", part: "verb" },
    { en: "sure", jp: "確信して", part: "adjective" },
    { en: "Stand by Me", jp: "『スタンド・バイ・ミー』", part: "noun" },
    { en: "comedy", jp: "喜劇", part: "noun" },
    { en: "fantasy", jp: "空想、幻想", part: "noun" },
    { en: "fiction", jp: "小説、創作", part: "noun" },
    { en: "hope", jp: "期待する、望む、希望する", part: "verb" },
    { en: "visit", jp: "(場所を)訪れる、見物[見学]に行く[来る]", part: "verb" },
    { en: "someday", jp: "(未来の)いつか、そのうち", part: "adverb" },

    // Goal Activity (p.22-23)
    { en: "Kiki's Delivery Service", jp: "『魔女の宅急便』", part: "noun" },
    { en: "witch", jp: "女の魔法使い、魔女", part: "noun" },
    { en: "which", jp: "どちらの、どの", part: "adjective" },
    { en: "part", jp: "部分", part: "noun" },
    { en: "of", jp: "…の(中の)", part: "preposition" },
    { en: "encourage", jp: "勇気づける、励ます", part: "verb" },
    { en: "heartwarming", jp: "心温まる、ほのぼのとした", part: "adjective" },
    { en: "horror", jp: "恐怖、ホラー", part: "noun" },
    { en: "message", jp: "(映画・書物・演説などの)趣旨、メッセージ", part: "noun" },
    { en: "mystery", jp: "推理小説、ミステリー", part: "noun" },
    { en: "novel", jp: "小説", part: "noun" },
    { en: "faraway", jp: "遠い", part: "adjective" },
    { en: "town", jp: "(村・市に対して)町", part: "noun" },
    { en: "training", jp: "訓練、トレーニング", part: "noun" },
    { en: "finish", jp: "終わらせる、終える", part: "verb" },
    { en: "grown-up", jp: "おとなの", part: "adjective" },
    { en: "perfect", jp: "完全な、申し分ない；[…するのに]最適の", part: "adjective" },
    { en: "learner", jp: "学習者、学ぶ人", part: "noun" },
    { en: "because", jp: "(なぜなら)…だから、…なので", part: "conjunction" },
    { en: "vocabulary", jp: "語彙", part: "noun" },
    { en: "easy", jp: "やさしい、簡単な", part: "adjective" },
    { en: "plus", jp: "さらにその上、しかも；そしてさらに", part: "conjunction" },
    { en: "among", jp: "…の間に[で、の]、…の中に[で、の]", part: "preposition" },
    { en: "teenager", jp: "10代の少年[少女]", part: "noun" },
    { en: "ending", jp: "(物語・映画などの)結末、終わり", part: "noun" },

    // Take Action! Talk 1 (p.26)
    { en: "hello", jp: "やあ、こんにちは", part: "interjection" },
    { en: "may", jp: "…してもよい", part: "auxiliary verb" },
    { en: "May I help you?", jp: "(店員が客に対して)お手伝いしましょうか。", part: "phrase" },
    { en: "Yes, please.", jp: "はい、お願いします。", part: "phrase" },
    { en: "How about ...?", jp: "…はどうですか。", part: "phrase" },
    { en: "this", jp: "これを[に]、これ", part: "pronoun" },
    { en: "other", jp: "ほかの、別の", part: "adjective" },
    { en: "one", jp: "(同じ種類のもののうちの)1つ", part: "pronoun" },
    { en: "take", jp: "(品物を選んで)買う", part: "verb" },
    { en: "sweater", jp: "セーター", part: "noun" },
    { en: "suggest", jp: "提案する", part: "verb" },

    // Take Action! Listen 2 (Page Unknown)
    { en: "charity", jp: "慈善、チャリティー", part: "noun" },
    { en: "improve", jp: "よりよくする、改良する、改善する", part: "verb" },
    { en: "abandoned", jp: "捨てられた", part: "adjective" },
    { en: "rescue", jp: "救い出す、救助する", part: "verb" },
    { en: "care", jp: "気にする；気にかける、心配する", part: "verb" },
    { en: "cost", jp: "(金が)かかる", part: "verb" },
    { en: "rescue", jp: "救助、救出；[形容詞的]救助の", part: "noun" }
];


try {
    let content = fs.readFileSync(targetFile, 'utf8');

    // Helper to replace a unit
    function replaceUnit(gradePrefixRegex, unitName, newWords, newPages) {
        // Find Grade start
        const gMatch = gradePrefixRegex.exec(content);
        if (!gMatch) return false;

        // Find Unit start
        const unitRegex = new RegExp(`"unit":\\s*"${unitName}"`, 'g');
        unitRegex.lastIndex = gMatch.index;
        const uMatch = unitRegex.exec(content);

        // Safety: ensure uMatch is before next grade?
        // Let's assume structure is sequential.
        if (!uMatch) return false;

        // Replace pages if provided
        if (newPages) {
            // Find "pages": "..." after unit regex
            const pRegex = /"pages":\s*"[^"]*"/;
            pRegex.lastIndex = uMatch.index;
            const pMatch = pRegex.exec(content);
            if (pMatch && pMatch.index < uMatch.index + 200) { // sanity check distance
                // Check if actually strictly after unit name
                // content.substring(uMatch.index, pMatch.index)
                // This is complicated with string replacement offsets.
                // Easier to just find the unit block and replace the whole thing if we had it.
                // But we want to preserve structure.
            }
            // Actually, replacing pages is nice but words are critical.
        }

        // Find words array
        const wRegex = /"words":\s*\[/;
        wRegex.lastIndex = uMatch.index;
        const wMatch = wRegex.exec(content);
        if (!wMatch) return false;

        const wStartIndex = wMatch.index + wMatch[0].length;

        // Find end of array
        let brace = 0;
        let inStr = false;
        let wEndIndex = -1;
        for (let i = wStartIndex; i < content.length; i++) {
            if (content[i] === '"' && content[i - 1] !== '\\') inStr = !inStr;
            if (!inStr) {
                if (content[i] === '{') brace++;
                if (content[i] === '}') brace--;
                if (content[i] === ']' && brace === 0) {
                    wEndIndex = i;
                    break;
                }
            }
        }

        if (wEndIndex === -1) return false;

        // Replace words
        const jsonWords = JSON.stringify(newWords, null, 4);
        const inner = jsonWords.substring(1, jsonWords.length - 1); // strip []

        content = content.substring(0, wStartIndex) + inner + content.substring(wEndIndex);
        return true;
    }

    // Replace Lesson 1
    if (!replaceUnit(/"2":\s*\[/, "Lesson 1", l1_words)) {
        console.error("Failed to replace Lesson 1");
    } else {
        console.log("Replaced Lesson 1");
    }

    // Replace Lesson 2
    if (!replaceUnit(/"2":\s*\[/, "Lesson 2", l2_words)) {
        console.error("Failed to replace Lesson 2");
    } else {
        console.log("Replaced Lesson 2");
    }

    fs.writeFileSync(targetFile, content);
    console.log("Successfully updated Grade 2 Lesson 1 and Lesson 2.");

} catch (e) {
    console.error("Error:", e);
    process.exit(1);
}
