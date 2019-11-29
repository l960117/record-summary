### Question

#### 谈谈你对webpack的看法

webpack是一个模块打包工具，可以使用它管理项目中的模块依赖，并编译输出模块所需的静态文件。它可以很好地管理、打包开发中所用到的HTML,CSS,JavaScript和静态文件（图片，字体）等，让开发更高效。对于不同类型的依赖，webpack有对应的模块加载器，而且会分析模块间的依赖关系，最后合并生成优化的静态资源。

#### webpack的基本功能和工作原理？

1、代码转换：TypeScript 编译成 JavaScript、SCSS 编译成 CSS 等等

2、文件优化：压缩 JavaScript、CSS、HTML 代码，压缩合并图片等

3、代码分割：提取多个页面的公共代码、提取首屏不需要执行部分的代码让其异步加载

4、模块合并：在采用模块化的项目有很多模块和文件，需要构建功能把模块分类合并成一个文件

5、自动刷新：监听本地源代码的变化，自动构建，刷新浏览器

6、代码校验：在代码被提交到仓库前需要检测代码是否符合规范，以及单元测试是否通过

7、自动发布：更新完代码后，自动构建出线上发布代码并传输给发布系统。

#### webpack打包原理

1、把一切都视为模块：不管是 CSS、JS、Image 还是 HTML 都可以互相引用，通过定义 entry.js，对所有依赖的文件进行跟踪，将各个模块通过 loader 和 plugins 处理，然后打包在一起。

2、按需加载：打包过程中 Webpack 通过 Code Splitting 功能将文件分为多个 chunks，还可以将重复的部分单独提取出来作为 commonChunk，从而实现按需加载。把所有依赖打包成一个 bundle.js 文件，通过代码分割成单元片段并按需加载

3、webpack.config.js的配置
```js
// webpack的配置文件 由于webpack是基于Node构建的，webpack配置文件中所有的合法node语法都可以用
var path = require('path')
// 如果要配置插件,需要在导出的对象上添加plugins节点
var htmlWebpackPlugin = require('html-webpack-plugin')
// 配置导出对象
module.exports = {
    // 入口文件
    entry: path.join(__dirname, './src/main.js'),
    /* 
    // 入口文件的配置项,配置两个
    entry:{
        entry:'./src/entry.js',
        //这里我们又引入了一个入口文件
        entry2:'./src/entry2.js'
    },
    */
    // 指定输出选项
    output: {
        path: path.join(__dirname, './dist'), // 指定输出路径
        /* 
             path:path.resolve(__dirname,'dist'), // 输出的路径，用了Node语法
        */
        filename: 'bundle.js' // 指定输出文件的名字
    },
    // 插件对象节点
    plugins: [
        new htmlWebpackPlugin({
            template: path.join(__dirname, './src/index.html'), // 指定模板文件路径
            filename: 'index.html' // 设置生成内存页面的的名字
        }),
    ],
    // 配置所有第三方loader(载入程序)模块 例如解读CSS,图片如何转换，压缩
    module: {
        // 第三方模块的匹配规则
        rules: [
            // 这里的test于正则的test一样
            // 处理css文件的loader
            {test: /\.(css|scss)$/, use: ['style-loader', 'css-loader', 'sass-loader']},
            // 处理图片路径的loader 这里的limit为图片的大小(单位是字节)
            {test: /\.(jpg|png|gif|jpeg|bmp)$/, use: 'url-loader?limit=349950&name=[hash:8]-[name].[ext]'},
            // 处理字体图标的loader
            {test: /\.(ttf|eot|svg|woff|woff2)$/, use: 'url-loader'},
            // 把Es6的高级语法转换成浏览器可以识别的低级语言
            {test: /\.js$/, use: 'babel-loader', exclude: /node_modules/},
            // 处理vue文件的loader
            {test: /\.vue$/, use: 'vue-loader'}
        ]
    },
    // 配置导入包的路径
    /*  resolve : {
            alias : { // alias别名 修改vue导入的路径
                "vue$" : "vue/dist/vue.js"
            }
        }*/
}
```

#### webpack的优势

（1） webpack 是以 commonJS 的形式来书写脚本的，但对 AMD/CMD 的支持也很全面，方便旧项目进行代码迁移。

（2）能被模块化的不仅仅是 JS 了。

（3） 开发便捷，能替代部分 grunt/gulp 的工作，比如打包、压缩混淆、图片转base64等。

（4）扩展性强，插件机制完善

#### webpack的核心概念

Entry：入口，Webpack 执行构建的第一步将从 Entry 开始，可抽象成输入。告诉webpack要使用哪个模块作为构建项目的起点，默认为./src/index.js

output ：出口，告诉webpack在哪里输出它打包好的代码以及如何命名，默认为./dist

Module：模块，在 Webpack 里一切皆模块，一个模块对应着一个文件。Webpack 会从配置的 Entry 开始递归找出所有依赖的模块。

Chunk：代码块，一个 Chunk 由多个模块组合而成，用于代码合并与分割。

Loader：模块转换器，用于把模块原内容按照需求转换成新内容。

Plugin：扩展插件，在 Webpack 构建流程中的特定时机会广播出对应的事件，插件可以监听这些事件的发生，在特定时机做对应的事情。

#### 什么是loader，什么是plugin

loader用于加载某些资源文件。因为webpack本身只能打包common.js规范的js文件，对于其他资源如css，img等，是没有办法加载的，这时就需要对应的loader将资源转化，从而进行加载。使wenbpack拥有加载和解析非js文件的能力
 
常见的loader以及作用
1、file-loader：把文件输出到一个文件夹中，在代码中通过相对 URL 去引用输出的文件
2、url-loader：和 file-loader 类似，但是能在文件很小的情况下以 base64 的方式把文件内容注入到代码中去
3、source-map-loader：加载额外的 Source Map 文件，以方便断点调试
4、image-loader：加载并且压缩图片文件
5、babel-loader：把 ES6 转换成 ES5
6、css-loader：加载 CSS，支持模块化、压缩、文件导入等特性
7、style-loader：把 CSS 代码注入到 JavaScript 中，通过 DOM 操作去加载 CSS。
8、eslint-loader：通过 ESLint 检查 JavaScript 代码


plugin用于扩展webpack的功能。不同于loader，plugin的功能更加丰富，比如压缩打包，优化，不只局限于资源的加载。

1、UglifyJsPlugin: 压缩代码
2、HotModuleReplacementPlugin 自动刷新
3、HtmlWebpackPlugin 依据一个简单的index.html模版，生成一个自动引用你打包后的js文件的新index.html
4、ExtractTextWebpackPlugin 它会将入口中引用css文件，都打包都独立的css文件中，而不是内嵌在js打包文件中
5、Tree-shaking 指在打包中去除那些引入了，但是在代码中没有被用到的那些死代码
6、在webpack中Tree-shaking是通过uglifySPlugin来Tree-shaking，Css需要使用Purify-CSS

常见的plugin以及作用

define-plugin：定义环境变量
commons-chunk-plugin：提取公共代码
uglifyjs-webpack-plugin：通过UglifyES压缩ES6代码

#### 什么是bundle，什么是chunk，什么是module
bundle：是由webpack打包出来的文件

chunk：是指webpack在进行模块依赖分析的时候，代码分割出来的代码块

module：是开发中的单个模块

#### webpack 和 gulp 的区别？
webpack是一个模块打包器，强调的是一个前端模块化方案，更侧重模块打包，我们可以把开发中的所有资源都看成是模块，通过loader和plugin对资源进行处理。

gulp是一个前端自动化构建工具，强调的是前端开发的工作流程，可以通过配置一系列的task，第一task处理的事情（如代码压缩，合并，编译以及浏览器实时更新等）。然后定义这些执行顺序，来让glup执行这些task，从而构建项目的整个开发流程。自动化构建工具并不能把所有的模块打包到一起，也不能构建不同模块之间的依赖关系。

#### 如何自动生成webpack配置文件？
webpack-cli、vue-cli

#### 什么是模热更新？有什么优点？
模块热更新是webpack的一个功能，它可以使得代码修改之后，不用刷新浏览器就可以更新。在应用过程中替换添加删出模块，无需重新加载整个页面，是高级版的自动刷新浏览器。
        优点：只更新变更内容，以节省宝贵的开发时间。调整样式更加快速，几乎相当于在浏览器中更改样式

#### webpack-dev-server 和 http服务器的区别
webpack-dev-server使用内存来存储webpack开发环境下的打包文件，并且可以使用模块热更新，比传统的http服务对开发更加有效。

#### 什么是长缓存？在webpack中如何做到长缓存优化？
浏览器在用户访问页面的时候，为了加快加载速度，会对用户访问的静态资源进行存储，但是每一次代码升级或者更新，都需要浏览器去下载新的代码，最方便和最简单的更新方式就是引入新的文件名称。

在webpack中，可以在output给出输出的文件制定chunkhash，并且分离经常更新的代码和框架代码，通过NameModulesPlugin或者HashedModulesPlugin使再次打包文件名不变。

#### 什么是Tree-sharking?
指打包中去除那些引入了但在代码中没用到的死代码。在wepack中js treeshaking通过UglifyJsPlugin来进行，css中通过purify-CSS来进行.

#### webpack构建流程

1. 初始化参数，从配置文件和shell语句中读取与合并参数，得出最终的参数

2. 开始编译：用上一步得到的参数初始化 Compiler 对象，加载所有配置的插件，执行对象的 run 方法开始执行编译；

3. 确定入口，通过entry找到入口文件

4. 编译模块：从入口文件出发，调用所有配置的 Loader 对模块进行翻译（按照loader的规则进行转换），再找出该模块依赖的模块，再递归本步骤直到所有入口依赖的文件都经过了本步骤的处理；

5. 完成模块编译，得到每个模块被翻译之后的最终的内容和依赖关系

6. 输出资源，根据入口和模块之间的依赖关系，组装成一个个包含多个模块的chunk，在把每个chunk转换成一个单独的文件加载到输出列表，这步是可以修改输出内容的最后机会

7. 输出完成：在确定好输出内容后，根据配置确定输出的路径和文件名，把文件内容写入到文件系统。

8. 在整个流程中webpack会在恰当的时机执行plugin里定义的逻辑

#### 如何提高webpack的构建速度？

多入口情况下，使用CommonsChunkPlugin来提取公共代码

通过externals配置来提取常用库

利用DllPlugin和DllReferencePlugin预编译资源模块 通过DllPlugin来对那些我们引用但是绝对不会修改的npm包来进行预编译，再通过DllReferencePlugin将预编译的模块加载进来。

使用Happypack 实现多线程加速编译

使用webpack-uglify-parallel来提升uglifyPlugin的压缩速度。 原理上webpack-uglify-parallel采用了多核并行压缩来提升压缩速度

使用Tree-shaking和Scope Hoisting来剔除多余代码

#### 如何利用webpack来优化前端性能
压缩代码。uglifyJsPlugin 压缩js代码， mini-css-extract-plugin 压缩css代码

删除死代码（tree shaking），css需要使用Purify-CSS

提取公共代码。webpack4移除了CommonsChunkPlugin (提取公共代码)，用optimization.splitChunks和optimization.runtimeChunk来代替
