坑点1： 引用的变量可能发生变化
```js
function outer() {
      var result = [];
      for （var i = 0； i<10; i++）{
        result.[i] = function () {
            console.info(i)
        }
     }
     return result
}
```
看样子result每个闭包函数对打印对应数字，1,2,3,4,...,10, 实际不是，因为每个闭包函数访问变量i是outer执行环境下的变量i，随着循环的结束，i已经变成10了，所以执行每个闭包函数，结果打印10， 10， ..., 10
怎么解决这个问题呢？
```js
function outer() {
      var result = [];
      for （var i = 0； i<10; i++）{
        result.[i] = function (num) {
             return function() {
                   console.info(num);    // 此时访问的num，是上层函数执行环境的num，数组有10个函数对象，每个对象的执行环境下的number都不一样
             }
        }(i)
     }
     return result
}
```
坑点2: this指向问题
```js
var object = {
     name: "object",
     getName： function() {
        return function() {
             console.info(this.name)
        }
    }
}
object.getName()()    // underfined
```
// 因为里面的闭包函数是在window作用域下执行的，也就是说，this指向windows
坑点3：内存泄露问题
```js
function  showId() {
    var el = document.getElementById("app")
    el.onclick = function(){
      aler(el.id)   // 这样会导致闭包引用外层的el，当执行完showId后，el无法释放
    }
}
```
// 改成下面
```js
function  showId() {
    var el = document.getElementById("app")
    var id  = el.id
    el.onclick = function(){
      aler(id)   // 这样会导致闭包引用外层的el，当执行完showId后，el无法释放
    }
    el = null    // 主动释放el
}
```
技巧1： 用闭包解决递归调用问题
```js
function  factorial(num) {
   if(num<= 1) {
       return 1;
   } else {
      return num * factorial(num-1)
   }
}
var anotherFactorial = factorial
factorial = null
anotherFactorial(4)   // 报错 ，因为最好是return num* arguments.callee（num-1），arguments.callee指向当前执行函数，但是在严格模式下不能使用该属性也会报错，所以借助闭包来实现
```

// 使用闭包实现递归
```js
function newFactorial = （function f(num){
    if(num<1) {return 1}
    else {
       return num* f(num-1)
    }
}） //这样就没有问题了，实际上起作用的是闭包函数f，而不是外面的函数newFactorial
```