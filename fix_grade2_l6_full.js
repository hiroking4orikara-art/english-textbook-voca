const fs = require('fs');
const path = require('path');

const targetFile = path.join(__dirname, 'data.js');

// Lesson 6: Friends from Singapore
const l6_words = [
    // Part 1 (p.70-71 / p.104)
    { en: "than", jp: "[比較級に続いて]…より(も)", part: "preposition" },
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

    // Part 2 (p.72-73 / p.108)
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

    // Part 3 (p.74-75 / p.110)
    { en: "as", jp: "Aと同じくらいに…", part: "adverb" },
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

    // Goal Activity (p.76-77 / p.112)
    { en: "arrive", jp: "[場所に]到着する、着く", part: "verb" },
    { en: "seafood", jp: "魚介、海産食品", part: "noun" },
    { en: "better", jp: "もっとよく、もっとうまく", part: "adverb" },
    { en: "Mona", jp: "モナ", part: "noun" },
    { en: "stationery", jp: "文房具、筆記用具", part: "noun" },
    { en: "crane", jp: "ツル", part: "noun" },
    { en: "candy", jp: "キャンディー、あめ", part: "noun" },
    { en: "wrapper", jp: "包み紙、包装紙", part: "noun" },
    { en: "piece", jp: "[…の]1つ、ひとかけら", part: "noun" },
    { en: "paper", jp: "紙で作った、紙製の、紙の", part: "adjective" },
    { en: "toilet", jp: "(ホテル・劇場などの)化粧室、洗面所、トイレ(ット)", part: "noun" },
    { en: "toilet paper", jp: "トイレットペーパー", part: "noun" },

    // Extra Words (p.106? - Presentation)
    { en: "presentation", jp: "提示(の仕方)、体裁；プレゼンテーション", part: "noun" }, // Image: "提示(の仕方)、体裁；プレゼンテーション"
    { en: "arrange", jp: "並べる、整える", part: "verb" },
    { en: "beautifully", jp: "美しく", part: "adverb" },
    { en: "chance", jp: "機会、チャンス", part: "noun" },
    { en: "skill", jp: "技術、技能", part: "noun" },
    { en: "unforgettable", jp: "忘れられない；(いつまでも)記憶に残る", part: "adjective" },
    { en: "knowledgeable", jp: "よく知っている、詳しい", part: "adjective" }, // Image: "よく知っている、詳しい"
    { en: "experience", jp: "経験する、体験する", part: "verb" }
];

// Project 2: Survey (Favorite Things / Food)
const proj2_words = [
    // P.118
    { en: "tempura", jp: "てんぷら", part: "noun" },
    { en: "typical", jp: "特有の、代表的な", part: "adjective" },
    { en: "refreshing", jp: "さわやかな", part: "adjective" },
    { en: "chip", jp: "チップ", part: "noun" },
    { en: "rice cake", jp: "ライス ケイク", part: "noun" },
    { en: "ingredient", jp: "材料、原料", part: "noun" }, // Image: "原料、材料"
    { en: "modern", jp: "現代の、最新式の", part: "adjective" },
    { en: "taste", jp: "[…の]味がする", part: "verb" },

    // P.114
    { en: "Hanoi", jp: "ハノイ", part: "noun" },
    { en: "introduce", jp: "…に～を初めて教える、経験させる", part: "verb" },
    { en: "introduce ... to ~", jp: "…に～を教える", part: "phrase" },
    { en: "world", jp: "(特定の分野の)世界、…の分野", part: "noun" }, // Image: "(特定の分野の)世界、…の分野"
    { en: "Vietnamese", jp: "ベトナムの", part: "adjective" },
    { en: "cuisine", jp: "料理", part: "noun" },
    { en: "roll", jp: "巻き物；巻いたもの", part: "noun" },
    { en: "spring roll", jp: "スプリング ロウル", part: "noun" }, // Image: "スプリング ロウル"
    { en: "Vietnam", jp: "ベトナム", part: "noun" },
    { en: "technique", jp: "(専門)技術、技法", part: "noun" }, // Image: "(専門)技術、技法"
    { en: "roll", jp: "巻く、丸める；くるむ", part: "verb" }, // Image: "巻く、丸める；くるむ"
    { en: "recipe", jp: "(料理などの)作り方、レシピ", part: "noun" },
    { en: "sauce", jp: "ソース", part: "noun" },

    // P.116
    { en: "learn", jp: "知る、聞く", part: "verb" },
    { en: "put ... away", jp: "…をかたづける", part: "phrase" }, // Image: "...をかたづける"
    { en: "purpose", jp: "目的", part: "noun" },
    { en: "discovery", jp: "発見", part: "noun" },
    { en: "seasonal", jp: "季節の", part: "adjective" },
    { en: "not", jp: "何も…ない、少しも…ない", part: "adverb" },
    { en: "any", jp: "１つも、少しも（…ない）", part: "pronoun" },
    { en: "hear", jp: "(情報・知らせなどを)聞き知る、耳にする", part: "verb" },
    { en: "heard", jp: "hear(聞き知る)の過去形・過去分詞", part: "verb" },
    { en: "bought", jp: "buy(買う)の過去形・過去分詞", part: "verb" },
    { en: "chestnut", jp: "クリの実", part: "noun" },
    { en: "instead", jp: "(その)代わりに", part: "adverb" },
    { en: "opportunity", jp: "機会、好機、チャンス", part: "noun" }
];

// Reading Lesson 2: Online Experiences (Safari)
const read2_words = [
    // P.120
    { en: "virtual", jp: "仮想の、バーチャルの", part: "adjective" },
    { en: "safari", jp: "サファリ、(狩猟・探検・調査などを目的とした)旅行", part: "noun" },
    { en: "through", jp: "[いたる所]…じゅう(、…のいたる所[に])", part: "preposition" }, // Image: "[前][いたる所]…じゅう(、…のいたる所[に])"
    { en: "Nairobi", jp: "ナイロビ", part: "noun" },
    { en: "Nairobi National Park", jp: "ナイロビ国立公園", part: "noun" },
    { en: "wild", jp: "(動物・植物が)野生の", part: "adjective" },
    { en: "as", jp: "[接](…する)時に", part: "conjunction" },
    { en: "search", jp: "さがす", part: "verb" },
    { en: "giraffe", jp: "キリン", part: "noun" },
    { en: "buffalo", jp: "バッファロー", part: "noun" },
    { en: "rhino", jp: "サイ", part: "noun" },

    // P.122 (Extension?)
    { en: "drive", jp: "(車を)運転する", part: "verb" },
    { en: "car", jp: "自動車、車", part: "noun" },
    { en: "multiple", jp: "多数の、多様な", part: "adjective" }, // Image: "多数の、多様な"
    { en: "angle", jp: "(物を見る)角度、視点、観点", part: "noun" },
    { en: "like", jp: "…のように", part: "conjunction" }, // Image: "[接]…のように" (Wait, like is prep usually, but vernacular conjunction)
    { en: "what", jp: "[感嘆文で用いて]なんと(いう)…！", part: "adjective" }, // Image: "[形]..."
    { en: "on", jp: "…で、…(のため)に", part: "preposition" }, // Image: "[前]…で、…(のため)に"
    { en: "lucky", jp: "運のよい、幸運な；幸運をもたらす", part: "adjective" },
    { en: "excellent", jp: "優れた、たいへんよい", part: "adjective" },
    { en: "explain", jp: "説明する", part: "verb" },
    { en: "certainly", jp: "確かに；必ず、きっと", part: "adverb" },
    { en: "worth", jp: "…の[に匹敵する]価値がある；…するだけの)価値がある", part: "adjective" } // Image: "[形]..."
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

    // Remove existing L6, Proj2, Read2 if present
    g2Array = g2Array.filter(u =>
        u.unit !== "Lesson 6" &&
        u.unit !== "Project 2" &&
        u.unit !== "Reading Lesson 2"
    );

    // Append L6, Proj2, Read2 (Note: This appends to the END. 
    // If we want correct order inside G2 (L1..L5..L6..L8), we rely on the full sequential run of all scripts)

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
    console.log("Successfully updated Grade 2 with Lesson 6 (Full), Project 2, Reading 2.");

} catch (e) {
    console.error("Error:", e);
    process.exit(1);
}
