# JS设计模式开发实践分享

## 设计原则

[设计原则](./design.md)

## 设计模式简介

[设计模式简介](./simpleIntro.md)

## 设计模式详解

[设计模式简介](./detail.md)


## 自由讨论

该怎么学习设计模式

    明白每个设计的道理和用意
    通过经典应用体会它的真正使用场景
    编码时多思考，尽量模仿

聊一聊阅读经典lib源码的意义

    学习如何实现功能
    学习它的设计思路
    强制自己写代码时模拟

技术分享的的主题以及其他
    
    前端相关协议（HTTP、实时协议：websocket、Poll和Long poll、与native交互协议等）
    浏览器运行机制（比如重排和重绘这个知识点）
    前端的未来趋势（新的语言标准、新特性、web AR、图形技术）

## 资源分享

1. [UNIX/LINUX设计哲学](https://pan.baidu.com/s/13uzzejpcTpnQYDSmBNJavQ) 提取码: 8eqt 
2. [Javascript设计模式与开发实践](https://github.com/xingbofeng/JavaScript-design-patterns)

## 思考题

* 某打车平台面试题
```
题：
打车时，可以打专车和快车。任何车都有车牌号和名称
不同车价格不同，快车每公里1元，专车每公里2元
行程开始时，显示车辆信息
行程结束时，显示打车金额（假定行程就五公里）
问：
画出UML类图
用ES6语法写出该示例
```

```javascript
// 父类 - 车
class Car {
    constructor(carNumber, carName){
        this.carNumber = carNumber
        this.carName = carName
    }
    getCarInfo(){
        console.log('车牌号： ' + this.carNumber)
        console.log('车名: ' + this.carName)
    }
}

// 子类 - 专车
class SpecialCar extends Car {
    constructor(arNumber, carName){
        super(arNumber, carName)
        this.unitPrice = 1
    }
}
// 子类 - 快车
class QuickCar extends Car {
    constructor(arNumber, carName){
        super(arNumber, carName)
        this.unitPrice = 2
    }
}
// 行程
class Trip {
    constructor(car){
        this.status = 'start' // start inProgress end
        this.car = car // 车实例
        this.distance = 0
    }
    start(){
        this.status = 'inProgress'
        this.car.getCarInfo()
    }
    updateStatus(status){
        this.status = status
    }
    updateDistance(distance){
        this.distance = distance
    }
    end(){
        this.status = 'end'
        console.log('本次行车打车金额为： ' + this.getFare() + '元 \n')
        console.log('感谢您的乘坐，祝你生活愉快')
    }
    getFare(){
        return this.distance * this.car.unitPrice
    }
}
// 实例 - test
const car = new QuickCar('110','捷达')
const trip = new Trip(car)
trip.start()
trip.updateDistance(5)
trip.end()
```
