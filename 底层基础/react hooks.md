#### class组件存在的问题
```js
1、大型组件很难拆分和重构，很难测试（即class不易拆分）
2、相同业务逻辑，分散到各个方法中，逻辑混乱
3、复用逻辑变得复杂，如Mixins，HOC，render Prop
```
#### React Hooks背景
```js
React 组件更易用函数表达
1、React提倡函数式编程，view = fn(props)
2、函数更灵活，更易拆分，更易测试
3、但函数组件太多简单，需要增强能力
```
#### State Hook
```js
1、默认函数组件没有state
2、函数组件是一个纯函数，执行完即销毁，无法存储state
3、需要State Hook，即把state功能“钩”到纯函数中
```
#### Effect Hook
```
1、默认函数组件没有生命周期
2、函数组件是一个纯函数，执行完即销毁，自己无法实现生命周期
3、使用Effect Hook，把生命周期“钩”到纯函数
```

useEffect 让纯函数有了副作用
默认情况下，执行纯函数，输入参数，返回结果，无副作用

所谓副作用，就是对函数之外造成影响，如设置全局定时任务
而组件需要副作用，所以需要useEffect“钩”入纯函数中

注意： 使用useEffect模拟WillUnMount ，但不完全相等，只有当[]依赖时
```js
useEffect(() => {
    console.log(111)
    // props 发生变化，即更新，也会执行结束函数
    // 准确的说： 返回的函数会在下一次effect执行之前，被执行
    return () => {
    }
})
```
#### useRef useContext
```js
const domRef = useRef()

const themeContext = useContext(XXX)
```
#### useReducer
```js
import React, { useReducer } from 'react'
const initialState = { count: 0 }
const reducer = (state, action) => {
    switch (action.type) {
        case 'increment':
            return { count: state.count + 1 }
        case 'decrement':
            return { count: state.count - 1 }
        default:
            return state
    }
}
function App() {
    const [state, dispatch] = useReducer(reducer, initialState)

    return {
        <div>
            <button onClick={() => dispatch({ type: 'increment' })}>+</button>
            <button onClick={() => dispatch({ type: 'decrement' })}>-</button>
        </div>
    }
}

export default App
```
useReducer 和 redux的区别
```js
userReducer 是useState的代替方案，用于state复杂变化
useReducer是个单个组件状态管理，组件通讯还需要props
reduc是全局的状态管理，多组件共享数据
```
#### useMomo 
useMemo缓存数据
```js
1、React 默认会更新所有子组件
2、class组件使用SCU 和 Purecomponent做优化
3、Hooks中使用useMemo，但优化的原理是相同的
```
#### useCallback
useCallback 缓存函数
#### 自定义Hook
```js
1、封装通用功能
2、开发和使用第三方Hooks
2、自定义Hook带来了无限的扩展性，解耦代码
```
```js
1、本质是一个函数
2、内部正常使用useState useEffect获取其他Hook
3、返回数据不限
```
#### 组件逻辑复用
class组件逻辑复用
```js
HOC: 组件层级嵌套过多，不易渲染，不易调试、HOC会劫持props，必须严格规范，容易出现疏漏
Render Prop：学习成本高，不易理解、只能传递纯函数，而默认情况下纯函数功能有限
```
Hooks组件逻辑复用
```js
1、完全符合Hooks原有规则，没有其他要求，易理解记忆
2、变量作用域很明确
3、不会产生组件嵌套
```
#### 规范和注意事项
```js
1、命名规范
2、使用规范
只能用于React函数组件和自定义Hook中，其他地方不可以（函数方法）
只能用于顶层代码，不能再循环，判断中使用hooks
3、Hooks调用顺序
无论是render还是re-render，Hooks调用顺序必须一致
如果Hooks出现在循环，判断里，则无法保证顺序一致
Hooks严重依赖于调用顺序
```
#### React Hooks 注意事项
```js
1、useState初始化值，只有第一次有效
2、useEffect里面不能修改state的值
useEffect 依赖为[] 定义的回调函数拿的是当时state的值
3、useEffect 依赖有对象引用类型，会造成死循环
比较依赖用的是Object.is函数
```



