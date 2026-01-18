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

// Lesson 8 Data
const lesson8 = {
    unit: "Lesson 8",
    pages: "P99〜114",
    words: [
        { en: "prize", jp: "賞(品)、景品", part: "noun" },
        { en: "accept", jp: "受け入れる", part: "verb" },
        { en: "academy", jp: "学院、専門学校", part: "noun" },
        { en: "bit", jp: "少し、少量", part: "noun" },
        { en: "a bit", jp: "少し、ちょっと", part: "phrase" },
        { en: "talented", jp: "才能のある", part: "adjective" },
        { en: "up", jp: "の方へ; …へ、…に近づいて", part: "adverb" },
        { en: "keep up with ...", jp: "…について行く", part: "phrase" },
        { en: "compare", jp: "比較する、比べる", part: "verb" },
        { en: "besides", jp: "さらに; その上", part: "adverb" },
        { en: "such", jp: "そんなに[こんなに]", part: "adjective" },
        { en: "textbook", jp: "教科書", part: "noun" },
        { en: "research", jp: "研究; 調査、探究", part: "noun" },
        { en: "deepen", jp: "深くする、深める", part: "verb" },
        { en: "connection", jp: "[…との; …の間の]関係、つながり", part: "noun" },
        { en: "with", jp: "…と(くっついて)", part: "preposition" },
        { en: "figure", jp: "思う", part: "verb" },
        { en: "figure out", jp: "理解する", part: "phrase" },
        { en: "motivate", jp: "やる気を起こさせる、動機づける", part: "verb" },
        { en: "motivate ... to ~", jp: "…をかり立てて~させる", part: "phrase" },
        { en: "best", jp: "[the bestで]最善(のもの)", part: "noun" },
        { en: "do one's best", jp: "全力を尽くす", part: "phrase" },
        { en: "biomimetics", jp: "生体模倣技術", part: "noun" },
        { en: "following", jp: "次の、次に続く", part: "adjective" },
        { en: "clarify", jp: "明らかにする、解明する", part: "verb" },
        { en: "method", jp: "(体系的・科学的)方法、方式", part: "noun" },
        { en: "biomimetic", jp: "生体模倣技術を使った", part: "adjective" },
        { en: "fastener", jp: "留めるもの、留め金", part: "noun" },
        { en: "hook-and-loop fastener", jp: "面ファスナー", part: "noun" },
        { en: "wallet", jp: "さいふ、札入れ", part: "noun" },
        { en: "Swiss", jp: "スイスの; スイス人の", part: "adjective" },
        { en: "engineer", jp: "技師、エンジニア", part: "noun" },
        { en: "while", jp: "…する[している]間に", part: "conjunction" },
        { en: "through", jp: "(穴・物の内部・場所)を通り抜けて、…を通って", part: "preposition" },
        { en: "wood", jp: "[しばしば複数形のwoodsで]小さな森、林", part: "noun" },
        { en: "bur", jp: "(植物の)イガ", part: "noun" },
        { en: "stick", jp: "くっつく", part: "verb" },
        { en: "to", jp: "…に; [付加]…(の上)に", part: "preposition" },
        { en: "clothing", jp: "[集合的に用いて]衣類、衣料品、衣服", part: "noun" },
        { en: "fur", jp: "柔らかい毛", part: "noun" },
        { en: "closely", jp: "綿密に、注意して、接近して", part: "adverb" },
        { en: "hook", jp: "(物をつり下げる)かぎ、留め金", part: "noun" },
        { en: "onto", jp: "…の上に[へ]", part: "preposition" },
        { en: "loop", jp: "輪; 環状の物", part: "noun" },
        { en: "go", jp: "動く、移動する", part: "verb" },
        { en: "tunnel", jp: "トンネル", part: "noun" },
        { en: "annoy", jp: "いらいらさせる、うるさがらせる、むっとさせる", part: "verb" },
        { en: "kingfisher", jp: "カワセミ", part: "noun" },
        { en: "pointy", jp: "先の「とがった", part: "adjective" },
        { en: "beak", jp: "くちばし", part: "noun" },
        { en: "of", jp: "…から(出た); …の理由で、…のために", part: "preposition" },
        { en: "because of ...", jp: "…のために", part: "phrase" },
        { en: "dive", jp: "飛び込む、(飛行機・鳥などが)急降下する", part: "verb" },
        { en: "smoothly", jp: "なめらかに; 円滑に", part: "adverb" },
        { en: "water", jp: "[the waterで](空や陸に対して)水(圏); 水中; 水面", part: "noun" },
        { en: "much", jp: "多量、たくさん", part: "pronoun" },
        { en: "splash", jp: "(水・泥などの)はね、水しぶき", part: "noun" }, // splash
        { en: "test", jp: "実験する、試す", part: "verb" },
        { en: "imitate", jp: "まねる、模造する", part: "verb" },
        { en: "lower", jp: "下げる; 減らす; 下がる; 減る", part: "verb" },
        { en: "now", jp: "今、現在", part: "noun" },
        { en: "non-governmental", jp: "政府の関係しない、民間の", part: "adjective" },
        { en: "organization", jp: "組織、団体", part: "noun" },
        { en: "NGO", jp: "非政府組織", part: "noun" },
        { en: "serious", jp: "重大な; (病状など)重い", part: "adjective" },
        { en: "communicate", jp: "(意思・考え・情報などを)伝達する、知らせる", part: "verb" },
        { en: "medical", jp: "医学の、医療の", part: "adjective" },
        { en: "treatment", jp: "治療、手当", part: "noun" },
        { en: "patient", jp: "患者、病人", part: "noun" },
        { en: "challenging", jp: "困難だけどやりがいのある; 挑戦的な", part: "adjective" },
        { en: "clearly", jp: "はっきりと、明確に", part: "adverb" },
        { en: "understanding", jp: "理解、理解し合うこと", part: "noun" },
        { en: "work", jp: "作品", part: "noun" },
        { en: "nod", jp: "うなずく、会釈する", part: "verb" },
        { en: "recently", jp: "近ごろ、最近", part: "adverb" },
        { en: "deeply", jp: "深く", part: "adverb" },
        { en: "expect", jp: "予期する、予想する", part: "verb" },
        { en: "e-mail", jp: "Eメール", part: "noun" },
        { en: "Amir", jp: "アミール", part: "noun" },
        { en: "beauty", jp: "美、美しさ", part: "noun" },
        { en: "taste", jp: "味; 味覚", part: "noun" },
        { en: "Dubai", jp: "ドバイ", part: "noun" },
        { en: "offer", jp: "申し出、提案", part: "noun" }
    ]
};

const reading3 = {
    unit: "Reading Lesson 3",
    pages: "P130〜136", // Inferred from image
    words: [
        { en: "including", jp: "…を含めて", part: "preposition" },
        { en: "Leonardo da Vinci", jp: "レオナルド・ダ・ビンチ", part: "noun" },
        { en: "observe", jp: "観察する", part: "verb" },
        { en: "flying", jp: "飛行(用)の", part: "adjective" },
        { en: "mimic", jp: "まねをする", part: "verb" },
        { en: "inspire", jp: "奮い立たせる、霊感[インスピレーション]を与える", part: "verb" },
        { en: "instance", jp: "例、実例", part: "noun" },
        { en: "academic", jp: "学問の、学問的な", part: "adjective" },
        { en: "field", jp: "分野", part: "noun" },
        { en: "speed", jp: "速度、速力、スピード", part: "noun" },
        { en: "pressure", jp: "圧力", part: "noun" },
        { en: "inside", jp: "…の内側に; …の内部に[を]", part: "preposition" },
        { en: "grow", jp: "増大[増加、発展]する", part: "verb" },
        { en: "increase", jp: "増やす; 増える、増加する", part: "verb" },
        { en: "slow", jp: "速度を落とす", part: "verb" },
        { en: "down", jp: "(数量・程度・質などが)下がって、減って", part: "adverb" },
        { en: "slow down", jp: "速度を落とす", part: "phrase" },
        { en: "before", jp: "…する前に", part: "conjunction" },
        { en: "travel", jp: "旅行、移動", part: "noun" },
        { en: "himself", jp: "彼自身を[に]; 自分を[に]", part: "pronoun" },
        { en: "say to oneself", jp: "ひとりごとを言う", part: "phrase" },
        { en: "manage", jp: "何とかうまく…する; どうにかやっていく", part: "verb" },
        { en: "sudden", jp: "突然の、急の", part: "adjective" },
        { en: "save", jp: "節約する、使わないようにする", part: "verb" },
        { en: "energy", jp: "エネルギー", part: "noun" },
        { en: "due", jp: "[due to ... の形で用いて]…が原因で、…のために[に]", part: "adjective" },
        { en: "due to ...", jp: "…のために", part: "phrase" },
        { en: "produce", jp: "引き起こす、もたらす", part: "verb" },
        { en: "nearby", jp: "近くに、近くで", part: "adverb" },
        { en: "traveler", jp: "旅行者", part: "noun" },
        { en: "living", jp: "生きている", part: "adjective" },
        { en: "evolve", jp: "進化させる; 進化する", part: "verb" },
        { en: "develop", jp: "発達[発育、発展]させる; 発達[発育、発展]する", part: "verb" },
        { en: "specific", jp: "特定の", part: "adjective" },
        { en: "adaptation", jp: "適応、順応", part: "noun" },
        { en: "seed", jp: "(野菜・花などの小さな)種", part: "noun" },
        { en: "human", jp: "人間", part: "noun" },
        { en: "engineering", jp: "工学", part: "noun" },
        { en: "wisdom", jp: "(長年の経験に基づく)賢明(さ)、知恵", part: "noun" },
        { en: "broaden", jp: "広げる", part: "verb" }
    ]
};

const project3 = {
    unit: "Project 3",
    pages: "P106〜107",
    words: [
        { en: "exchange", jp: "交換する、やり取りする", part: "verb" },
        { en: "chat", jp: "雑談、おしゃべり; [コンピュータ用語で]チャット", part: "noun" },
        { en: "little", jp: "[a littleで]少しの", part: "adjective" },
        { en: "Arabic", jp: "アラビア語", part: "noun" },
        { en: "business", jp: "商売、ビジネス、会社", part: "noun" },
        { en: "international", jp: "国際的な", part: "adjective" },
        { en: "door", jp: "[…への]門戸、道; 方法", part: "noun" },
        { en: "unexpected", jp: "予期しない、思いがけない、意外な", part: "adjective" },
        { en: "yearly", jp: "年1回の、毎年の", part: "adjective" },
        { en: "weekday", jp: "平日", part: "noun" },
        { en: "guess", jp: "(…と)思う", part: "verb" },
        { en: "with", jp: "…を伴って", part: "preposition" },
        { en: "care", jp: "注意、用心、心遣い", part: "noun" },
        { en: "attention", jp: "注意; 関心; 配慮", part: "noun" },
        { en: "architecture", jp: "建築学", part: "noun" },
        { en: "stressed", jp: "とても不安[心配]な、ストレスのたまった", part: "adjective" },
        { en: "K-pop", jp: "韓国のポピュラー音楽(の)", part: "noun" },
        { en: "through", jp: "(状態・過程)を経験して、…を経て", part: "preposition" },
        { en: "get through", jp: "乗り切る", part: "phrase" },
        { en: "star", jp: "(映画・スポーツなどの)スター、人気者", part: "noun" },
        { en: "upload", jp: "(プログラム・データなどを)アップロードする", part: "verb" },
        { en: "post", jp: "(ウェブ上の)投稿", part: "noun" },
        { en: "message", jp: "伝言、ことづて", part: "noun" },
        { en: "Korean", jp: "韓国語", part: "noun" },
        { en: "beforehand", jp: "前もって、あらかじめ", part: "adverb" }
    ]
};

// Insert logic
const g3 = getSection(content, '3');
if (!g3) { console.error("No Grade 3 section"); process.exit(1); }

function parseLessons(text) {
    const lessons = [];
    let balance = 0;
    let buffer = '';
    let inLesson = false;
    for (const line of text.split('\n')) {
        const clean = line.replace(/\/\/.*$/, '');
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
existingLessons.forEach(l => {
    let name = "Unknown";
    const m = l.match(/"unit": "([^"]+)"/);
    if (m) name = m[1];
    map[name] = l;
});

// Update/Add units
[lesson8, project3, reading3].forEach(u => {
    const pretty = `
            {
                "unit": "${u.unit}",
                "pages": "${u.pages}",
                "words": [
${u.words.map(w => `                    { "en": "${w.en}", "jp": "${w.jp}", "part": "${w.part}" }`).join(',\n')}
                ]
            }`;
    map[u.unit] = pretty;
});

// Reorder
const keyUnits = ["Lesson 1", "Lesson 2", "Lesson 3", "Project 1", "Reading Lesson 1", "Lesson 4", "Lesson 5", "Lesson 6", "Project 2", "Reading Lesson 2", "Lesson 7", "Lesson 8", "Project 3", "Reading Lesson 3"];
const ordered = [];
keyUnits.forEach(k => {
    if (map[k]) ordered.push(map[k].trim());
});
// extras
for (const k in map) {
    if (!keyUnits.includes(k)) {
        ordered.push(map[k].trim());
    }
}

const newG3Body = "\n" + ordered.join(",\n") + "\n";
const finalContent = content.substring(0, g3.start + 1) + newG3Body + content.substring(g3.end);

fs.writeFileSync(filePath, finalContent);
console.log("Updated Lesson 8, Project 3, Reading Lesson 3.");
