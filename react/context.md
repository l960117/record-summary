# React Context那些事
## 简介
从Android的角度来理解：Context是一个场景，描述的是一个应用程序环境的信息，即上下文，代表与操作系统的交互的一种过程。
React的context就是一个全局变量，可以从根组件跨级别在React的组件中传递。

React context使用了Provider和Customer模式，和react-redux的模式非常像。在顶层的Provider中传入value，
在子孙级的Consumer中获取该值，并且能够传递函数，用来修改context,多用于子孙级别的组件通信

## 组件的通信
#### props
最常见的父子传值，如果要实现跨多代传值，有点麻烦，需一层一层传递下去
#### context
Context 提供了一种方式，能够让数据在组件树中传递时不必一级一级的手动传递
#### 状态管理工具（redux等）


## 实例

### 类组件
```js
//创建Context组件
const ThemeContext = React.createContext({
  theme: 'dark',
  toggle: () => {}, //向上下文设定一个回调方法
});

//运行APP
class App extends React.Component {
  constructor(props) {
    super(props);

    this.toggle = () => { //设定toggle方法，会作为context参数传递
      this.setState(state => ({
        theme:
          state.theme === themes.dark
            ? themes.light
            : themes.dark,
      }));
    };

    this.state = {
      theme: themes.light,
      toggle: this.toggle,
    };
  }

  render() {
    return (
      <ThemeContext.Provider value={this.state}> //state包含了toggle方法
        <Content />
      </ThemeContext.Provider>
    );
  }
}

//中间组件
function Content() {
  return (
    <div>
      <Button />
    </div>
  );
}

//接收组件
function Button() {
  return (
    <ThemeContext.Consumer>
      {({theme, toggle}) => (
        <button
          onClick={toggle} //调用回调
          style={{backgroundColor: theme}}>
          Toggle Theme
        </button>
      )}
    </ThemeContext.Consumer>
);
}
```

## 使用多个context
```js
import React, { createContext } from 'react';

    // 创建Context的唯一方法
    const ThemeContext = createContext()
    const SizeContext = createContext()
    
    
    class App extends React.Component {
      state = {
        theme: 'red',
        size: 'small'
      }
      render () {
        const { theme, size } = this.state
        return (
          // 使用 Context.Provider 包裹后续组件，value 指定值 
          <ThemeContext.Provider value={theme}>
            {/* 当出现多个Context的时候，只需要将Context.Provider 嵌套即可 */}
            <SizeContext.Provider value={size}>
              {/* 当Context的Provider值更改时，Consumer 的值必须重新渲染 */}
              <button onClick={() => {this.setState({ theme: 'yellow', size: 'big'})}}>按钮</button>
              <Middle></Middle>
            </SizeContext.Provider>
          </ThemeContext.Provider>
        )
      }
    }

    class Middle extends React.Component {
      render () {
        return <Bottom></Bottom>
      }
    }
    
    class Bottom extends React.Component {
      render () {
        return (
          // Context.Consumer Consumer消费者使用Context得值
          // 但子组件不能是其他组件，必须渲染一个函数，函数的参数就是Context得值
          // 当出现 多个Consumer的时候，进行嵌套，每个Consumer 的子组件必须是一个函数，即可
          <ThemeContext.Consumer>
            {
              theme => (
                <SizeContext.Consumer>
                  {
                    size => (<h1>ThemeContext 的 值为 {theme}; SizeContext 的值为 {size}</h1>)
                  }
                </SizeContext.Consumer>
              )
            }
          </ThemeContext.Consumer>
        )
      }
    }
    
    export default App;
```
## contextType
官方定义：挂载在 class 上的 contextType 属性会被重赋值为一个由 React.createContext() 创建的 Context 对象。这能让你使用 this.context 来消费最近 Context 上的那个值。你可以在任何生命周期中访问到它，包括 render 函数中。

实际作用：contextType 可以简化 context 的使用，不使用 consumer 也可以共享变量

```js
import React, { createContext } from 'react';
    const ThemeContext = createContext()
    const SizeContext = createContext()
    class App extends React.Component {
      state = {
        theme: 'red',
        size: 'small'
      }
      render () {
        const { theme, size } = this.state
        return (
          // 使用 Context.Provider 包裹后续组件，value 指定值 
          <ThemeContext.Provider value={theme}>
            {/* 当出现多个Context的时候，只需要将Context.Provider 嵌套即可 */}
            <SizeContext.Provider value={size}>
              {/* 当Context的Provider值更改时，Consumer 的值必须重新渲染 */}
              <button onClick={() => {this.setState({ theme: 'yellow', size: 'big'})}}>按钮</button>
              <Middle></Middle>
            </SizeContext.Provider>
          </ThemeContext.Provider>
        )
      }
    }
    class Middle extends React.Component {
      render () {
        return <Bottom></Bottom>
      }
    }
    
    class Bottom extends React.Component {
      // 申明静态变量、contextType 将 context 直接赋值于 contextType
      static contextType = ThemeContext
      
      render () {
        // 在 render 函数中 可以直接 访问 this.context 获取共享变量、这样就可以不使用 consumer
        const theme = this.context
        return (
          // Context.Consumer Consumer消费者使用Context得值
          // 但子组件不能是其他组件，必须渲染一个函数，函数的参数就是Context得值
          // 当出现 多个Consumer的时候，进行嵌套，每个Consumer 的子组件必须是一个函数，即可
          <div>
            <h1>ThemeContext 的 值为 {theme} </h1>
          </div>
        )
      }
    }
    
    export default App;
```
注意:
contextType 只能在类组件中使用

一个组件如果有多个 consumer ， contextType 只对其中一个有效，所以说，contextType 只能有一个

## Context 缺点
1. 在组件树中，如果中间某一个组件 ShouldComponentUpdate returning false 了，会阻碍 context 的正常传值，导致子组件无法获取更新。

2. 组件本身 extends React.PureComponent 也会阻碍 context 的更新。

3. 没有redux好用

## 警告
注意：context类似于全局变量做法，会让组件失去独立性、复用起来更困难，不能滥用、但本身它一定有适合使用的场景，具体看情况使用

## 引申
### Component和PureComponent
React.PureComponent 与 React.Component 几乎完全相同，但 React.PureComponent 通过prop和state的浅对比来实现 shouldComponentUpate()。
PureComponent 里面也有一个内置的shouldComponentUpate.还要有immutable 对数据的管理不然会有BUG

如果React组件的 render() 函数在给定相同的props和state下渲染为相同的结果，在某些场景下你可以使用 React.PureComponent 来提升性能。

React.PureComponent 的 shouldComponentUpdate() 只会对对象进行浅对比。如果对象包含复杂的数据结构，它可能会因深层的数据不一致而产生错误的否定判断(表现为对象深层的数据已改变视图却没有更新, 原文：false-negatives)。当你期望只拥有简单的props和state时，才去继承 PureComponent ，或者在你知道深层的数据结构已经发生改变时使用 forceUpate() 。或者，考虑使用 不可变对象 来促进嵌套数据的快速比较。


### 无状态函数式组件
#### 常规函数写法
```js
function Item(props) {
  return (
    <div className='item'>
      {props.title}
      <span
        className='deleteItem'
        onClick={props.remove(props.id)}
      > x </span>
    </div>
  )
}
```
#### 无生命周期方法
函数式组件，有时也被称为无状态组件，没有任何生命周期方法，意味着每次上层组件树状态发生变更时它们都会重新渲染，这就是因为缺少 shouldComponentUpdate 方法导致的。这也同样意味着您不能定义某些基于组件挂载和卸载的行为。

#### 没有 this 和 ref
在函数式组件中既不能使用 this 关键字或访问到 ref。

如果您将 context 定义为函数的一个 props

```js
function D(props, context) {
  return (
    <div>{this.context.user.name}</div>
  );
}

D.contextTypes = {
  user: React.PropTypes.object.isRequired
}
```

#### 优势？
通过将逻辑和数据处理与 UI 展示剥离开来，我们就可以避免在展示型组件中处理任何的状态。无状态函数式组件强制实施了这样的风格，因为您无论如何都没有办法处理本地状态了。它强制您将任何的状态处理移交至上层的组件树，而让下层的组件只做它们所做的——关注 UI 的展示。

容器型组件 (container component)：

1、主要关注组件数据如何交互

2、拥有自身的state，从服务器获取数据，或与redux等其他数据处理模块协作

3、需要通过类定义组件声明，并包含生命周期函数和其他附加方法

展示型组件 (presentational component)：

1、主要负责组件内容如何展示

2、从props接收父组件传递来的数据

3、大多数情况可以通过函数定义组件声明


没有逻辑意味着相同的表示具有相同的数据。
1、解耦了界面和数据的逻辑

2、更好的可复用性，比如同一个回复列表展示组件可以套用不同数据源的容器组件

3、利于团队协作，一个人负责界面结构，一个人负责数据交互

#### 缺陷

