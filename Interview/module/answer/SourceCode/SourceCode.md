#   手写源码

##  手写源码 - Promise

1. promise 是什么?
2. promise 如何保证异步执行完了再去执行后面的代码?
3. 为什么能在异步事件执行完成的回调之后再去触发 then 中的函数?
4. 怎么保证 promise 链式调用 形如 promise.then().then()
5. 怎么知道异步事件执行完毕或者执行失败?

扩展：如何取消 promise

```javascript
// Promosie 使用示例
const startTime = new Date().getTime()
const promise1 = new Promise((resolve, reject) => {
    console.log('do promise1 exector')
    setTimeout(() => {
        resolve('promise1 resolve')
    }, 500)
})

const promise2 = new Promise((resolve, reject) => {
    console.log('do promise2 exector')
    setTimeout(() => {
        resolve('promise2 resolve')
    }, 300)
})

Promise.all([promise1, promise2])
    .then(values => {
        console.log(values)
        console.log(new Date().getTime() - startTime)
    })

Promise.race([promise1, promise2])
    .then(values => {
        console.log(values)
        console.log(new Date().getTime() - startTime)
    })
// do promise1 exector
// do promise2 exector
// 'promise2 resolve'
// ['promise1 resolve', 'promise2 resolve']

// MyPromise
class MyPromise {
    constructor (executor) {
        this.status = 'pending'
        this.fulfilledFunc = []
        this.rejectedFunc = []
        const resolve = args => {
            if (this.status !== 'pending') {
                return
            }
            this.status = 'fulfilled'
            setTimeout(() => {
                this.fulfilledFunc.forEach(item => item.call(this, args))
            })
        }
        const reject = error => {
            if (this.status !== 'pending') {
                return
            }
            this.status = 'rejected'
            setTimeout(() => {
                this.rejectedFunc.forEach(item => item.call(this, error))
            })
        }
        // do executor
        try {
            executor(resolve, reject)
        } catch (error) {
            reject(error)
        }
    }
    then (onFulfilled, onRejected) {
        onFulfilled = typeof onFulfilled !== 'function' ? args => args: onFulfilled
        onRejected = typeof onRejected !== 'function' ? error => error: onRejected
        return new MyPromise((resolve, reject) => {
            // fulfilledFunc
            this.fulfilledFunc.push(args => {
                try {
                    // do callback
                    let val = onFulfilled(args)
                    val instanceof MyPromise ? val.then(resolve, reject): resolve(val)
                } catch (error) {
                    reject(error)
                }
            })
            // rejectedFunc
            this.rejectedFunc.push(args => {
                try {
                    // do callback
                    let val = onRejected(args)
                    val instanceof MyPromise ? val.then(resolve, reject): reject(val)
                } catch (error) {
                    reject(error)
                }
            })
        })
    }
    catch (onRejected) {
    }
    finally (onFinally) {
    }
    static all (promiseArray) {
        let count = 0
        let result = []
        return new MyPromise((resolve, reject) => {
            for (let i = 0; i < promiseArray.length; i++) {
                promiseArray[i].then(res => {
                    result[i] = res
                    count++
                    if (count === promiseArray.length) {
                        resolve(result)
                    }
                }, err => {
                    reject(err)
                })
            }
        })
    }
    static race (promiseArray) {
        return new MyPromise((resolve, reject) => {
            for (let i = 0; i < promiseArray.length; i++) {
                promiseArray[i].then(res => {
                    resolve(res)
                }, err => {
                    reject(err)
                })
            }
        })
    }
}
const promise1 = new MyPromise((resolve, reject) => {
    console.log('do promise1 exector')
    setTimeout(() => {
        resolve('promise1 resolve')
    }, 500)
})

const promise2 = new MyPromise((resolve, reject) => {
    console.log('do promise2 exector')
    setTimeout(() => {
        resolve('promise2 resolve')
    }, 300)
})

MyPromise.all([promise1, promise2])
    .then(values => {
        console.log(values)
        console.log(new Date().getTime() - startTime)
    })

MyPromise.race([promise1, promise2])
    .then(values => {
        console.log(values)
        console.log(new Date().getTime() - startTime)
    })
```

##  手写源码 - 防抖节流

1. 防抖和节流区别

    防抖(debounce): 触发高频事件后 n 秒内函数只会执行一次,如果 n 秒内高频事件再次被触发,则重新计算时间

    节流(throttle): 高频事件触发，但在 n 秒内只会执行一次，所以节流会稀释函数的执行频率。

2. 防抖怎么保证
3. 节流怎么保证

```javascript
// debounce
function debounce (fn, delay, immediate = false) {
    let _timer = null
    let execFlag = true
    return function () {
        if (_timer) {
            clearTimeout(_timer)
        }
        if (immediate && execFlag) {
            fn.apply(this, arguments)
            execFlag = false
        }
        _timer = setTimeout(() => {
            if (immediate) {
                execFlag = true
            } else {
                fn.apply(this, arguments)
            }
        }, delay)
    }
}
// throttle
// 1. status
function throttle (fn, delay) {
    let execFlag = true
    return function () {
        if (!execFlag) return
        execFlag = false
        fn.apply(this, arguments)
        setTimeout(function () {
            execFlag = true
        }, delay)
    }
}
// 2. timestamp
function throttle (fn, delay) {
    let startTime = new Date().getTime()
    return function () {
        let endTime = new Date().getTime()
        if (endTime - startTime >= delay) {
            fn.apply(this, arguments)
            startTime = endTime
        }
    }
}
```

##  手写源码 - EventEmitter(发布订阅模式--简单版)

1. 什么是发布订阅模式

发布-订阅模式其实是一种对象间一对多的依赖关系，当一个对象的状态发送改变时，所有依赖于它的对象都将得到状态改变的通知。

订阅者（Subscriber）把自己想订阅的事件注册（Subscribe）到调度中心（Event Channel），当发布者（Publisher）发布该事件（Publish Event）到调度中心，也就是该事件触发时，由调度中心统一调度（Fire Event）订阅者注册到调度中心的处理代码。

2. 怎么实现一对多

```javascript
class EventEmitter {
    constructor () {
        // event center
        this.events = {}
    }
    on (type, callback) {
        if (!this.events) {
            this.events = Object.create(null)
        }
        if (!this.events[type]) {
            this.events[type] = [callback]
        } else {
            this.events[type].psuh[callback]
        }
    }
    off (type, callback) {
        if (!this.events[type]) return;
        this.events[type] = this.events[type].filter(item => {
            return item !== callback
        })
    }
    once (type, callback) {
        const fn = function () {
            callback()
            this.off(type, fn)
        }
        this.on(type, fn)
    }
    emit (type, ...args) {
        this.events[type] && this.events[type].forEach(fn => fn.apply(this, args))
    }
}

// test
const event = new EventEmitter()
const myClick = function () {
    console.log('my click')
}
event.once('click', myClick)
event.emit('click')
```

##  手写源码 - call、apply、bind

1. call 用法
2. 怎么改变 this 指向
Function.prototype.call(apply) 
3. 怎么获取传入的不定参数呢
argments / ...args

```javascript
// call
Function.prototype.MyCall = function(context, ...args) {
    if (!context) {
        context = window
    }
    const fn = Symbol()
    context[fn] = this
    return context[fn](...args)
}
// call test
const obj = {
    x: 1,
    toString: function () {
        console.log(this.x)
    }
}
const obj2 = { x: 3 }
obj.toString.call(obj2) // 3
obj.toString.MyCall(obj2) // 3
// apply
Function.prototype.MyApply = function(context, args) {
    if (!context) {
        context = window
    }
    const fn = Symbol()
    context[fn] = this
    return context[fn](...args)
}
// apply test
const obj = {
    x: 1,
    toString: function (args) {
        console.log(this.x)
        console.log(args)
    }
}
const obj2 = { x: 3 }
obj.toString.apply(obj2, [1, 2, 3]) // 3
obj.toString.MyApply(obj2, [1, 2, 3]) // 3
// bind
// https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Function/bind
Function.prototype.MyBind = function () {
    const execFunc = this
    const bindContext = arguments[0]
    const bindArgs = [].slice.call(arguments)
    return function () {
        const execArgs = bindArgs.concat([].slice.call(arguments))
        return execFunc.apply(bindContext, execArgs)
    }
}

const module = {
  x: 42,
  getX: function() {
    return this.x;
  }
};

const unboundGetX = module.getX;
console.log(unboundGetX()); // The function gets invoked at the global scope
// expected output: undefined

const boundGetX = unboundGetX.MyBind(module);
console.log(boundGetX());
// expected output: 42
```

##  手写源码 - new 操作符

1. new 用法是什么？
2. 怎么实现 this 指向改变？
3. 怎么实现构造函数原型属性和方法的使用

```javascript
// 对象有__proto__属性，函数有prototype属性
// 对象由函数生成;
// 生成对象时，对象的__proto__属性指向函数的prototype属性
function myNew (fn, ...args) {
    let obj = {}
    // 1. 直接将obj的原型对象直接fn的原型
    // obj.__proto__ = fn.prototype
    // 2. 使用object.create
    obj = Object.create(fn.prototype)
    let result = fn.apply(obj, ...args)
    if ((result && typeof result === 'object') || typeof result === 'function') {
        return result
    }
    return obj
}
// mynew
const arr = myNew(Array)
arr instanceof Array // true

// source
const arr = new Array()
arr instanceof Array // true
```

##  手写源码 - instanceof

1. instanceof 原理?
2. 怎么遍历左侧对象的原型链是关键点?

```javascript

function InstanceOf (src, target) {
    let srcProto = src.__proto__
    const targetPrototype = target.prototype
    while (true) {
        if (srcProto === null) {
            return false
        }
        if (srcProto === targetPrototype) {
            return true
        }
        srcProto = srcProto.__proto__
    }
}

const arr = new Array()
InstanceOf(arr, Array)

```

##  手写源码 - 深拷贝(deep copy)

1. 什么是深拷贝?
2. 怎么样才能全部拷贝?

```javascript
function deepCopy (target) {
    let result
    if (typeof target === 'object') {
        if (Array.isArray(target)) {
            result = []
            for (let i = 0; i < target.length; i ++) {
                result.push(deepCopy(target[i]))
            }
        } else if (target === null) {
            result = null
        } else if (target instanceof RegExp) {
            result = target
        } else {
            result = {}
            for (let key in target) {
                result[key] = deepCopy(target[key])
            }
        }
    } else {
        result = target
    }
    return result
}

// test
const obj = {
    o: { a: 1 },
    b: 2,
    j: [1, 2, 3]
}
const obj2 = deepCopy(obj)
obj2.o.a = 2
console.log(obj2)
console.log(obj)
```

扩展：利用JSON的方法实现简单的深拷贝
```
let targetObj = JSON.parse(JSON.stringify(sourceObj))
```

它的局限性是什么？

##  手写源码 - JSON.stringify

##  手写源码 - JSON.parse

##  手写源码 - 实现一个继承

##  手写源码 - 实现一个JS函数柯里化 
