//函数节流
function myThrottle(callback, wait){
    let start = 0
    return function (e){
        let now = Date.now()
        if(now - start >= wait){
            callback.apply(this, arguments)
            start = now
        }
    }
}

//函数防抖
function myDebounce(fn, time){
    let timeID = null
    return function (){
        if(timeID !== null){
            clearTimeout(timeID)
        }
        //启动定时器
        timeID = setTimeout(()=>{
            fn.apply(this, arguments)
            timeID = null
        }, time)
    }
}



