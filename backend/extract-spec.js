const fs = require('fs');
const path = require('path');
const pdf = require('pdf-parse');

async function run() {
  try {
    const pdfPath = path.resolve(__dirname, '..', 'cloudcommerce.pdf');
    const dataBuffer = fs.readFileSync(pdfPath);
    const data = await pdf(dataBuffer);
    const outPath = path.resolve(__dirname, 'SPEC_EXTRACT.txt');
    fs.writeFileSync(outPath, data.text, 'utf8');
    console.log('Spec extracted to', outPath);
  } catch (err) {
    console.error('Failed to extract PDF:', err.message);
    process.exit(1);
  }
}

run();



