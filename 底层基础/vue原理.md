## Vue原理
### 组件化
#### 背景
首先很久之前就有组件化的概念， 使用 asp jsp php 就可以。

node.js中也有类似的组件化。

Vue和React搬过来，做了一个创新：数据驱动视图。

传统组件它只是静态的渲染，也就是说我们想显示谁的个人信息， 就要在后端拼接完数据去渲染。 渲染完页面就形成了，不会再去改变了。你再需要去改需要自己去操作 DOM。所以当时 jQuery 是很流行的。

vue 可以通过 MVVM 模式执行的数据驱动视图。我们不再去操作 DOM， 我们想改什么地方，直接去改 vue 里的数据就可以了。然后 vue框架本身帮我们根据数据重新渲染视图。这一点是跟传统组件本质的区别。也正是因为这一点，让我们做 vue 开发的时候，
更加关注于数据。所谓数据也就是更加关注业务逻辑。而不是一直操作 DOM。

#### 数据驱动视图（MVVM、setState）
M: Model 层 （vuex，data）

V：View 层 （视图）

VM： ViewModel 层

view ------- viewmodel ------- model


View 层通过 ViewModel 和 Model 做关联，像监听事件，监听指令等等。

在 Model 修改的时候，就能立刻执行 View 的渲染，View 层里面有什么点击事件，各种 DOM 事件监听的时候， 都可以去修改Model 这一层的数据。

所以说这就是数据驱动视图。通过修改 Model 数据去驱动视图 View。这个视图不用我们亲自操作。

### 响应式
组件data的数据一旦变化，立刻触发视图的更新

核心API - Object.defineProperty
基本用法
```js
const data = {}
const name = 'zhangsan'
Object.defineProperty(data, "name", {
    get: function () {
        console.log('get')
        return name
    },
    set: function(newVal) {
        console.log('set')
        name = newVal
    }
})
```
监听对象、数组
```js
const data = {
    name: 'XXX',
    info: {
        age: '18'
    }
}

// 自定义数组原型，防止污染全局数组原型
const oldArrayProperty = Array.prototype
const arrProto = Object.create(oldArrayProperty)
['push', 'pop', 'shift', 'unshift', 'splice'].forEach(method => {
    arrProto[method] = function () {
        updateView()
        oldArrayProperty[method].call(this, ...arguments)
    }
})

observer(data)
const updateView = () => {
    //更新view
}

const observer = (target) => {
    if (typeof target !== 'object' || target === nu;;) {
        return target
    }

    Arrsy.isArray(target) && target._proto_ = arrProto
    for (let key in target) {
        defineReactive(target, key, target[key])
    }
}
const defineReactive = (target, key, value) => {
    // 深度监听
    observer(value)
    // vue2的核心api
    Object.defineProperty(target, key, {
        get () {
            return value
        },
        set (newVal) {
            if (newVal !== value) {
                value = newValue
                // 直接赋值对象等需要深度监听的数据
                observer(newValue)
                // 更新视图
                updateView()
            }
        }
    })
}

```
Object.defineProperty的一些缺点
1、深度监听，需要递归到底。一次向计算量大

2、新增删除属性无法监听（Vue.set Vue.delete）

3、无法原生监听数组，需要特殊处理，无法监听直接修改下标
### vdom和diff
#### vdom
vdom是实现vue和react的重要基石

Dom操作非常耗费性能

vdom极大可能减少dom操作，优化

树diff的时间复杂度O（n^3）
1、遍历Tree1
2、遍历Tree2
3、排序

优化时间复杂度到O（n）
1、只比较同一层级，不跨级比较
2、tag不相同，则直接删掉重建，不在深度比较
3、tag和key，两者都相同，则认为是相同节点，不再深度比较

#### diff算法
diff算法是比较两个vnode，计算出最小的变更，以便减少DOM操作次数，提高性能。
##### 原理
只比较同级，不跨域比较

如果tag不相同，直接删除重建，不再深度比较

如果tag和key都相同，默认是一样的节点，也不再深度比较

##### 流程
首先，它会判断是否是首次渲染，因为如果是首次渲染，没有旧的vnode，不需要比较，直接渲染就可以了。

在非首次渲染，首先比较两个节点是否一样。如果不一样，直接删除重建；如果一样，就需要进行vnode比较、就是比较children。

如果新节点没有文本节点，删除旧节点的文本节点；如果有文本节点，替换掉旧的文本节点。

如果只有新节点有子节点，直接插入；如果只有旧节点有子节点，直接删除。
最后就是，新旧节点都有子节点的情况。

这时候会遍历新节点的children，每个新的子节点都需要在旧的children里面进行寻找，找一个一样的节点。

如果没有找到，新的子节点直接插入；如果找到了，这两个节点再进行vnode比较。
也可以简单的理解为，如果没有是重新渲染，如果有的话，直接把旧的子节点挪过来用就可以了。

##### diff算法源码
h：h函数返回的是vnode对象，可以理解成最后返回的是一个处理好的包含挂载节点的dom对象结构吗，在根据这个结构去生成真实dom

patchVnode

addVnodes

removeVnodes

updateChildren（key的重要性）


### 模板编译
模板不是html，有指令，插值，js表达式、能实现判断、循环

html是标签语言。只有js才能实现判断、循环（图灵完备的）

因此，模板一定是转换为某种js代码，即模板编译

1、vue template complier将模板编译为render函数
```js
const compiler = required('vue-template-compoler')

const template = `<p>{{message}}</p>`

const res = compiler.compile(template)

console.log(res.render)
```
2、执行render函数生成vnode

3、基于vnode再执行patch和diff

4、使用webpack vue-loader会在开发环境下编译模板

#### 流程
1、响应式：监听data属性 get、set

2、模板编译： 模板到render函数，再到vdom

2、vdom：patch(element, vnode)、patch(vnode, oldvnode)

### 渲染过程
#### 初次渲染过程
1、解析模板为render函数（或在开发环境已完成，vue-loader）

2、触发响应式，监听data属性的getter、setter

3、执行render函数，生成vdom，patch(element, vnode)

render函数执行时收集依赖

#### 更新过程
1、修改data，触发setter

2、重新执行render函数，生成newVnode

3、patch(vnode, oldvnod)

#### 异步渲染
$nextTick、汇总data的修改，一次性更新视图、减少DOM操作次数，提高性能
