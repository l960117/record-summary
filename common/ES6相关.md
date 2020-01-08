### var和let/const的区别
背景：
ES5只有全局作用域和函数作用域，没有块级作用域。

这带来很多不合理的场景:

内层变量可能覆盖外层变量
用来计数的循环变量泄露为全局变量

let、const使用场景:
let使用场景：变量，用以替代var。
const使用场景：常量、声明匿名函数、箭头函数的时候。

#### 块级作用域

```js
function f1() {
  let n = 5;
  if (true) {
    let n = 10
    console.log(n)
  }
  console.log(n)
}
```
```js
{{{{
  {let insane = 'Hello World'}
  console.log(insane); // 报错 读不到子作用域的变量
}}}};
```
```js
{
let a = ...;
...
}
{
let a = ...;
...
}
```

#### 不存在变量提升
变量提升的现象：在同一作用域下，变量可以在声明之前使用，值为 undefined
```js
function sayHi() {
  console.log(name)
  console.log(age)
  var name = 'UUZ'
  let age = 25
}
sayHi()
```

#### 暂时性死区
只要一进入当前作用域，所要使用的变量就已经存在了，但是不可获取，只有等到声明变量的那一行代码出现，才可以获取和使用该变量
```js
var tmp = 123; // 声明
if (true) {
  tmp = 'abc'; // 报错 因为本区域有tmp声明变量
  let tmp; // 绑定if这个块级的作用域 不能出现tmp变量
}
```

#### 不可重复声明

#### let、const声明的全局变量不会挂在顶层对象下面

1、浏览器环境顶层对象是: window

2、node环境顶层对象是: global

3、var声明的全局变量会挂在顶层对象下面，而let、const不会挂在顶层对象下面。如下面这个栗子

```js
var a = 1;
// 如果在 Node环境，可以写成 global.a
// 或者采用通用方法，写成 this.a
window.a // 1

let b = 1;
window.b // undefined
```

#### const 命令

1、const 声明之后必须马上赋值，否则会报错

2、const 简单类型一旦声明就不能再更改，复杂类型(数组、对象等)指针指向的地址不能更改，内部数据可以更改。

### 普通函数和箭头函数的区别

#### 箭头函数的this指向规则

##### 1. 箭头函数没有prototype(原型)，所以箭头函数本身没有this
```js
let a = () =>{};
console.log(a.prototype); // undefined
```
#### 2. 箭头函数的this指向在定义的时候继承自外层第一个普通函数的this。
```js
let a,
  barObj = { msg: 'bar的this指向' };
fooObj = { msg: 'foo的this指向' };
bar.call(barObj); // 将bar的this指向barObj
foo.call(fooObj); // 将foo的this指向fooObj
function foo() {
  a(); // 结果：{ msg: 'bar的this指向' }
}
function bar() {
  a = () => {
    console.log(this, 'this指向定义的时候外层第一个普通函数'); // 
  }; // 在bar中定义 this继承于bar函数的this指向
}
```
#### 3. 不能直接修改箭头函数的this指向
```js
let fnObj = { msg: '尝试直接修改箭头函数的this指向' };
function foo() {
  a.call(fnObj); // 结果：{ msg: 'bar的this指向' }
}
```
####  4.箭头函数外层没有普通函数，严格模式和非严格模式下它的this都会指向window(全局对象)

普通函数在非严格模式下，默认绑定的this指向全局对象，严格模式下this指向undefined

### arguments

#### 1、箭头函数的this指向全局，使用arguments会报未声明的错误
```js
let b = () => {
  console.log(arguments);
};
b(1, 2, 3, 4); // Uncaught ReferenceError: arguments is not defined
```

#### 2、箭头函数的this指向普通函数时,它的argumens继承于该普通函数
```js
function bar() {
  console.log(arguments); // ['外层第二个普通函数的参数']
  bb('外层第一个普通函数的参数');
  function bb() {
    console.log(arguments); // ["外层第一个普通函数的参数"]
    let a = () => {
      console.log(arguments, 'arguments继承this指向的那个普通函数'); // ["外层第一个普通函数的参数"]
    };
    a('箭头函数的参数'); // this指向bb
  }
}
bar('外层第二个普通函数的参数');
```

#### 3、rest参数获取函数的多余参数
这是ES6的API，用于获取函数不定数量的参数数组，这个API是用来替代arguments的，API用法如下：
```js
let a = (first, ...abc) => {
  console.log(first, abc); // 1 [2, 3, 4]
};
a(1, 2, 3, 4);
```
rest参数有两点需要注意：
1、rest必须是函数的最后一位参数
2、函数的length属性，不包括 rest 参数

#### 4、使用new调用箭头函数会报错
无论箭头函数的thsi指向哪里，使用new调用箭头函数都会报错，因为箭头函数没有constructor
```js
let a = () => {};
let b = new  a(); // a is not a constructor
```

#### 5、箭头函数不支持new.target
new.target是ES6新引入的属性，普通函数如果通过new调用，new.target会返回该函数的引用。
此属性主要：用于确定构造函数是否为new调用的。

1、箭头函数的this指向全局对象，在箭头函数中使用箭头函数会报错

2、箭头函数的this指向普通函数，它的new.target就是指向该普通函数的引用。

#### 5、箭头函数不支持重命名函数参数,普通函数的函数参数支持重命名

```js
function func1(a, a) {
  console.log(a, arguments); // 2 [1,2]
}

var func2 = (a,a) => {
  console.log(a); // 报错：在此上下文中不允许重复参数名称
};
func1(1, 2); func2(1, 2);
```
### 注意事项
1、一条语句返回对象字面量，需要加括号，或者直接写成多条语句的return形式，否则像func中演示的一样，花括号会被解析为多条语句的花括号，不能正确解析

2、箭头函数在参数和箭头之间不能换行！

3、箭头函数的解析顺序相对靠前
```js
et a = false || function() {}; // ok
let b = false || () => {}; // Malformed arrow function parameter list
let c = false || (() => {}); // ok
```
### 不适用场景
1、定义字面量方法,this的意外指向
```js
const obj = {
  array: [1, 2, 3],
  sum: () => {
    return this.array.push('897')
  }
};
```
2、回调函数的动态this
```js
const button = document.getElementById('myButton');
button.addEventListener('click', () => {
    this.innerHTML = 'Clicked button'; // this又指向了全局
});
```

### Symbol
ES6 引入了一种新的原始数据类型Symbol，表示独一无二的值。