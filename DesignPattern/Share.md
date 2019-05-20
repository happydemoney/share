# JS设计模式开发实践分享

## 现代前端交互框架

1. 直接DOM操作时代

    代表：jQuery、prototype、motools等

后两者一开始就实现了类的设计模式而且API的使用不太方便，相反jQuery以其简单友好的API和书写方式得到了广大开发者的认可

jQuery主要实现了选择器、DOM操作方法、事件绑定封装、AJAX、Deferred这个五个方面的封装和常见的兼容性问题的处理。除此之外，我们还可以基于jQuery扩展更多的方法功能来提高业务开发效率。

SPA

2. MV*交互模式

* 前端MVC模式（Model-View-Controller）

    成熟的MVC框架一般是通过事件监听或观察者模式来实现的。

* 前端MVP模式（Model-View-Presenter）

* 前端MVVM模式（Model-View-ViewModel）

    可以认为是自动化的MVP框架

* 数据变更检测示例

    1. 手动触发绑定

        监听dom事件

    2. 脏检测机制

        原理：在ViewModel对象的某个属性值发生变化时找到与这个属性相关的所有元素，然后再比较数据变化，如果变化则进行Directive指令调用，对这个元素进行重新扫描渲染。

    3. 前端数据对象劫持

        使用Object.defineProperty 和 Object.definePropertys 对ViewModel数据对象进行属性get()和set()监听

    4. ES6 Proxy


前端框架从直接操作DOM到MVC设计模式，MVP，MVVM，前端设计模式的改进原则一直向着高效、易维护、易扩展的基本方向发展

3. Virtual DOM交互模式

4. 前端MNV*时代

## 类库或框架中的设计模式介绍

1. jQuery迭代器

```javascript
$.each = function( obj, callback ) {
    var value,
        i = 0,
        length = obj.length,
        isArray = isArraylike( obj );
    if ( isArray ) { // 迭代类数组
        for ( ; i < length; i++ ) {
            value = callback.call( obj[ i ], i, obj[ i ] );
            if ( value === false ) {
                break;
            }
        }
    } else {
        for ( i in obj ) { // 迭代 object 对象
            value = callback.call( obj[ i ], i, obj[ i ] );
            if ( value === false ) {
                break;
            }
        }
    }
    return obj;
};
```

## 设计模式

1. 设计原则

    * 单一职责原则
        
        单一职责原则原则就是每个程序只负责做好一件事情，如果功能过于复杂就拆分开，每个部分保持独立。
        ~比如组件化

    * 开放封闭原则

        开发封闭原则大白话的意思就是对扩展开放，对修改封闭。
        ~举个简单的实际开发中的例子

    * 最少知识原则

        迪米特法则（Law of Demeter）又叫作最少知识原则（Least Knowledge Principle 简写LKP），就是说一个对象应当对其他对象有尽可能少的了解,不和陌生人说话。英文简写为: LoD.

        ~比如外观模式和中介者模式

2. 设计模式

    * 创建型

    |英文名称|中文名称|介绍|
    |:---:|:---|:---:|
    | Singleton |单例模式|保证一个类只有一个实例，并提供一个访问它的全局访问点|
    | Prototype |原型模式|用原型实例指定创建对象的种类，并且通过拷贝这些原型来创建新的对象。|

    * 结构型

    |英文名称|中文名称|介绍|
    |:---:|:---|:---:|
    | Iterator | 迭代器模式 | 提供一个方法顺序访问一个聚合对象的各个元素，而又不需要暴露该对象的内部表示 |
    | Observer | 观察者模式 | 定义对象间一对多的依赖关系，当一个对象的状态发生改变时，所有依赖于它的对象都得到通知自动更新 |
    | Template Method | 模板方法 | 定义一个操作中的算法的骨架，而将一些步骤延迟到子类中，TemplateMethod使得子类可以不改变一个算法的结构即可以重定义该算法得某些特定步骤。 |
    | Command | 命令模式 | 将一个请求封装为一个对象，从而使你可以用不同的请求对客户进行参数化，对请求排队和记录请求日志，以及支持可撤销的操作。 |
    | State | 状态模式 | 允许对象在其内部状态改变时改变他的行为。对象看起来似乎改变了他的类 |
    | Strategy | 策略模式 | 定义一系列的算法，把他们一个个封装起来，并使他们可以互相替换，本模式使得算法可以独立于使用它们的客户 |
    | Chain of Responsibility | 职责链模式 | 使多个对象都有机会处理请求，从而避免请求的送发者和接收者之间的耦合关系 |
    | Mediator | 中介者模式 | 用一个中介对象封装一些列的对象交互 |

    * 行为型

    |英文名称|中文名称|介绍|
    |:---:|:---|:---:|
    | Composite | 组合模式 | 将对象组合成树形结构以表示部分整体的关系，Composite使得用户对单个对象和组合对象的使用具有一致性 |
    | Facade | 外观模式 | 为子系统中的一组接口提供一致的界面，fa?ade提供了一高层接口，这个接口使得子系统更容易使用 |
    | Proxy | 代理模式 | 为其他对象提供一种代理以控制对这个对象的访问 |
    | Adapter | 适配器模式 | 将一类的接口转换成客户希望的另外一个接口，Adapter模式使得原本由于接口不兼容而不能一起工作那些类可以一起工作 |
    | Decrator | 装饰模式 | 动态地给一个对象增加一些额外的职责，就增加的功能来说，Decorator模式相比生成子类更加灵活 |
    | Flyweight | 享元模式 | 一种用于性能优化的模式，“fly”在这里是苍蝇的意思，意为蝇量级。享元模式的核心是运用共享技术来有效支持大量细粒度的对象 |

## 具体设计模式详细介绍

    使用场景、面向对象方式实现、函数实现

1. 原型模式

        原型模式不单是一种设计模式，也被称为一种编程泛型。
    在以类为中心的面向对象编程语言中，类和对象的关系可以想象成铸模和铸件的关系，对象
    总是从类中创建而来。
    而在原型编程的思想中，类并不是必需的，对象未必需要从类中创建而来，一个对象是通过克隆另外一个对象所得到的。

2. 迭代器模式

        Array.prototype.forEach / Array.prototype.map

    * 内部迭代器与外部迭代器

    ```javascript
    // 内部迭代器 - 内部已经定义好了迭代规则，它完全接手整个迭代过程，外部只需要一次初始调用
    // jQuery迭代函数each
    // 外部迭代器 - 外部迭代器必须显式地请求迭代下一个元素
    var Iterator = function( obj ){
        var current = 0;
            var next = function(){
            current += 1;
        };
        var isDone = function(){
            return current >= obj.length;
        };
        var getCurrItem = function(){
            return obj[ current ];
        };
        return {
            next: next,
            isDone: isDone,
            getCurrItem: getCurrItem
        }
    };
    ```

3. 观察者模式

        又名：发布-订阅模式，它定义对象间的一种一对多的依赖关系，当一个对象的状态
        发生改变时，所有依赖于它的对象都将得到通知。在 JavaScript 开发中，我们
        一般用事件模型来替代传统的发布—订阅模式。
    
    ```javascript
    // jquery - ajax
    $.ajax(posturl,{
        beforeSend:function(){},
        success: function(){},
        error: function(){},
        complete: function(){}
    })
    // vue - 父子组件通信 prop - $emit
    ```

4. 装饰者模式

## 自由讨论
技术分享的的主题以及其他

* uncurrying (提取泛化 this 的过程)
```javascript
//  JavaScript 之父 Brendan Eich 在 2011 年发表的一篇 Twitter，下面列出的是一个实现方式
Function.prototype.uncurrying = function () {
    var self = this;
    return function() {
        var obj = Array.prototype.shift.call( arguments );
        return self.apply( obj, arguments );
    };
};
// 示例
const push = Array.prototype.push.uncurrying();
(function(){
    push( arguments, 4 );
    console.log( arguments ); // 输出： [1, 2, 3, 4]
})( 1, 2, 3 );
```
* for-in / for-of (Array) - 梓桐
* 动态传参 - 霄腾
```javascript
// 1.
const func = function(){
    console.log(arguments)
}
func(1)
func(1,2)
func([1,2,3])
// 2.
const func = function( {first = 1, second = 2} ){
    console.log(first)
    console.lof(second)
}
func()
func({first:2})
func({second:3})
```
