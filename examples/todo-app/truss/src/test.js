var cheerio = require("cheerio");
var fs = require("fs");

var htmlPage = fs.readFileSync("../../index.html", "utf-8");

$ = cheerio.load(htmlPage);
$("#app-container").text("Durgesh");
console.log($.html());