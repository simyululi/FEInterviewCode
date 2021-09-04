class Promise{

    constructor(executor) {
        this.PromiseState = 'pending'
        this.PromiseResult = null
        this.callbacks = []
        const self = this

        function resolve(data){
            //状态只能从Pending修改成resolve或者reject
            if(self.PromiseState !== 'pending') return
            self.PromiseState = 'fulfilled'
            self.PromiseResult = data
            setTimeout(()=>{
                self.callbacks.forEach(item => {
                    item.onResolved(data)
                })
            })

        }

        function reject(data){
            if(self.PromiseState !== 'pending') return
            self.PromiseState = 'rejected'
            self.PromiseResult = data
            setTimeout(()=>{
                self.callbacks.forEach(item => {
                    item.onRejected(data)
                })
            })

        }

        try{
            executor(resolve, reject)
        } catch (e) {
            reject(e)
        }

    }

    /**
     * then返回的promise结果状态由then()指定的回调函数执行的结果决定
     * 1、如果抛出异常，新promise的状态变为rejected, reason为抛出的异常
     * 2、若返回的是非promise的任意值，新promise变为resolve, value为返回值
     * 3、若返回的是一个新的promise，此promise的结果会成为新promise的结果
     * @param onResolved
     * @param onRejected
     * @returns {Promise}
     */
    then(onResolved, onRejected){
        const self = this

        //判断回调函数参数，实现catch的异常穿透
        if(typeof onRejected !== 'function') {
            onRejected = reason => {
                throw reason
            }
        }
        if(typeof onResolved !== 'function') {
            onResolved = value => value
        }
        return new Promise((resolve, reject)=>{
            function callback(type){
                try{
                    let res = type(self.PromiseResult)
                    if(res instanceof Promise){
                        res.then(v => {
                            resolve(v)
                        }, r => {
                            reject(r)
                        })
                    } else {
                        resolve(res)
                    }
                }catch (e){
                    reject(e)
                }
            }
            if(this.PromiseState === 'fulfilled') {
                setTimeout(()=>{
                    callback(onResolved)
                })
            }
            if(this.PromiseState === 'rejected') {
                setTimeout(()=>{
                    callback(onRejected)
                })
            }

            /**
             * 如果不对pending做判断
             * 在碰到异步调用的时候不能直接运行resolve或者reject
             * 因为resolve和reject方法和then()不再一个作用域中，不能共享then()的参数
             * 所以在判断状态为pending时，将回调保存到实例对象上，
             * 然后将回调函数的调用放在resolve()和reject()中
             * 当代码运行到异步队列的resolve()或reject()时
             * 就可以在这个函数中运行回调函数，实现异步then
             */
            if(this.PromiseState === 'pending') {
                this.callbacks.push({
                    onResolved: function (){
                        callback(onResolved)
                    },
                    onRejected: function (){
                        callback(onRejected)
                    }
                })
            }
        })
    }

    catch(onRejected){
        return this.then(undefined, onRejected)
    }

    resolve (value) {
        return new Promise((resolve, reject) => {
            if(value instanceof Promise){
                value.then(v => {
                    resolve(v)
                }, r => {
                    reject(r)
                })
            } else {
                resolve(value)
            }
        })
    }

    reject (reason) {
        return new Promise((resolve, reject) => {
            reject(reason)
        })
    }

    all (promises) {
        return new Promise((resolve, reject) => {
            let count = 0
            let arr = []
            for(let i = 0; i < promises.length; i++){
                promises[i].then(v => {
                    count++
                    arr[i] = v
                    if(count == promises.length){
                        resolve(arr)
                    }
                }, r => {
                    reject(r)
                })
            }
        })
    }

    race (promises) {
        return new Promise((resolve, reject) => {
            for(let i = 0; i < promises.length; i++){
                promises[i].then(v => {
                    resolve(v)
                }, r => {
                    reject(r)
                })
            }
        })
    }
}

// function Promise(executor){
//     this.PromiseState = 'pending'
//     this.PromiseResult = null
//     this.callbacks = []
//     const self = this
//     function resolve(data){
//         if(self.PromiseState !== 'pending') return
//         self.PromiseState = 'fulfilled'
//         self.PromiseResult = data
//
//         //调用成功的回调函数
//         setTimeout(()=>{
//             self.callbacks.forEach(item => {
//                 item.onResolved(data)
//             })
//         })
//
//     }
//
//     function reject(data){
//         if(self.PromiseState !== 'pending') return
//         self.PromiseState = 'rejected'
//         self.PromiseResult = data
//         setTimeout(()=>{
//             self.callbacks.forEach(item => {
//                 item.onRejected(data)
//             })
//         })
//
//     }
//     try{
//         executor(resolve, reject)
//     } catch (e) {
//         reject(e)
//     }
//
// }
//
// /**
//  * then返回的promise结果状态由then()指定的回调函数执行的结果决定
//  * 1、如果抛出异常，新promise的状态变为rejected, reason为抛出的异常
//  * 2、若返回的是非promise的任意值，新promise变为resolve, value为返回值
//  * 3、若返回的是一个新的promise，此promise的结果会成为新promise的结果
//  * @param onResolved
//  * @param onRejected
//  * @returns {Promise}
//  */
// Promise.prototype.then = function (onResolved, onRejected){
//     const self = this
//
//     //判断回调函数参数，实现catch的异常穿透
//     if(typeof onRejected !== 'function') {
//         onRejected = reason => {
//             throw reason
//         }
//     }
//     if(typeof onResolved !== 'function') {
//         onResolved = value => value
//     }
//     return new Promise((resolve, reject)=>{
//         function callback(type){
//             try{
//                 let res = type(self.PromiseResult)
//                 if(res instanceof Promise){
//                     res.then(v => {
//                         resolve(v)
//                     }, r => {
//                         reject(r)
//                     })
//                 } else {
//                     resolve(res)
//                 }
//             }catch (e){
//                 reject(e)
//             }
//         }
//         if(this.PromiseState === 'fulfilled') {
//             setTimeout(()=>{
//                 callback(onResolved)
//             })
//         }
//         if(this.PromiseState === 'rejected') {
//             setTimeout(()=>{
//                 callback(onRejected)
//             })
//         }
//
//         /**
//          * 如果不对pending做判断
//          * 在碰到异步调用的时候then里面的语句不会执行
//          */
//         if(this.PromiseState === 'pending') {
//             this.callbacks.push({
//                 onResolved: function (){
//                     callback(onResolved)
//                 },
//                 onRejected: function (){
//                     callback(onRejected)
//                 }
//             })
//         }
//     })
// }
//
//
// Promise.prototype.catch = function (onRejected){
//     return this.then(undefined, onRejected)
// }
//
// Promise.resolve = function (value) {
//     return new Promise((resolve, reject) => {
//         if(value instanceof Promise){
//             value.then(v => {
//                 resolve(v)
//             }, r => {
//                 reject(r)
//             })
//         } else {
//             resolve(value)
//         }
//     })
// }
//
// Promise.reject = function (reason) {
//     return new Promise((resolve, reject) => {
//         reject(reason)
//     })
// }
//
// Promise.all = function (promises) {
//     return new Promise((resolve, reject) => {
//         let count = 0
//         let arr = []
//         for(let i = 0; i < promises.length; i++){
//             promises[i].then(v => {
//                 count++
//                 arr[i] = v
//                 if(count == promises.length){
//                     resolve(arr)
//                 }
//             }, r => {
//                 reject(r)
//             })
//         }
//     })
// }
//
// Promise.race = function (promises) {
//     return new Promise((resolve, reject) => {
//         for(let i = 0; i < promises.length; i++){
//             promises[i].then(v => {
//                 resolve(v)
//             }, r => {
//                 reject(r)
//             })
//         }
//     })
// }
