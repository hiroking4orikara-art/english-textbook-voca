const fs = require('fs');
const path = require('path');
const hwg3Data = require('./restoration_hwg_grade3.js');

const dataPath = path.join(__dirname, 'data.js');
let data = fs.readFileSync(dataPath, 'utf8');

console.log('Original data.js length:', data.length);

// We need to inject Grade 3 data into the "here_we_go" object.
// The structure currently should be:
// "here_we_go": {
//     "1": [ ... ],
//     "2": [ ... ]
// }
// We want to add "3" after "2".

// Strategy:
// 1. Locate `"here_we_go": {`.
// 2. Locate the closing brace `}` of `here_we_go` object.
//    This is tricky because `vocabularyData` also ends with `}`.
//    Assuming `here_we_go` is the LAST property in `vocabularyData`.
//    The file likely ends with:
//    `        "2": [ ... ]`
//    `    }`
//    `};`

// Let's find the last occurrence of `}`.
// The very last `}` is for `vocabularyData` (before `};`).
// The one before that is for `here_we_go`.
// We want to insert before that second-to-last `}`.

const lastBraceIndex = data.lastIndexOf('}');
if (lastBraceIndex === -1) {
    console.error('Could not find closing brace of vocabularyData.');
    process.exit(1);
}

// Extract substring before last brace to find the second last brace
const beforeLastBrace = data.substring(0, lastBraceIndex);
const secondLastBraceIndex = beforeLastBrace.lastIndexOf('}');

if (secondLastBraceIndex === -1) {
    console.error('Could not find closing brace of here_we_go.');
    process.exit(1);
}

// We insert before `secondLastBraceIndex`.
// We need a comma before `"3"`.
const insertion = ',\n        "3": ' + JSON.stringify(hwg3Data, null, 12) + '\n    ';

// The insertion point is exactly at `secondLastBraceIndex`.
// But wait, what if there is no comma after "2"?
// `here_we_go` looks like: `{ "1": ..., "2": ... `}` `
// So "2"'s value ends, then `}` immediately (or after whitespace/newlines).
// We are inserting *inside* the object, at the end.
// So we prepend the comma to our new key.

const beforeInsertion = data.substring(0, secondLastBraceIndex);
const afterInsertion = data.substring(secondLastBraceIndex);

const newContent = beforeInsertion + insertion + afterInsertion;

fs.writeFileSync(dataPath, newContent);
console.log('Patched data.js with Here We Go Grade 3.');
