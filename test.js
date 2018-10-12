/*
    https://blog.theodo.fr/2016/11/how-to-generate-pixel-perfect-pdfs/
*/
var _context = {};

async function run() {
    var context = console;
    _context = context;
    context.log('JavaScript HTTP trigger function processed a request.');
    context.log('test');

    context.log('test2');
    var fs = require('fs');
    var pdf = require('html-pdf');
    var html = fs.readFileSync('./daily-report.html', 'utf8');
    var options = { format: 'A4' };
    context.log('test3');
    
    var testA = pdf.create(html, options);
    context.log(JSON.stringify(testA));
    var testB = pdf.create(html, options).toFile('./daily-report.pdf', function(err, res) {
        context.log("Creating PDF...");
        if (err) return context.log(err);
        context.log("Done creating PDF!");
        context.log(res); // { filename: '/app/businesscard.pdf' }
    });
    context.log(JSON.stringify(testB));

    context.log('test4');
    setTimeout(test, 3000);
};

function test(context) {
    _context.log('test6');
};

run();