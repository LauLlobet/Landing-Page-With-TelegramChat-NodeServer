var names = require('fantasy-names');
var list = names('fantasy', 'pirates', 30000, 0);
var allNames = list.split("\n");

var json = {};
var id = 0;
allNames.forEach(function(each){
	json[id] = each;
	id++;
})

console.log(JSON.stringify(json));


