## 语义化
### 语义标签使用场景
#### 作为自然语言延伸的语义类标签
我们这里讲语义标签的使用的第一个场景，也是最自然的使用场景，就是：作为自然语言和纯文本的补充，用来表达一定的结构或者消除歧义。

还有一种情况是，HTML 的有些标签实际上就是必要的，甚至必要的程度可以达到：如果没有这个标签，文字会产生歧义的程度。
#### 作为标题摘要的语义类标签
#### 作为整体结构的语义类标签
## CSS选择器
CSS 的顶层样式表由两种规则组成的规则列表构成，一种被称为 at-rule，也就是 at 规则，另一种是 qualified rule，也就是普通规则。
### at 规则
#### @charset
@charset 用于提示 CSS 文件使用的字符编码方式，它如果被使用，必须出现在最前面。这个规则只在给出语法解析阶段前使用，并不影响页面上的展示效果。
```js
@charset "utf-8";
```
#### @import
@import 用于引入一个 CSS 文件，除了 @charset 规则不会被引入，@import 可以引入另一个文件的全部内容。
```js
@import "mystyle.css";
@import url("mystyle.css");
```
```js
@import [ <url> | <string> ]
        [ supports( [ <supports-condition> | <declaration> ] ) ]?
        <media-query-list>? ;
```
通过代码，我们可以看出，import 还支持 supports 和 media query 形式。
#### @media
media 就是大名鼎鼎的 media query 使用的规则了，它能够对设备的类型进行一些判断。在 media 的区块内，是普通规则列表。
```js
@media print { body { font-size: 10pt }}
```
#### @page
page 用于分页媒体访问网页时的表现设置，页面是一种特殊的盒模型结构，除了页面本身，还可以设置它周围的盒
```js

@page {
  size: 8.5in 11in;
  margin: 10%;

  @top-left {
    content: "Hamlet";
  }
  @top-right {
    content: "Page " counter(page);
  }
}
```
#### @counter-style
counter-style 产生一种数据，用于定义列表项的表现。
```js
@counter-style triangle {
  system: cyclic;
  symbols: ‣;
  suffix: " ";
}
```
#### @key-frames
keyframes 产生一种数据，用于定义动画关键帧
```js
@keyframes diagonal-slide {
  from {
    left: 0;
    top: 0;
  }
  to {
    left: 100px;
    top: 100px;
  }

}
```
#### @fontface
fontface 用于定义一种字体，icon font 技术就是利用这个特性来实现的。
```js
@font-face {
  font-family: Gentium;
  src: url(http://example.com/fonts/Gentium.woff);
}
p { font-family: Gentium, serif; }
```
#### @supportsupport 
检查环境的特性，它与 media 比较类似。
#### @namespace
用于跟 XML 命名空间配合的一个规则，表示内部的 CSS 选择器全都带上特定命名空间。
#### @viewport
用于设置视口的一些特性，不过兼容性目前不是很好，多数时候被 HTML 的 meta 代替。
#### 其它
除了以上这些，还有些目前不太推荐使用的 at 规则。
##### @color-profile 
是 SVG1.0 引入的 CSS 特性，但是实现状况不怎么好。
##### @document 
还没讨论清楚，被推迟到了 CSS4 中。
##### @font-feature-values 。

### 普通规则
qualified rule 主要是由选择器和声明区块构成。声明区块又由属性和值构成。
#### 选择器
#### 声明列表
##### 属性值
值的类型

函数
## HTML 元信息类标签
所谓元信息，是指描述自身的信息，元信息类标签，就是 HTML 用于描述文档自身的一类标签，它们通常出现在 head 标签中，一般都不会在页面被显示出来（与此相对，其它标签，如语义类标签，描述的是业务）。元信息多数情况下是给浏览器、搜索引擎等机器阅读的，有时候这些信息会在页面之外显示给用户，有时候则不会。
### head 标签
首先我们先来了解一下 head 标签，head 标签本身并不携带任何信息，它主要是作为盛放其它语义类标签的容器使用。head 标签规定了自身必须是 html 标签中的第一个标签，它的内容必须包含一个 title，并且最多只能包含一个 base。如果文档作为 iframe，或者有其他方式指定了文档标题时，可以允许不包含 title 标签。
### title 标签
title 标签表示文档的标题，从字面上就非常容易理解
### base 标签
base 标签实际上是个历史遗留标签。它的作用是给页面上所有的 URL 相对地址提供一个基础。

base 标签最多只有一个，它改变全局的链接地址，它是一个非常危险的标签，容易造成跟 JavaScript 的配合问题，所以在实际开发中，我比较建议你使用 JavaScript 来代替 base 标签。
### meta 标签
meta 标签是一组键值对，它是一种通用的元信息表示标签。

在 head 中可以出现任意多个 meta 标签。一般的 meta 标签由 name 和 content 两个属性来定义。name 表示元信息的名，content 则用于表示元信息的值。
#### 具有 charset 属性的 meta
从 HTML5 开始，为了简化写法，meta 标签新增了 charset 属性。添加了 charset 属性的 meta 标签无需再有 name 和 content。
```js
  <meta charset="UTF-8" >
```
charset 型 meta 标签非常关键，它描述了 HTML 文档自身的编码形式。因此，我建议这个标签放在 head 的第一个。
```js
<html>
<head>
<meta charset="UTF-8">
……
```
这样，浏览器读到这个标签之前，处理的所有字符都是 ASCII 字符，众所周知，ASCII 字符是 UTF-8 和绝大多数字符编码的子集，所以，在读到 meta 之前，浏览器把文档理解多数编码格式都不会出错，这样可以最大限度地保证不出现乱码。

一般情况下，HTTP 服务端会通过 http 头来指定正确的编码方式，但是有些特殊的情况如使用 file 协议打开一个 HTML 文件，则没有 http 头，这种时候，charset meta 就非常重要了。
#### 具有 http-equiv 属性的 meta
具有 http-equiv 属性的 meta 标签，表示执行一个命令，这样的 meta 标签可以不需要 name 属性了。

例如，下面一段代码，相当于添加了 content-type 这个 http 头，并且指定了 http 编码方式。 
```js
<meta http-equiv="content-type" content="text/html; charset=UTF-8">
```
除了 content-type，还有以下几种命令：
content-language 指定内容的语言；
default-style 指定默认样式表；
refresh 刷新；
set-cookie 模拟 http 头 set-cookie，设置 cookie；
x-ua-compatible 模拟 http 头 x-ua-compatible，声明 ua 兼容性；
content-security-policy 模拟 http 头 content-security-policy，声明内容安全策略。
#### name 为 viewport 的 meta
实际上，meta 标签可以被自由定义，只要写入和读取的双方约定好 name 和 content 的格式就可以了。我们来介绍一个 meta 类型，它没有在 HTML 标准中定义，却是移动端开发的事实标准：它就是 name 为 viewport 的 meta。这类 meta 的 name 属性为 viewport，它的 content 是一个复杂结构，是用逗号分隔的键值对，键值对的格式是 key=value。
```js
<meta name="viewport" content="width=500, initial-scale=1">
```
这里只指定了两个属性，宽度和缩放，实际上 viewport 能控制的更多，它能表示的全部属性如下：
width：页面宽度，可以取值具体的数字，也可以是 device-width，表示跟设备宽度相等。
height：页面高度，可以取值具体的数字，也可以是 device-height，表示跟设备高度相等。
initial-scale：初始缩放比例。
minimum-scale：最小缩放比例。
maximum-scale：最大缩放比例。
user-scalable：是否允许用户缩放。

对于已经做好了移动端适配的网页，应该把用户缩放功能禁止掉，宽度设为设备宽度，一个标准的 meta 如下：
```js
<meta name="viewport" content="width=device-width,initial-scale=1,minimum-scale=1,maximum-scale=1,user-scalable=no">
```
#### 其它预定义的 meta
在 HTML 标准中，还定义了一批 meta 标签的 name，可以视为一种有约定的 meta，我在这里列出来，你可以简单了解一下。
application-name：如果页面是 Web application，用这个标签表示应用名称。
author: 页面作者。
description：页面描述，这个属性可能被用于搜索引擎或者其它场合。
generator: 生成页面所使用的工具，主要用于可视化编辑器，如果是手写 HTML 的网页，不需要加这个 meta。keywords: 页面关键字，对于 SEO 场景非常关键。
referrer: 跳转策略，是一种安全考量。
theme-color: 页面风格颜色，实际并不会影响页面，但是浏览器可能据此调整页面之外的 UI（如窗口边框或者 tab 的颜色）。

## CSS选择器
选择器的基本意义是：根据一些特征，选中元素树上的一批元素
### 简单选择器：针对某一特征判断是否选中元素。
#### 类型选择器和全体选择器
```css
   div {

   }
```
这里有一个特殊的选择器，就是“ * ” ，它称为全体选择器，可以选中任意元素。它的用法跟类型选择器是完全一致的，这里就把它们放到一起介绍了。
#### id 选择器与 class 选择器
#### 属性选择器
属性选择器根据 HTML 元素的属性来选中元素。属性选择器有四种形态。

第一种，[att]直接在方括号中放入属性名，是检查元素是否具有这个属性，只要元素有这个属性，不论属性是什么值，都可以被选中。

第二种，[att=val]精确匹配，检查一个元素属性的值是否是 val。

第三种，[att~=val]多种匹配，检查一个元素的值是否是若干值之一，这里的 val 不是一个单一的值了，可以是用空格分隔的一个序列。

第四种，[att|=val]开头匹配，检查一个元素的值是否是以 val 开头，它跟精确匹配的区别是属性只要以 val 开头即可，后面内容不管。

有些 HTML 属性含有特殊字符，这个时候，可以把 val 用引号括起来，形成一个 CSS 字符串。CSS 字符串允许使用单双引号来规避特殊字符，也可以用反斜杠转义，这样，就可以表示出任意属性值啦。
#### 伪类选择器
伪类选择器是一系列由 CSS 规定好的选择器，它们以冒号开头。伪类选择器有普通型和函数型两种
##### 树结构关系伪类选择器
:root 伪类表示树的根元素，在选择器是针对完整的 HTML 文档情况，我们一般用 HTML 标签即可选中根元素。但是随着 scoped css 和 shadow root 等场景出现，选择器可以针对某一子树来选择，这时候就很需要 root 伪类了。

:empty 伪类表示没有子节点的元素，这里有个例外就是子节点为空白文本节点的情况。

:nth-child 和 :nth-last-child 这是两个函数型的伪类，CSS 的 An+B 语法设计的是比较复杂的，我们这里仅仅介绍基本用法。

:nth-last-child 的区别仅仅是从后往前数。

:first-child :last-child 分别表示第一个和最后一个元素。

:only-child 按字面意思理解即可，选中唯一一个子元素。

of-type 系列，是一个变形的语法糖，S:nth-of-type(An+B) 是:nth-child(|An+B| of S) 的另一种写法。

以此类推，还有 nth-last-of-type、first-of-type、last-of-type、only-of-type。
##### 链接与行为伪类选择器
:any-link 表示任意的链接，包括 a、area 和 link 标签都可能匹配到这个伪类。

:link 表示未访问过的链接， :visited 表示已经访问过的链接。

:hover 表示鼠标悬停在上的元素。

:active 表示用户正在激活这个元素，如用户按下按钮，鼠标还未抬起时，这个按钮就处于激活状态。

:focus 表示焦点落在这个元素之上。

:target 用于选中浏览器 URL 的 hash 部分所指示的元素。

##### 逻辑伪类选择器
:not 伪类。这个伪类是个函数型伪类，它的作用时选中内部的简单选择器命中的元素。
```js
*|*:not(:hover)
```
选择器 3 级标准中，not 只支持简单选择器，在选择器 4 级标准，则允许 not 接受一个选择器列表，这意味着选择器支持嵌套，仅靠 not 即可完成选择器的一阶真值逻辑完备，但目前还没有看到浏览器实现它。
##### 其它伪类选择器
国际化：用于处理国际化和多语言问题。
dir
lang

音频 / 视频：用于区分音视频播放状态。
play
pause

时序：用于配合读屏软件等时序性客户端的伪类。
current
past
future

表格：用于处理 table 的列的伪类。
nth-col
nth-last-col
### 复合选择器：连续写在一起的简单选择器，针对元素自身特征选择单个元素。
### 复杂选择器：由“（空格）”“ >”“ ~”“ +”“ ||”等符号连接的复合选择器，根据父元素或者前序元素检查单个元素。
### 选择器列表：由逗号分隔的复杂选择器，表示“或”的关系。
选择器列表是用逗号分隔的复杂选择器序列；复杂选择器则是用空格、大于号、波浪线等符号连接的复合选择器；复合选择器则是连写的简单选择器组合。

“空格”：后代，表示选中所有符合条件的后代节点， 例如“ .a .b ”表示选中所有具有 class 为 a 的后代节点中 class 为 b 的节点。

“>” ：子代，表示选中符合条件的子节点，例如“ .a>.b ”表示：选中所有“具有 class 为 a 的子节点中，class 为 b 的节点”。

“~” : 后继，表示选中所有符合条件的后继节点，后继节点即跟当前节点具有同一个父元素，并出现在它之后的节点，例如“ .a~.b ”表示选中所有具有 class 为 a 的后继中，class 为 b 的节点。

“+”：直接后继，表示选中符合条件的直接后继节点，直接后继节点即 nextSlibling。例如 “.a+.b ”表示选中所有具有 class 为 a 的下一个 class 为 b 的节点。

“||”：列选择器，表示选中对应列中符合条件的单元格。

空格和子代选择器通常用于组件化场景，当组件是独立开发时，很难完全避免 class 重名的情况，如果为组件的最外层容器元素设置一个特别的 class 名，生成 CSS 规则时，则全部使用后代或者子代选择器，这样可以有效避免 CSS 规则的命名污染问题。

到这里，我们就讲完了如何用简单选择器组合成复合选择器和复杂选择器，形成选择器列表，这能够帮助我们应对各种复杂的需求。

CSS 选择器是基于规则生效的，同一个元素命中多条规则是非常常见的事情。不同规则指定同一个属性为不同值时，就需要一个机制来解决冲突。这个机制，就是接下来我们要讲的选择器优先级。

### 选择器的优先级
CSS 标准用一个三元组 (a, b, c) 来构成一个复杂选择器的优先级。

id 选择器的数目记为 a；

伪类选择器和 class 选择器的数目记为 b；

伪元素选择器和标签选择器数目记为 c；

“*” 不影响优先级。

行内属性的优先级永远高于 CSS 规则，浏览器提供了一个“口子”，就是在选择器前加上“!import”。

同一优先级的选择器遵循“后面的覆盖前面的”原则

选择器的优先级是针对复杂选择器的优先级，选择器列表不会合并计算优先级。

### 伪元素
伪元素本身不单单是一种选择规则，它还是一种机制。

伪元素的语法跟伪类相似，但是实际产生的效果却是把不存在的元素硬选出来。

目前兼容性达到可用的伪元素有以下几种。
#### ::first-line & ::first-letter
::first-line 和 ::first-letter 是比较类似的伪元素，其中一个表示元素的第一行，一个表示元素的第一个字母。
#### ::before & ::after
::before 表示在元素内容之前插入一个虚拟的元素，::after 则表示在元素内容之后插入。

::before 和 ::after 中支持所有的 CSS 属性。实际开发中，这两个伪元素非常有用，有了这两个伪元素，一些修饰性元素，可以使用纯粹的 CSS 代码添加进去，这能够很好地保持 HTML 代码中的语义，既完成了显示效果，又不会让 DOM 中出现很多无语义的空元素。

## 链接
### a 标签
a 标签是“anchor”的缩写，它是锚点的意思，所谓锚点，实际上也是一种比喻的用法，古代船舶用锚来固定自己的位置，避免停泊时被海浪冲走，所以 anchor 标签的意思也是标识文档中的特定位置

a 标签其实同时充当了链接和目标点的角色，当 a 标签有 href 属性时，它是链接，当它有 name 时，它是链接的目标。

具有 href 的 a 标签跟一些 link 一样，会产生超链接，也就是在用户不操作的情况下，它们不会被主动下载的被动型链接。

重点的内容是，a 标签也可以有 rel 属性，我们来简单了解一下，首先是跟 link 相同的一些 rel，包括下面的几种。
```js
alternate
author
help
license
next
prev
search
```
这些跟 link 语义完全一致，不同的是，a 标签产生的链接是会实际显示在网页中的，而 link 标签仅仅是元信息。

除了这些之外，a 标签独有的 rel 类型：
```js
tag 表示本网页所属的标签；
bookmark 到上级章节的链接。
```
a 标签还有一些辅助的 rel 类型，用于提示浏览器或者搜索引擎做一些处理：
```js
nofollow 此链接不会被搜索引擎索引；
noopener 此链接打开的网页无法使用 
opener 来获得当前页面的窗口；
noreferrer 此链接打开的网页无法使用 
referrer 来获得当前页面的 url；
opener 打开的网页可以使用 
window.opener 来访问当前页面的 window 对象，这是 a 标签的默认行为。
```
a 标签基本解决了在页面中插入文字型和整张图片超链接的需要，但是如果我们想要在图片的某个区域产生超链接，那么就要用到另一种标签了——area 标签。
### area 标签
area 标签与 a 标签非常相似，不同的是，它不是文本型的链接，而是区域型的链接。

area 标签支持的 rel 与 a 完全一样，这里就不多说了。

area 是整个 html 规则中唯一支持非矩形热区的标签，它的 shape 属性支持三种类型。
```js
圆形：circle 或者 circ，coords 支持三个值，分别表示中心点的 x,y 坐标和圆形半径 r。
矩形：rect 或者 rectangle，coords 支持两个值，分别表示两个对角顶点 x1，y1 和 x2，y2。
多边形：poly 或者 polygon，coords 至少包括 6 个值，表示多边形的各个顶点。
```
因为 area 设计的时间较早，所以不支持含有各种曲线的路径，但是它也是唯一一个支持了非矩形触发区域的元素，所以，对于一些效果而言，area 是必不可少的。area 必须跟 img 和 map 标签配合使用
```js

<p>
 Please select a shape:
 <img src="shapes.png" usemap="#shapes"
      alt="Four shapes are available: a red hollow box, a green circle, a blue triangle, and a yellow four-pointed star.">
 <map name="shapes">
  <area shape=rect coords="50,50,100,100"> <!-- the hole in the red box -->
  <area shape=rect coords="25,25,125,125" href="red.html" alt="Red box.">
  <area shape=circle coords="200,75,50" href="green.html" alt="Green circle.">
  <area shape=poly coords="325,25,262,125,388,125" href="blue.html" alt="Blue triangle.">
  <area shape=poly coords="450,25,435,60,400,75,435,90,450,125,465,90,500,75,465,60"
        href="yellow.html" alt="Yellow star.">
 </map>
</p>
```
这个例子展示了在一张图片上画热区并且产生链接，分别使用了矩形、圆形和多边形三种 area。
### link 标签
link 标签也是元信息的一种，在很多时候，它也是不会对浏览器产生任何效果的

ink 标签会生成一个链接，它可能生成超链接，也可能生成外部资源链接。

一些 link 标签会生成超链接，这些超链接又不会像 a 标签那样显示在网页中。这就是超链接型的 link 标签。

这意味着多数浏览器中，这些 link 标签不产生任何作用。但是，这些 link 标签能够被搜索引擎和一些浏览器插件识别，从而产生关键性作用。
#### 超链接类 link 标签
超链接型 link 标签是一种被动型链接，在用户不操作的情况下，它们不会被主动下载。

link 标签具有特定的 rel 属性，会成为特定类型的 link 标签。产生超链接的 link 标签包括：具有 rel=“canonical” 的 link、具有 rel="alternate"的 link、具有 rel=“prev” rel="next"的 link 等等。
##### canonical 型 link
```js
<link rel="canonical" href="...">
```
这个标签提示页面它的主 URL，在网站中常常有多个 URL 指向同一页面的情况，搜索引擎访问这类页面时会去掉重复的页面，这个 link 会提示搜索引擎保留哪一个 URL。
##### alternate 型 link
```js
<link rel="alternate" href="...">
```
这个标签提示页面它的变形形式，这个所谓的变形可能是当前页面内容的不同格式、不同语言或者为不同的设备设计的版本，这种 link 通常也是提供给搜索引擎来使用的。alternate 型的 link 的一个典型应用场景是，页面提供 rss 订阅时，可以用这样的 link 来引入：
```js
<link rel="alternate" type="application/rss+xml" title="RSS" href="...">
```
除了搜索引擎外，很多浏览器插件都能识别这样的 link。
##### prev 型 link 和 next 型 link
在互联网应用中，很多网页都属于一个序列，比如分页浏览的场景，或者图片展示的场景，每个网页是序列中的一个项。

这种时候，就适合使用 prev 和 next 型的 link 标签，来告诉搜索引擎或者浏览器它的前一项和后一项，这有助于页面的批量展示。

因为 next 型 link 告诉浏览器“这是很可能访问的下一个页面”，HTML 标准还建议对 next 型 link 做预处理，在本课后面的内容，我们会讲到预处理类的 link。

##### 其它超链接类的 link
其它超链接类 link 标签都表示一个跟当前文档相关联的信息，可以把这样的 link 标签视为一种带链接功能的 meta 标签。

rel=“author” 链接到本页面的作者，一般是 mailto: 协议

rel=“help” 链接到本页面的帮助页

rel=“license” 链接到本页面的版权信息页

rel=“search” 链接到本页面的搜索页面（一般是站内提供搜索时使用）
#### 外部资源类 link 标签
外部资源型 link 标签会被主动下载，并且根据 rel 类型做不同的处理。外部资源型的标签包括：具有 icon 型的 link、预处理类 link、modulepreload 型的 link、stylesheet、pingback。
##### icon 型 link
这类链接表示页面的 icon。多数浏览器会读取 icon 型 link，并且把页面的 icon 展示出来。

icon 型 link 是唯一一个外部资源类的元信息 link，其它元信息类 link 都是超链接，这意味着，icon 型 link 中的图标地址默认会被浏览器下载和使用。

如果没有指定这样的 link，多数浏览器会使用域名根目录下的 favicon.ico，即使它并不存在，所以从性能的角度考虑，建议一定要保证页面中有 icon 型的 link。

只有 icon 型 link 有有效的 sizes 属性，HTML 标准允许一个页面出现多个 icon 型 link，并且用 sizes 指定它适合的 icon 尺寸。
##### 预处理类 link
我们都知道，导航到一个网站需要经过 dns 查询域名、建立连接、传输数据、加载进内存和渲染等一系列的步骤。

预处理类 link 标签就是允许我们控制浏览器，提前针对一些资源去做这些操作，以提高性能（当然如果你乱用的话，性能反而更差）。

下面我来列一下这些 link 类型：
```js
dns-prefetch 型 link 提前对一个域名做 dns 查询，这样的 link 里面的 href 实际上只有域名有意义。
preconnect 型 link 提前对一个服务器建立 tcp 连接。
prefetch 型 link 提前取 href 指定的 url 的内容。
preload 型 link 提前加载 href 指定的 url。
prerender 型 link 提前渲染 href 指定的 url。
```
##### modulepreload 型的 link
modulepreload 型 link 的作用是预先加载一个 JavaScript 的模块。这可以保证 JS 模块不必等到执行时才加载。

这里的所谓加载，是指完成下载并放入内存，并不会执行对应的 JavaScript。
```js
<link rel="modulepreload" href="app.js">
<link rel="modulepreload" href="helpers.js">
<link rel="modulepreload" href="irc.js">
<link rel="modulepreload" href="fog-machine.js">
<script type="module" src="app.js">
```
这个例子来自 HTML 标准，我们假设 app.js 中有 import “irc” 和 import “fog-machine”, 而 irc.js 中有 import “helpers”。这段代码使用 moduleload 型 link 来预加载了四个 js 模块。

尽管，单独使用 script 标签引用 app.js 也可以正常工作，但是我们通过加入对四个 JS 文件的 link 标签，使得四个 JS 文件有机会被并行地下载，这样提高了性能

##### stylesheet 型 link
样式表大概是所有人最熟悉的 link 标签用法了。它的样子是下面这样的。
```js
<link rel="stylesheet" href="xxx.css" type="text/css">
```
基本用法是从一个 CSS 文件创建一个样式表。这里 type 属性可以没有，如果有，必须是"text/css"才会生效。

rel 前可以加上 alternate，成为 rel=“alternate stylesheet”，此时必须再指定 title 属性。

这样可以为页面创建一份变体样式，一些浏览器，如 Firefox 3.0，支持从浏览器菜单中切换这些样式，当然了，大部分浏览器不支持这个功能，所以仅仅从语义的角度了解一下这种用法即可。
##### pingback 型 link
这样的 link 表示本网页被引用时，应该使用的 pingback 地址，这个机制是一份独立的标准，遵守 pingback 协议的网站在引用本页面时，会向这个 pingback url 发送一个消息。

## 布局
### 正常流的行为
我们可以用一句话来描述正常流的排版行为，那就是：依次排列，排不下了换行。
### 正常流的原理
在 CSS 标准中，规定了如何排布每一个文字或者盒的算法，这个算法依赖一个排版的“当前状态”，CSS 把这个当前状态称为“格式化上下文（formatting context）”。

我们需要排版的盒，是分为块级盒和行内级盒的，所以排版需要分别为它们规定了块级格式化上下文和行内级格式化上下文。

```js
当遇到块级盒：排入块级格式化上下文。
当遇到行内级盒或者文字：首先尝试排入行内级格式化上下文，如果排不下，那么创建一个行盒，先将行盒排版（行盒是块级，所以到第一种情况），行盒会创建一个行内级格式化上下文。
遇到 float 盒：把盒的顶部跟当前行内级上下文上边缘对齐，然后根据 float 的方向把盒的对应边缘对到块级格式化上下文的边缘，之后重排当前行盒。
```
我们以上讲的都是一个块级格式化上下文中的排版规则，实际上，页面中的布局没有那么简单，一些元素会在其内部创建新的块级格式化上下文，这些元素有：
```js
浮动元素；
绝对定位元素；
非块级但仍能包含块级元素的容器（如 inline-blocks, table-cells, table-captions）；
块级的能包含块级元素的容器，且属性 overflow 不为 visible。
```
这里的最后一条比较绕，实际上，我个人喜欢用另一种思路去理解它：

自身为块级，且 overflow 为 visible 的块级元素容器，它的块级格式化上下文和外部的块级格式化上下文发生了融合，也就是说，如果不考虑盒模型相关的属性，这样的元素从排版的角度就好像根本不存在。
### 正常流的使用技巧

## 替换型元素
### script
script 标签是为数不多的既可以作为替换型标签，又可以不作为替换型标签的元素。

凡是替换型元素，都是使用 src 属性来引用文件的，链接型元素是使用 href 标签的。
### img
img 标签的作用是引入一张图片。这个标签是没有办法像 script 标签那样作为非替换型标签来使用的，它必须有 src 属性才有意义。

alt 属性，这个属性很难被普通用户感知，对于视障用户非常重要，可以毫不夸张地讲，给 img 加上 alt 属性，已经做完了可访问性的一半。

img 标签还有一组重要的属性，那就是 srcset 和 sizes，它们是 src 属性的升级版（所以我们前面讲 img 标签必须有 src 属性，这是不严谨的说法）。这两个属性的作用是在不同的屏幕大小和特性下，使用不同的图片源
```js
<img srcset="elva-fairy-320w.jpg 320w,
             elva-fairy-480w.jpg 480w,
             elva-fairy-800w.jpg 800w"
     sizes="(max-width: 320px) 280px,
            (max-width: 480px) 440px,
            800px"
     src="elva-fairy-800w.jpg" alt="Elva dressed as a fairy">
```
srcset 提供了根据屏幕条件选取图片的能力，但是其实更好的做法，是使用 picture 元素。
### picture元素
picture 元素可以根据屏幕的条件为其中的 img 元素提供不同的源
```js
<picture>
  <source srcset="image-wide.png" media="(min-width: 600px)">
  <img src="image-narrow.png">
</picture>
```
picture 元素的设计跟 audio 和 video 保持了一致（稍后我会为你讲解这两个元素），它跟 img 搭配 srcset 和 sizes 不同，它使用 source 元素来指定图片源，并且支持多个。这里的 media 属性是 media query，跟 CSS 的 @media 规则一致。

### video
在 HTML5 早期的设计中，video 标签跟 img 标签类似，也是使用 src 属性来引入源文件的，不过，我想应该是考虑到了各家浏览器支持的视频格式不同，现在的 video 标签跟 picture 元素一样，也是提倡使用 source 的。

现在的 video 标签可以使用 source 标签来指定接入多个视频源。
```js
<video controls="controls" >
  <source src="movie.webm" type="video/webm" >
  <source src="movie.ogg" type="video/ogg" >
  <source src="movie.mp4" type="video/mp4">
  You browser does not support video.
</video>
```
source 标签除了支持 media 之外，还可以使用 type 来区分源文件的使用场景。

video 标签的内容默认会被当做不支持 video 的浏览器显示的内容吗，因此，如果要支持更古老的浏览器，还可以在其中加入 object 或者 embed 标签，这里就不详细展开了。

video 中还支持一种标签：track。track 是一种播放时序相关的标签，它最常见的用途就是字幕。track 标签中，必须使用 srclang 来指定语言，此外，track 具有 kind 属性，共有五种。
```js
subtitles：就是字幕了，不一定是翻译，也可能是补充性说明。
captions：报幕内容，可能包含演职员表等元信息，适合听障人士或者没有打开声音的人了解音频内容。
descriptions：视频描述信息，适合视障人士或者没有视频播放功能的终端打开视频时了解视频内容。
chapters：用于浏览器视频内容。
metadata：给代码提供的元信息，对普通用户不可见。
```
一个完整的 video 标签可能会包含多种 track 和多个 source，这些共同构成了一个视频播放所需的全部信息。
### audio
接下来我们来讲讲 audio，跟 picture 和 video 两种标签一样，audio 也可以使用 source 元素来指定源文件。我们看一下例子：
```js
<audio controls>
  <source src="song.mp3" type="audio/mpeg">
  <source src="song.ogg" type="audio/ogg">
  <p>You browser does not support audio.</p>
</audio>
```
但比起 video，audio 元素的历史问题并不严重，所以使用 src 也是没有问题的
### iframe
iframe，这个标签能够嵌入一个完整的网页。

在移动端，iframe 受到了相当多的限制，它无法指定大小，里面的内容会被完全平铺到父级页面上。

## flex布局
### Flex 的设计
Flex 的设计是一种不同于流布局的，自外而内的设计思路。
### Flex 的原理
#### 第一步是把 flex 项分行，有 flex 属性的 flex 项可以暂且认为主轴尺寸为 0，所以，它可以一定放进当前行。

接下来我们把 flex 项逐个放入行，不允许换行的话，我们就“无脑地”把 flex 项放进同一行。允许换行的话，我们就先设定主轴剩余空间为 Flex 容器主轴尺寸，每放入一个就把主轴剩余空间减掉它的主轴尺寸，直到某个 flex 项放不进去为止，换下一行，重复前面动作。

分行过程中，我们会顺便对每一行计算两个属性：交叉轴尺寸和主轴剩余空间，交叉轴尺寸是本行所有交叉轴尺寸的最大值，而主轴剩余空间前面已经说过。

#### 第二步我们来计算每个 flex 项主轴尺寸和位置。
如果 Flex 容器是不允许换行的，并且最后主轴尺寸超出了 Flex 容器，就要做等比缩放。

如果 Flex 容器有多行，那么根据我们前面的分行算法，必然有主轴剩余空间，这时候，我们要找出本行所有的带 Flex 属性的 flex 项，把剩余空间按 Flex 比例分给它们即可。

做好之后，我们就可以根据主轴排布方向，确定每个 flex 项的主轴位置坐标了。

如果本行完全没有带 flex 属性的 flex 项，justify-content 机制就要生效了，它的几个不同的值会影响剩余空白如何分配，作为实现者，我们只要在计算 flex 项坐标的时候，加上一个数值即可。

例如，如果是 flex-start 就要加到第一个 flex 项身上，如果是 center 就给第一个 flex 项加一半的尺寸，如果是 space-between，就要给除了第一个以外的每个 flex 项加上“flex 项数减一分之一”。

#### 第三步我们来计算 flex 项的交叉轴尺寸和位置。
交叉轴的计算首先是根据 align-content 计算每一行的位置，这部分跟 justify-content 非常类似。

再根据 alignItems 和 flex 项的 alignSelf 来确定每个元素在行内的位置。

计算完主轴和交叉轴，每个 flex 项的坐标、尺寸就都确定了，这样我们就完成了整个的 Flex 布局。

## CSS动画
### animation 属性
```js
@keyframes mykf
{
  from {background: red;}
  to {background: yellow;}
}

div
{
    animation:mykf 5s infinite;
}
```
这里展示了 animation 的基本用法，实际上 animation 分成六个部分：
```js
animation-name 动画的名称，这是一个 keyframes 类型的值（我们在第 9 讲“CSS 语法：除了属性和选择器，你还需要知道这些带 @的规则”讲到过，keyframes 产生一种数据，用于定义动画关键帧）；
animation-duration 动画的时长；
animation-timing-function 动画的时间曲线；
animation-delay 动画开始前的延迟；
animation-iteration-count 动画的播放次数；
animation-direction 动画的方向。
```
#### animation-name
animation-name，这个是一个 keyframes 类型，需要配合 @规则来使用

#### animation-timing-function
三次贝塞尔曲线

贝塞尔曲线是一种插值曲线，它描述了两个点之间差值来形成连续的曲线形状的规则。

一个量（可以是任何矢量或者标量）从一个值到变化到另一个值，如果我们希望它按照一定时间平滑地过渡，就必须要对它进行插值。

### transition 属性
transition 与 animation 相比来说，是简单得多的一个属性。它有四个部分：
```js
transition-property 要变换的属性；
transition-duration 变换的时长；
transition-timing-function 时间曲线；
transition-delay 延迟。
```
```js
@keyframes mykf { 
  from { top: 0; transition:top ease} 
  50% { top: 30px;transition:top ease-in } 
  75% { top: 10px;transition:top ease-out } 
  to { top: 0; transition:top linear}
}
```
## HTML语言
JavaScript 语言我们把它称为“编程语言”，它最大的特点是图灵完备的，我们大致可以理解为“包含了表达一切逻辑的能力”。像 HTML 这样的语言，我们称为“标记语言（mark up language）”，它是纯文本的一种升级，“标记”一词的概念来自：编辑审稿时使用不同颜色笔所做的“标记”。
### 基本语法
#### 标签语法
#### 文本语法
#### 注释语法
#### DTD 语法（文档类型定义）
现在我们来讲一下 DTD，DTD 的全称是 Document Type Defination，也就是文档类型定义。SGML 用 DTD 来定义每一种文档类型，HTML 属于 SGML，在 HTML5 出现之前，HTML 都是使用符合 SGML 规定的 DTD。
```js
<!DOCTYPE html>
```
#### ProcessingInstruction 语法（处理信息）

## CSS渲染
### 颜色的原理
#### RGB 颜色
我们在计算机中，最常见的颜色表示法是 RGB 颜色，它符合光谱三原色理论：红、绿、蓝三种颜色的光可以构成所有的颜色。
#### CMYK 颜色
#### HSL 颜色
它用一个值来表示人类认知中的颜色，我们用专业的术语叫做色相（H）。加上颜色的纯度（S）和明度（L），就构成了一种颜色的表示。
#### 其它颜色
RGBA
### 渐变
#### 线性渐变
```js
linear-gradient(direction, color-stop1, color-stop2, ...);
```
这里的 direction 可以是方向，也可以是具体的角度。例如：
```js
to bottom
to top
to left
to right
to bottom left
to bottom right
to top left
to top right
120deg
3.14rad
```
以上这些都是合理的方向取值。

color-stop 是一个颜色和一个区段，例如：
```js
rgba(255,0,0,0)
orange
yellow 10%
green 20%
lime 28px
```
#### 放射性渐变
放射性渐变需要一个中心点和若干个颜色
```js
radial-gradient(shape size at position, start-color, ..., last-color);
```
### 形状
CSS 中的很多属性还会产生形状，比如我们常见的属性：
```js
border
box-shadow
border-radius
```
## ARIA
ARIA 全称为 Accessible Rich Internet Applications，它表现为一组属性，是用于可访问性的一份标准

我们今天讲的 ARIA，是以交互形式来标注各种元素的一类属性，所以，在 ARIA 属性中，你可以看到很多熟悉的面孔，交互形式往往跟我们直觉中的“控件”非常相似。

ARIA 的角色对于我们 UI 系统的设计有重要的参考意义。

ARIA 给 HTML 元素添加的一个核心属性就是 role，我们来看一个例子：
```js
<span role="checkbox" aria-checked="false" tabindex="0" aria-labelledby="chk1-label">
</span> <label id="chk1-label">Remember my preferences</label>
```
我们可以通过 HTML 属性变化来理解这个 JavaScript 组件的状态，读屏软件等三方客户端，就可以理解我们的 UI 变化，这正是 ARIA 标准的意义。

role 的定义是一个树形的继承关系，我们先来理解一下它的整体结构：其中，widget 表示一些可交互的组件，structure 表示文档中的结构，window 则代表窗体

### Widget 角色
ARIA role 允许多继承，这里有些角色我没有重复写。

注意，这些 role 可以出现在任何一个 HTML 元素之上，同时要注意，这些 ARIA 属性，不会真实地改变任何一个元素的行为，比如，我们刚才讲的 checkbox，即使我们给一个 span 添加了 Checkbox 角色，我们也需要用 JavaScript 编写相应的逻辑。

这些 widget 同时还会带来对应的 ARIA 属性，比如，我们的 Checkbox 角色，会带来两个属性：
```js
aria-checked 表示复选框是否已经被选中；
aria-labelledby 表示复选框对应的文字。
```
而 Button 角色，则会带来另外两个属性：
```js
aria-pressed 按钮是否已经被按下；
aria-expanded 按钮控制的目标是否已经被展开。
```
除了它们本身的属性之外，可交互组件还有继承来的属性，比如，switch 角色继承了 checkbox，因此，它也可以使用 aria-checked 属性。

除了简单的 widget，还有一些比较复杂的角色，需要多个角色一起配合。我们来逐个了解一下。
```js
Combobox 是一个带选项的输入框，我们常见的搜索引擎，一般都会提供这样的输入框，当输入时，它会提供若干提示选项。
Grid 是一个表格，它会分成行、列，行列又有行头和列头表示行、列的意义。
Tablist 是一个可切换的结构，一般被称为选项卡，它包含了 tab 头和 tabpanel，在 tab 容器中，可能包含各种组件。
Listbox 是一个可选中的列表，它内部具有角色为 Option 的选项。
Menu 是指菜单，菜单中可以加入嵌套的菜单项（Menuitem 角色），除了普通菜单项，还可以有 Menuitemcheckbox 带复选框的菜单栏和 Menuitemradio 带单选框的菜单栏。Radiogroup 是一组互斥的单选框的容器，它的内部可以由若干个角色为 radio 的单选框。
Tree 是树形控件，它的内部含有 Treeitem 树形控件项，它还有一种升级形式是 Treegrid。
```
### structure 角色
结构角色其实跟 HTML5 中不少新标签作用重合了，这里建议优先使用 HTML5 标签。

注：separator 在允许焦点时属于组件，在不允许焦点时属于文档结构。

这里我们需要特别提出 Landmark 角色这个概念，Landmark 角色直接翻译是地标，它是 ARIA 标准中总结的 Web 网页中最常见的 8 个结构，Landmark 角色实际上是 section 的子类，这些角色在生成页面摘要时有很大可能性需要被保留
### window 角色
在我们的网页中，有些元素表示“新窗口”，这时候，会用到 window 角色。window 系角色非常少，只有三个角色：
window dialog alertdialog
dialog 可能会产生“焦点陷阱”，也就是说，当这样的角色被激活时，焦点无法离开这个区域。

