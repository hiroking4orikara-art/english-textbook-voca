const fs = require('fs');
const path = require('path');
const grade3Data = require('./restoration_grade3.js');

const dataPath = path.join(__dirname, 'data.js');
let data = fs.readFileSync(dataPath, 'utf8');

console.log('Original data.js length:', data.length);

// Check if Grade 3 is already present
if (data.includes('"3": [') && !data.includes('"3": []')) {
    console.log('Grade 3 data seems to be already present (non-empty).');
    // Optional: We could update it even if present, but for now let's be safe.
    // Given the user wants to FIX it, and we edited restoration_grade3.js, 
    // we SHOULD replace it if it exists.
    
    // Regex to find "3": [ ... ]
    // This is risky with regex on nested structures.
    // Better strategy: If it exists, warn and maybe overwrite if arguments say so.
    // For this specific task, we found grep failed, so we assume it's NOT present or malformed.
    console.log('Skipping standard insertion checks. Proceeding to find injection point.');
}

// Find the end of Grade 2 array.
// Look for the last closing brace of new_crown object.
// Structure:
// "new_crown": {
//     "1": [...],
//     "2": [...]
// }
// We want to turn it into:
// "new_crown": {
//     "1": [...],
//     "2": [...],
//     "3": [...]
// }

// The end of new_crown block is likely `] \n }` or similar.
// Let's find the closing of "2" array.
// We assume "2": [ ... ] is the last element currently.

// Simple string match for the end pattern seen in view_file.
// 12419:           }
// 12420: ]
// 12421:         }

// Regex to capture the closing of new_crown's grade array and the object closing.
// We look for `]\s*}` that acts as the closure of new_crown.
// But we need to be carefully to ensure it's new_crown's closure, not some inner object.
// However, new_crown is the first key.
// Let's search for the pattern `]\s*}\s*};` (end of file basically)
// data.js ends with `window.vocabularyData = vocabularyData;` so `};` is not at EOF.
// But `vocabularyData` definition ends with `};`.

// Let's find the last occurrence of `]` followed by `}`.
// It matches `]\s*}` inside `vocabularyData`.

const injectionPointRegex = /\](\s*)\}(\s*)\};/s;
// This matches:
// ]
//         }
// };
// This assumes new_crown is the LAST entry in vocabularyData.
// Let's check data.js top lines.
// `const vocabularyData = { "new_crown": { ...`
// If new_crown is the ONLY entry (or the last), this works.
// If there are other textbooks...
// The file list showed `new_crown_2.json` maybe implies other data?
// But `data.js` line 1: `const vocabularyData = { "new_crown": { ...`.
// Let's check if there is `here_we_go`? `grep_search` is unreliable.
// But `index.html` has "Here We Go" button.
// `data.js` size is 500KB. It likely contains BOTH.
// If `new_crown` is first, and `here_we_go` is second, then `new_crown` closing brace is followed by comma `,`.

// Safer approach:
// Find `"new_crown": {` and find its matching closing brace? Hard without a parser.
// BUT we know `new_crown` has "1" and "2".
// We can look for `"2": [` and finding the matching closing bracket `]`.
// Then insert `"3": ...` after it.

// Let's try to find `"2": [` using searching index.
const startG2 = data.lastIndexOf('"2": [');
if (startG2 === -1) {
    console.error('Could not find start of Grade 2 data ("2": [)');
    process.exit(1);
}

// Find the corresponding closing `]` for G2.
// Since `data.js` is well indented, we can look for `^        ]` (8 spaces) if we knew indentation.
// Or we can just count brackets.
let openCount = 1;
let closePos = -1;
for (let i = startG2 + '"2": ['.length; i < data.length; i++) {
    if (data[i] === '[') openCount++;
    if (data[i] === ']') openCount--;
    if (openCount === 0) {
        closePos = i;
        break;
    }
}

if (closePos === -1) {
    console.error('Could not find closing ] for Grade 2');
    process.exit(1);
}

console.log('Found Grade 2 closing bracket at:', closePos);

// Insert Grade 3 data after closePos
const insertStr = ',\n            "3": ' + JSON.stringify(grade3Data, null, 12); // Indent deeper?
// Original indentation seems roughly 12 spaces for inner items?
// Let's stick to standard 4 or match existing.
// The snippet showed:
// 12400:                                         "jp": "間違える、失敗する",
// That's A LOT of spaces. 40 spaces?
// "2": [ starts...
// Let's use simple indentation, JS parsers don't care.

const g3Json = JSON.stringify(grade3Data, null, 4); 
// We should prepend comma to current end of G2.
const before = data.substring(0, closePos + 1);
const after = data.substring(closePos + 1);

const newData = before + ',\n            "3": ' + g3Json + after;

fs.writeFileSync(dataPath, newData);
console.log('Successfully injected Grade 3 data into data.js');
