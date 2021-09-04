class MVVM{
    constructor(el, data) {
        this.el = document.querySelector(el)
        this._data = data
        this.data = data
        this.domPool = {}
        this.init()
    }
    init(){
        this.initData()
        this.initDOM()
    }
    initDOM(){
        this.bindDOM(this.el)
        this.bindInput(this.el)
    }

    /**
     * Object.defineProperty方法 vue2
     * @returns {*}
     */
    initData(){
        const _this = this
        this.data = {}
        for(let key in this._data){
            Object.defineProperty(this.data, key,{
                get(){
                    console.log('-----get----');
                    return _this._data[key]
                },
                set(newValue) {
                    console.log('-----set-----');
                    _this.domPool[key].innerText = newValue
                    _this._data[key] = newValue
                }
            })
        }
    }

    /**
     * Proxy方法 vue3
     * @returns {boolean|any}
     */
    initData(){
        const _this = this
        this.data = new Proxy(this.data, {
            get(target, key, receiver) {
                return Reflect.get(target, key)
            },
            set(target, key, value, receiver) {
                _this.domPool[key].innerText = value
                return Reflect.set(target, key, value)
            }
        })
    }

    bindDOM(el){
        const childNodes = el.childNodes
        childNodes.forEach(item => {
            if(item.nodeType === 3){
                const _value = item.nodeValue
                if(_value.trim().length){
                    let isValid = /\{\{(.+?)\}\}/.test(_value)
                    if(isValid){
                        const _key = _value.match(/\{\{(.+?)\}\}/)[1].trim()
                        this.domPool[_key] = item.parentNode
                        item.parentNode.innerText = this.data[_key] || undefined
                    }
                }
            }
            item.childNodes && this.bindDOM(item)
        })
    }
    bindInput(el){
        const _allInput = el.querySelectorAll('input')
        _allInput.forEach(input => {
            const _vModel = input.getAttribute('v-model')
            if(_vModel){
                input.addEventListener('keyup', this.handleInput.bind(this, _vModel, input), false)
            }
        })
    }
    handleInput(key, input){
        const _value = input.value
        this.data[key] = _value
        console.log(this.data);
    }
}
