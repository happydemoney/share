# 前端项目与技术实践

## 前端开发规范

### 前端通用规范

* 三层结构分离

* 缩进
    
    统一使用tab（或4个空格）进行缩进
* 内容编码

    <meta charset='utf-8'>

* 小写

    HTML标签、HTML标签属性、样式名等

* 代码单行长度限制

    代码单行长度不要超过120个字符（或80字符）

* 注释

    /**
     * 功能说明 - 
     * @author: monkey
     * @params {Object} 
     * @returns {Object}
     */

* 行尾空格和符号

### 前端防御性编程规范

* 对外部数据的安全检测判断

```javascript
// bad
    <span>{{data.userInfo.userName}}</span>
// good 
    <span>{{data.userInfo && data.userInfo.userName || '默认用户名'}}</span>
```

* 规范化的错误处理

```javascript
// bad
    getUserInfo(null)
        .then(res => {
            // ...
        })
// good
    getUserInfo(null)
        .then(res => {
            // ...
        })
        .catch(error => {
            console.log(error)
        })
```

## 前端组件规范


### UI组件规范

### 
