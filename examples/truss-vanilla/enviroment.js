var path=require('path');
module.exports={
	framework:path.resolve("./truss"),
	plugins:path.resolve("./truss_plugins"),
	home:path.resolve("../"),
	modules:path.resolve("./modules"),
	minified:path.resolve("./minified")
};
