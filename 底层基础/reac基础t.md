### 基本使用
#### React事件和Dom事件的区别
```js
1、event 是SyntheticEvent，模拟出来Dom事件所有能力
2、event.nativeEvent是原生事件对象
3、所有的事件都被挂载到document上
4、和Dom事件不一样，和Vue事件也不一样
```
注意：React 16 绑定到document、React 17 事件绑定到root组件

有利于多个React版本并存。例如微前端
#### 表单
受控组件：实现v-model，由state控制表单的值
#### 组件使用
```js
props传递数据
props传递函数
props类型检查
```
#### setState
1、不可变值：不能直接去操作state

2、可能是异步更新
```js
1、直接使用时异步的，可使用setState的第二个参数，回调函数
2、setTimeout 中setState是同步的
setTimeout(() => {
    this.setState({
        count: this.state.count + 1
    })
    console.log(this.state.count)
}, 0)
3、自己定的dom事件是同步的
document.body.addEventListener('click', () => {
    this.setState({
        count: this.state.count + 1
    })
    console.log(this.state.count)
})
```
3、可能会被合并
```js
1、传入对象，会被合并，执行结果只一次 + 1（类似Object.assign）
this.setState({
    count: this.state.count + 1
})
this.setState({
    count: this.state.count + 1
})
this.setState({
    count: this.state.count + 1
})
2、传入函数，不会被合并，执行结果 + 3
this.setState((pervState, props) => {
    return {
        count: prevState.count + 1
    }
})
this.setState((pervState, props) => {
    return {
        count: prevState.count + 1
    }
})
this.setState((pervState, props) => {
    return {
        count: prevState.count + 1
    }
})
```
#### 组件生命周期
1、挂载时
```js
constructor
componentWillMount
componentDidMount
```
2、更新时
```js
shouldCompontntUpdate
componentDidUpdate
```
3、卸载时
```js
componentWillUnmount
componentDidUnmount
```
### 高级特性
#### 函数组件
```js
1、纯函数，输入props，输出JSX
2、没有实例，没有生命周期，没有state
3、不能扩展其他方法
```
#### 非受控组件
只赋值默认值，使用时通过ref获取最终的值
```js
ref
defaultValue defaultChecked
手动操作DOM元素
```
使用场景
```js
1、必须手动操作DOM，setState实现不了
2、文件上传
3、某些富文本编辑器，需要传入DOM元素
```
受控组件和非受控组件的选择
```js
1、优先使用受控组件，符合React设计原则（数据驱动视图）
2、必须操作DOM时，再使用非受控组件
```
#### Portals
组件默认会按照既定层次嵌套渲染, Portals让组件渲染到父组件以外
```js
ReactDom.createPortal(<></>, document.body/*(DOM节点)*/)
```
使用场景
```js
overflow:hidden
父组件z-index值太小
fixed定位需要放单body第一层
```
#### context
```js
React.createContext().Provider
React.createContext().Consumer
```
#### 异步组件
```js
import()
React.lazy
React.Suspense
```
```js
const demo = React.lazy(() => import('XXX'))
<React.Suspense fallback={<div>loading...</div>}>
    <demo />
</React.Suspense>
```
#### 性能优化
```js
1、shouldComponentUpdate：通过前后state的对比，控制是否渲染
React shouldComponentUpdate 默认返回true，父组件有更新，子组件则无条件更新
深度比较比较耗性能、shouldComponentUpdate一定要配合不可变值，否则通过前后对比优化渲染时会出现问题
所有，根据具体的需求，可以使用shouldComponentUpdate优化渲染
2、PureComponent和React.memo
通过SCU的浅层比较优化
3、不可变值 immutable.js
基于共享数据（不是深拷贝），速度好
有一定的学习和迁移成本，按需使用
```
#### 高阶组件HOC
reduc connect是高阶组件，传入一个组件，得到一个新的组件
#### Render Props
通过一个函数将class组件的state作为props传递给纯函数组件
#### HOC vs Render Props
HOC 模式简单，但会增加组件层级

Render Props 代码简洁

#### Redux
```js
基本概念
store state action reducer
单项数据流
1、dispatch（action）
2、reducer -> newState
3、subscribe 触发通知
```
##### react-redux
```js
<Provider>connect
异步action
redux-thunk
redux-promise
redux-saga
中间件
```

