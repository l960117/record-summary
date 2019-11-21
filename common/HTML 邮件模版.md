### 简介
有时因为业务的需要，平常的文字邮件已经满足不了需求，这个时候可以考虑使用HTML代码生成需要的邮件

HTML邮件模版在各个客户端存在不同的问题，代码语法相当于使用了早期的html写法，以兼容各个邮箱的显示

本文分享个人开发邮件模版的思路，有什么不对，请提出，欢迎分享

详细规则可以在网上找到很多其他的规则

github地址： 尚未建立project，后期补充

查看各种邮箱属性支持情况的网站：https://www.campaignmonitor.com/css/

### 编写规则

1、无法使用js

2、无法使用外部CSS
邮件模版为一个页面，发送给用户时，无法读取到外部CSS链接

建议最好使用行内样式（ps：head里面写入css可能会存在莫名的bug，暂未亲测）

3、Doctype

目前，兼容性最好的Doctype是XHTML 1.0 Strict，事实上Gmail和Hotmail会删掉你的Doctype，换上下面这个Doctype
```js
<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
 <html xmlns="http://www.w3.org/1999/xhtml">
 　<head>
 　　<meta http-equiv="Content-Type" content="text/html; charset=UTF-8" />
 　　<title></title>
 　</head>
 </html>
```

4、布局
使用table布局

div，p等标签不完全被邮件客户端支持，so无法使用div+css布局（ps：你可以强行使用试试，会有意想不到的bug）

5、img

img标签：

图片是唯一可以引用的外部资源。其他的外部资源，比如样式表文件、字体文件、视频文件等，一概不能引用。

有些客户端会给图片链接加上边框，要去除边框。所以基本所有的图片要加上border=0

需要注意的是，不少客户端默认不显示图片（比如Gmail），所以要确保即使没有图片，主要内容也能被阅读，alt属性

因为在有些邮箱里，图片不是默认加载的，往往加载前需要用户的许可。那么高宽的指定可以使邮件在没有图片撑出样子前也能保持良好的大小结构，加上 alt 属性更可以明确告知图片的内容让用户选择是否下载它们。

如果因为项目需要（比如需要适配 Retina 高分屏），width 和 height 属性更是必不可少的，并且由于一些 outlook 版本的奇葩表现，width 和 height 属性一定不要加上单位！一定不要加上单位！一定不要加上单位！重要的事情说三遍。

因为加上单位会使一些版本的 OutLook 无法正确识别，导致图片显示使用实际的宽高而非我们设置的

背景图片：
在outlook2007中，背景图片将无法显示，其他邮件客户端可正确显示背景图片。
Gmail也不支持css里面的背景图

### 全局规则

1、模版页面的宽度维持在550px-800px

2、、关于页面内容居中，使用table的align="center"，使用，margin：0 auto;在邮箱里面不起作用

3、尽量不要写 <style> 标签、不要写class，所有CSS都用style属性，什么元素需要什么样式就用style写内联的CSS。

4、不使用flash、java、javascript、frames、iframe、activeX以及DHTML，如果页面中的图片一定要动态的，请将flash文件转换成gif动画使用，但在outlook2007里，gif将不能正常显示，因为outlook2007限制gif动画。

5、font-family属性不能为空，否则会被QQ屏蔽为垃圾邮件。

6、上下左右边距不要用padding和margin，可以使用td空白标签设定宽度和高度达到间距要求,或者使用&nbsp;(ps: &nbsp 这个家伙在不同的邮箱显示不一样的间距)
```html
<tr>
  <td height="20">&nbsp;</td>
</tr>
```
阿里云邮箱对用td做间隔的标签不起作用，一定要加上个&nbsp;才会生效，而此时间距明显是其他邮箱的两倍(ps: 暂未找到很好的兼容方式，有解决方法的同学，请赐教！！！)

7、少用float, margin,padding. 绝对定位不能用，清除浮动用<table style="clear:both"></table>

8、如果使用了line-height属性，请加上mso-line-height-rule: exactly;（ps：不要问，问就是要）

9、少用图片，邮箱不会过滤你的img标签，但是系统往往会默认不载入陌生来信的图片，如果用了很多图片的邮件，在片没有载入的情况下，丑陋无比甚至看不清内容，没耐心的用户直接就删除了。图片上务必加上alt。

10、邮箱里面显示邮件模版一般都是用iframe嵌套，在outlook邮箱里面，并没有看到任何的iframe的标签，请注意

11、关于字体
有时设计师会让你使用特定字体，而邮件里面一般使用的是系统支持的字体，如果不支持，将会变成默认字体（ps： 个人觉得苹方字体在邮件里面显示特丑，不如默认字体）




