/*
    https://blog.theodo.fr/2016/11/how-to-generate-pixel-perfect-pdfs/
*/
var _context = {};

module.exports = async function (context, req) {
    _context = context;
    context.log('JavaScript HTTP trigger function processed a request.');
    context.log('test');

    if (req.query.name || (req.body && req.body.name)) {
        context.log('test2');
        var fs = require('fs');
        var pdf = require('html-pdf');
        var html = fs.readFileSync('./HTMLToPDF/daily-report.html', 'utf8');
        var options = { format: 'A4' };
        context.log('test3');
        
        var testA = pdf.create(html, options);
        context.log(JSON.stringify(testA));
        var testB = pdf.create(html, options).toFile('./HTMLToPDF/daily-report.pdf', function(err, res) {
            context.log("Creating PDF...");
            if (err) return context.log(err);
            context.log("Done creating PDF!");
            context.log(res); // { filename: '/app/businesscard.pdf' }
        });
        context.log(JSON.stringify(testB));

        context.log('test4');
        setTimeout(test, 3000);

        context.res = {
            // status: 200, /* Defaults to 200 */
            body: "Hello " + (req.query.name || req.body.name)
        };
    }
    else {
        context.res = {
            status: 400,
            body: "Please pass a name on the query string or in the request body"
        };
    }
};

function test(context) {
    _context.log('test6');
};