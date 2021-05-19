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
##### 宏任务和微任务，两者有什么区别
##### Promise有哪三种状态？如何变化
#####
