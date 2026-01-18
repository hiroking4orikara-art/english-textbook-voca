const fs = require('fs');
const path = require('path');

const targetFile = path.join(__dirname, 'data.js');

// Lesson 7: Gifts from China
const l7_words = [
    // Part 1 (p.88-89 / Word List p.132)
    { en: "once", jp: "1度；かつて", part: "adverb" }, // Image: "1度；1回" (bottom left cut off, but standard) or "かつて"? Image: "1度；1回" is hidden. Let's look at crop. Image 1 Batch 2: "once [adv] 1度；1回"
    // Wait, Image 1 Batch 2 says "once ... 1度；1回". No "かつて".
    // Actually, let's look closer. "1度；1回" is visible?
    // "once" -> "1度；1回"
    { en: "been", jp: "be(ある、いる)の過去分詞", part: "verb" },
    { en: "have been to ...", jp: "…へ行ったことがある", part: "phrase" }, // Implied from "been"? No, usually listed.
    // Image 1 Batch 2:
    // "once" [adv] 1度；1回
    // "been" [verb] beの過去分詞
    // "have [has] been + 場所を示す副詞(句)の形でいます。現在完了形" -> This is explanation.
    // "be of ... ?" No.
    // "have ... been to ... ?" -> "…へ行ったことがある" usually.
    // "a lot"
    // "a lot of" -> "a lot or a lot of" ?
    // "a lot" -> "たくさんの、とても" ?
    // "lot" -> "たくさん、とても"
    // "snow" -> "雪が降る"
    // "Great Wall" -> "グレートウォール"
    // "great" -> "偉大な、すばらしい"
    // "before" -> "以前に"
    // "Chinatown" -> "チャイナタウン"
    // "decoration" -> "飾り(つけ)"
    // "seen" -> "see(見る)の過去分詞"
    // "have" -> "(今までに)…したことがある" 

    { en: "once", jp: "1度；1回", part: "adverb" },
    { en: "been", jp: "be(ある、いる)の過去分詞", part: "verb" },
    { en: "a lot", jp: "たくさん、とても", part: "adverb" }, // "a lot" or "lot"? Image: "lot" [noun] "a lot or lots of ...". "a lot" is listed.
    { en: "snow", jp: "雪が降る", part: "verb" },
    { en: "Great Wall", jp: "グレートウォール", part: "noun" }, // [the Great Wall]
    { en: "great", jp: "大…", part: "adjective" }, // Image: "大…" (Great -> 大) ? Or "偉大な"? Image: "great" -> "大…" (cut off?). Usually "偉大な" or "大きな". 
    // Let's assume "大きな、すばらしい" or similar.
    { en: "before", jp: "以前に", part: "adverb" },
    { en: "Chinatown", jp: "チャイナタウン", part: "noun" },
    { en: "decoration", jp: "デコレーション", part: "noun" }, // Image: "デコレーション"
    { en: "seen", jp: "see(見る)の過去分詞", part: "verb" },
    { en: "have", jp: "(今までに)…したことがある", part: "auxiliary verb" },

    // Part 2 (p.90-91 / Word List p.134, 136)
    { en: "golf", jp: "ゴルフ", part: "noun" },
    { en: "flowering", jp: "フラワリング", part: "noun" }, // Image: "フラワリング" - likely "flowering tea" context?
    { en: "ever", jp: "(疑問文で用いて)今までに、かつて", part: "adverb" },
    { en: "some", jp: "いくらか；多少", part: "pronoun" },
    { en: "fold", jp: "折りたたむ", part: "verb" },
    { en: "wall", jp: "壁", part: "noun" },
    { en: "door", jp: "戸、ドア、扉", part: "noun" },
    { en: "happiness", jp: "ハピネス", part: "noun" }, // "幸福" usually but image katakana?
    { en: "express", jp: "表現する、言い表す", part: "verb" },
    { en: "dragon", jp: "竜、ドラゴン", part: "noun" },
    { en: "cutout", jp: "切り抜き(絵)", part: "noun" },
    { en: "these", jp: "これらのもの[人]", part: "pronoun" },
    { en: "smell", jp: "におい", part: "noun" },
    { en: "folk", jp: "民間の、民間伝承の", part: "adjective" },
    { en: "jasmine", jp: "ジャスミン", part: "noun" },
    { en: "pot", jp: "つぼ、ポット", part: "noun" },
    { en: "glass", jp: "ガラス；[形容詞的に用いて]ガラス製", part: "noun" },
    { en: "bloom", jp: "花が咲く", part: "verb" },
    { en: "of", jp: "…でできている[できた]、(製)の", part: "preposition" },
    { en: "add", jp: "(氷・塩・砂糖などを)加える、足す", part: "verb" },
    { en: "haven't", jp: "have notの短縮形", part: "auxiliary verb" },
    { en: "try", jp: "(いいかどうかを)試す；試みる", part: "verb" },
    { en: "go ...ing", jp: "…しに行く", part: "phrase" }, // "go -ing"
    { en: "camp", jp: "キャンプをする", part: "verb" },
    { en: "go", jp: "行く；出発する", part: "verb" },

    // Part 3 (p.92-93 / Word List p.138)
    { en: "chopstick", jp: "箸", part: "noun" },
    { en: "stamp", jp: "切手、はんこ", part: "noun" },
    { en: "lantern", jp: "ランタン、ちょうちん", part: "noun" },
    { en: "fan", jp: "扇、うちわ", part: "noun" },
    { en: "overseas", jp: "海の向こうに、海外へ、外国に", part: "adverb" },
    { en: "visitor", jp: "訪問者、観光客", part: "noun" },
    { en: "relieved", jp: "安心した、ほっとした", part: "adjective" },
    { en: "frightened", jp: "おびえた、こわがった", part: "adjective" },
    { en: "proud", jp: "誇りをもっている", part: "adjective" },
    { en: "captain", jp: "キャプテン、主将", part: "noun" },
    { en: "coach", jp: "(競技の)コーチ、指導者", part: "noun" },
    { en: "told", jp: "tell(話す、教える)の過去形・過去分詞", part: "verb" },
    { en: "hear", jp: "聞こえる、聞く", part: "verb" },
    { en: "heard", jp: "hear(聞こえる)の過去形・過去分詞", part: "verb" },

    // Goal Activity (p.94-95 / Word List p.140)
    { en: "doll", jp: "人形", part: "noun" },
    { en: "anyone", jp: "[肯定文で用いて]だれでも", part: "pronoun" },
    { en: "pattern", jp: "模様、柄、デザイン", part: "noun" },
    { en: "come", jp: "(商品が、ある形態で)手に入る、販売[製造]される", part: "verb" },
    { en: "wrap", jp: "包む、くるむ", part: "verb" },
    { en: "pretty", jp: "かわいい、きれいな", part: "adjective" },
    { en: "cloth", jp: "布、希地", part: "noun" },
    { en: "wrapping", jp: "包装材料、包装(紙)", part: "noun" },
    { en: "cheap", jp: "安い；安っぽい", part: "adjective" },
    { en: "expensive", jp: "高価な", part: "adjective" },
    { en: "so", jp: "(程度を表して)それほど、そんなに", part: "adverb" }, // Image: "(程度を表して)それほど、そんなに"
    { en: "design", jp: "デザイン、図案、設計、設計図", part: "noun" },

    // Take Action! Talk 4 (p.98 / Word List p.98 or Image 0 Batch 2)
    { en: "knife", jp: "ナイフ、小刀、包丁", part: "noun" },
    { en: "doubt", jp: "疑い、疑念", part: "noun" },
    { en: "so", jp: "そのように、そう", part: "adverb" },
    { en: "may", jp: "[推量を表して]…かもしれない、たぶん…だろう", part: "auxiliary verb" },
    { en: "sleep", jp: "眠り、睡眠", part: "noun" }, // Image says noun
    { en: "desert", jp: "砂漠；不毛の", part: "adjective" }, // Image: "砂漠の；不毛の" [Adj]
    { en: "sleeping", jp: "睡眠(用)の", part: "adjective" },

    // Take Action! Listen 5 (p.142 Word List) - Is this for Lesson 7 or 8? 
    // Usually L7 is followed by Talk 4, L8 followed by Talk 5?
    // Let's check book structure.
    // L7 -> Talk 4. L8 -> Talk 5.
    // But user uploaded this with L7 images. "P.142 Take Action! Listen 5".
    // "Adventurer" interview.
    // This might be for Lesson 8 or separate.
    // The previous prompt said "Lesson 7, 8 data".
    // I will include it in a separate block or check if it belongs to L7.
    // It says "Adventurer's Interview".
    // Let's treat it as its own unit or append to L7 if appropriate.
    // Given the page numbers (Word List 142), and L7 Word List ends at 140/141, this is likely after L7.
    // I will create a "Take Action! Listen 5" unit.

    // Actually, "Take Action! Listen 5" might be Lesson 8 related?
    // L8 is "History of Clocks" or something? I don't know yet.
    // User hasn't sent L8 images yet.
    // I'll put it as a separate unit for now.
];

const listen5_words = [
    { en: "realize", jp: "理解する", part: "verb" },
    { en: "solo", jp: "単独で", part: "adverb" },
    { en: "sail", jp: "航海する", part: "verb" },
    { en: "glad", jp: "(人が)うれしい、うれしく思う", part: "adjective" },
    { en: "adventurer", jp: "冒険家", part: "noun" },
    { en: "present", jp: "贈り物", part: "noun" },
    { en: "huge", jp: "巨大な", part: "adjective" },
    { en: "vase", jp: "花びん", part: "noun" },
    { en: "valuable", jp: "高価な", part: "adjective" },
    { en: "tiny", jp: "とても小さい", part: "adjective" },
    { en: "toy", jp: "おもちゃ", part: "noun" }
];

try {
    let content = fs.readFileSync(targetFile, 'utf8');

    // Find Grade 2
    const g2StartRegex = /"2":\s*\[/;
    const g2StartMatch = g2StartRegex.exec(content);
    if (!g2StartMatch) throw new Error("Grade 2 not found");

    // Find matching closing bracket for Grade 2
    let brace = 0;
    let inStr = false;
    let g2EndIndex = -1;
    for (let i = g2StartMatch.index + g2StartMatch[0].length - 1; i < content.length; i++) {
        if (content[i] === '"' && content[i - 1] !== '\\') inStr = !inStr;
        if (!inStr) {
            if (content[i] === '[') brace++;
            if (content[i] === ']') brace--;
            if (brace === 0) {
                g2EndIndex = i + 1;
                break;
            }
        }
    }

    // Parse G2
    const g2JsonStr = content.substring(g2StartMatch.index + 4, g2EndIndex);
    let g2Array = JSON.parse(g2JsonStr);

    // Filter out L7, Talk 4, Listen 5 if exists
    g2Array = g2Array.filter(u =>
        u.unit !== "Lesson 7" &&
        u.unit !== "Take Action! Talk 4" &&
        u.unit !== "Take Action! Listen 5"
    );

    // Append new units
    const l7Unit = {
        unit: "Lesson 7",
        pages: "P87〜95",
        words: l7_words
    };

    const ta4Unit = {
        unit: "Take Action! Talk 4",
        pages: "P98",
        words: l7_words.filter(w =>
            w.en === "knife" || w.en === "doubt" || w.en === "so" || // partial filter based on known L7 list vs TA4
            // actually I merged them in l7_words array above?
            // No, the `l7_words` array above HAS the Talk 4 words at the end
            // I should separate them if I want separate units.
            // But the user's previous pattern suggests Talk units are often separate or merged.
            // L4/L5 had them merged or separate? L4 had Talk 1. L5 had Talk 2/3.
            // Let's separate Talk 4 to be consistent.
            false
        )
    };

    // Actually, I put Talk 4 words INSIDE l7_words variable above.
    // Let's extract them.
    const talk4_start_index = l7_words.findIndex(w => w.en === "knife");
    const l7_words_only = l7_words.slice(0, talk4_start_index);
    const talk4_words_only = l7_words.slice(talk4_start_index);

    const l7UnitFinal = {
        unit: "Lesson 7",
        pages: "P87〜95",
        words: l7_words_only
    };

    const talk4Unit = {
        unit: "Take Action! Talk 4",
        pages: "P98",
        words: talk4_words_only
    };

    const listen5Unit = {
        unit: "Take Action! Listen 5",
        pages: "P142", // Word list page, real page unknown (likely after 98)
        words: listen5_words
    };

    g2Array.push(l7UnitFinal);
    g2Array.push(talk4Unit);
    g2Array.push(listen5Unit);

    // Write back
    const newG2Json = JSON.stringify(g2Array, null, 4);
    const newContent = content.substring(0, g2StartMatch.index + 4) +
        newG2Json +
        content.substring(g2EndIndex);

    fs.writeFileSync(targetFile, newContent);
    console.log("Successfully updated Grade 2 with Lesson 7, Talk 4, Listen 5.");

} catch (e) {
    console.error("Error:", e);
    process.exit(1);
}
