//原生函数
const rawImage = (() => {
    const imgNode = document.createElement("img")
    document.body.appendChild(imgNode)
    return {
        setSrc: (src) => {
            imgNode.src = src
        }
    }
})()
//代理函数
const proxyImage = (() => {
    const img = new Image()
    img.onload = () => {
        rawImage.setSrc(this.src)
    }
    return {
        setSrc : (src) => {
            rawImage.setSrc("./loading.gif")
            img.src = src
        }
    }
})()
proxyImage.setSrc("http://xxx.gif")

