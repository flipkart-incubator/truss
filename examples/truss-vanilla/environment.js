var path=require('path');
module.exports={
	apps:path.resolve("./apps"),
	framework:path.resolve("./truss"),
	plugins:path.resolve("./truss_plugins"),
	home:path.resolve("../"),
	modules:path.resolve("./common_modules"),
	minified:path.resolve("./minified")
};
