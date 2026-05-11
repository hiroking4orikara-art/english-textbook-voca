
const fs = require('fs');

const dataPath = 'c:/Users/hirok/.gemini/antigravity/scratch/english-textbook-vocab/data.js';
const patchPath = 'c:/Users/hirok/.gemini/antigravity/scratch/english-textbook-vocab/patch_data.json';

const data = fs.readFileSync(dataPath, 'utf8').split('\n');
const patch = JSON.parse(fs.readFileSync(patchPath, 'utf8'));

// Convert patch object back to JSON string, but indented, and strip outer [ ]
let patchString = JSON.stringify(patch, null, 4);
patchString = patchString.substring(patchString.indexOf('[') + 1, patchString.lastIndexOf(']'));

// Indent lines to match data.js (12 spaces?)
// data.js uses 4 spaces for unit, 8 for words...
// Let's check indentation of line 1188.
// It seems to be 12 spaces for unit object?
// "            {"
// "                "unit": "Lesson 7",
// My JSON.stringify(null, 4) produces 4 spaces.
// I need to add 8 more spaces to every line?
// Or just let the format be slightly off? 
// Better to fix indentation.

const indentedPatch = patchString.split('\n').map((line, index) => {
    if (line.trim() === '') return line;
    // first line represents start of first object? No, stringify output:
    // [
    //     {
    //         "unit": ...
    //     },
    //     { ... }
    // ]
    // Slicing [ and ] leaves:
    // \n    {\n        "unit": ...\n    },\n    {...
    // The first line is empty or spaces.
    return '        ' + line; // Add 8 spaces to make 4->12.
}).join('\n');


// Splice point
// Keep lines 0 to 1186 (1-indexed 1 through 1187).
// Line 1187 is "            }," 
// Line 1188 is "            {" (Old Lesson 7 start)
// Line 1401 is "            }" (Old Lesson 8 end)
// Line 1402 is "        ]," (End of Grade 2 array)

// Arrays are 0-indexed.
// Line 1187 (1-indexed) is index 1186.
// Keep up to index 1186 (inclusive).
const part1 = data.slice(0, 1187);

// Part 3 starts at line 1402 (1-indexed) -> index 1401?
// wait, we want to keep "        ]," (Line 1402).
// Index 1401 is "        ],"
const part3 = data.slice(1401);

const newData = part1.join('\n') + '\n' + indentedPatch + '\n' + part3.join('\n');

fs.writeFileSync(dataPath, newData, 'utf8');
console.log('Patched data.js successfully.');
