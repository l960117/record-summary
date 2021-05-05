#### Vue3 比 Vue2有什么优势
```js
1、性能更好
2、体积更小
3、更好的ts支持
4、更好的代码组织
5、更好的逻辑抽离
6、更多新功能
```
#### Vue3生命周期
```js
1、Options Api 生命周期
beforeDestory改为beforeUnmount、destoryed改为unmounted，其他沿用Vue2的生命周期
2、Composition Api 生命周期
setUp（等于beforeCreate和created）、onBeforeMount、onMounted、onBeforeUpdate、onUpdated、onBeforeUnmount、onUnmounted
```
#### Composition Api 对比Options Api
Composition Api 适用于大型复杂应用，是为解决浮渣业务逻辑而设计、类型Hooks 在React的地位
```js
1、更好的代码组织
2、更好的逻辑复用
3、更好的类型推导
```
不建议公用，会引起混乱、小型项目，逻辑简单实用Options Api、中大型项目，逻辑复杂用Composition Api（高阶技巧）

#### 如何理解ref toref 和 toRefs
使用ref的原因
```js
1、返回值类型，会丢失响应式
2、在setUp、compoted、合成函数都有可能返回值类型
3、 Vue如不定义ref，用户将自造ref，反而更加混乱
```
使用.value的原因
```js
1、ref是一个对象（不丢失响应式），value存储值
2、通过.value属性的get和set实现相适应
2、用于模板、reactive，不需要.value，其他情况需要
```
使用toRef toRefs的原因
```js
1、初衷：不丢失相适应的情况下，把对象数据分散/扩散
2、前提：针对的是响应式对象（reactive封装的）非普通对象
3、注意：不创造响应式，而是延续响应式
```
ref: 生成值类型的响应式、可用于模板和reactive、通过.value修改数据

toRef: 针对一个响应式对象（reactive封装）的prop，如果用于普通对象，产出的结果不具备响应式

toRefs：将响应式对象（reactive封装）转为普通对象、对象的每个prop都是对应的ref，两者保持引用关系，利用普通对象可以解构的特点，响应式对象解构将不具备响应式了

最佳使用方式：
```js
1、用reactive做对象的响应式，用ref做值类型的响应式
2、setUp中返回tiRefs(state)，或者toRef(state, 'XXX')
3、ref的变量命名都用xxxRef
4、合成函数返回响应式对象，使用toRefs
```
#### Vue3升级了哪些重要的功能
```js
1、createApp
2、emits属性
3、多事件处理
4、Fragment（去除了template单一节点限制）
5、移除.sync改为v-model参数
6、异步组件的引用方式
import {createApp, defineAsyncComponent } from 'vue
createApp({
    components: {
        AsyncCompontne: defineAsyncComponent(() =>  import('XXXXXXXXX.vue')
        )
    }
})
7、移除filter
8、Teleport（将元素挂载在某个元素下面）
<teleport tpo="body">
    <div></div>
</teleport>
9、Supense(封装一个插槽)
<Supense></Supense>
10、Composotion Api
reactive、ref相关、readonly、watch 和 watchEffect、setup、生命周期钩子函数
```
#### Composition API实现逻辑复用
1、抽离逻辑到一个函数

2、函数命名约定为useXXX格式

3、在setup使用这个函数

#### Proxy函数
```js
const proxyData = new Proxy(data, {
    get(target, key, receiver) {
        // 只处理本身（非原型的）属性
        const ownKeys = Reflect.ownKeys(target)
        if (ownKeys.includes(key)) {
            //
        }
        const result = Reflect.get(target, key, receiver)
        return result
    },
    set(target, key,val, receiver) {
        // 重复的数据不处理
        const oldvalue = target[key]
        if (val === oldValue) {
            return true
        }
        const result = Reflect.set(target, key, vakl, receiver)
        return result
    },
    deleteProperty(target, key) {
        const result = Reflect.deleteProperty(target, key)
        return result
    }
})
```
Reflect作用
```js
1、和Proxy能力一一对应
2、规范化、标准化、函数化
3、替换掉Object上面的工具函数
```
#### Vue3响应式
```js
const data = {
    name: 'XXX',
    info: {
        address: 'XXX'
    }
}
const proxyData = reactive(data)

function reactive(target = {}) {
    if (typeof target !== 'object' || target == null) {
        return target
    }

    const proxyConf = {
        get(target, key, receiver) {
            // 只处理本身（非原型的）属性
            const ownKeys = Reflect.ownKeys(target)
            if (ownKeys.includes(key)) {
                //
            }
            const result = Reflect.get(target, key, receiver)
            // 深度监听
            // 性能如何提升的，在get时深度监听
            return reactive(result)
        },
        set(target, key,val, receiver) {
            // 重复的数据不处理
            const oldvalue = target[key]
            if (val === oldValue) {
                return true
            }
            // 判断是否新增属性
            const ownKeys = Reflect.ownKeys(target)
            if (ownKeys.includes(key)) {
                //
            } else {

            }

            const result = Reflect.set(target, key, vakl, receiver)
            return result
        },
        deleteProperty(target, key) {
            const result = Reflect.deleteProperty(target, key)
            return result
        }
    }
    // 生成代理对象
    const observed = new Proxy(target, proxyConf)
    return observed
}

```
```js
1、深度监听，性能更好
2、可监听删除/新增属性
2、可监听数组变化
```
#### v-model参数 (双向绑定效果)
类似vue2 .async

#### watch 和 watchEffect的区别
```js
1、两者都可监听data属性变化
2、watch需要明确监听哪个属性
3、warchEffect会根据其中的属性，自动监听其变化
```
```js
// 值类型ref
watch(XXX, (newVal, oldVal) => {
    // 监听逻辑
}, 
// {
//     immediate: true // 初始化之前就监听，可选
// }
)
// 响应式对象
warch(
    // 确定要监听对象的哪个属性
    () => XXX.xxx,
    (newVal, oldVal) => {

    },
    // 配置项
    {
        immediate: true， // 初始化之前就监听，可选
        // deep: true // 深度监听
    }
)
// 监听函数中使用到的依赖
watchEffect(() => {
    // 初始化时一定会执行一次
})
```

#### setup中如何获取组件实例
```js
1、在setup和其他Composition API中没有this
2、可通过getCurrentInstance获取当前实例
3、若使用Options API 可使用this
```
#### Vue3 为何比Vue2快
```js
1、Proxy响应式
2、PatchFlag
模板编译时，动态节点做标记
标记，分为不同的类型，如TEXT PROPS
diff算法时，可以区分静态节点，以及不同类型的动态节点
3、hoistStatic
将静态节点的定义，提升到父作用域，缓存起来
多个相邻的静态节点，会变合并起来
典型的拿空间换时间的优化策略
4、cacheHandler
缓存事件
5、SSr优化
静态节点直接输出，绕过了vdom
动态节点，还是需要动态渲染
6、tree-shaking
编译时，根据不同的乾坤，引入不同的API
```

#### Vite
1、一个全段打包工具，Vue作者发起的项目
2、借助Vue的影响力，发展较快和webpack竞争
3、优势：开发环境下无需打包，启动快

启动快的原因
1、开发环境使用ES Module，无需打包，非常快

2、生产环境使用rollup，并不会快很多

#### Composition API和React Hooks的对比
```js
1、前者setup只会被调用一次，而后者函数会被多次调用
2、前者无需useMemo useCallback，因为setup只调用一次
3、前者无需顾虑调用书按需，而后者需要保证hooks的顺序一致
4、前者reactive + ref比后者useState要难理解
```

