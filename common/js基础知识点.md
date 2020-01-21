#### CSS
#### CSS3新特性
1、word-wrap 文字换行
2、text-overflow 超过指定容器的边界时如何显示
3、text-decoration 文字渲染
4、text-shadow文字阴影
5、gradient渐变效果
6、transition过渡效果 transition-duration：过渡的持续时间
7、transform拉伸，压缩，旋转，偏移等变换
8、animation动画

transition和animation的区别：
Animation和transition大部分属性是相同的，他们都是随时间改变元素的属性值，他们的主要区别是transition需要触发一个事件才能改变属性，而animation不需要触发任何事件的情况下才会随时间改变属性值，并且transition为2帧，从from .... to，而animation可以一帧一帧的。
#### 绝对定位和相对定位

absolute 绝对定位 相对于最近的已定位的祖先元素, 有已定位(指position不是static的元素)祖先元素, 以最近的祖先元素为参考标准。如果无已定位祖先元素, 以body元素为偏移参照基准, 完全脱离了标准文档流。

fixed 固定定位的元素会相对于视窗来定位,这意味着即便页面滚动，它还是会停留在相同的位置。一个固定定位元素不会保留它原本在页面应有的空隙。

共同点：改变行内元素的呈现方式，都脱离了文档流；

不同点：absolute的”根元素“是可以设置的，fixed的“根元素”固定为浏览器窗口
