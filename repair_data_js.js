const fs = require('fs');
const path = require('path');

const dataPath = path.join(__dirname, 'data.js');
let data = fs.readFileSync(dataPath, 'utf8');

// 1. Fix the corruption in getAllWords
// Pattern: `vocabularyData[textbook][grade]\n    }.flatMap`
// Replace with: `vocabularyData[textbook][grade].flatMap`

const corruptionPattern = /vocabularyData\[textbook\]\[grade\]\s*\n\s*\}\.flatMap/;
if (corruptionPattern.test(data)) {
    console.log('Found corruption in getAllWords. Fixing...');
    data = data.replace(corruptionPattern, 'vocabularyData[textbook][grade].flatMap');
} else {
    console.log('Did not find expected corruption pattern in getAllWords. Skipping step 1.');
}

// 2. Insert the missing closing brace for here_we_go
// We want to verify if it's missing first.
// Look at the end of vocabularyData.
// It should end with `};`.
// And before that `]`.
// If it is `] };` then we are missing `}`.
// If it is `] } };` then we are good.

// Find `window.vocabularyData` or `function getAllWords` to limit scope.
const footerStart = data.indexOf('function getAllWords');
const vocabSection = data.substring(0, footerStart);

// Find the last `};` in vocabSection.
const lastSemi = vocabSection.lastIndexOf('};');
if (lastSemi === -1) {
    console.error('Could not find end of vocabularyData.');
    process.exit(1);
}

// Check what's before `};`
// We ignore whitespace.
let cursor = lastSemi - 1;
while (cursor > 0 && /\s/.test(vocabSection[cursor])) cursor--;

// vocabSection[cursor] should be `}` (closing here_we_go).
// If it is `]`, then we are missing `}`.

if (vocabSection[cursor] === ']') {
    console.log('Structure is missing closing brace. Fix: `] };` -> `] } };`.');
    // We insert `}` before `};`.
    // Actually we can just replace `};` with `} };` (preserving whitespace if we want, but `data.js` is generated mostly).
    // Let's operate on `data` string directly using `lastSemi`.
    // We found `lastSemi` relative to `vocabSection`.
    // `vocabSection` is just a prefix of `data`. So index is valid for `data` too.
    
    // Insert `}` at `lastSemi`.
    // Check indentation. usually `    }\n};`
    // We can just insert `    }\n` before `};`.
    const before = data.substring(0, lastSemi);
    const after = data.substring(lastSemi);
    data = before + '    }\n' + after;
    console.log('Inserted missing closing brace.');
} else if (vocabSection[cursor] === '}') {
    console.log('Structure seems correct (found closing brace before final ;).');
} else {
    console.log('Unexpected character before end of vocabularyData: ' + vocabSection[cursor]);
}

fs.writeFileSync(dataPath, data);
console.log('Repair complete.');
