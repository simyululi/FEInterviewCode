/**
 * function.call(content, ...args)
 * content。在call被调用时this指向content.function。
 * ...args是function的参数列表
 */
 Function.prototype.myCall = function (content, ...args){
    content = content || window
    content.fn = this
    let res = content.fn(...args)
    delete content.fn
    return res
}

/**
 * func.apply(content, args)
 * apply被调用时,this指向content.func
 * args是一个数组或类数组对象
 */
Function.prototype.myApply = function (content){
    content = content || window
    content.fn = this
    let res = content.fn(...arguments)
    delete content.fn
    return res
}

/**
 * func.bind(content, ...args)
 * bind方法会返回一个新的函数，当被bind被调用时，this指向content.func
 * ...args是可选参数，当func被调用时，...args被放入绑定函数中的参数列表中
 */
Function.prototype.myBind = function (content){
    const self = this
    return  ()=>{
        return self.myCall(content, ...arguments)
    }
}


function SuperType(){
    this.colors = ['red', 'blue', 'green']
}
function SubType(){
    SuperType.myApply(this)
    console.log(this)
}
let instance1 = new SubType()
instance1.colors.push('black')
console.log(instance1.colors);

let instance2 = new SubType()
console.log(instance2.colors);
