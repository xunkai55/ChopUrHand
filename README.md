README
================

Chop your hand is a chrome-extension to prohibit you from navigating some website in certain time period, thus you can focus on your own work. 

“剁你丫手”是一个chrome插件，目前尚在开发之中（因为我太懒啦自己能用就不想用户友好了……）如果你想着急用的话，请将所有代码down下去放到某个文件夹里，然后：

+ 在`background.js`中可以修改屏蔽网站列表、不禁止时间、临时允许时间和两次允许的时间间隔；

+ 在`red.html`中可以修改禁止访问后的重定向页面。

之后再在chrome的**设置-工具-扩展程序**中，给**开发者模式**打钩，再点击**加载正在开发的扩展程序**并定位到放了代码的文件夹中，确定即可。

每次修改设置之后，需要在刚才的页面中找到ChopUrHand下方的**重新加载**并点击之。

使用时，在不禁止时间之外，访问屏蔽网站列表中的网站将会重定向到重定向页面；若有急用，点击地址栏右侧的图标可以获得临时允许时间。不能在两次允许时间间隔之前再次请求临时允许。
