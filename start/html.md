#### 如何理解HTML语义化
1、让人更容易读懂（增加代码可读性）
2、让搜索引擎更容易读懂（SEO）
```html
<div>标题</div>
<div>
    <div>一段文字</div>
    <div>
        <div>列表1</div>
        <div>列表2</div>
    </div>
</div>
```
```html
<h1>标题</h1>
<div>
    <p>一段文字</p>
    <ul>
        <li>列表1</li>
        <li>列表2</li>
    </ul>
</div>
```
#### 默认情况下，那些HTML标签是块级元素，那些是内联元素
块状元素：display：block/table; 有div h1 h2 table ul ol p
display：inline/inline-block;有span img input button等