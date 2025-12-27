///for each function

const { each, forEach } = require("lodash")
const data = require("./test.json")

const testCases = data.testCases


testCases.forEach ((testCases) =>{
console.log ("verified "+testCases.title)
});

