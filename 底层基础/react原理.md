#### 函数式编程
1、纯函数

2、不可变值
#### vdom 和 diff
#### JSX本质
JSX不是JS

本质：
```js
React.createElement 相当于h函数，返回vdom
第一个参数，可能是组件，也可能是html tag
children参数可以是数组，也可以是后面不确定参数
组件名，首字母必须大写（React规定）
```
#### 合成事件
DOM -----> 合成事件层（实例化统一的react event），dispatchEvent ------> 事件处理函数
```js
1、DOM事件冒泡到外层
2、合成事件层实例化一个统一的react event
3、统一使用dispatchEvent触发事件处理函数
```
使用合成事件机制好处
```js
1、更好的兼容性和跨平台
2、载到document或root，减少内存消耗，避免频繁解绑
3、方便事件的统一管理（如事务机制）
```
#### setState batchUpdate
##### setState主流程
```js
1、this.setState(newState) 
2、newState 存入pending队列 
3、是否处于batch update
4.Y、Y（异步）保存组件于dirtyComponents中
4.N、 N（同步）遍历所有的dirtyComponents 调用updateComponent，更新pending state or props
```
##### batchUpdate机制
执行函数时，一开始设置isBatchingUpdate = true表示处于batchUpdate，函数结束是将isBatchingUpdate = false

哪些能命中batchUpdate机制
```js
1、生命周期（和它调用的函数）
2、React中注册的事件（和它调用的函数）
3、React可以“管理”的入口
```
哪些不能命中batchUpdate机制
```js
1、setTimeout setInterval等（和它调用的函数）
2、自定义的DOM事件（和它调用的函数）
3、React “管不到”的入口
```
##### transaction（事务）机制
```js
1、执行perform(method)
2、执行initialize
3、执行method
4、执行close
```
#### 组件渲染过程
组件渲染过程
```js
1、props state
2、render()生成vnode
3、patch(elem, vnode)
```
组件更新过程
```js
setState(newState) ---> dirtyComponents（可能有子组件）
render() 生成newVnode
patch(cnode, newVnode)
```
#### React-filber如何优化性能
组件更新的两个阶段（patch拆分两个阶段）
```js
reconciliation 阶段 - 执行diff算法，纯JS计算
commit阶段 - 将diff结果渲染DOM
```
可能会有性能问题：
```js
JS是单线程，且和DOM渲染共用一个线程
当组件足够复杂，组件更新时计算和渲染都压力大
同时再有DOM操作需求（动画，鼠标拖拽等），将卡顿
```
解决方案fiber
```js
将reconciliation阶段进行任务拆分（commit 无法拆分）
DOM需要渲染时暂停，空闲时恢复
window.requestIdleCallback
```



React 真题
#### 组件之间如何通讯
1、父子组件props
2、自定义事件
3、Redux 和Context
#### JSX 本质
createElement
执行返回vnode
#### Context是什么，如何应用
父组件向下所有的子孙组件传递数据
#### shouldComponentUpdate
1、性能优化
2、配合不可变值
#### Redux单项数据流
#### 什么是穿函数
1、返回一个新值，没有副作用
2、不可变值
#### React组件生命周期
#### 渲染列表，为何使用key
#### 函数组件和class组件区别
#### 什么是受控组件
表单的值，受state控制
#### 多个组件有公共逻辑，如何抽离
1、高阶组件
2、Render Props
#### redux如何进行异步请求
1、使用异步action
2、使用中间件redux-thunk
#### react-router如何配置懒加载
#### PureComponent有何区别
#### React事件和DOM事件的区别
#### React性能优化
```js
1、渲染列表加key
2、自定义事件、DOM事件及时销毁
3、合理使用异步组件
4、减少函数bind this的次数
5、合理使用shouldComponentUpdate PureComponent 和memo
6、合理使用不可变值
```
#### React和Vue的区别
都支持组件化
都是数据驱动视图
都使用vdom操作DOM

React使用JSX拥抱JS，Vue使用模板拥抱html
React函数式编程，Vue声明式编程
React更多需要自力更生，Vue把想要的都给你

