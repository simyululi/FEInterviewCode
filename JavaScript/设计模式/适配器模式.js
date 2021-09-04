const aMap = {
    show:()=>{
        console.log("begin render mapA");
    }
}
const bMap = {
    display:()=>{
        console.log("begin render mapB");
    }
}
const bMapAdapter = {
    show:()=>{
        return bMap.display()
    }
}
const renderMap = (map) => {
    if(map.show instanceof Function){
        map.show()
    }
}
renderMap(aMap)
renderMap(bMapAdapter)
