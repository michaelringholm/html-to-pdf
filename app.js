/*
    https://blog.theodo.fr/2016/11/how-to-generate-pixel-perfect-pdfs/
*/
var _context = {};

async function run() {
    var context = console;
    _context = context;
    context.log('html-to-pdf converter started...');
    
    var fs = require('fs');
    var pdfFactorty = require('html-pdf');
    var html = fs.readFileSync('./daily-report.html', 'utf8');
    var options = { format: 'A4' };
        
    var pdf = pdfFactorty.create(html, options);
    context.log('pdf object created.');
    //pdf.toFile('./daily-report.pdf', createFile);
    pdf.toBuffer(createBuffer);

    context.log('html-to-pdf converter ended.');
    
};

function createFile(err, fileInfo) {        
    _context.log("Creating PDF...");        
    if (err) {
        _context.log(err);
        return;
    }
    else
    _context.log("Done creating PDF!");
    _context.log(fileInfo); // { filename: '/app/businesscard.pdf' }
};

function createBuffer(err, buffer) {
    _context.log('This is a buffer:', Buffer.isBuffer(buffer));
    var base64PDF = Buffer.from(buffer).toString('base64');
    _context.log('Base64PDF=' + base64PDF);
};

function test(context) {
    _context.log('test called.');
};

run();