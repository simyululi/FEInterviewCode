/*
 * @Author: your name
 * @Date: 2021-09-09 11:43:04
 * @LastEditTime: 2021-09-09 11:48:55
 * @LastEditors: your name
 * @Description: In User Settings Edit
 * @FilePath: /FEInterviewCode/JavaScript/其他/curry.js
 */
function curry(fn, ...args){
    if(args.length < fn.length){
        return (...newArgs) => curry(fn, ...args, ...newArgs)
    } else {
        return fn(...args)
    }
}

function sum(a, b, c){
    return a + b + c
}

let sumFn = curry(sum)
console.log(sumFn(1)(2)(3))
console.log(sumFn(1)(2, 3))
