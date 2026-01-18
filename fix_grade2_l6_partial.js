const fs = require('fs');
const path = require('path');

const targetFile = path.join(__dirname, 'data.js');

// Lesson 6: Friends from Singapore
const l6_words = [
    // Part 1 (p.70-71)
    { en: "than", jp: "[比較級に続いて]…より(も)", part: "preposition" }, // Image: "…より(も)"
    { en: "southeast", jp: "南東(の)；南東部(の)", part: "noun" },
    { en: "Asia", jp: "アジア(大陸)", part: "noun" },
    { en: "Southeast Asia", jp: "東南アジア", part: "noun" },
    { en: "Indonesia", jp: "インドネシア", part: "noun" },
    { en: "Malaysia", jp: "マレーシア", part: "noun" },
    { en: "Philippines", jp: "フィリピン共和国", part: "noun" },
    { en: "which", jp: "どちらが、どれが", part: "pronoun" },
    { en: "prefecture", jp: "(日本・フランスなどの)県、府", part: "noun" },
    { en: "port", jp: "港；港町", part: "noun" },
    { en: "ship", jp: "船", part: "noun" },
    { en: "various", jp: "さまざまな；いろいろな", part: "adjective" },

    // Part 2 (p.72-73)
    { en: "sightseeing", jp: "観光、見物", part: "noun" },
    { en: "more", jp: "もっと…", part: "adverb" },
    { en: "most", jp: "最も、いちばん", part: "adverb" },
    { en: "list", jp: "リスト、一覧表", part: "noun" },
    { en: "sandal", jp: "サンダル", part: "noun" },
    { en: "sunscreen", jp: "日焼け止めクリーム", part: "noun" },
    { en: "swimsuit", jp: "水着", part: "noun" },
    { en: "sand", jp: "砂", part: "noun" },
    { en: "without", jp: "…なしで[に]", part: "preposition" },
    { en: "cultural", jp: "文化の、文化的な", part: "adjective" },
    { en: "would like to ...", jp: "…したい", part: "phrase" },
    { en: "welcome", jp: "歓迎", part: "noun" },
    { en: "party", jp: "(社交の)会、パーティー", part: "noun" },

    // Part 3 (p.74-75)
    { en: "as", jp: "Aと同じくらいに…", part: "adverb" }, // [as ... as A]
    { en: "peanut", jp: "落花生、ピーナッツ", part: "noun" },
    { en: "best", jp: "最もよく、いちばん", part: "adverb" },
    { en: "musical", jp: "ミュージカル", part: "noun" },
    { en: "teriyaki", jp: "照り焼き(の)", part: "noun" },
    { en: "answer", jp: "答え、返事、応答", part: "noun" },
    { en: "few", jp: "[a fewの形で]少数、少数の人[物]", part: "pronoun" },
    { en: "us", jp: "私たちを、私たちに", part: "pronoun" },
    { en: "else", jp: "そのほかに、さらに", part: "adverb" },
    { en: "something else", jp: "何かほかのもの", part: "phrase" },
    { en: "origami", jp: "折り紙", part: "noun" },

    // Goal Activity (p.76-77)
    { en: "arrive", jp: "[場所に]到着する、着く", part: "verb" },
    { en: "seafood", jp: "魚介、海産食品", part: "noun" },
    { en: "better", jp: "もっとよく、もっとうまく", part: "adverb" },
    { en: "Mona", jp: "モナ", part: "noun" },
    { en: "stationery", jp: "文房具、筆記用具", part: "noun" },
    { en: "crane", jp: "ツル", part: "noun" },
    { en: "candy", jp: "キャンディー、あめ", part: "noun" },
    { en: "wrapper", jp: "包み紙、包装紙", part: "noun" },
    { en: "piece", jp: "[…の]1つ、ひとかけら", part: "noun" },
    { en: "paper", jp: "紙で作った、紙製の、紙の", part: "adjective" }, // Image: "紙で作った" (adj)
    { en: "toilet", jp: "(ホテル・劇場などの)化粧室、洗面所、トイレ(ット)", part: "noun" },
    { en: "toilet paper", jp: "トイレットペーパー", part: "noun" }
];

// Project 2: Survey (Favorite Things / Food)
const proj2_words = [
    { en: "tempura", jp: "てんぷら", part: "noun" },
    { en: "typical", jp: "特有の、代表的な", part: "adjective" },
    { en: "refreshing", jp: "さわやかな", part: "adjective" }, // Image: "さわやかな" (refreshing)
    { en: "chip", jp: "チップ", part: "noun" },
    { en: "rice cake", jp: "ライス ケイク", part: "noun" },
    { en: "ingredient", jp: "材料、原料", part: "noun" },
    { en: "modern", jp: "現代の、最新式の", part: "adjective" },
    { en: "taste", jp: "[…の]味がする", part: "verb" }
    // Missing words from potential 2nd page of Project 2
];

// Reading Lesson 2: Online Experiences (Safari)
const read2_words = [
    { en: "virtual", jp: "仮想の、バーチャルの", part: "adjective" },
    { en: "safari", jp: "サファリ", part: "noun" },
    { en: "through", jp: "[いたる所]…じゅうを、…のいたる所", part: "preposition" }, // Image: "through" (prep)
    { en: "Nairobi", jp: "ナイロビ", part: "noun" },
    { en: "Nairobi National Park", jp: "ナイロビ国立公園", part: "noun" },
    { en: "wild", jp: "[動物・植物が]野生の", part: "adjective" },
    { en: "as", jp: "(…する)時に", part: "conjunction" },
    { en: "search", jp: "(…する)につれて", part: "conjunction" }, // Wait, image for 'search' says 'につれて'? NO. 
    // Image Check: 
    // "as" -> "…する時に"
    // "search" -> "さがす" (verb). Wait, Image 0 Batch 2: "search [verb] さがす".
    // Ah, my transcription in thought was hasty.
    // Let's re-read Image 0 Batch 2 carefully.
    // "as" -> "[接](…する)時に" ; "〇時間を作る"? No, "〇時間を表す"
    // "search" -> "さがす"
    // "giraffe" -> "キリン"
    // "buffalo" -> "バッファロー"
    // "rhino" -> "サイ"
    // "virtual"
    // "safari"
    // "through"
    // "Nairobi"
    // "Nairobi National Park"
    // "wild"
    // "as"
    // "search"
    // "giraffe"
    // "buffalo"
    // "rhino"

    // Correction:
    { en: "search", jp: "さがす", part: "verb" },
    { en: "giraffe", jp: "キリン", part: "noun" },
    { en: "buffalo", jp: "バッファロー", part: "noun" },
    { en: "rhino", jp: "サイ", part: "noun" }
    // Missing rest of Reading 2
];

// We need to insert these AFTER Lesson 5.
// Script logic: Find end of Lesson 5, insert L6, Proj2, Read2.
// OR reconstruct G2 again.

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

    // Remove existing L6, Proj2, Read2, L7, L8 if present (user says L6-8 missing, but we verify)
    g2Array = g2Array.filter(u =>
        u.unit !== "Lesson 6" &&
        u.unit !== "Project 2" &&
        u.unit !== "Reading Lesson 2"
    );

    // Ensure L1-L5 order (We assume L1-L5 are correct now)
    // We append L6, Proj2, Read2

    const l6Unit = {
        unit: "Lesson 6",
        pages: "P69〜77",
        words: l6_words
    };

    const proj2Unit = {
        unit: "Project 2",
        pages: "P80〜81",
        words: proj2_words
    };

    const read2Unit = {
        unit: "Reading Lesson 2",
        pages: "P82〜85",
        words: read2_words
    };

    g2Array.push(l6Unit);
    g2Array.push(proj2Unit);
    g2Array.push(read2Unit);

    // Write back
    const newG2Json = JSON.stringify(g2Array, null, 4);
    const newContent = content.substring(0, g2StartMatch.index + 4) +
        newG2Json +
        content.substring(g2EndIndex);

    fs.writeFileSync(targetFile, newContent);
    console.log("Successfully updated Grade 2 with Lesson 6, Project 2, Reading 2.");

} catch (e) {
    console.error("Error:", e);
    process.exit(1);
}
