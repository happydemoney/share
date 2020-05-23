#   手写源码

##  手写源码 - Promise

1. promise 是什么?
2. promise 如何保证异步执行完了再去执行后面的代码?
3. 为什么能在异步事件执行完成的回调之后再去触发 then 中的函数?
4. 怎么保证 promise 链式调用 形如 promise.then().then()
5. 怎么知道异步事件执行完毕或者执行失败?

扩展：如何取消 promise

##  手写源码 - 防抖节流

1. 防抖和节流区别
2. 防抖怎么保证
3. 节流怎么保证

##  手写源码 - EventEmitter(发布订阅模式--简单版)

1. 什么是发布订阅模式
2. 怎么实现一对多

##  手写源码 - call、apply、bind

1. call 用法
2. 怎么改变 this 指向
3. 怎么获取传入的不定参数呢

##  手写源码 - new 操作符

1. new 用法是什么？
2. 怎么实现 this 指向改变？
3. 怎么实现构造函数原型属性和方法的使用

##  手写源码 - instanceof

1. instanceof 原理?
2. 怎么遍历左侧对象的原型链是关键点?

##  手写源码 - 深拷贝(deep copy)

1. 什么是深拷贝?
2. 怎么样才能全部拷贝?

扩展：利用JSON的方法实现简单的深拷贝
```
let targetObj = JSON.parse(JSON.stringify(sourceObj))
```

它的局限性是什么？

