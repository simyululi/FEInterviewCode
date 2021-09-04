function check(obj){
    let map = new Map()
    const dfs = function (key){
        map.set(key, 1)
        if(key.hasOwnProperty(obj)){
            return key == obj
        } else {
            for(let item in key){
                if(map.has(key)){
                    return true
                } else if(typeof item == "object" || typeof item == "function"){
                    dfs(item)
                }
            }
        }
        return false
    }
    return dfs(obj)
}

let a = {b:{}}
a.b.a = a
console.log(check(a));