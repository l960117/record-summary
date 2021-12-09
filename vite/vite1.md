## 定义
高阶封装
目标：
1、使用简单
2、快
3、便于扩展

和传统构建工具区别

1、High Level Api

2、不包含自己编译能力

3、完全基于ESM开发模式

webpack更全面

rollup更专一

Vite更好用，为项目而生，而不是为构建而生，减少了很多配置量

减少的工作

1、devServer

2、各类loader

3、build命令

## 基础应用
### Vite的优势
1、上手非常简单

2、开发效率极高

3、社区成本低（兼容rollup插件）

### Vite
1.0 以Vue3为主
2.0 跨框架

react reactFashReflesh && react-hot-loader
解决了很多react-hot-loader无法解决的问题

速度更快

支持局部更新

Vite使用CSS的各种功能
1、原生css variable

2、postcss

3、@import alias
vite配置 resolve，可以使用在css@import里面

4、css-modules

5、css preprocessors 

Vite使用typescript
vite只编译，不校验，需要校验的话，手动使用tsc --noEmit 

typescript配置 isolatedModules: true

client types

types: ['vite/client']

Vite 静态文件处理

types
```js
// url
import test from './test?url'
console.log(test)

// raw
import test from './test?raw'
console.log(test)

// webworker
import Worker from './worker?worker'
const worker = new Worker()

```
JSON
```js
import A from 'a.json'
```

WebAssembly

Vite使用eslint & pritter
eslint
```js
yarn add eslint-config-startender
```


Vite 环境变量
import.meta.env
还可以自定义变量

vite-env.d.ts 可以声明额外添加的环境变量类型

# Vite高级应用
## Vite热更新 HMR API

开启方式
```js
// 针对特殊函数
if (import.meta.hot) {
  import.meta.hot.accept((newModule) => {
    newModule.render()
  })
}
```
## glob import（批量导入功能）
vite 来源于第三方库 fast-glob
```js
const globModules = import.meta.glob('./glob/*')
// const globModules = import.meta.glob('./glob/*=[0-9].js')
console.log(globModules) // 以路径为key的modules
Object.entries(globModules).forEach(([k, v]) => {
  v().then(m => console.log(k + ':' + m.default))
})
```

```js
const globModules = import.meta.globEager('./glob/*') // 
console.log(globModules)
```
## Vite性能揭秘--预编译优化
第三方库第一次启动时编译放入cache
.vite文件夹

预编译时 CommonJs to ESM

boundle files together
将多个文件依赖预编译为一个文件

## 服务端集成Vite（非nodejs服务）

## nodejs 集成vite

```js
// 启动一个viteDevServer
const express = require("express")
const app = express()

const { createServer: createViteServer } = require("vite")

createViteServer({
  server: {
    middlewareMode: 'html', // 使用html时只是启动了一个类似vite服务的东西， ssr是服务端渲染
  }
}).then((vite) => {
  app.use(vite.middlwares)
  app.listen(4000)
})
```
```js
// 启动一个服务端渲染SSR
const express = require("express")
const app = express()
const fs = require("fs")

const { createServer: createViteServer } = require("vite")

createViteServer({
  server: {
    middlewareMode: 'ssr', // 使用html时只是启动了一个类似vite服务的东西， ssr是服务端渲染
  }
}).then((vite) => {
  app.use(vite.middlwares)
  app.get('*', (req, res) => {
    cons ttemplate = fs.readFileSync('index.html', 'uef-8')
    res.set('content-type', 'text/html')
    res.send()
  })
  app.listen(4000)
})
```

## 配置总览

## rollup

## Vite插件系统
受限制的rollup插件

命名： rollup-plugin-xxx   vite-plugin-xxx

兼容钩子
服务启动时
1、options
2、buildStart
每个模块
1、resolveId
2、load
3、transform
服务关闭时
1、buildEnd
2、closeBoundle

modulePased不会被调用，都是交给esBuild来操作

rollup插件兼容vite条件
1、没有时间moduleParsed钩子
2、它在打包钩子和输出钩子之间没有很强的耦合

vite独有的钩子
1、config
可修改config， 返回体会与config合并
```js
config(userConfig) {
  return {
    resolve: {
      alias: {
        '@aaa': '/src/styles'
      }
    }
  }
}
```
2、configResolved
读取config，不可修改
```js
configResolved(config) {
  console.log(config)
}
```
3、configureServer
获取server对象，可加入vite server中间件
```js
configureServer(server) {
  server.middelwres.user((req, res, next) => {
    if (req.url === '/test') {
      res.end('Hello Vite Plugin')
    } else {
      next()
    }
  })
}

// return 一个函数， 中间件的优先级最低
configureServer(server) {
  return () => {
    server.middelwres.user((req, res, next) => {
      if (req.url === '/test') {
        res.end('Hello Vite Plugin')
      } else {
        next()
      }
    })
  }
}
```
4、transformIndexHtml
```js
transformIndexHtml(html) {
  // 拿到的是index.html的内容
  return html // 可以替换内容
}
```
5、handleHotUpdate 处理热更新做一些特殊处理
```js
handleHotUpdate(ctx) {
  console.log(ctx) // 热更新的模块信息以及文件
  ctx.server.ws.send({ // 自定义事件，可以在客户端监听
    type: 'custom',
    event: 'test',
    data: {
      a: 'res'
    }
  })
}

// 客户端代码监听
if (import.meta.hot) {
  import.meta.hot.on('test', res => {
    console.log(res)
  })
}
```
vite插件执行时机
1、pre
2、normal
3、post

## HRM-API详解
```js
if (import.meta.hot) {
  // 接受当前模块或者指定模块热更新
  import.meta.hot.accept((newModule) => {
    newModule.render()
  })
  // 指定热更新文件
  import.meta.hot.accept(['./renderA'])
  // 强制热更新之后刷新页面
  import.meta.hot.decline()
  // 强制浏览器刷新
  import.meta.hot.invalidate()
}
// 清楚副作用
if (import.meta.hot) {
  import.meta.hot.dispose(() => {
    // 卸载时清楚热更新的副作用
    // 例：定时器
  })
}
// 数据缓存
let index = import.meta.hot.data.cache.getIndex ? import.meta.hot.data.cache.getIndex : 0
if (import.meta.hot) {
  import.meta,hot.data.cache = {
    getIndex() {
      return index
    }
  }
  import.meta.hot.dispose(() => {
    // 卸载时清除热更新的副作用
    // 例：定时器
  })
}
```

## Vite官方插件



