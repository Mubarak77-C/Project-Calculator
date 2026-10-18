console.log('hi')

//1. Arithmetic operator function doing
const add=(a,b)=>{
    return a+b;
}
console.log(add(2,2))

const substract= (a,b)=>{
    return a-b;
}
console.log(substract(4,2))

const multiply= (a,b)=>{
    return a*b;
}
console.log(multiply(2,2))

// const division = (a,b)=>{
// if (a/0){console.log("Infinity number:any number can't divide by 0")}
// else if (0/0){console.log("Not a number")}
// return a/b;
// }
// console.log(division(4,2))

const division=(a,b)=>{
    if(b===0){
     console.log("Nope! Can't divide by 0") // Catch the error cleanly

    }
    return a/b;
}
console.log(division(4,0))

