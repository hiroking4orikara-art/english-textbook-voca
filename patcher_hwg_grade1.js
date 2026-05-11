const fs = require('fs');
const path = require('path');
const hwg1Data = require('./restoration_hwg_grade1.js');

const dataPath = path.join(__dirname, 'data.js');
let data = fs.readFileSync(dataPath, 'utf8');

console.log('Original data.js length:', data.length);

// Check if "here_we_go" already exists
if (data.includes('"here_we_go"')) {
    console.log('here_we_go key already exists. Checking implementation...');
    // We assume it might be missing or empty if we are running this.
    // But based on previous grep, it wasn't there.
}

// We need to inject "here_we_go" into the main object.
// The structure is:
// const vocabularyData = {
//     "new_crown": { ... }
// };
// We want:
// const vocabularyData = {
//     "new_crown": { ... },
//     "here_we_go": {
//         "1": [ ... ]
//     }
// };

// Find the last closing brace of "new_crown" or the end of the object.
// We can look for `    "new_crown": {` and align with it.
// Or just insert before the final `};` of vocabularyData.
// However, `data.js` ends with `};` and `window.vocabularyData = ...`
// Let's look for the closing of `vocabularyData`.

const snapshot = data.slice(data.lastIndexOf('}'));
// It likely ends with `};` or `}\n};` etc.

// Safety: find the last `};` which closes the variable.
// Actually, `data.js` has `const vocabularyData = { ... };` so we look for the last `};`.
// But easier: find the insertion point after "new_crown".

// Let's construct the injection string.
const injection = ',\n    "here_we_go": {\n        "1": ' + JSON.stringify(hwg1Data, null, 8) + '\n    }';

// Find the position to insert.
// We want to insert after the `new_crown` object closes.
// `new_crown` value is an object `{ "1": [...], "2": [...], "3": [...] }`.
// So we look for the closing brace of that object.
// Be careful not to break syntax.

// Regex to find the ending of new_crown object?
// Maybe easier: Find `    "new_crown": {` start, then match braces? No, too complex.
// How about inserting before the MAIN closing brace?
// The file ends with `};`. The main object closes with `}` just before `;`.
const closingBraceIndex = data.lastIndexOf('}');
if (closingBraceIndex === -1) {
    console.error('Could not find closing brace!');
    process.exit(1);
}

// Insert before the LAST closing brace (which belongs to vocabularyData).
const beforeClose = data.substring(0, closingBraceIndex);
const afterClose = data.substring(closingBraceIndex);

// Check if `new_crown` ends with a comma or not inside `beforeClose`.
// Actually, since `here_we_go` is a new key, we need to ensure the previous key has a comma.
// The previous key is likely the end of "new_crown" value.
// Let's verify if `beforeClose` ends with newline/whitespace.
// We should append a comma if it's not the first element (which it isn't).

// A safer update method: 
// 1. Read proper JSON if possible? No, it's a JS file.
// 2. Just replace the last newline-brace sequence.

// Let's try to just insert before `\n};` or `};`.
const insertPos = data.lastIndexOf('}');
// We need to make sure we are inside the object.
// data.js content: `const vocabularyData = { ... }; ...`
// So `insertPos` is the `}` of `vocabularyData`.

const newContent = beforeClose + injection + afterClose;

fs.writeFileSync(dataPath, newContent);
console.log('Patched data.js with Here We Go Grade 1.');
