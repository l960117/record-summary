#### 防抖与节流
防抖：动作绑定事件，动作发生后一定时间后触发事件，在这段时间内，如果该动作又发生，则重新等待一定时间再触发事件。
```js
function debounce(func, time) {
  let timer = null;
  return () => {
    clearTimeout(timer);
    timer = setTimeout(()=> {
      func.apply(this, arguments)
    }, time);
  }
}
```
节流：动作绑定事件，动作发生后一段时间后触发事件，在这段时间内，如果动作又发生，则无视该动作，直到事件执行完后，才能重新触发。
```js
function throtte(func, time){
  let activeTime = 0;
  return () => {
    const current = Date.now();
    if(current - activeTime > time) {
      func.apply(this, arguments);
      activeTime = Date.now();
    }
  }
}
```
#### 柯里化
简单说就是把多形参的函数转换为可以一个一个接收参数的函数,即如下
```js
add(x,y) => curryAdd(x)(y)
```
```js
function curry(f){
  var total = f.length
  var args = []
  return function() {
    args.push(...arguments)
    if (args.length < total) {
      return arguments.callee
    } else {
      var res = f.apply(this, args)
      args = [] // 需要清理args
      return res
    }
  }
}

function add(x,y) {
  return x+y
}

var curryAdd=curry(add)

curryAdd(1)(2) // 3
curryAdd(1,2) 
```
#### 函数组合
组合函数指的是将代表各个动作的多个函数合并成一个函数
```js
function componse(...funcs) {
  return function() {
    var result = funcs[0].apply(this, arguments)
    for (var i = 1; i < funcs.length; i++) {
      result = funcs[i].call(this, result)
    }
    return result
  }
}

function f1(x) {
  return x + 1
}

function f2(x) {
  return x * 2
}

var f = componse(f1, f2)
f(1) // 4
```

#### 深拷贝

```js
// 类型整合
const mapTag = '[object Map]'
const setTag = '[object Set]'
const arrayTag = '[object Array]'
const objectTag = '[object Object]'

const boolTag = '[object Boolean]'
const dateTag = '[object Date]'
const errorTag = '[object Error]'
const numberTag = '[object Number]'
const regexpTag = '[object RegExp]'
const stringTag = '[object String]'
const symbolTag = '[object Symbol]'

const deepTag = [mapTag, setTag, arrayTag, objectTag]
// 判断原始类型和引用类型
function isObject(target) {
  const type = typeof target
  return target !== null && (type === 'object' || type === 'function')
}
// 获取克隆对象的类型
function getType(target) {
  return Object.prototype.toString.call(target)
}
// 初始化要克隆的对象
function getInit(target) {
    const Ctor = target.constructor
    return new Ctor()
}
// loadsh使用的遍历迭代器
function arrayEach(array, iteratee) {
  let index = -1
  const length = array.length

  while (++index < length) {
    if (iteratee(array[index], index, array) === false) {
      break
    }
  }
  return array
}
// 克隆其他不可遍历类型
function cloneOtherType(targe, type) {
  const Ctor = targe.constructor
  switch (type) {
    case boolTag:
    case numberTag:
    case stringTag:
    case errorTag:
    case dateTag:
      return new Ctor(targe)
    case regexpTag:
      return cloneReg(targe)
    case symbolTag:
      return cloneSymbol(targe)
    default:
      return null
  }
}
// 克隆Symbol
function cloneSymbol(targe) {
  return Object(Symbol.prototype.valueOf.call(targe))
}
// 克隆正则
function cloneReg(targe) {
  const reFlags = /\w*$/
  const result = new targe.constructor(targe.source, reFlags.exec(targe))
  result.lastIndex = targe.lastIndex
  return result
}
function deepClone(value, map=new WeakMap()) {
  let cloneValue, type
  // 判断引用数据类型
  if (!isObject(value)) {
    return value
  }

  // 初始化
  const type = getType(value)
  if (deepTag.includes(type)) {
    cloneValue = getInit(value)
  } else {
    return cloneOtherType(value, type) 
  }
  // 防止循环引用
  if (map.get(value)) {
      return map.get(value)
  }
  map.set(value, cloneValue)

  // 克隆set
  if (type === setTag) {
    value.forEach(value => {
      cloneValue.add(deepClone(value,map))
    })
    return cloneValue
  }

  // 克隆map
  if (type === mapTag) {
    value.forEach((value, key) => {
      cloneValue.set(key, deepClone(value,map))
    })
    return cloneValue
  }

  // 克隆对象和数组
  const props = type === arrayTag ? undefined : Object.keys(value)
  arrayEach(props || value, (value, key) => {
      if (props) {
          key = value
      }
      cloneValue[key] = deepClone(value[key], map)
  })
  return cloneValue
}

export default deepClone
```

#### new
```js
1. 创建一个全新的对象。
2. 这个新对象会被执行 [[Prototype]] 连接。
3. 这个新对象会绑定到函数调用的 this。
4. 如果函数没有返回其他对象，那么 new 表达式中的函数调用会自动返回这个新对象。
```
```js
function _new(fn, ...arg) {
  const obj = Object.create(fn.prototype);
  const ret = fn.apply(obj, arg);
  return ret instanceof Object ? ret : obj;
}
```
#### 千分位
1、正则
```js
function fmoney(num: number){
  let [integer, decimal] = String(num).split('.');
  let regExp = /\d{1,3}(?=(\d{3})+$)/g;
  integer = integer.replace(regExp, '$&,');
  return `${integer}${decimal === undefined ? '': '.'+decimal}`;
}
```
2、reduce
```js
function fmoney(num: number){
  let arr = String(num).split('.');
  let char = arr[0].split('').reverse();   
  let IntStr = char.reduce((acc, value, index) => {
      return `${index % 3 === 0 ? String(value)+',' : String(value)}${acc}`;
  }, '').slice(0, -1);
  return `${IntStr}${arr[1]? '.'+arr[1] : '' }`;
}
```

#### 数组扁平化
递归
```js
function flat (arr, results = []) {
  arr.forEach((item, index) => {
    if (item instanceof Array) {
      flat(item, reuslts)
    } else {
      results.push(item)
    }
  })
  return results
}
```
```js
var arr = [1, [[2, 3], 4], [5, 6]];

var flat = function* (a) {
  var length = a.length;
  for (var i = 0; i < length; i++) {
    var item = a[i];
    if (typeof item !== 'number') {
      yield* flat(item);
    } else {
      yield item;
    }
  }
};

for (var f of flat(arr)) {
  console.log(f);
}
// 1, 2, 3, 4, 5, 6
```
ES6
```js
[1, [1,2]].flat(Infinity)
```

