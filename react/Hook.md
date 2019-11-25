### 简介

可以让你在不编写 class 的情况下使用 state 以及其他的 React 特性。

### useState
通过在函数组件里调用它来给组件添加一些内部 state。React 会在重复渲染时保留这个 state。useState 会返回一对值：当前状态和一个让你更新它的函数，你可以在事件处理函数中或其他一些地方调用这个函数。它类似 class 组件的 this.setState，但是它不会把新的 state 和旧的 state 进行合并

useState 唯一的参数就是初始 state

用法：替代了class定义中的state和setState
```js
const [count, setCount] = useState(0)
setCount(x => 8)
console.log(count)
```

### useEffect
useEffect 就是一个 Effect Hook，给函数组件增加了操作副作用的能力。它跟 class 组件中的 componentDidMount、componentDidUpdate 和 componentWillUnmount 具有相同的用途，只不过被合并成了一个 API

### useContext

关于react context详见https://juejin.im/post/5dccb9a1f265da795d180f5f

useContext 替代了子组件和后代组件使用context
```js
const value = useContext(MyContext);
```

### useRef

### useLayoutEffect

### useCallback

### useMemo

### useReducer
