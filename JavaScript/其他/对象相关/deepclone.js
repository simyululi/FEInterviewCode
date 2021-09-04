
function deepClone_1(obj){
    function isObject(obj){
        return typeof obj == "object" || typeof obj == "function"
    }
    let newObj = {}
    for(let key in obj){
        if(isObject(obj[key] && !Array.isArray(obj[key]))){
            deepclone(obj[key])
        }else if(Array.isArray(obj[key])){
            newObj[key] = [...obj[key]]
        }else{
            newObj[key] = obj[key]
        }
    }
    return newObj
}

function deepClone_2(obj){
    function isObject(o){
        return (typeof o === 'object' || typeof o === 'function') && o !== null
    }
    if(!isObject(obj)) {
        throw new Error('not a object')
    }
    let newObj = Array.isArray(obj) ? [...obj] : {...obj}
    Reflect.ownKeys(newObj).forEach(key => {
        newObj[key] = isObject(obj[key]) ? deepClone1(obj[key]) : obj[key]
    })
    return newObj
}