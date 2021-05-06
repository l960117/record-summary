### 基本使用
#### React事件和Dom事件的区别
1、event 是SyntheticEvent，模拟出来Dom事件所有能力

2、event。nativeEvent是原生事件对象

3、所有的事件都被挂载到document上

4、和Dom事件不一样，和Vue事件也不一样

React 17 事件绑定到root
1、React 16 绑定到document

2、React 17 事件绑定到root组件

3、有利于多个React版本并存。例如微前端

#### 表单
受控组件：实现v-model，由state控制表单的值

#### 组件使用
props传递数据

props传递函数

props类型检查
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
#### Pprtals
#### context
#### 异步组件
#### 性能优化
#### 高阶组件HOC
#### Render Props
