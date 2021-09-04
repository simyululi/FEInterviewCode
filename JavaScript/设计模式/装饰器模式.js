Function.prototype.before = function (beforeFn){
    return (...rest) => {
        beforeFn.apply(this, rest)
        return this(...rest)
    }
}
let ajax = (type, url, param) => {
    console.log(param)
}
const getToken = ()=>{
    return "token"
}
ajax = ajax.before((type, url, param) => {
    param.token = getToken()
})
