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

### Component和PureComponent
React.PureComponent 与 React.Component 几乎完全相同，但 React.PureComponent 通过prop和state的浅对比来实现 shouldComponentUpate()。
PureComponent 里面也有一个内置的shouldComponentUpate.还要有immutable 对数据的管理不然会有BUG

如果React组件的 render() 函数在给定相同的props和state下渲染为相同的结果，在某些场景下你可以使用 React.PureComponent 来提升性能。

React.PureComponent 的 shouldComponentUpdate() 只会对对象进行浅对比。如果对象包含复杂的数据结构，它可能会因深层的数据不一致而产生错误的否定判断(表现为对象深层的数据已改变视图却没有更新, 原文：false-negatives)。当你期望只拥有简单的props和state时，才去继承 PureComponent ，或者在你知道深层的数据结构已经发生改变时使用 forceUpate() 。或者，考虑使用 不可变对象 来促进嵌套数据的快速比较。
