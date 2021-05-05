### 基本使用
#### 模板(插值、指令)
插值、表达式、指令、动态属性、v-html（XSS风险）
#### computed和watch
computed有缓存，data不变则不会重新计算

watch监听对象，拿不到oldVal
#### class和style
v-bind:XXX、:XXX
#### 条件
v-if、v-show等
#### 循环
v-for (key很重要、不能乱写、例（random和index）)、v-for和v-if不能一起用
#### 事件
v-on:XXX、@XXX
#### 表单
v-model
### 组件
#### 生命周期
beforeCreate--->created--->beforeMount--->mounted--->beforeUpdate--->updated--->beforeDestory--->destoried
#### props
type、default
#### v-on和$emit
#### 自定义事件（用于兄弟组件通信）
利用Vue的on和emit自定义事件
```js
const event = new Vue()

event.$emit('XXX', arguments)
event.$on('XXX') // 绑定自定义事件
event.$off('XXX') //解绑 (及时销毁，可能会造成内存泄漏)
```
使用EventBus
### 高级特性
#### 自定义v-model
```js
:value="text"
@XXX="$emit('change', value)"
model: {
    prop: 'text',
    event: 'change'
},
props: {
    text: String,
    default () {
        return ''
    }
}
```
#### $nextTick
Vue是异步渲染(data改变后、DOM不会立刻渲染)、$nextTick会在DOM渲染之后被触发
#### slot
1、基本子节点传入、子组件接收

2、作用域插槽（使用子组件的数据源）

2、具名插槽（指定插槽对应的名字）
#### 动态、异步组件
```js
<component is="XXX">
```
#### keep-alive
缓存组件的状态，一般用于频繁切换的tab等
#### mixin
抽离出公共部分

mixin的问题
1、变量来源不明确、不利于阅读

2、多mixin可能会造成命名冲突

3、mixin可能和组件可能出现多对多的关系，复杂度较高

### Vuex
#### state
#### getters
#### action
异步操作
#### mutation
#### dispatch
#### commit
#### mapState
#### mapGetters
#### mapActions
#### mapMutations
#### 总结
Vue Components---(Dispatch)---->Actions---(Commit)---->Mutations---(Mutate)---->State----(render)-----> Vue Components
### Vue-router
#### 路由模式
hash、H5 history
#### 路由配置
动态路由、懒加载
