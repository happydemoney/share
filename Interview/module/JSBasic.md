#   JS基础

##  ['1', '2', '3'].map(parseInt) what & why ?

##  什么是防抖和节流？有什么区别？如何实现？

##  介绍下 Set、Map、WeakSet 和 WeakMap 的区别？

##  ES5/ES6 的继承除了写法以外还有什么区别？

##  有以下 3 个判断数组的方法，请分别介绍它们之间的区别和优劣

```
Object.prototype.toString.call() 、 instanceof 以及 Array.isArray()
```

##  介绍模块化发展历程

##  全局作用域中，用 const 和 let 声明的变量不在 window 上，那到底在哪里？如何去获取？

##  下面的代码打印什么内容，为什么？

```
var b = 10;
(function b(){
    b = 20;
    console.log(b); 
})();
```

##  简单改造下面的代码，使之分别打印 10 和 20。

```
var b = 10;
(function b(){
    b = 20;
    console.log(b); 
})();
```

##  下面代码输出什么

```
var a = 10;
(function () {
    console.log(a)
    a = 5
    console.log(window.a)
    var a = 20;
    console.log(a)
})()
```