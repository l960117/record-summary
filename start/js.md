#### 变量类型和计算
##### 值类型
number、string、boolean、null、undefined、symbol、bigInt
##### 引用类型
object
##### typeof能判断哪些类型
typeof 对于原始类型来说，除了 null 都可以显示正确的类型

typeof 对于对象来说，除了函数都会显示 object
##### 变量计算-类型转换
1、字符串拼接
2、==
3、if语句和逻辑运算
##### 何时使用 === 何止使用==
##### 手写深拷贝
#### 原型和原型链
##### class
语法糖，实际上是函数
##### 显示原型和隐式原型
protetype 显示原型、__protp__ 隐式原型

每个class都有显示原型prototype
每个实例都有隐式原型__proto__
实例的__proto__指向对应的class的prototype

基于原型的执行规则
1、现在自身属性和方法寻找
2、如果找不到则自动去__proto__查找
##### 原型链
通过隐式原型一层一层网上找直到对应的__proto__为null为止
##### 如何准确判断一个变量是不是数组
instanceof 基于原型链实现
#### 作用域和闭包
##### 作用域（变量的合理使用范围）
函数作用域，全局作用域
es6的块级作用域
##### 自由变量
1、一个变量在当前作用域没有定义，但是被使用了

2、向上级作用域吗，一层一层一次寻找，直到找到为止

3、如果到全局作用域都没有找到，则报错XX is not defined

这种查找机制叫作用域链
##### 闭包定义、使用场景
定义：作用域应用的特殊情况，有两种表现
1、函数作为参数被传递
```js
function create(){
    const a = 100
    return function () {
        console.log(a)
    }
}
const fn = create()
const a = 200
fn()
```
2、函数作用返回值被返回
```js
function print(fn) {
    const a = 200
    fn()
}
const a = 100
function fn() {
    console.log(a)
}
print(fn) // 100
```

所有自由变量的查找，实在函数定义的地方，向上级作用域查找
不是在执行的地方
##### this的不同应用场景，如何取值
取之于执行时
1、作为普通函数
2、使用call apply bind
3、作为对象方法被调用
4、在class方法中调用
5、箭头函数
##### 手写bind函数
#### 异步
##### 同步和异步的区别是什么
基于JS是单线程语言，异步不会阻塞代码执行，同步会阻塞代码执行
##### 单线程和异步
1、js是单线程语言，只能同时做一件事
2、浏览器和nodejs已支持js启动进程，如web worker
3、js和DOM渲染共用同一个线程，因为JS可修改DOM结构
4、遇到等待（网络请求，定时任务）不能卡主
5、需要异步
6、回调callback函数的形式
##### 异步的应用场景
1、网络请求，如ajax图片加载
2、定时任务。如setTimeout
##### callback hell
当ajax请求存在依赖时，类似套娃，就形成了回调地狱
##### Promise
解决回调地狱
##### event loop的机制
1、JS是单线程运行的
2、异步要基于回调来实现
3、event loop 就是异步回调的实现原理
##### JS如何执行
1、从前到后，一行一行执行
2、如果某一行报错，则停止下面代码的执行
3、先把同步代码执行完，在执行异步
##### event loop执行过程
1、同步代码，一行一行放在Call Stacj执行
2、遇到异步，会先“记录”下，等待时机（定时，网络请求）
3、时机到了，就移动到Callback Queue
4、如果Call Stack 为空（即同步代码执行完）Event Loop开始工作
5、轮询查找Cakllback Queue，如有则移动到Call Stack执行
6、然后继续轮询查找
##### DOM事件和event loop
1、JS是单线程的
2、异步（setTimeout，ajax等）使用回调，基于event loop
3、DOM事件（并不是异步）也是用回调，基于event loop
##### Promise
1、三种状态
pending resolved rejected
pending -> resolved或pending -> rejected
变化不可逆
2、状态的表现和变化
then正常返回resolved，里面有报错则返回rejected
catch正常返回resolved，里面有报错则返回rejected
3、then 和 catch 对状态的影响
then正常返回resolved，里面有报错则返回rejected
catch正常返回resolved，里面有报错则返回rejected
##### async/await
1、异步回调callback hell
2、Promise then catch 链式调用，但也是基于回调函数
3、async/await是同步语法，彻底消灭回调地狱
##### async/await 和 Promise的关系
1、async/await是消灭异步回调的终极武器
2、但和Promise并不互斥
3、反而，两者是相辅相成的

1、执行async函数，返回的是Promise对象
2、await相当于Promise的then
3、try catch可捕获异常（语法标准化），代替了Promise的catch
##### 异步的本质
async/await只是一个语法糖，实现了代码上的同步，本质上还是回调函数

await的后面，都可以看做是callback里的内容，即异步
##### for...of
for in 以及firEach for 是常规的同步遍历

for of常用于异步的遍历
##### 宏任务和微任务，两者有什么区别
定义
微任务是ES6语法规定的
宏任务是由浏览器规定的

宏任务：setTimeout、setInterval、Ajax、DOM事件
微任务： Promise async/await

event loop 和DOM渲染
1、JS是单线程的，而且和DOM渲染公用一个线程
2、JS执行的时候，得留一些时机供DOM渲染

1、Call Stack空闲（每次轮询结束），即同步任务执行完
2、执行当前的微任务
2、都是DOM重新渲染的机会，DOM结构如有改变则重新渲染
3、然后再去触发下一次Event Loop

区别：
宏任务：DOM渲染后触发，如setTimeout
微任务：DOM渲染钱触发，如Promise
#### JS Web API
1、JS基础知道，规定语法（ECMA 262标准）
2、JS Web API，网页操作的API（W3C标准）
3、前者是后者的基础，两者结合才能真正的实际应用
##### DOM（Document Object Model）
本质：从HTML解析出来的一棵树
API：
1、property：修改对象竖向，不会体现到html结构中
2、attribute：修改html属性，会改变html结构
3、两者都有可能引起DOM重新渲染
DOM结构操作
1、createElement、appendChild、parentNode、childNodes、nodeType、nodeName
DOM性能
1、DOM操作非常‘昂贵’，避免频繁的DOM操作
2、对DOM查询做缓存
3、将频繁操作改为一次性操作
createDocumentFragment
##### BOM（Brower Object Model）
navigator、screen、location、history
识别浏览器类型：navigator.userAgent
##### 事件绑定
1、addEventListener
event.target // 触发的当前元素
event.preventDefault() //阻止默认行为
2、事件冒泡
event.stopProgation // 阻止事件冒泡
3、事件代理
##### ajax
1、XMLHttpRequest
```js
let xhr = new XMLHttpRequest()
xhr.open("GET", "/api", true) // true 为异步请求。false为同步请求
chr.onreadystatechange = function () {
    if (xhr.readyState === 4) {
        if (xhr.status === 200) {
            alert(xhr.responseText)
        }
    }
}
xhr.send(null)
// xhr.send(JSON.stringify({})) // 带参
```
readyState
0 - (未初始化)还没有调用send()方法
1 = (载入)已调用send()方法，正在发送请求
2 - (载入完成)send()方法已经执行完成，已经接受到全部响应内容
3 - (交互) 正在解析相应内容
4 - (完成) 响应内容解析完成，可以再客户端调用
status
2XX - 表示成功处理请求 200
3XX - 需要重定向，浏览器直接跳转 301 302 304
4XX - 客户端请求错误，如404 403
5XX - 服务端错误
##### 跨域
ajax请求时，浏览器要求当前网页和server必须同源（安全）
同源：协议、域名、端口，三者必须一致

加载图片css js可无视同源策略
```js
1、<img src=跨域的图片地址 /> // 可用户统计大点，可使用第三方统计服务
2、<link href=跨域的CSS地址/> // 
3、<script src=跨域的js地址></script> // 可实现JSONP

1、所有的跨域，都必须经过server端的允许和配合
2、未经server端允许就实现跨域，说明浏览器有漏洞，危险信号

```
JSONP
```js
<script>可绕过跨域限制
服务器可以任意动态拼接数据返回
所以，<script>就可以获得跨域的数据，只要服务端愿意返回
```
CORS - 服务器设置gttp header

##### 存储
cookie
本身用于浏览器和server通讯
被‘借用’到本地存储来
document.cookie（不同key追加，同一个key覆盖）

缺点
1、存储大小，最大4KB
2、http请求时需要发送到服务端，增加请求数据量
3、只能用document.cookie = ''来修改，太过简陋
sessionStore、localStore
HTML专门为存储而设计，最大可存5M
setItem getItem removeItem
#### HTTP
##### 状态码
1XX 服务端收到请求
2XX 请求成功 200
3XX 重定向 302
4XX 客户端错误 404
5XX 服务端错误

200 成功
301 永久重定向（配合location，浏览器自动处理）// 浏览器记住，下次不会访问直接重定向
302 临时重定向（配合location，浏览器自动处理）// 浏览器不会记住，下次还是会访问，等待返回302再重定向
304 资源未被修改
404 资源未找到
403 没有权限
500 服务器错误
504 网关超时

协议和规范（约定）
##### http methods
get 获取数据
post 新建数据
patch/put 更新数据
delete 删除数据

Resetful API
一种新的API设计方法（早就推广使用）
传统API设计：吧每个url当做一个功能
Restful API设计： 把每个url当做一个唯一的资源
##### http header
Request Headers
```js
User-Agent（简称UA）浏览器信息
Content-type 发送数据的格式，如application/json
```
Response Headers
```js
content-type 返回数据的格式，如application/json
content-length 返回数据的大小，多少字节
Content-Encoding返回数据的压缩算法，如gzip
Set-cookie 更改cookie
```
缓存相关的headers
```js
Cache-Control Expires
Last-Modified If-Modified-Since
Etag If-None-Match
```
##### 缓存
cache-control
```js
Response Headers中
控制强制缓存的逻辑
例如Cache-Control: max-age = 31536000（单位是秒）
max-age // 缓存的最大过期时间
no-cache // 不用强制缓存，交给服务端处理
no-store // 不用强缓存，不用协商缓存
private // 只允许用户缓存
public // 允许代理服务缓存
```
Expires
Response Headers中，同为控制缓存过期，已被Cache-Control

协商缓存（对比缓存）
```js
服务器端缓存策略
服务端判断客户端资源，是否和服务端资源一样
一致则返回304，否则返回200和最新的资源

在Response Headers中
Last-Modified 资源的最后修改时间
Etag资源的唯一标识（一个字符串，类似人类的指纹）

会优先使用Tag
Last-Modified只能精确到秒级
如果资源被重复生成，2️而内容不变，则Etag更精确
```
##### 刷新页面对缓存的影响
正常操作：地址栏输入url，跳转链接，前进后退等
```js
强制缓存有效，协商缓存有效
```
手动刷新：F5, 点击刷新按钮，右键菜单刷新
```js
强制缓存失效，协商缓存失效
```
强制刷新: ctrl + f5
```js
强制缓存师表，协商缓存失效
```
#### 开发环境
##### git
个人
git clone
git branch
git add . 
git commit -m 'xxx'
git push -u origin master
git pull origin master
git config username
git status
git show xxxx
git checkout
多人
git diff
git fetch
git merge xxx
##### 抓包
fiddler
charles
##### webpack
##### linux 命令
ssh xxx 连接url
ls 查看全部文件夹
mkdir abc 创建文件夹
rm -rf abc 删除文件夹
mv xxx 移动更改文件
cp xxx xxx 拷贝
#### 运行环境






