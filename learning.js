const lod = require("lodash");

//Javascript is async it will start the first line and without completeing that it will go to second line
setTimeout(() => {
    console.log(1)
}, 2000);
console.log(2)

//cypress._.times

// lod.times(10, ()=>{
//     console.log(1)
// });


for (i=1; i<=10; i++){
console.log("I'm printing using loop"+(1+i))
}

//loadsh command is used for 