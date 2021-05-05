#### v-show 和 v-if的区别
1、v-show通过CSS display 控制显示和隐藏

2、v-if组件真正的渲染和销毁，而不是显示和隐藏

3、频繁切换显示状态用v-show，否则用v-if

#### 为何在v-for中使用key
1、必须使用key，且不能是index和random

2、diff算法中通过tag和key来判断是否为sameNode

3、减少渲染次数，提升渲染性能

#### 描述组件生命周期
父 beforeCreate->父 created 
#### Vue组件如何通讯
1、福字组件props和this.$emit

2、自定义事件event.$on event.$off event.$emit

3、vuex
#### 描述组件渲染和更新过程
#### 双向数据绑定v-model的实现原理
1、input元素的value = this.name

2、绑定input事件 this.name = $event.target.value

3、data更新触发re-render
#### 对MVVM的理解
#### computed 有何特点
1、缓存，data不变不会重新计算

2、提高性能
#### 为何组件data必须是一个函数
#### ajax请求应该放在哪个生命周期
1、mounted

2、JS是单线程的，ajax异步获取数据

3、放在mounted之前没有用，指挥让逻辑更加混乱
#### 如何将组件所有的props全部给子组件
```js
<User v-bind="$props" />
```
#### 如何自己实现v-model
#### 多个组件有相同的逻辑，如何抽离
mixin
#### 何时要使用异步组件
1、加载大组件

2、路由异步加载
#### 何时使用keep-alive
1、缓存组件，不需要重复渲染

2、如多个静态tab页的切换

3、优化性能
#### 何时使用beforeDestory
1、解绑自定义事件event.$off

2、清除定时器

3、解绑自定义的Dom事件，如window scroll
#### 什么是作用域插槽
#### Vux中action和mutation有何qubie
1、action中处理异步，mutation不可以

2、mutation做原子操作

3、action可以整合多个mutation
#### Vue-router常用的路由模式
1、hash

2、h5 history
#### 如何配置路由动态加载
#### 使用vnode秒速一个Dom结构
#### 监听data变化的核心Api是什么
#### Vue如何监听数组变化
#### 请描述响应式原理
1、监听data的变化

3、组件渲染更新过程
#### 简述diff算法过程
1、patch（elem, vnode）和patch（vnode， newVnode）

2、patchVnode和addVnodes和removeVnodes

3、updateChildren
#### Vue为何是异步渲染，$nextTick何用
1、异步渲染（以及合并data修改），以提高渲染性能

2、$nectTick在Dom更后回调
#### Vue常见性能优化方式
1、合理使用v-show和v-if

2、合理使用compouted

3、c-for时加key，以及避免和v-if同时使用

4、自定义事件、dom事件及时销毁

5、合理使用异步组件

6、合理使用keep-alive

7、data层级不要太深

8、使用vie-loader在开发环境预编译

9、webpack优化

10、前端通用的性能优化

11、使用SSR
