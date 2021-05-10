#### 前端为何要进行打包构建
代码层
1、体积更小（Tree-Shaking，压缩，合并），加载更快
2、编译高级语言或语法（TS，ES6+ ，模块化， scss，less）
3、兼容性和错误检查（polyfill，postcss，eslint）
前端层面-前端工程化，规范化
4、统一、高效的开发环境
5、统一的构建流程和产出标准
6、集成公司构建规范（提测，上线等）
#### loader 和plugin的区别
1、loader模块转换器，如less -> css
2、plugin扩展插件，如HTMLWepackPlugin
#### 常见的loader 和plugin 有哪些
#### babel 和webpack的区别
babel - JS新语法编译工具，不关心模块化
webpack - 打包构建工具，是多个loader plugin的集合
#### 如何产出一个lib
library
#### 为何 Proxy 不能被 Polyfill
1、Class可以用function模拟
2、Promise可以用callback来模拟
3、但Proxy的功能用Object.definePoperty无法模拟