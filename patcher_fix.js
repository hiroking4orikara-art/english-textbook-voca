const fs = require('fs');
const path = require('path');
const hwg1Data = require('./restoration_hwg_grade1.js');
const hwg2Data = require('./restoration_hwg_grade2.js');

const dataPath = path.join(__dirname, 'data.js');
let data = fs.readFileSync(dataPath, 'utf8');

console.log('Original data length:', data.length);

// 1. Find the start of "here_we_go" inside vocabularyData
// We assume vocabularyData starts with `const vocabularyData = {`
// And "here_we_go" is likely at the end.

let truncateIndex = -1;
const hwgKey = '"here_we_go": {';
const hwgIndex = data.indexOf(hwgKey);

if (hwgIndex !== -1) {
    console.log('Found existing here_we_go key. Truncating from there.');
    // We want to remove "here_we_go" and everything after it, inside the object.
    // But we need to handle the comma before it if it exists.
    // Let's look backwards from hwgIndex for a comma.
    let trimPos = hwgIndex;
    while (trimPos > 0 && /\s/.test(data[trimPos - 1])) {
        trimPos--;
    }
    if (data[trimPos - 1] === ',') {
        trimPos--; // Include the comma in removal, we'll add it back if needed
    }
    truncateIndex = trimPos;
} else {
    console.log('here_we_go key not found. Looking for end of vocabularyData object.');
    // Find the last `};` which closes the const.
    // But wait, the file might be corrupted with extra stuff at the end.
    // We should look for the `};` that closes `vocabularyData`.
    // We assume indentation `};` at start of line? Or just `};`.
    
    // Safer: Look for the closing of the previous textbook (New Crown).
    // New Crown likely ends with `]`. (It's an array for grade 3? No, new_crown object).
    // Let's manually find where we want to append.
    // We assume the file *was* valid up until the "here_we_go" insertion or the end of new_crown.
    
    const vocabEnd = data.lastIndexOf('};');
    if (vocabEnd !== -1) {
        // We truncate before the last `}` of that `};` block.
        // Actually, `const vocabularyData = { ... };`
        // We want to insert inside `{ ... }`.
        
        // Let's try to match the closing brace of the main object.
        // Since we know the file is messy, let's find the LAST `}` that is NOT part of the garbage.
        // But how to distinguish?
        
        // Fallback: If `here_we_go` not found (which it WAS found in my analysis), rely on that.
        // Since my analysis showed `here_we_go` IS present (the dummy one), we should hit the `if` block.
        console.error('Unexpected: here_we_go not found, but it should be there (dummy or real).');
    }
}

if (truncateIndex !== -1) {
    const baseData = data.substring(0, truncateIndex);
    
    // Construct the new here_we_go object
    const hwgObject = {
        "1": hwg1Data,
        "2": hwg2Data
    };
    
    const injection = ',\n    "here_we_go": ' + JSON.stringify(hwgObject, null, 8);
    
    const footer = '\n};\n\n' +
        'function getAllWords(textbook, grade) {\n' +
        '    if (!vocabularyData[textbook] || !vocabularyData[textbook][grade]) return [];\n' +
        '    return vocabularyData[textbook][grade].flatMap(unit => unit.words);\n' +
        '}\n\n' +
        'window.vocabularyData = vocabularyData;';
        
    const finalContent = baseData + injection + footer;
    
    fs.writeFileSync(dataPath, finalContent);
    console.log('Fixed data.js and injected correct Here We Go data.');
} else {
    console.error('Could not determine where to patch data.js');
}
