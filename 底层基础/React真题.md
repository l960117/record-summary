#### 组件如何通信
1、父子组件props
2、自定义事件
3、Redux 和 Context
#### JSX本质是什么
1、createElement
2、执行返回vnode
#### Context是什么，如何应用
1、父组件，向其下所有子孙组件传递信息
2、如一些简单的公共信息：主题色，语言
3、复杂的公共信息，使用redux
#### shouldComponentUpdate用途
1、性能优化
2、配合不可变值一起使用，否则会出现不可预知的错误
#### redux单项数据流
Action -> Dispatch -> Reducer -> State -> View -> Action
#### setState
#### 什么是纯函数
#### React组件生命周期
#### React发起ajax应该放在那个生命周期
componentDidMount
#### 渲染列表，为何使用key
#### 函数组件和class组件的区别
#### 什么是受控组件、非受控组件
#### 何时使用异步组件
加载大组件
路由懒加载
#### 多个组件有公共逻辑，如何抽离
高阶组件HOC
Render Props
#### redux如何进行异步请求
1、使用异步action
2、redux-thunk
#### react-router如何配置懒加载
#### PureComponent有何区别
实现了浅比较的shouldComponentUpdate，优化性能
#### React 事件和Dom事件的区别
#### React 性能优化
1、渲染列表时加key
2、自定义事件Dom事件及时销毁
3、合理使用异步组件
4、减少函数bind this 的次数
5、合理使用SCU PureComponent 和 memo
6、合理使用Immutable.js
7、webpack 层面的优化
8、前端通用的性能优化
9、使用SSR
#### React 和 Vue的区别
相同点
1、都支持组件化
2、都是数据驱动视图
3、都是用vdom操作DOM
区别
1、React使用JSX拥抱JS，Vue使用模板拥抱HTML
2、React 函数式编程，Vue声明式编程
3、React更多需要自力更生，Vue把想要的都给你
#### 为什么要使用Hooks
1、完善函数组件的能力，函数更适合React组件
2、组件逻辑复用，Hooks表现更好
3、class复杂组件正在变得费解，不易拆解，不易测试，逻辑混乱
```js
DidMount 和 DidUpdate中获取数据
DidMount绑定事件，WillUnMount解绑事件
使用Hooks，相同逻辑课分割到一个一个的useEffect中
```
#### React Hooks模拟组件生命周期
模拟componentDidMount - useEffect 依赖 []
模拟componentDidUpdate- useEffect 无依赖，或者依赖[a, b]
模拟componentWillUNMount- useEffect 中返回一个函数
#### 自定义Hook
#### React Hooks性能优化
1、useMemo 缓存数据
2、useCallback缓存函数
3、相当于class组件的SCU 和 PureComponent
#### React Hooks 遇到坑
1、useState初始化值，只初始化一次
2、useEffect内部，不能修改state
3、useEffect依赖引用类型，会出现死循环
#### React Hooks做组件逻辑复用的优点
1、完全符合Hooks原有规则，没有其他要求
2、就是自定义Hooks
3、变量作用域很明确
4、不会出现组件嵌套的情况
