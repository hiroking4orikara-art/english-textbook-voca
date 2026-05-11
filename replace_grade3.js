const fs = require('fs');
const path = require('path');
const grade3Data = require('./restoration_grade3.js');

const dataPath = path.join(__dirname, 'data.js');
let data = fs.readFileSync(dataPath, 'utf8');

// Strategy:
// 1. Find "new_crown": { ... } block.
// 2. Inside that, find "2": [ ... ].
// 3. Keep everything up to the end of "2": [ ... ] (including closing bracket).
// 4. If there is a "3": [ ... ] block following it (before the closing brace of new_crown), ignore/remove it.
// 5. Append the updated "3": [ ... ] block.
// 6. Append the rest of the file (e.g. closing brace of new_crown, and any other textbooks like here_we_go).

// Check for here_we_go or other keys to ensure we preserve the tail.
// We need to find the CLOSING brace of `new_crown`.
// And we need to insert/replace "3" inside new_crown.

// Robust logic:
// 1. Find "new_crown": {
const startNewCrown = data.indexOf('"new_crown": {');
if (startNewCrown === -1) {
    console.error('"new_crown" key not found.');
    process.exit(1);
}
console.log('Found new_crown at:', startNewCrown);

// 2. Find "2": [ AFTER startNewCrown
const startG2 = data.indexOf('"2": [', startNewCrown);
if (startG2 === -1) {
    console.error('"2": [ not found inside new_crown.');
    process.exit(1);
}
console.log('Found G2 start at:', startG2);

// 3. Find G2 closing bracket
let openCount = 1;
let g2ClosePos = -1;
for (let i = startG2 + '"2": ['.length; i < data.length; i++) {
    if (data[i] === '[') openCount++;
    if (data[i] === ']') openCount--;
    if (openCount === 0) {
        g2ClosePos = i;
        break;
    }
}
if (g2ClosePos === -1) { console.error('G2 close not found'); process.exit(1); }
console.log('G2 ends at:', g2ClosePos);

// 4. Find new_crown closing bracket.
// It should be the first '}' after G2 close (ignoring whitespace/newlines).
// BUT, if there is a G3, we must skip it.
// The safe way: Match `new_crown` opening brace count.
openCount = 1;
let newCrownClosePos = -1;
// Start scan from startNewCrown + brace
for (let i = startNewCrown + '"new_crown": {'.length; i < data.length; i++) {
    if (data[i] === '{') openCount++;
    if (data[i] === '}') openCount--;
    if (openCount === 0) {
        newCrownClosePos = i;
        break;
    }
}
if (newCrownClosePos === -1) { console.error('new_crown close not found'); process.exit(1); }
console.log('new_crown ends at:', newCrownClosePos);

// 5. Construct new data
// Content before G2 end
const contentBefore = data.substring(0, g2ClosePos + 1);

// Content after new_crown end (keeping the closing brace of new_crown, i.e., substring from newCrownClosePos to end is INCORRECT if we want to insert INSIDE).
// We want to insert G3 BEFORE newCrownClosePos.
// So we want content FROM newCrownClosePos.

// Wait, we are removing OLD G3.
// Everything between g2ClosePos+1 and newCrownClosePos is the OLD G3 (plus whitespace).
// So removing it is exactly what we want.

const contentAfter = data.substring(newCrownClosePos); // Starts with '}' of new_crown

const g3Json = JSON.stringify(grade3Data, null, 4);
const injected = ',\n        "3": ' + g3Json + '\n    ';

const newData = contentBefore + injected + contentAfter;

fs.writeFileSync(dataPath, newData);
console.log('Successfully updated Grade 3 data in data.js');
