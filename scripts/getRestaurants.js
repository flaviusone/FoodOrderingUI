var fs = require('fs');
var cheerio = require('cheerio');

var content = fs.readFileSync('./food.html', 'utf8');

var $ = cheerio.load(content , {    
					 normalizeWhitespace: true,
    				 xmlMode: true, 
    				 decodeEntities: true
    				}
    				);

var obj = {links: []};

$('.vendor__cta').each(function () {
	
	var data = $(this);
	var tmp = data.children().first().attr('href');	
	obj.links.push(tmp);
	
});

module.exports.restaurants = obj;
// var objstring = JSON.stringify(obj);
// fs.writeFileSync('links.json', objstring, 'utf8');