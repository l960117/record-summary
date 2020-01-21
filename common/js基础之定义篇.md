#### Set、Map、weakSet、WeakMap
##### Set
1、成员唯一、无序且不重复

2、[value, value]，键值与键名是一致的（或者说只有键值，没有键名）

3、可以遍历，方法有：add、delete、has

##### WeakSet
1、成员都是对象

2、成员都是弱引用，可以被垃圾回收机制回收，可以用来保存DOM节点，不容易造成内存泄漏

3、不能遍历，方法有add、delete、has

##### Map
1、本质上是键值对的集合，类似集合

2、可以遍历，方法很多可以跟各种数据格式转换

##### WeakMap
1、只接受对象作为键名（null除外），不接受其他类型的值作为键名

2、键名是弱引用，键值可以是任意的，键名所指向的对象可以被垃圾回收，此时键名是无效的

3、不能遍历，方法有get、set、has、delete

#### setTimeout、Promise、Async/Await
经典例题
```js
async function async1() {
  console.log('async1 start');
  await async2();
  console.log('async1 end');
}
async function async2() {
  console.log('async2');
}
console.log('script start');
setTimeout(function() {
  console.log('setTimeout0');
}, 0)
setTimeout(function() {
  console.log('setTimeout3');
}, 3)
setImmediate(() => console.log('setImmediate));
process.nextTick(() => console.log('nextTick));
async1();
new Promise(function(resolve) {
  console.log('promise1');
  resolve();
  console.log('promise2)
}).then(function() {
  console.log('promise3');
});
console.log('script end');
```
```js
script start --> async1 start --> async2 --> promise1 --> promise2 --> script end --> nextTick --> async1 end --> promise3 --> setTimeout0 --> setImmediate --> setTimeout3
```

#### 重绘与回流
重绘：由于节点的几何属性发生改变或者由于样式发生改变而不会影响布局的，称为重绘，例如outline, visibility, color、background-color等，重绘的代价是高昂的，因为浏览器必须验证DOM树上其他节点元素的可见性。

回流：回流是布局或者几何属性需要改变就称为回流。回流是影响浏览器性能的关键因素，因为其变化涉及到部分页面（或是整个页面）的布局更新。一个元素的回流可能会导致了其所有子元素以及DOM中紧随其后的节点、祖先节点元素的随后的回流。

##### 减少重绘与回流
1、CSS

使用 transform 替代 top

使用 visibility 替换 display: none ，因为前者只会引起重绘，后者会引发回流（改变了布局）

避免使用table布局，可能很小的一个小改动会造成整个 table 的重新布局

尽可能在DOM树的最末端改变class，回流是不可避免的，但可以减少其影响。尽可能在DOM树的最末端改变class，可以限制了回流的范围，使其影响尽可能少的节点。

避免设置多层内联样式，CSS 选择符从右往左匹配查找，避免节点层级过多。

将动画效果应用到position属性为absolute或fixed的元素上，避免影响其他元素的布局，这样只是一个重绘，而不是回流，同时，控制动画速度可以选择 requestAnimationFrame

避免使用CSS表达式，可能会引发回流。

将频繁重绘或者回流的节点设置为图层，图层能够阻止该节点的渲染行为影响别的节点，例如will-change、video、iframe等标签，浏览器会自动将该节点变为图层。

CSS3 硬件加速（GPU加速），使用css3硬件加速，可以让transform、opacity、filters这些动画不会引起回流重绘 。但是对于动画的其它属性，比如background-color这些，还是会引起回流重绘的，不过它还是可以提升这些动画的性能。

2、JavaScript

避免频繁操作样式，最好一次性重写style属性，或者将样式列表定义为class并一次性更改class属性。

避免频繁操作DOM，创建一个documentFragment，在它上面应用所有DOM操作，最后再把它添加到文档中。

避免频繁读取会引发回流/重绘的属性，如果确实需要多次使用，就用一个变量缓存起来。

对具有复杂动画的元素使用绝对定位，使它脱离文档流，否则会引起父元素及后续元素频繁回流。

#### call 、 apply

1、Function.prototype.apply和Function.prototype.call 的作用是一样的，区别在于传入参数的不同；

2、第一个参数都是，指定函数体内this的指向；

3、第二个参数开始不同，apply是传入带下标的集合，数组或者类数组，apply把它传给函数作为参数，call从第二个开始传入的参数是不固定的，都会传给函数作为参数。

4、call比apply的性能要好，平常可以多用call, call传入参数的格式正是内部所需要的格式

#### function 、 () => {}

1、函数体内的 this 对象，就是定义时所在的对象，而不是使用时所在的对象。

2、不可以使用 arguments 对象，该对象在函数体内不存在。如果要用，可以用 rest 参数代替。

3、不可以使用 yield 命令，因此箭头函数不能用作 Generator 函数。

4、不可以使用 new 命令，因为：

没有自己的 this，无法调用 call，apply。

没有 prototype 属性 ，而 new 命令在执行时需要将构造函数的 prototype 赋值给新的对象的 __proto__

#### 前端加密的常见场景和方法
加密的目的，简而言之就是将明文转换为密文、甚至转换为其他的东西，用来隐藏明文内容本身，防止其他人直接获取到敏感明文信息、或者提高其他人获取到明文信息的难度。
##### 场景-密码传输
前端密码传输过程中如果不加密，在日志中就可以拿到用户的明文密码，对用户安全不太负责。
这种加密其实相对比较简单，可以使用 PlanA-前端加密、后端解密后计算密码字符串的MD5/MD6存入数据库；也可以 PlanB-直接前端使用一种稳定算法加密成唯一值、后端直接将加密结果进行MD5/MD6，全程密码明文不出现在程序中。

PlanA

使用 Base64 / Unicode+1 等方式加密成非明文，后端解开之后再存它的 MD5/MD6 。

PlanB

直接使用 MD5/MD6 之类的方式取 Hash ，让后端存 Hash 的 Hash 。

##### 场景-数据包加密
全面采用 HTTPS   从手段上来看，它不算是一种前端加密场景；但是从解决问题的角度来看，这确实是前端需要知道的事情。

##### 场景-展示成果加密
反爬技术
