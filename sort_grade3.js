const fs = require('fs');
const grade3Data = require('./restoration_grade3.js');

function getStartPage(pageStr) {
    if (!pageStr) return 9999;
    // Match the first number found in the string
    const match = pageStr.match(/(\d+)/);
    return match ? parseInt(match[0], 10) : 9999;
}

console.log('Original order:');
grade3Data.forEach(u => console.log(`${u.pages}: ${u.unit}`));

// Sort
grade3Data.sort((a, b) => {
    return getStartPage(a.pages) - getStartPage(b.pages);
});

console.log('\nSorted order:');
grade3Data.forEach(u => console.log(`${u.pages}: ${u.unit}`));

// Write back to restoration_grade3.js
const content = `const grade3Data = ${JSON.stringify(grade3Data, null, 2)};
module.exports = grade3Data;
`;

fs.writeFileSync('./restoration_grade3.js', content, 'utf8');
console.log('\nUpdated restoration_grade3.js');
