const fs = require('fs');
const path = require('path');

const targetFile = path.join(__dirname, 'data.js');

// Lesson 3: My Dream (Career/Jobs)
const l3_words = [
    // Part 1
    { en: "dream", jp: "(実現したいと思っている)夢；理想、希望", part: "noun" },
    { en: "build", jp: "建てる、造る", part: "verb" },
    { en: "tower", jp: "塔、タワー", part: "noun" },
    { en: "astronaut", jp: "宇宙飛行士", part: "noun" },
    { en: "space", jp: "宇宙", part: "noun" },
    { en: "interpreter", jp: "通訳者", part: "noun" },
    { en: "around", jp: "…のあちらこちらを、…の中であちこち；…じゅうで", part: "preposition" },
    { en: "world", jp: "世界；世界中の人々", part: "noun" },
    { en: "around the world", jp: "世界中で", part: "phrase" },
    { en: "day-at-work program", jp: "職場体験プログラム", part: "noun" },
    { en: "decide", jp: "決心する、(心に)決める", part: "verb" },
    { en: "yourself", jp: "あなた自身を[に]；自分", part: "pronoun" },

    // Part 2
    { en: "customer", jp: "(店の)客", part: "noun" },
    { en: "to", jp: "…するために", part: "preposition" }, // Infinitive adverbial
    { en: "have", jp: "食べる、飲む", part: "verb" },
    { en: "to", jp: "…するための、…すべき", part: "preposition" }, // Infinitive adjectival
    { en: "relax", jp: "くつろぐ", part: "verb" },
    { en: "interest", jp: "興味、関心", part: "noun" },
    { en: "lots of ...", jp: "たくさんの…", part: "phrase" },
    { en: "bake", jp: "(オーブンで)焼く", part: "verb" },
    { en: "need", jp: "[need to ...の形で]…する必要がある", part: "verb" },
    { en: "more", jp: "もっと(多く)", part: "adverb" },
    { en: "perhaps", jp: "たぶん、おそらく", part: "adverb" },
    { en: "bakery", jp: "パン店、ベーカリー", part: "noun" },
    { en: "good", jp: "[…に]適している", part: "adjective" },

    // Part 3
    { en: "over", jp: "終わって、すんで", part: "adjective" }, // "Show is over" sense, or adverb/prep? Image says "終わって、すんで"
    { en: "review", jp: "見直す", part: "verb" },
    { en: "rule", jp: "規則、ルール", part: "noun" },
    { en: "kitchen", jp: "台所、調理場", part: "noun" },
    { en: "must", jp: "…しなければならない", part: "auxiliary verb" }, // Image definition? "…しなければならない"
    { en: "mask", jp: "マスク", part: "noun" },
    { en: "must", jp: "必要、必要な物、困窮", part: "noun" }, // Image says "必要、必要な物、困窮" and noun. This is unusual.
    { en: "smartphone", jp: "スマートフォン", part: "noun" },
    { en: "back", jp: "もとの所に、もどって、帰って", part: "adverb" },
    { en: "get back to ...", jp: "…に戻る", part: "phrase" }, // Image: "...に戻る"
    { en: "work", jp: "仕事、労働", part: "noun" },
    { en: "help", jp: "役に立つ", part: "verb" },
    { en: "enough", jp: "(必要を満たすのに)十分な", part: "adjective" },
    { en: "sold", jp: "sell(売る)の過去形・過去分詞", part: "verb" },
    { en: "system", jp: "仕組み；体系", part: "noun" },
    { en: "simple", jp: "簡単な、わかりやすい、やさしい", part: "adjective" },
    { en: "itself", jp: "[直前の語を強めて]それ自身", part: "pronoun" },
    { en: "share", jp: "共有する、いっしょに使う", part: "verb" },
    { en: "knowledge", jp: "知識", part: "noun" },

    // Extra Words (Likely Part 3/4 or P.33/34 lists)
    { en: "return", jp: "(借りたものなどを)返す；もどす", part: "verb" },
    { en: "week", jp: "週；1週間", part: "noun" },
    { en: "quiet", jp: "静かな", part: "adjective" },
    { en: "pool", jp: "プール", part: "noun" },
    { en: "future", jp: "未来、将来", part: "noun" },
    { en: "in the future", jp: "将来(に[は])", part: "phrase" },
    { en: "chef", jp: "料理長、シェフ；料理人", part: "noun" },
    { en: "design", jp: "設計する；デザインする", part: "verb" },
    { en: "clothes", jp: "衣服", part: "noun" },
    { en: "explore", jp: "探検する", part: "verb" },
    { en: "somewhere", jp: "どこかで、どこかへ、どこかに", part: "adverb" },

    // Goal Activity (Bakery Text & General)
    { en: "baker", jp: "パン屋さん、パン職人", part: "noun" },
    { en: "as", jp: "…として；…の時に", part: "preposition" },
    { en: "provide", jp: "供給する、与える", part: "verb" },
    { en: "several", jp: "いくつかの", part: "adjective" },
    { en: "a", jp: "…につき", part: "article" }, // "a day" -> 1日につき
    { en: "that way", jp: "そのようにして", part: "phrase" },
    { en: "late", jp: "(時間・時期が)遅く；遅れて", part: "adverb" },
    { en: "plenty", jp: "たくさん", part: "noun" },
    { en: "choice", jp: "選ぶこと、選択", part: "noun" },
    { en: "with", jp: "…(のせい)で、…が原因で", part: "preposition" },
    { en: "however", jp: "しかしながら、だが", part: "adverb" },
    { en: "leftover", jp: "(特に食事の)残り物、食べ残し", part: "noun" },
    { en: "away", jp: "別の方向へ、わきへ", part: "adverb" },
    { en: "throw away", jp: "捨てる", part: "phrase" },
    { en: "waste", jp: "むだに使う；むだづかいする", part: "verb" },
    { en: "discount", jp: "割引する", part: "verb" },
    { en: "impress", jp: "感銘[感動]を与える、感動させる", part: "verb" },
    { en: "return", jp: "帰る、もどる", part: "verb" },
    { en: "parent", jp: "親；[複]両親", part: "noun" },
    { en: "with", jp: "…にとって(は)", part: "preposition" }, // Image: "...にとって(は)"
    { en: "worried", jp: "不安で；心配して", part: "adjective" },
    { en: "decide to ...", jp: "…することを決心する", part: "phrase" },
    { en: "major", jp: "(他と比べて)大きな、(より)重要な", part: "adjective" },
    { en: "too", jp: "あまりに(も)…すぎる", part: "adverb" },
    { en: "only", jp: "たった、ほんの", part: "adverb" },
    { en: "less", jp: "いっそう少ない量[額]", part: "pronoun" },
    { en: "sell", jp: "売る、売っている", part: "verb" },
    { en: "loaf", jp: "パンのひとかたまり", part: "noun" },
    { en: "loaves", jp: "loaf(パンのひとかたまり)の複数形", part: "noun" },

    // Additional Reading (Mongolia Text)
    { en: "behind", jp: "…の後ろに[の]", part: "preposition" },
    { en: "cut down ...", jp: "…を切り倒す", part: "phrase" },
    { en: "building", jp: "建物、建造物", part: "noun" },
    { en: "destroy", jp: "破壊する、こわす", part: "verb" },
    { en: "shock", jp: "ぎょっとさせる、衝撃を与える", part: "verb" },
    { en: "after", jp: "…したあとで", part: "conjunction" },
    { en: "environment", jp: "[the environmentで] (自然)環境", part: "noun" },
    { en: "guide", jp: "案内人；ガイド", part: "noun" },
    { en: "Mongolia", jp: "モンゴル", part: "noun" },
    { en: "tour", jp: "(観光)旅行、見物、ツアー；巡業", part: "noun" },
    { en: "herder", jp: "牛[羊]飼い", part: "noun" },
    { en: "simply", jp: "質素に", part: "adverb" },
    { en: "nothing", jp: "何も…ない；何も…でない", part: "pronoun" },

    // Project 1 Preview (Words sitting above Proj1 header)
    { en: "furniture", jp: "家具", part: "noun" },
    { en: "actually", jp: "実際に(は)、実は", part: "adverb" },

    // Take Action! Listen 3 (Voice Message)
    { en: "knitting", jp: "編み物", part: "noun" },
    { en: "community", jp: "(国、市、町、村などの)(地域)社会、(生活)共同体", part: "noun" },
    { en: "center", jp: "中心地；センター", part: "noun" },
    { en: "either", jp: "…もまた", part: "adverb" },
    { en: "... not ~ either", jp: "…もまた～ない", part: "phrase" },
    { en: "when it comes to ...", jp: "…に関しては、…のこととなると", part: "phrase" }
];

// Project 1: My Dream Speech (Jobs)
const project1_words = [
    { en: "actor", jp: "俳優", part: "noun" },
    { en: "doctor", jp: "医者", part: "noun" },
    { en: "police", jp: "[しばしばthe policeで]警察", part: "noun" },
    { en: "officer", jp: "警察官", part: "noun" },
    { en: "police officer", jp: "警察官", part: "noun" },
    { en: "scientist", jp: "科学者；自然科学者", part: "noun" },
    { en: "interview", jp: "インタビュー[面接]をする", part: "verb" },
    { en: "musician", jp: "音楽家", part: "noun" },
    { en: "volunteer", jp: "ボランティア", part: "noun" },
    { en: "need", jp: "必要、必要な物、困窮", part: "noun" }, // From Batch 2 Image 3 bottom "need" [noun]
    // Words preceding Reading Lesson 1 header (likely Project 1 extension)
    { en: "myself", jp: "私自身を[に]", part: "pronoun" },
    { en: "near", jp: "[距離・時間が]近い、近くの", part: "adjective" },
    { en: "reason", jp: "理由", part: "noun" },
    { en: "interested", jp: "興味をもった", part: "adjective" },
    { en: "be interested in ...", jp: "…に興味がある", part: "phrase" }
];

// Reading Lesson 1: The Tale of Peter Rabbit
const read1_words = [
    { en: "outside", jp: "外に、外へ", part: "adverb" },
    { en: "McGregor", jp: "マグレガー", part: "noun" },
    { en: "catch", jp: "捕まえる、捕る、捕らえる", part: "verb" },
    { en: "caught", jp: "catch(捕まえる)の過去形・過去分詞", part: "verb" },
    { en: "radish", jp: "ハツカダイコン", part: "noun" },
    { en: "parsley", jp: "パセリ", part: "noun" },
    { en: "just", jp: "ちょうど、まさに", part: "adverb" },
    { en: "notice", jp: "気がつく；注目する", part: "verb" },
    { en: "rush", jp: "勢いよく走る", part: "verb" },
    { en: "away", jp: "(そこから離れて)別の場所へ；(遠くへ)去って；消えて", part: "adverb" },
    { en: "stop", jp: "止める；止まる；立ち止まる", part: "verb" },
    { en: "shout", jp: "叫ぶ；大声を出す", part: "verb" },
    { en: "lose", jp: "失う；なくす", part: "verb" },
    { en: "other", jp: "[the otherの形で] (2つの中の)もう一方の…；(3つ以上の中の)残りの", part: "adjective" },
    { en: "leg", jp: "(人・動物などの)足", part: "noun" },
    { en: "suddenly", jp: "突然、急に", part: "adverb" },
    { en: "net", jp: "網、ネット", part: "noun" },
    { en: "button", jp: "(服の)ボタン", part: "noun" },
    { en: "jacket", jp: "ジャケット、上着", part: "noun" },
    { en: "wriggle", jp: "身をよじる、ごそごそする", part: "verb" },
    { en: "wriggle out of ...", jp: "…を身をよじって脱ぐ", part: "phrase" },
    { en: "hide", jp: "隠れる", part: "verb" },
    { en: "hid", jp: "hide(隠れる)の過去形・過去分詞", part: "verb" }, // Image: "hide(隠れる)の過去形・過去分詞"
    { en: "watering", jp: "水まき(用の)", part: "noun? adjective?" }, // Image: "[名][形]"
    { en: "can", jp: "缶", part: "noun" },
    { en: "watering can", jp: "じょうろ", part: "noun" },
    { en: "thought", jp: "think(考える)の過去形・過去分詞", part: "verb" },
    { en: "safe", jp: "安全な、危険がない", part: "adjective" },
    { en: "some more", jp: "もういくらか", part: "phrase" },
    { en: "last", jp: "最後", part: "noun" },
    { en: "at last", jp: "ついに", part: "phrase" },
    { en: "get home", jp: "自宅する", part: "verb" }, // Image: "帰宅する"
    { en: "tired", jp: "疲れて、くたびれて", part: "adjective" },
    { en: "wonder", jp: "[…]かしら(と思う)、だろうか；[…]を不思議に思う", part: "verb" },
    { en: "just", jp: "ほんの；ちょっと、ただ", part: "adverb" }, // Duplicate 'just' but diff meaning? P.43
    { en: "chamomile", jp: "カモミール", part: "noun" }
];

// Helper to replace/insert unit
// Note: We need to handle "Project 1" and "Reading Lesson 1" which might not be in G2 yet if it was corrupted.
// But earlier "restore_grade2_all.js" put "Reading Lesson 1" there. "Project 1" might be missing.
// We will reconstruct Grade 2 structure again to be safe.

const l1_regex = /"unit":\s*"Lesson 1"/;
const l2_regex = /"unit":\s*"Lesson 2"/;

try {
    let content = fs.readFileSync(targetFile, 'utf8');

    // Find Grade 2 section
    const g2StartRegex = /"2":\s*\[/;
    const g2StartMatch = g2StartRegex.exec(content);
    if (!g2StartMatch) throw new Error("Grade 2 not found");

    const g3StartRegex = /"3":\s*\[/;
    const g3StartMatch = g3StartRegex.exec(content);

    // Extract Grade 2 content accurately
    let g2ContentEndIndex;
    if (g3StartMatch) {
        // Search for the last closing bracket ] before "3":
        const g3Index = g3StartMatch.index;
        // Backtrack to find closing ] or }, 
        // Actually we can just slice up to g3Index and find last comma or bracket.
        // A cleaner way: find the closing ] matching the opening [ of "2": [
        let brace = 0;
        let inStr = false;
        for (let i = g2StartMatch.index + g2StartMatch[0].length - 1; i < content.length; i++) {
            if (content[i] === '"' && content[i - 1] !== '\\') inStr = !inStr;
            if (!inStr) {
                if (content[i] === '[') brace++;
                if (content[i] === ']') brace--;
                if (brace === 0) {
                    g2ContentEndIndex = i + 1;
                    break;
                }
            }
        }
    } else {
        // Assume Grade 2 goes to end or similar. 
        // But we know G3 exists.
        throw new Error("Grade 3 not found, unexpected structure");
    }

    // Capture valid L1 and L2 (we just fixed them)
    // We can parse the whole G2 JSON to be safe
    const g2JsonStr = content.substring(g2StartMatch.index + 4, g2ContentEndIndex); // skip "2": 
    let g2Array;
    try {
        g2Array = JSON.parse(g2JsonStr);
    } catch (e) {
        // Fallback: manually finding units if JSON parse fails due to comments etc (though data.js shouldn't have comments)
        console.error("Failed to parse G2 JSON, using manual replacement");
        throw e;
    }

    // Filter out L3, Proj1, Read1, L6, L7, L8 if they exist (likely incorrect or partial)
    // We want to KEEP L1 and L2 (which we just fixed) and L4, L5 (which we fixed earlier).
    // Wait, L4 and L5 are AFTER Reading 1 usually?
    // User said L6,7,8 are missing.
    // Order: L1, L2, L3, Proj1, Read1, L4, L5, L6, L7, L8.

    const cleanG2Array = g2Array.filter(u =>
        u.unit === "Lesson 1" ||
        u.unit === "Lesson 2" ||
        u.unit === "Lesson 4" ||
        u.unit === "Lesson 5"
    );

    // Construct new units
    const l3Unit = {
        unit: "Lesson 3",
        pages: "P28〜35", // approx
        words: l3_words
    };

    const proj1Unit = {
        unit: "Project 1",
        pages: "P38〜39",
        words: project1_words
    };

    const read1Unit = {
        unit: "Reading Lesson 1",
        pages: "P42〜45",
        words: read1_words
    };

    // Insert sorted
    // Expected: L1, L2, L3, Proj1, Read1, L4, L5
    // Remove existing L3, L4, L5 from cleanG2Array to re-insert in order?
    // No, L4/L5 are good. We just need to check if L4/L5 content is preserved.
    // cleanG2Array has L1, L2, L4, L5.

    const finalG2Array = [];
    const l1 = cleanG2Array.find(u => u.unit === "Lesson 1");
    if (l1) finalG2Array.push(l1);

    const l2 = cleanG2Array.find(u => u.unit === "Lesson 2");
    if (l2) finalG2Array.push(l2);

    finalG2Array.push(l3Unit);
    finalG2Array.push(proj1Unit);
    finalG2Array.push(read1Unit);

    const l4 = cleanG2Array.find(u => u.unit === "Lesson 4");
    if (l4) finalG2Array.push(l4);

    const l5 = cleanG2Array.find(u => u.unit === "Lesson 5");
    if (l5) finalG2Array.push(l5);

    // Create new G2 JSON
    const newG2Json = JSON.stringify(finalG2Array, null, 4);

    // Replace in file
    const newFileContent = content.substring(0, g2StartMatch.index + 4) + // keep "2": 
        newG2Json +
        content.substring(g2ContentEndIndex);

    fs.writeFileSync(targetFile, newFileContent);
    console.log("Successfully rebuilt Grade 2 with updated L3, Proj1, Read1, keeping L1, L2, L4, L5.");

} catch (e) {
    console.error("Error:", e);
    process.exit(1);
}
