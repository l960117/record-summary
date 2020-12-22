### DOM 常用api
可以使用 document 或 window 元素的 API 来操作文档本身或获取文档的子类（Web 页面中的各种元素）。
```js
// 获取元素
const node = document.getElementById(id); // 或者 querySelector(".class|#id|name");

// 创建元素
const heading = document.createElement(name); // name: p、div、h1...
heading.innerHTML = '';

// 添加元素
document.body.appendChild(heading);

// 删除元素
document.body.removeChild(node);

```
### null 和 undefined 的区别
使用场景细分如下：

null是“不代表任何值的值”。 null是已明确定义给变量的值。

undefined是未指定特定值的变量的默认值，或者没有显式返回值的函数，如：console.log(1)，还包括对象中不存在的属性，这些 JS 引擎都会为其分配 undefined 值

### 事件流
1、捕获阶段：事件从 window 开始，然后向下到每个元素，直到到达目标元素

2、目标阶段: 事件已到达目标阶段

3、冒泡阶段: 时间从目标元素开始，然后往上到每个元素，知道window

阻止冒泡： event.stopPropagation()

并不是所有的事件都有冒泡
```js
onblur()
onfous()
onmouseenter()
onmouseleave()
```

### typeof 与instanceof的区别
typeof：对某一种变量类型进行检测，基本类型除了null都会显示对应的类型，引用类型除了函数显示为function，都会识别为object

instanceof: 检测某个构造函数的原型对象在不在某个对象的原型链上

Object.prototype.toString.call() 判断变量类型

### this
对函数而言，指向最后调用函数的那个对象，是函数运行时内部自动生成的内部对象，只能在函数内部使用，对全局而言，this指向window

### js位置api
```js
clientHeight: 表示可视区域的高度，不包含border和滚动条
offsetHeight: 表示可视区域的高度，包含了border和滚动条
scrollHeight: 表示所有区域的高度，包含了因为滚动被隐藏的部分
clientTop: 表示边框border的厚度，未指定一般是0
scrollTop: 表示滚动后被隐藏的高度，获取对象相对于由offsetParent属性指定的父坐标距离顶端的高度
```
### js拖拽
mousedown、mousemove、mouseup
HTML5的Drag、Drop
### 实现sleep
```js
const sleep = time => {
  return new Promise((resolve, reject) => {
    setTimtout(() => {
      resolve()
    }, time)
  })
}
```
### 执行上下文
