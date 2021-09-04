
Array.prototype.myMap = function (fn){
    let res = []
    let len = this.length
    for(let i = 0; i < len; i++){
        res.push(fn(this[i], i))
    }
    return res
}

Array.prototype.myReduce = function (fn){
    let arr = this   //this就是调用reduce方法的数组
    let total =  arr[0] // 默认为数组的第一项
    for (let i = 1; i < arr.length; i++) {
        total = fn(total, arr[i], i , arr)
    }
    return total
}

//数组扁平化
function flatten(arr){
    let res = []
    for(let i = 0; i < arr.length; i++){
        if(Array.isArray(arr[i])){
            res = res.concat(flatten1(arr[i]))
        } else {
            res = res.concat(arr[i])
        }
    }
    return res
}