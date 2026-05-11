const fs = require('fs');
const path = require('path');
const grade3Data = require('./restoration_grade3.js');

const dataPath = path.join(__dirname, 'data.js');
let data = fs.readFileSync(dataPath, 'utf8');

console.log('Original data.js length:', data.length);

// 1. Remove redundancy if present: "2": [], or "3": [],
// Searching for "2": \[\s*\], at the end of the new_crown object.
// Be careful not to remove valid empty arrays if they are intended (but here they seem to include valid data earlier).
// The pattern observed was:
//         ],
//         "2": [],
//         "3": []
//     }
// };

// We want to remove the redefined "2": [] and "3": [] lines.
// Replace any occurrence of `"2": [],` or `"3": []` inside the new_crown block (indented).
// Regex: /"2": \[\s*\],\s*"3": \[\s*\]/
// Or handle them individually.

// Check if "2": [] exists at the end.
if (data.match(/"2": \[\s*\],\s*"3": \[\s*\]/)) {
    console.log('Found empty "2" and "3" redefinitions. Cleaning up...');
    data = data.replace(/"2": \[\s*\],\s*"3": \[\s*\]/, '"3": []'); // Keep "3" placeholder for now to be replaced next
}

// Now replace "3": [] (or "3": [whitespace]) with real data.
const replacement = '"3": ' + JSON.stringify(grade3Data, null, 4);
data = data.replace(/"3": \[\s*\]/, replacement);

// Verify that we didn't lose Grade 2 data.
// Simple check: does "Lesson 1" appear twice? (Once for G1, once for G2).
// Or check for a Grade 2 specific word found in G2 restoration like "photography" (Lesson 1 G2).
if (!data.includes('"photography"')) {
    console.warn('WARNING: "photography" not found! Grade 2 data might be missing or corrupted.');
} else {
    console.log('Grade 2 data seems intact.');
}

if (!data.includes('"U.F.O."')) { // G3 L1 word
    console.warn('WARNING: "U.F.O." not found! Grade 3 data might not have been inserted correctly.');
} else {
    console.log('Grade 3 data seems inserted.');
}

fs.writeFileSync(dataPath, data);
console.log('Patched data.js successfully.');
