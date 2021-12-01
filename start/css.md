#### 布局
##### 盒子模型的宽度如何计算
offsetWidth = （内容宽度 + 内边距 + 边框）， 无外边距
##### margin纵向重叠
1、相邻元素margin-top和margin-bottom会发生重叠
2、空白内容的<p></p>也会重叠
##### margin负值问题
1、margin-top和margin-left负值，元素向上，想左移动
2、margin-right负值，右侧元素左移，自身不受影响
3、margin-bottom负值，下方元素上移，自身不受影响
##### BFC理解和应用
Block format context 块级格式化上下文
一块独立的渲染区域，内部元素的渲染不会影响边界以外的元素

形成BFC的常见条件
```js
float不是none
position 是 absolute或fixed
overflow不是visible
display是flex inline-block
```
常见应用: 清除浮动
##### float布局的问题以及clearfix
圣杯布局和双飞翼布局
```js
使用float布局，
两侧使用margin负值，以便和中间内容横向重叠
防止中间内容被两侧覆盖，一个用padding一个用margin
```
手写clearfix
```js
.clearfix:after {
    content: '';-
    display: table;
    clear: both;
}
```
#### flex
#### 定位
##### absolute 和 relative分别依据什么定位
定位元素：absolute relative fixed或body

relative依据自身定位

absolute依据最近一层的定位元素定位
##### 居中对齐有哪些实现方式
###### 水平居中
1、inline元素：text-align：center

2、block元素：margin：auto

3、absolute元素：left：50% + margin-left负值
###### 垂直居中
1、inline元素：line-height的值等于height值

2、absolute元素：top：50% + margin-top负值

3、absolute元素：transform(-50%，-50%)

4、absolute元素：top，left，bottom，right = 0 + margin：auto
#### 图文样式
##### line-height 如何继承
1、写具体数值，如30px，则继承该值

2、写比例，如2/1.5，则基础改比例

3、写百分比，如200%，则继承计算出来的值（font-size*200%）
#### 响应式
##### rem是什么
1、px 绝对长度单位，最常用

2、em 相对长度单位，相对于父元素，不常用

3、rem 相对长度单位，相对于根元素，常用于响应式布局
##### 如何实现响应式
media-query：根据不同屏幕的宽度设置根元素font-size

rem 弊端：'阶梯'性
##### 网页视口尺寸
1、window.screen.height // 屏幕高度

2、window.innerHeight // 网页视口高度

3、document.body.clientHeight // body高度

vh 网页视口高度的 1/100, vw网页视口宽度的1/100

vmax取两者最大值；vmin取两者最小值
#### CSS3
css3动画