## vite 开发环境原理剖析
https://juejin.cn/post/6992200385561624607
### 插件机制
```js
import { defineConfig } from 'vite'
import reactRefresh from '@vitejs/plugin-react-refresh'

// [https:](https://vitejs.dev/config/)[//vitejs.dev/config/](https://vitejs.dev/config/)
export default defineConfig({
  build: {
    rollupOptions: {
      plugins: []
    }
  },
  plugins: [reactRefresh()]
})
```
### 工作原理
传统打包构建工具，在服务器启动之前，需要从入口文件完整解析构建整个应用。因此，有大量的时间都花在了依赖生成，构建编译上。

而vite主要遵循的是使用ESM(Es modules模块)的规范来执行代码，由于现代浏览器基本上都支持了ESM规范，所以在开发阶段并不需要将代码打包编译成es5模块即可在浏览器上运行。我们只需要从入口文件出发， 在遇到对应的 import 语句时，将对应的模块加载到浏览器中就可以了。因此，这种不需要打包的特性，也是vite的速度能够如此快速的原因。

同时ts/jsx等文件的转译工作也会借助了esbuild来提升速度。 Vite在内部实现上，会启动一个dev server， 并接受独立模块的HTTP请求，并让浏览器自身去解析和处理模块加载。

dev启动源码 https://github.com/vitejs/vite/blob/main/packages/vite/src/node/cli.ts#L80
```js
const { createServer } = await import('./server')
try {
  const server = await createServer({
    root,
    base: options.base,
    mode: options.mode,
    configFile: options.config,
    logLevel: options.logLevel,
    clearScreen: options.clearScreen,
    server: cleanOptions(options) as ServerOptions
  })
  await server.listen()
} catch (e) {
  createLogger(options.logLevel).error(
    chalk.red(`error when starting dev server:\n${e.stack}`)
  )
  process.exit(1)
}
```
同时，会在开发环境中注入Vite自身的client客户端代码，用于监听HMR等处理。
```js
return {
  html,
  tags: [
    {
      tag: 'script',
      attrs: {
        type: 'module',
        src: path.posix.join(base, CLIENT_PUBLIC_PATH)
      },
      injectTo: 'head-prepend'
    }
  ]
}
```
#### 裸模块重写
由于目前ESM不支持类似 import vue from "vue" 这样的裸模块加载，所以需要对模块加载地址进行重写操作。将其转换成类似于 import vue from "/ @modules/vue" 这种形式。实现原理上主要通过 es-module-lexer 和 magic-string 两个包进行替换，比起AST语义解析和转换，在性能上更有优势。
#### Es-module-lexer
虽然js代码的词法分析通常都使用babel, acorn等工具，但是针对ESM文件来说，使用es-module-lexer库在性能上能够有很大的提升，其压缩后的体积只有4kb，而且根据官方给出的例子720kb的Angular1库经过acorn解析要超过100ms，而使用es-module-lexer库只需要5ms, 在性能上提升了将近20倍。
##### Magic-string
vite中使用了大量这个库做一些字符串的替换工作，从而避免操作AST。
```js
import { init, parse as parseImports, ImportSpecifier } from 'es-module-lexer'

// 借助es-module-lexer来分析import语句
imports = parseImports(source)[0]

// 接着在依赖分析及路径重写过程中利用magic-string来替换源码。
let s: MagicString | undefined
const str = () => s || (s = new MagicString(source))

// 省略部分代码
for (let index = 0; index < imports.length; index++) {
  const {
    s: start,
    e: end,
    ss: expStart,
    se: expEnd,
    d: dynamicIndex,
    n: specifier
  } = imports[index]

// 省略部分代码

// 解析代码
const { imports, importsString, exp, endIndex, base, pattern } =
  await transformImportGlob(
    source,
    start,
    importer,
    index,
    root,
    normalizeUrl
  )
  str().prepend(importsString)
  str().overwrite(expStart, endIndex, exp)
  imports.forEach((url) => importedUrls.add(url.replace(base, '/')))
  if (!(importerModule.file! in server._globImporters)) {
    server._globImporters[importerModule.file!] = {
      module: importerModule,
      importGlobs: []
    }
  }
  server._globImporters[importerModule.file!].importGlobs.push({
    base,
    pattern
  })
}
// 最终返回处理过的代码 
if (s) {
  return s.toString()
} else {
  return source
}       
```
##### 自定义区块处理
这个功能是通过在模块后面链接 ?type= 的参数来区分不同区块。然后针对每个区块单独进行处理。

根据不同的区块类型，在transform的时候会使用不同的插件进行编译。 下面以json文件为例，在处理 xxx.json 为结尾的文件的时候，首先json插件会匹配模块的id名是否是json。接着再进行转译工作。
```ts
// Custom json filter for vite
const jsonExtRE = /\.json($|\?)(?!commonjs-proxy)/

export function jsonPlugin(
  options: JsonOptions = {},
  isBuild: boolean
): Plugin {
  return {
    name: 'vite:json',

    transform(json, id) {
      if (!jsonExtRE.test(id)) return null
      if (SPECIAL_QUERY_RE.test(id)) return null

      try {
        if (options.stringify) {
          if (isBuild) {
            return {
              code: `export default JSON.parse(${JSON.stringify(
                JSON.stringify(JSON.parse(json))
              )})`,
              map: { mappings: '' }
            }
          } else {
            return `export default JSON.parse(${JSON.stringify(json)})`
          }
        }

        const parsed = JSON.parse(json)
        return {
          code: dataToEsm(parsed, {
            preferConst: true,
            namedExports: options.namedExports
          }),
          map: { mappings: '' }
        }
      } catch (e) {
        const errorMessageList = /[\d]+/.exec(e.message)
        const position = errorMessageList && parseInt(errorMessageList[0], 10)
        const msg = position
          ? `, invalid JSON syntax found at line ${position}`
          : `.`
        this.error(`Failed to parse JSON file` + msg, e.idx)
      }
    }
  }
}
```
#### HMR
热更新是前端开发体验中很重要的一环，那么Vite中主要依赖以下几个步骤来实现HMR的功能：

1、在重写模块地址的时候，记录模块依赖链 importMaps 。 这样在后续更新的时候，可以知道哪些文件需要被热更新。

2、代码中可以使用 import.meta.hot 接口来标记"HMR Boundary"。

3、接着，当文件更新的时候，会沿着之前记录下 imoprtMaps 链式结构找到对应的"HMR Boundary"， 再从此处重新加载对应更新的模块。

4、如果没有遇到对应的boundary, 则整个应用重新刷新。




