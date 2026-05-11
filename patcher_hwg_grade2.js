const fs = require('fs');
const path = require('path');
const hwg2Data = require('./restoration_hwg_grade2.js');

const dataPath = path.join(__dirname, 'data.js');
let data = fs.readFileSync(dataPath, 'utf8');

console.log('Original data.js length:', data.length);

// We need to inject Grade 2 data into the "here_we_go" object.
// The structure should end up like:
// "here_we_go": {
//     "1": [ ... ],
//     "2": [ ... ]
// }

// Strategy:
// 1. Find the "here_we_go" section.
// 2. Find the closing brace of the "1" object or key.
//    Actually, "here_we_go" value is an object. 
//    Currently, it probably looks like:
//    "here_we_go": {
//        "1": [
//            ...
//        ]
//    }
// We want to insert `"2": ...` after the closing bracket of "1"'s array, or just append to the object.

// Ideally, we can parse the HWG object? No, it's inside a huge file.
// Let's find the closing brace of `here_we_go`.
// It was inserted at the end of the file structure.
// So look for `    "here_we_go": {`
// Then find the LAST closing brace `}` before the closing of `vocabularyData`.
// But `here_we_go` is the last key in `vocabularyData`.
// So `vocabularyData` ends with `    }\n};` (or similar).
// The `here_we_go` object ends just before that `}`.
// So `vocabularyData` closes with `}`, and `here_we_go` closes with `}` inside it.
// e.g. `    }\n};` -> The `}` before `;` closes `vocabularyData`.
// The `}` before that closes `here_we_go`? No, indentation matters?

// Let's rely on string matching.
// We know `hwg1Data` ended with `    }` (indent 4).
// `data.js` ends with:
// `    "here_we_go": {`
// `        "1": [ ... ]`
// `    }`
// `};`

// So we look for the last `}`. That closes `vocabularyData`.
// The one before that closes `here_we_go`.
// We should insert before that `}`.

const vocabCloseIndex = data.lastIndexOf('}');
if (vocabCloseIndex === -1) process.exit(1);

const beforeVocabClose = data.substring(0, vocabCloseIndex);
// `beforeVocabClose` contains the entire body of `vocabularyData`.
// It ends with `    }` (closing `here_we_go`) and maybe whitespace.
const hwgCloseIndex = beforeVocabClose.lastIndexOf('}');
if (hwgCloseIndex === -1) process.exit(1);

// Insert before `hwgCloseIndex`.
// We need to add a comma to the previous element (which is "1": [...]).
// The previous element ends with `]`.
// Let's find where `"1":` is, to be sure.
if (!data.includes('"here_we_go":')) {
    console.error('here_we_go key not found!');
    process.exit(1);
}

// Construct insertion string.
// We need a leading comma if "1" exists.
const insertion = ',\n        "2": ' + JSON.stringify(hwg2Data, null, 12) + '\n    ';

// We insert it BEFORE the closing brace of `here_we_go`.
// `hwgCloseIndex` is the index of `}`. 
// We insert just before it.
const beforeHWGClose = data.substring(0, hwgCloseIndex);
const afterHWGClose = data.substring(hwgCloseIndex);

const newContent = beforeHWGClose + insertion + afterHWGClose;

fs.writeFileSync(dataPath, newContent);
console.log('Patched data.js with Here We Go Grade 2.');
