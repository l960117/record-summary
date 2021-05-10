### 基本配置
#### 拆分配置和merge
mode、entry、output、rules、plugins 等
#### 启动本地服务
devServer
#### 处理ES6
babel-loader
#### 处理样式 loader执行顺序，从后往前
style-loader、css-loader、postcss-loader
#### 处理图片
dev：file-loader 直接使用图片url

prd：考虑base64编码的情况

图片大小小于5kb使用base64格式产出，否则依赖沿用file-loader的形式，产出url格式
#### 模块化
### 高级配置
#### 多入口
```js
1、entry添加多个js入口文件
2、output的fileName 设置为'[name].[contentHash:8].js'
3、HtmlWebpackPlugin生成多个html
```
#### 抽离CSS文件
MinCssExtractPlugin.loader 替换style-loader

rules配置
```js
// 抽离 css
{
    test: /\.css$/,
    loader: [
        MinCssExtractPlugin.loader,
        'css-loader',
        'postcss-loader'
    ]
}
// 抽离less
{
    test: /\.less$/,
    loader: [
        MinCssExtractPlugin.loader,
        'css-loader'
        'less-loader',
        'postcss-loader'
    ]
}
```
plugins配置
```js
// 抽离css文件
new MiniCssExtractPlugin({
    filename: '/css/main.[contentHash:8].css'
})
```
#### 压缩css
```js
optimization: {
    // 压缩css
    minimizer: [new TerserJSPlugin({}), new OptimizeCssAssetsPlugin()]
}
```
#### 抽离公共代码
```js
optimization: {
    // 压缩css
    minimizer: [new TerserJSPlugin({}), new OptimizeCssAssetsPlugin()]
    // 分割代码块
    splitChunks: {
        chunks: 'all',
        /** initial rukou1 chunk，对于与一部导入的文件不处理
            async 异步chunk，支队一部导入的文件处理
            all 全部 chunk
        */

        // 缓存分组
        cacheGroups: {
            // 第三方模块
            vendor: {
                name: 'vendor', // chunk 名称
                priority: 1, // 权限更高，优先抽离
                test: /node_modules/,
                minSize: 0, //大小限制
                minChunks: 1 //最少复用过几次
            },
            // 公共的模块
            common: {
                name: 'common',
                priority: 0,
                minSize: 0,
                minChunks: 2
            }
        }
    }
}
```
#### 懒加载
import() 自定义一个chunk，默认支持动态加载语法
#### JSX
@babel/preset-react
```js
"presets": ["@babel/preset-react"]
```
#### Vue
vue-loader
#### module chunk bundle的区别
```js
1、module - 各个源码文件，webpack中一切皆模块
2、chunk - 多模块合并成的entry import() splitChunk
3、bundle - 最终的输出文件
```
###  优化打包构建效率（开发体验和效率）
1、优化babel-loader
```js
{
    test: /\.js$/,
    use: ['babel-loader?cacheDirectory'], // 开启缓存
    include: path.resolve(__dirname, 'src'), // 明确范围
    // 排除范围，include 和exclude 两者选一个即可
    // exclude: path.resolve(__dirname, 'node_modules')
}
```
2、IgnorePlugin（可用于生产环境）

避免引入无用模块
```js
import moment from 'moment'
```
默认会引入所有语言JS代码，代码过大
```js
// 忽略moment下的 /locale目录
new webpack.IgnorePlugin(/\.\/locale/, /moment/)
```
然后手动引入需要的语言包

3、noParse（可用于生产环境）

避免重复打包
```js
module: {
    // 独完整的 `react.min.js` 文件就没有采用模块化
    // 忽略对 `react.min.js` 文件的递归解析处理
    noParse: [/react\.min\.js$/],
}
```
```js
IgnorePlugin 直接不引入，代码中没有
noParse引入，但不打包
```
4、happyPack 多进程打包（可用于生产环境）

JS单线程，开启多进程打包

提高构建速度（特别是多核CPU）
```js
rules: {
    test: /\.js$/,
    // 把对 .js 文件的处理转交给id为babel的HappyPack实例
    use: ['happypack/loader?id=babel'].
    exclude: /node_modules/
}
plugins: {
    // 开启多进程打包
    new HappyPack({
        // 用唯一的标识符id来代表当前的 HappyPack 是用来处理一类特定的文件
        id: 'babel',
        // 如何处理.js文件，用法和Loader配置中一样
        loaders: ['babel-loader?cacheDirectory']
    })
}
```
5、ParallelUglifyPlugin 多进程压缩JS（可用于生产环境）

webpack内置UglifyJS工具压缩

实际上还是使用UglifyJS压缩，只不过帮助开启了多进程

放在生产上使用，开发环境没必要压缩

关于开启多进程
```js
项目较大，打包较慢，开启多进程能提高速度
项目较小，打包很快，开启多进程会降低速度（进程开销）
按需使用
```

6、自动刷新（不可用于生产环境）

整个网页全部刷新，速度较慢、状态会丢失
```js
module.export = {
    watch: true,
    watchOptions: {
        ignored: /node_modules/,
        aggregateTimeout: 300,
        poll: 1000
    }
}
```
7、热更新（不可用于生产环境）

新代码生效，网页不刷新，状态不丢失

8、DllPlugin 动态链接库插件（不可用于生产环境）
```js
前端框架如Vue React，体积大，构建慢
较稳定，不常升级版本
同一个版本之构建一次即可，不用每次都重新构建
```
webpack已内置DllPlugin支持
```js
DllPlugin - 打包出dll文件，生成manifest.json
DllReferencePlugin - 使用dll文件
```
```js

```
### 优化产出代码（产品性能）
```js
体积更小
合理分包，不重复加载
速度更快，内存使用更少
```
#### 小图片base64编码
#### bundle加hash，conentHash根据文件的内容生成hash值
#### 懒加载
#### 提取公共代码
#### IngorePlugin
#### 使用CDN加速
1、设置publicPath为cdn地址

2、上传打包后的文件至cdn
#### 使用mode: production
1、自动开启代码压缩

2、Vue React等会自定删掉调试代码（如开发环境的warning）

3、自动启动Tree-Shaking（未使用，未引用的代码不加入打包，打包后代码体积更小）

注意：ES6 Module才能让tree-shaking生效、commonJs 不行
##### ES6 Module 和Commonjs区别
```js
1、ES6 Module静态引入，编译时引入
2、Commonjs 动态引入，执行时引入
3、只有ES6 Module才能静态分析，实现Tree-Shaking
```
#### Scope Hoisting（合并函数）
```js
代码体积更小
创建函数作用域更少
代码可读性更好
```
```js
module.exports = {
    // 针对Npm 中第三方模块优先采用 jsnext:main 中之乡的ES6模块化语法的文件
    resolve: {
        mainFields: ['jsnext:main', 'browser', 'main']
    },
    plugins: {
        // 开启 Scope Hoisting
        new ModuleConcatenationPlugin(),
    }
}
```
### babel
1、基本配置

.babelrc配置

presets 和 plugins
```js
{
    // babel 插件集合
    "presets": [
        [
            "@babel/preset-env"
        ]
    ],
    "plugins": []
}
```
2、babel-polyfill

core-js 和 regenerator 的集合

Babel7.4之后弃用babel-polyfill
```js
import '@babel/polyfill'
const sum = (a, b) => a + b
// 新的API
Promise.resolve(100).then(data => data)
// 新的API
[10, 20, 30].includes(20)

// 语法，符合ES5语法规范
// 不处理模块化（webpack）
```
babel-polyfill文件较大，配置按需引入
```js
{
    // babel 插件集合
    "presets": [
        [
            "@babel/preset-env",
            {
                "useBuiltIns": "usage",
                "corejs": 3
            }
        ]
    ],
    "plugins": []
}
```
3、babel-runtime

babel-polyfill的问题
```js
1、会污染全局环境
2、如果做一个独立的web系统，无障碍
3、做一个第三方的库会有问题
```
通过babel-runtime解决全局环境污染问题
```js
{
    // babel 插件集合
    "presets": [
        [
            "@babel/preset-env",
            {
                "useBuiltIns": "usage",
                "corejs": 3
            }
        ]
    ],
    "plugins": [
        "@babel/plugin-transform-runtime",
        {
            "absoluteRuntime": false,
            "corejs": 3,
            "helpers": true,
            "regenerator": true,
            "useESModules": false
        }
    ]
}
```