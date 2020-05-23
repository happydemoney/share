#   框架相关

##  写 React / Vue 项目时为什么要在列表组件中写 key，其作用是什么？

##  React 中 setState 什么时候是同步的，什么时候是异步的？

##  React setState 笔试题，下面的代码输出什么？

```javascript
class Example extends React.Component {
  constructor() {
    super();
    this.state = {
      val: 0
    };
  }
  
  componentDidMount() {
    this.setState({val: this.state.val + 1});
    console.log(this.state.val);    // 第 1 次 log

    this.setState({val: this.state.val + 1});
    console.log(this.state.val);    // 第 2 次 log

    setTimeout(() => {
      this.setState({val: this.state.val + 1});
      console.log(this.state.val);  // 第 3 次 log

      this.setState({val: this.state.val + 1});
      console.log(this.state.val);  // 第 4 次 log
    }, 0);
  }

  render() {
    return null;
  }
};
```

##  聊聊 Redux 和 Vuex 的设计思想

##  聊聊 Vue 的双向数据绑定，Model 如何改变 View，View 又是如何改变 Model 的

##  Virtual DOM 真的比操作原生 DOM 快吗？谈谈你的想法。

##  为什么 Vuex 的 mutation 和 Redux 的 reducer 中不能做异步操作？

##  在 Vue 中，子组件为何不可以修改父组件传递的 Prop

##  双向绑定和 vuex 是否冲突

##  Vue 的响应式原理中 Object.defineProperty 有什么缺陷？

为什么在 Vue3.0 采用了 Proxy，抛弃了 Object.defineProperty？

##  redux 为什么要把 reducer 设计成纯函数

##  Vue 的父组件和子组件生命周期钩子执行顺序是什么

##  react-router 里的 <Link> 标签和 <a> 标签有什么区别

##  ue 在 v-for 时给每项元素绑定事件需要用事件代理吗？为什么？

##  React 和 Vue 的 diff 时间复杂度从 O(n^3) 优化到 O(n) ，那么 O(n^3) 和 O(n) 是如何计算出来的？

##  vue 渲染大量数据时应该怎么优化？

##  vue 如何优化首页的加载速度？vue 首页白屏是什么问题引起的？如何解决呢？

##  vue 是如何对数组方法进行变异的？例如 push、pop、splice 等方法

##  谈一谈 nextTick 的原理

##  Vue 中的 computed 是如何实现的

##  Vue 中的 computed 和 watch 的区别在哪里

##  v-if、v-show、v-html 的原理是什么，它是如何封装的？