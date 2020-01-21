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

```js
function curry(fn: any) {
  return function judgeCurry(...args: any) {
      return fn.length > args.length ? 
          (...args1: any) => judgeCurry(...args,...args1):
          fn(...args);
  }
}
```
#### 函数组合

```js
function compose(...args: any[]) {
  return (subArgs: any) => {
    return args.reverse().reduce((acc, func,index) => {
      return func(acc);
    }, subArgs);
  }
}
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
1、首先创建一个空的对象，空对象的__proto__属性指向构造函数的原型对象

2、把上面创建的空对象赋值构造函数内部的this，用构造函数内部的方法修改空对象

3、如果构造函数返回一个非基本类型的值，则返回这个值，否则上面创建的对象

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

