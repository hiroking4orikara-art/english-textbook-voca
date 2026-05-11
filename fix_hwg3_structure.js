const fs = require('fs');
const path = require('path');

const dataPath = path.join(__dirname, 'data.js');
let data = fs.readFileSync(dataPath, 'utf8');

// 1. Find the premature closing brace of here_we_go.
// It is the `}` immediately preceding `,"3": [`.
const targetStr = ',\n        "3": [';
const targetIndex = data.indexOf(targetStr);

if (targetIndex === -1) {
    console.error('Could not find the "3" block insertion point.');
    process.exit(1);
}

// Look backwards from targetIndex for `}`
let braceIndex = targetIndex - 1;
while (braceIndex > 0 && /\s/.test(data[braceIndex])) {
    braceIndex--;
}

if (data[braceIndex] !== '}') {
    console.error('Expected to find "}" before "3" block, found: ' + data[braceIndex]);
    // It might be that I added a comma?
    // The grep showed: `}` then `,` then `"3":`.
    // My `targetStr` includes the comma.
    // So `targetIndex` points to the comma.
    // Scanning back from comma should hit `}`.
    // Let's debug print context if failed.
    console.log('Context:', data.substring(targetIndex - 20, targetIndex));
    process.exit(1);
}

console.log('Found premature closing brace at index:', braceIndex);

// 2. Remove that `}`.
// We replace it with a space to keep offsets safe for a moment, or just slice.
const beforeBrace = data.substring(0, braceIndex);
const afterBrace = data.substring(braceIndex + 1);
let newData = beforeBrace + afterBrace;

// 3. Add a closing brace `}` after the `]` of the "3" block.
// The "3" block is at the end of the object structure.
// So we look for the last `]` in the file (before the footer).
// The file ends with `};` then footer.
// So `newData.lastIndexOf(']')` should be the end of `3` array.

const lastBracketIndex = newData.lastIndexOf(']');
if (lastBracketIndex === -1) {
    console.error('Could not find closing bracket of "3" array.');
    process.exit(1);
}

const beforeBracket = newData.substring(0, lastBracketIndex + 1);
const afterBracket = newData.substring(lastBracketIndex + 1);

// Insert `}` after it.
// We also need to ensuring indentation?
// Just `}` is enough, JS doesn't care about indent.
// But valid JSON-like object needs to be clean.
// `] } };`
newData = beforeBracket + '\n    }' + afterBracket;

fs.writeFileSync(dataPath, newData);
console.log('Fixed structure: moved closing brace to encompass "3".');
