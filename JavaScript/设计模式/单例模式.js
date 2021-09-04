//单例
const getSingle = (fn) => {
    let result;
    return (...rest) => {
        return result || (result = fn.apply(this, rest))
    }
}

//业务逻辑
const createLoginLayer = () => {
    const div = document.createElement("div")
    div.innerHTML = "登陆窗口"
    div.style.display = "none"
    document.body.appendChild(div)
    return div
};

const createSingleLoginLayer = getSingle(createLoginLayer)

document.getElementById("loginBtn").onclick = () =>{
    const loginLayer = createLoginLayer()
    loginLayer.style.display = "block"
}
