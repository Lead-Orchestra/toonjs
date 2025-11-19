// Test simple
const { execSync } = require('child_process');

console.log('Testing fast logger...');
const output = execSync('node analisis-empresarial-fast.js 2>&1', {
  encoding: 'utf8',
  maxBuffer: 50 * 1024 * 1024
});

const lines = output.split('\n');
console.log('Total lines:', lines.length);
console.log('Last 20 lines:');
console.log(lines.slice(-20).join('\n'));

console.log('\nSearching for "Tiempo total":');
const match = output.match(/Tiempo total: (\d+\.\d+)/);
if (match) {
  console.log('FOUND:', match[0]);
  console.log('TIME:', match[1]);
} else {
  console.log('NOT FOUND');
}
