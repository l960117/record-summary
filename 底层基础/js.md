#### 原始（Primitive）类型
存储：原始数据类型存储在栈中，key-value 。注意：闭包中的基本数据类型是存储在堆中？？
1、boolean 对应的包装数据类型 Boolean

2、string 对应的包装数据类型 String

3、null 无对应的包装类型

4、number 对应的包装数据类型 Number

5、undefined 无对应的包装数据类型

6、symbol 对应的包装数据类型 Symbol 

7、bigInt 对应的包装书局类型BigInt 

包装类型：虽然基本类型的值没有方法可以调用，但是后台临时创建的构造函数实例（也就是对象）上有内置方法可以让我们对值进行操作，因此这样我们就可以对字符串、数值、布尔值这三种基本数据类型的数据进行更多操作，这也是基本包装类型的主要用处：便于操作基本类型值。

JS 的 number 类型是浮点类型的，在使用中会遇到某些 Bug，比如 0.1 + 0.2 !== 0.3，但是这一块的内容会在进阶部分讲到。string 类型是不可变的，无论你在 string 类型上调用何种方法，都不会对值有改变。

虽然 typeof null 会输出 object，但是这只是 JS 存在的一个悠久 Bug。在 JS 的最初版本中使用的是 32 位系统，为了性能考虑使用低位存储变量的类型信息，000 开头代表是对象，然而 null 表示为全零，所以将它错误的判断为 object 

#### 对象（Object）类型
存储：对象类型存储在堆中，并且在栈中存入变量以及堆中的地址（指针）

函数参数是对象：传递的是对象地址（指针）的副本，所以在函数中对这个对象修改会影响传入的对象
```js
function f(obj) {

}
var objTemp = {}
f(objTemp)
等同于
function f(let obj = objTemp) {
    // 只有在里面对对象进行的地址的变化。才会变为另一个对象
}
var objTemp = {}
f(objTemp)
```
#### typeof vs instanceof
typeof 对于原始类型来说，除了 null 都可以显示正确的类型

typeof 对于对象来说，除了函数都会显示 object，所以说 typeof 并不能准确判断变量到底是什么类型
```js
typeof (string, number, boolean, symbol, bigInt, undefined) = (string, number, boolean, symbol, bigInt, undefined)
typeof null = 'object'
typeof function = 'function'
typeof (object, array) = 'object'
```
instanceof：内部机制是通过原型链来判断的
```js
const Person = function() {}
const p1 = new Person()  // 对象数据可以通过原型链的机制
p1 instanceof Person // true

var str = 'hello world' // 基本数据类型无法用instanceof来判断类型
str instanceof String // false

var str1 = new String('hello world')  // 定义基本包装类型可以用instanceof来判断对应的类型
str1 instanceof String // true
```
Symbol.hasInstance 自定义instanceof行为的方法，可用于判断基本数据类型
```js
class PrimitiveString {
  static [Symbol.hasInstance](x) {
    return typeof x === 'string'
  }
}
console.log('hello world' instanceof PrimitiveString) // true
```
#### 类型转换
##### JS 中类型转换只有三种情况
1、转换为boolean
```js
number -----> boolean 除了0, -0, NAN 为false, 其余的都是true
string -----> boolean 除了空串, 其余都是true
null -------> false
undefined --> false
object -----> true
```
2、转换为number
```js
string -----> '1' => 1 'a' => NAN
boolean ----> true => 1 false => 0
null -------> 0
undefined --> 0
array ------> 空数组为0，数组只有一个元素且为数字，转换为数字，其余为NAN
object -----> NAN
Symbol -----> 抛出错误
```
3、转换为string
```js
number -----> 0 => '0' 1 => '1'
boolean、函数、symbol ---> 'true'
array ------> [1, 2] => '1,2'
object -----> '[object Object]'
```
##### 转Boolean
在条件判断时，除了 undefined， null， false， NaN， ''， 0， -0，其他所有值都转为 true，包括所有对象。

##### 对象转原始类型
对象在转换类型的时候，会调用内置的 [[ToPrimitive]] 函数，对于该函数来说，算法逻辑一般来说如下：
```js
如果已经是原始类型了，那就不需要转换了
如果需要转字符串类型就调用 x.toString()，转换为基础类型的话就返回转换的值。不是字符串类型的话就先调用 valueOf，结果不是基础类型的话再调用 toString
调用 x.valueOf()，如果转换为基础类型，就返回转换的值
如果都没有返回原始类型，就会报错
```
##### 四则运算
运算中其中一方为字符串，那么就会把另一方也转换为字符串

如果一方不是字符串或者数字，那么会将它转换为数字或者字符串
##### 比较运算符
如果是对象，就通过 toPrimitive 转换对象

如果是字符串，就通过 unicode 字符索引来比较
#### this
首先箭头函数其实是没有 this 的，箭头函数中的 this 只取决包裹箭头函数的第一个普通函数的 this。
![](./this.png)
#### == vs ===
一般情况下，数据的类型的转换通常是由编译系统自动进行的，不需要人工干预，所以被称为隐式类型转换。但如果程序要求一定要将某一类型的数据转换为另外一种类型，则可以利用强制类型转换运算符进行转换，这种强制转换过程称为显式转换。

== 双方类型不一样，则会发生隐式的类型转换
```js
1、首先会判断两者类型是否相同。相同的话就是比大小了
2、类型不相同的话，那么就会进行类型转换
3、会先判断是否在对比 null 和 undefined，是的话就会返回 true
4、判断两者类型是否为 string 和 number，是的话就会将字符串转换为 number
5、判断其中一方是否为 boolean，是的话就会把 boolean 转为 number 再进行判断
6、判断其中一方是否为 object 且另一方为 string、number 或者 symbol，是的话就会把 object 转为原始类型再进行判断
```
#### 闭包
闭包的定义其实很简单：函数 A 内部有一个函数 B，函数 B 可以访问到函数 A 中的变量，那么函数 B 就是闭包。闭包存在的意义就是让我们可以间接访问函数内部的变量。
```js
function A() {
  let a = 1
  window.B = function () {
      console.log(a)
  }
}
A()
B() // 1
```
#### 深浅拷贝
浅拷贝：复制对象时，并没有深度复制，里层存在引用类型时还是复制的（地址）指针
深拷贝：递归深度复制, 将一个对象从内存中完整的拷贝一份出来,从堆内存中开辟一个新的区域存放新对象,且修改新对象不会影响原对象
JSON 深拷贝
```js
1.如果obj里面有时间对象，则JSON.stringify后再JSON.parse的结果，时间将只是字符串的形式，而不是对象的形式

2.如果obj里有RegExp(正则表达式的缩写)、Error对象，则序列化的结果将只得到空对象

3、如果obj里有函数，undefined，则序列化的结果会把函数或 undefined丢失

4、如果obj里有NaN、Infinity和-Infinity，则序列化的结果会变成null

5、JSON.stringify()只能序列化对象的可枚举的自有属性，例如 如果obj中的对象是有构造函数生成的， 则使用JSON.parse(JSON.stringify(obj))深拷贝后，会丢弃对象的constructor
```
#### 原型
每个 JS 对象都有 __proto__ 属性，这个属性指向了原型
```js
Object.prototype 是所有对象的爸爸，所有对象都可以通过 __proto__ 找到它
Function.prototype 是所有函数的爸爸，所有函数都可以通过 __proto__ 找到它
函数的 prototype 是一个对象
对象的 __proto__ 属性指向原型， __proto__ 将对象和原型连接起来组成了原型链
```
#### var、let、const
背景：ES5只有全局作用域和函数作用域，没有块级作用域。

let、const使用场景:

let使用场景：变量，用以替代var。

const使用场景：常量、声明匿名函数、箭头函数的时候。

##### 块级作用域
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
  {let name = 'UUZ'}
  console.log(name); // 报错 读不到子作用域的变量
}}}};
```
```js
var a = [];
for (var i = 0; i < 10; i++) {
  a[i] = function () {
    console.log(i);
  };
}
a[6](); // 10

var a = [];
for (let i = 0; i < 10; i++) {
  a[i] = function () {
    console.log(i);
  };
}
a[6](); // 6
```
##### 变量提升
var变量存在提升的现象：在同一作用域下，变量可以在声明之前使用，值为 undefined
```js
function sayHi() {
  console.log(name)
  console.log(age)
  var name = 'UUZ'
  let age = 25
}
sayHi()
```
##### 暂时性死区
只要一进入当前作用域，所要使用的变量就已经存在了，但是不可获取，只有等到声明变量的那一行代码出现，才可以获取和使用该变量
```js
var tmp = 123; // 声明
if (true) {
  tmp = 'UUZ'; // 报错 因为本区域有tmp声明变量
  let tmp; // 绑定if这个块级的作用域 不能出现tmp变量
}
```
```js
typeof xxx // xxx未声明，返回undefined
```
在没有let之前，typeof运算符是百分之百安全的，永远不会报错。
##### 不可重复声明

let不允许在相同作用域内，重复声明同一个变量。

##### let、const声明的全局变量不会挂在顶层对象下面

1、浏览器环境顶层对象是: window

2、node环境顶层对象是: global

3、var声明的全局变量会挂在顶层对象下面，而let、const不会挂在顶层对象下面。如下面

```js
var a = 1;
window.a // 1

let b = 1;
window.b // undefined
```

##### const 命令

1、const 声明之后必须马上赋值，否则会报错

2、const 简单类型一旦声明就不能再更改，复杂类型(数组、对象等)指针指向的地址不能更改，内部数据可以更改。


