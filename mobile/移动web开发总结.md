## 1.前言
到目前为止，互联网行业里，手机越来越智能化，移动端占有的比例越来越高，尤其实在电商，新闻，广告，游戏领域。用户要求越来越高，网站功能越来越好，效果越来越炫酷，这就要求我们产品质量越来越高，web前端开发而言是一个挑战，是一个难题，也是一个机遇。如何让我们所开发的手机页面能有更好的交互体验，就是这篇文章的主旨：移动web开发问题和优化小结
## 2.Meta标签
页面在手机上显示时，增加这个meta可以让页面强制让文档的宽度与设备的宽度保持1:1，并且文档最大的宽度比例是1.0，且不允许用户通过点击或者缩放等操作对屏幕放大浏览。（这个在ios10以上的版本已经失效了，即使加了下面的meta，用户双击，缩放还是可以缩放页面。）
```js
<meta content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=0;" name="viewport" />
```
禁止ios上自动识别电话
```js
<meta content="telephone=no" name="format-detection" />
```
禁止android上自动识别邮箱
```js
<meta content="email=no" name="format-detection" />
```
下面两个是针对ios上的safari上地址栏和顶端样式条的
```js
<meta name="apple-mobile-web-app-capable" content="yes" />
<!-- 听说在ios7以上版本就没效果了 -->
<meta name="apple-mobile-web-app-status-bar-style" content="black" />
<!-- 可选default、black、black-translucent 但是我都是用black-->
```
## 3.打电话发短信
```js
<a href="tel:020-11811922">打电话给:0755-10086</a>
<a href="sms:10086">发短信给: 10086</a>
```
## 4.css3过渡动画开启硬件加速
ps：网上有说这个用了，手机的耗电量也会增加。我自己也在手机上粗略试过，确实有那么一回事，平常看博客，5分钟左右少1%，用了硬件加速3分钟左右就少1%，大家注意合理使用。
```js
.translate3d{
       -webkit-transform: translate3d(0, 0, 0);
       -moz-transform: translate3d(0, 0, 0);
       -ms-transform: translate3d(0, 0, 0);
       transform: translate3d(0, 0, 0);
 }
 ```
顺便说下动画或者过渡的两个建议：
1.在手机上（其实PC也是一样）。CSS3动画或者过渡尽量使用transform和opacity来实现动画，不要使用left和top。
2.动画和过渡能用css3解决的，就不要使用js。如果是复杂的动画可以使用css3+js（或者html5+css3+js）配合开发，效果只有想不到，没有做不到。
## 5.移动端click屏幕产生200-300 ms的延迟响应
click事件因为要等待确认是否是双击事件，会有300ms的延迟（两次点击事件间隔小于300ms就认为是双击），体验并不好。
现在的解决方案，第一个就是采用touchstart或者touchend代替click。或者封装tap事件来代替click 事件，所谓的tap事件由touchstart事件+ touchmove（判断是否是滑动事件）+touchend事件封装组成。
## 6.图片优化
### 6-1.base64编码图片替换url图片
这个应该没什么好解释的，就是能不发请求的就不要发，对于一些小图标（我这做法是把8K以下的图标都转换成base64）之类的，可以将图片用base64，来减少请求的发送。尤其是在移动端，请求显得特别珍贵，在网速的不好的情况下，请求就是珍贵中的珍贵。
### 6-2.图片压缩
对于整个网站来说，图片是最占流量的资源之一，能不使用就不适用，图标可是使用base64编码，字体图标代替，SVG等来代替，使用就要选择最合适的格式，合适的尺寸，然后压缩--这里推荐腾讯推出的智图。
PS：过度压缩图片大小影响图片显示效果，可能会使得图片变得模糊，一般来说，品质在60左右就差不多了！
### 6-3.图片懒加载
首屏加载的快慢，直接影响用户的体验，建议将非首屏的图片资源放到用户需要时才加载。这样可以大大优化首屏加载，减少首屏加载所需要的时间！
ps：懒加载要使用js频繁操作dom，期间会导致大量重绘渲染，影响性能。
### 6-4.img还是background
图片的展示方式有两种，一种是以图片标签显示，一种是以背景图片显示！下面写了这两者的区别。
img：html中的标签img是网页结构的一部分会在加载结构的过程中和其他标签一起加载。
background：以css背景图存在的图片background会等到结构加载完成（网页的内容全部显示以后）才开始加载
也就是说，网页会先加载标签img的内容，再加载背景图片background引用的图片。
引入一张图片，那么在这个图片加载完成之前，img后的内容不会显示。而用background来引入同样的图片，网页结构和内容加载完成之后，才开始加载背景图片，网页内容能正常浏览，但是看不到背景图片。至于这两种，大家按照习惯，需求等权重因素选择！
## 7.快速回弹滚动
在ios上，如果存在局部滚动，就要加这个属性了！如果不加，滚动会很慢，看起来也会有一卡一卡的感觉。
```
-webkit-overflow-scrolling: touch;
```
但是，加上了这个，在ios上会产生bug。(慎用)
## 8.谨慎使用fixed
ios下fixed元素容易定位出错，软键盘弹出时，影响fixed元素定位，会发生元素错位（滚动一下又恢复），有时候会出现闪屏的效果.
所以在手机上，不建议用fixed定位，使用absolute代替！如果一定要用，写好了之后，一定要多测试几次！
## 9.消除transition闪屏
## 10.ios系统中去掉元素被触摸时产生的半透明灰色遮罩
```css
a,button,input,textarea{-webkit-tap-highlight-color: rgba(0,0,0,0;)}
```
## 11.ios中去掉默认input默认样式
```css
input,button,textarea{-webkit-appearance: none;}
```
## 12.左右滑动，避免页面跟着滑动(暂未解决)
根据touchstart和touchend的移动距离来判断是左右滑动或者上下滑动！
