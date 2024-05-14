import {
    Functions,
    array,
    arrayG,
    arrayS,
    subRedes
} from "./functions.mjs";

import {
    Subred
} from "./subred.mjs";

const ob1 = new Functions
ob1.autoRellenar()
var ob2 = new Subred
ob2 = ob1.getSubRed(0)
console.log(arrayG)
console.log('--------SERIALES--------');
for (let index = 0; index < arrayS.length; index++) {
    if (index + 2 <= arrayS.length) {
        console.log(`R${index+1}-R${index+2}`)
        console.log(arrayS[index])
    } else {
        console.log(`R${index+1}-R1`)
        console.log(arrayS[index])
    }
}