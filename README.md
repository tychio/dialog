## 基于jQuery的一个对话框插件 - dialog ##

### Config ###

- con[string:selector] - 容器选择器表达式
- bgCls[string] - 背景的class，为空或未定义时则没有背景
- holderCls[string] - 对话框的class
- titleCls[string] - 标题的class
- contentCls[string] - 内容的class
- barCls[string] - 内容栏的class
- bottomCls[string] - 底部的class
- buttonCls[string] - 按钮的class
- tipCls[string] - 提示位置的class
- unselectCls[string] - 不能选择的class
- bgClose[boolean] - 背景是否关闭
- drag[boolean] - 是否可以拖拽
- fix[boolean] - 是否跟随滚屏
- width[number] - 宽度		
- height[number] - 高度
- top[number] - 顶部距离
- left[number] - 左侧距离

```js
//配置方法
$.dialog({
	con: '#dialog'
});
```

### API ###

- init - 初始化
	- param null
	- return this
	- 建立dialog的html标签，放入容器

	>var _dialog = $.dialog().init();
- title - 设置标题
	- param p_text[string]标题文字
	- return this
	- 设置标题文字

	>_dialog.title('标题');
- content - 设置内容
	- param p_html[string:html]放入的HTML标签
	- param p_style[object]CSS样式 || [number]上下间隔的距离
	- return this || jQuery object 不传参数则返回content的jQ对象
	- 设置内容，添加一个内容栏，并指定该内容栏的样式，如果为数字则直接指定padding-top和padding-bottom的尺寸。

	>_dialog.content('内容', 20);//上下各20px的内边距
- clear - 清空内容
	- param null
	- return this
	- 清空内容，包括标题文字，按钮

	>_dialog.title('标题').clear().content('内容', 20);
- input - 添加输入框内容
	- param p_attr[object || string]input输入框的属性，默认为id
	- param p_label[string]label文字
	- param p_input[boolean]true为textarea，false为input
	- param p_enter[function]在输入框中按下回车执行的回调方法
	- return this
	- 特殊的content方法，直接生成input输入框或者textarea输入区域

	>_dialog.input('input_id', 'label文字：', false, function () {sure();});
- button - 添加按钮
	- param p_set[object || string || function]关于按钮的设置
		- name[string]按钮文字，默认为‘确认’，当p_set为string类型时则替换
		- cls[string]按钮class，默认为conf中的按钮class
		- id[string]按钮id，默认为空
		- events[function]按钮的点击触发的事件，默认为关闭对话框，当p_set为function类型时则替换
	- return this
	- 添加一个按钮，指定按钮的文字，class，id及click事件要执行的方法

	>_dialog.input('请输入内容', {id: 'content'}, false).button(function () {//submit});
- tip - 设置提示
	- param p_tip[string]提示文字
	- return this
	- 设置对话框的提示信息文字
	
	>_dialog.input('请输入内容', {id: 'content'}, false).button(function () {_dialog.tip('内容有误')});
- show - 显示对话框
	- param null
	- return this
	- 显示对话框，包括背景

	>_dialog.show();
- hide - 隐藏对话框
	- param null
	- return this
	- 隐藏对话框，包括背景

	>_dialog.button({name: '关闭', events: function () {_dialog.hide();}).show();
- lock - 锁住对话框
	- param null
	- return this
	- 锁定模拟锁，使方法失效

	>_dialog.lock();
- unlock - 解锁对话框
	- param null
	- return this
	- 解除模拟锁，与lock相对

	>_dialog.unlock();
- size - 设置尺寸
	- param p_w[number]对话框的宽度
	- param p_h[number]对话框的高度
	- param p_t[number]对话框的顶部距离
	- param p_l[number]对话框的左侧距离
	- param p_timeout[number]改变尺寸的动画时间，0则直接改变，单位ms毫秒
	- param p_callback[function]改变尺寸完成后执行的回调函数，参考jQuery.fn.animate
	- return this
	- 设置对话框的尺寸，包括宽高顶左侧的尺寸，可以指定时间以动画形式完成尺寸的改变, 各种数值大于1时单位为px，小于等于1且大于0时单位为%，0则为auto自动

	>_dialog.lock().size(400, 0, 200, 0.5, 1000, function () {_dialog.unlock();});

### Example ###

```js
var _dialog = $.dialog().init().title('标题').content('内容');
_dialog.button({
	name: '按钮1',
	cls: 'className',
	id: 'idSelect',
	events: function () {
		_dialog.lock().size(200, 0, 100, 0.5, 1000, function () {
			_dialog.unlock();
	});
}).show();
```

### Demo ###

[http://www.tychio.net/dialog/](http://www.tychio.net/dialog/ 'dialog demo')

### Unit ###

[![Build Status](https://travis-ci.org/path/to/your_repository.png?branch=master)](http://travis-ci.org/path/to/your_repository)
