# 设计原则

## 何为设计？

### 描述

```
按照某一种思路或者标准来实现功能
功能相同，可以有不同的设计方案来实现
伴随着需求的增加，设计的作用才能体现出来
```

### UNIX/LINUX设计思想

1. 小即是美
2. 让每个程序只做好一件事
3. 快速建立原型
4. 舍弃高效率而取可移植性
5. 采用纯文本来存储数据
6. 充分利用软件的杠杆效应(软件复用)
7. 使用 shell 脚本来提高杠杆效应和可移植性
8. 避免强制性的用户界面
9. 让每个程序都称为过滤器
```
// 小准则

允许用户定制环境

尽量使操作系统内核小而轻量化

使用小写字母并尽量简写

沉默是金

各部分之和大于整体

寻求90%的解决方案(2/8定律)
```
* 演示
```javascript
// 让每个程序都称为过滤器 + 沉默是金

```

## 五大设计原则

    * 单一职责原则
        
        单一职责原则原则就是每个程序只负责做好一件事情，如果功能过于复杂就拆分开，每个部分保持独立。

        ~比如组件化

    * 开放封闭原则

        开发封闭原则大白话的意思就是对扩展开放，对修改封闭。

        ~举个简单的实际开发中的例子

    * 里氏替换原则

        子类型必须能够替换掉它们的父类型。简单地说，这是因为子类型继承了父类，所以子类可以以父类的身份出现。

        （JS中使用较少）

    * 接口隔离原则

        使用多个专门的接口比使用单一的总接口要好。
        一个类对另外一个类的依赖性应当是建立在最小的接口上的。
        一个接口代表一个角色，不应当将不同的角色都交给一个接口。没有关系的接口合并在一起，形成一个臃肿的大接口，这是对角色和接口的污染。

        （JS中使用较少）

    * 依赖倒转原则

        抽象不应该依赖细节，细节应该依赖于抽象。简单说就是，我们要针对接口编程，而不要针对实现编程。

        （JS中使用较少）

```javascript
// Promise说明S O
const loadImage = function (src) {
    const promise = new Promise(function(resolve, reject){
        const img = document.createElement('img')
        img.onload = function(){
            resolve(img)
        }
        img.onerror = function(){
            reject('图片加载失败')
        }
        img.src = src
    })
    return promise
}
const src = 'http://pic15.nipic.com/20110628/1369025_192645024000_2.jpg'
const result = loadImage(src)
result
    .then(function(img){
        console.log('imgWidth: ' + img.width)
        return img
    })
    .then(function(img){
        console.log('imgHeight: ' + img.height)
    })
    .catch(function(error){
        console.log(error)
    })
```
