### a dialog plugin based on jQuery ###

##### Config #####

- con[string:selector] - a expression of selector for container
- bgCls[string] - background of class, it's none background if is null or undefined.
- holderCls[string] - dialog of class.
- titleCls[string] - title of class.
- contentCls[string] - content of class.
- barCls[string] - line of class in content.
- bottomCls[string] - bottom of class.
- buttonCls[string] - button of class.
- tipCls[string] - tip of class.
- unselectCls[string] - a class for preventing user to select text.
- bgClose[boolean] - it's true if dialog will close on clicking background.
- drag[boolean] - it's true if dialog can be dragged.
- fix[boolean] - it's true if dialog fixed scroll.
- width[number] - dialog of width.
- height[number] - dialog of height.
- top[number] - dialog of top.
- left[number] - dialog of bottom.

```js
//simple init
$.dialog({
	con: '#dialog'
});
```

##### API #####

- init - initializing dialog.
	- param void
	- return this
	- build dialog of DOM and put in container.

	>var _dialog = $.dialog().init();

- title - setting title text.
	- param p_text[string] a text for title.
	- return this
	- setting a text for title and return the title of jQuery Object.

	>_dialog.title('This is title');

- content - setting content.
	- param p_html[htmlString]
	- param p_style[object] style || [number] padding of top and bottom.
	- return this || jQuery object when the method haven't accepted any parameters.
	- add a bar or line put in the content and setting style. It's will set padding of top and bottom if the parameter of type is number.

	>_dialog.content('some texts and others', 20);//padding of top and bottom is 20 pixel.

- clear - clear dialog
	- param null
	- return this
	- clear content,title and button.

	>_dialog.title('This is title').clear().title('a New title');

- input - add a input push in content.
	- param p_attr[object || string] setting the input of attributes, id is default attribute if a string type of parameter.
	- param p_label[string] the label for input.
	- param p_input[boolean] it's true if you want to add a textarea not input.
	- param p_enter[function] callback the function when enter in the input.
	- return this
	- It's a special method that wrapped content for input.

	>_dialog.input('input_id', 'username：', false, function () {sure();});

- button - add a button push in the bottom.
	- param p_set[object || string || function] configuring the button.
		- name[string] button of text, default is 'Ok'.
		- cls[string] button of class, default is conf.btnCls.
		- id[string] button of id, default is null.
		- events[function] to run the function when click corresponding button. Default is closing dialog.
	- return this
	- To add a button and set its text,class,id and event on click.

	>_dialog.input('please input text', {id: 'content'}, false).button(function () {//submit});

- tip - setting tip.
	- param p_tip[string] tip of text.
	- return this
	- setting a text for dialog in bottom.
	
	>_dialog.input('please input text', {id: 'content'}, false).button(function () {_dialog.tip('content is error!')});

- show - to show dialog.
	- param null
	- return this
	- To show dialog and background.

	>_dialog.show();

- hide - to hide dialog
	- param null
	- return this
	- To hide dialog and background.

	>_dialog.button({name: 'close', events: function () {_dialog.hide();}).show();

- lock - to lock dialog.
	- param null
	- return this
	- to lock dialog and prevent any operations.

	>_dialog.lock();

- unlock - to unlock dialog
	- param null
	- return this
	- to unlock dialog and cancel lock.

	>_dialog.unlock();

- size - setting size
	- param p_w[number]dialog of width.
	- param p_h[number]dialog of height.
	- param p_t[number]dialog of top.
	- param p_l[number]dialog of left.
	- param p_timeout[number]the animation of duration for resize. Zero indicate direction and its unit is milliseconds.
	- param p_callback[function] the function will be ran after animation has finished.refer to `jQuery.fn.animate`.
	- return this
	- To set dialog of size including width,height,top and left.And it can set a timeout for animation. The unit is percent if it less than 1. Then unit is pixel if it greater than 1. But the value is `auto` if it's 0. 

	>_dialog.lock().size(400, 0, 200, 0.5, 1000, function () {_dialog.unlock();});

##### Example #####

```js
var _dialog = $.dialog().init().title('title').content('please click ok');
_dialog.button({
	name: 'ok',
	cls: 'one_button',
	id: 'theButton',
	events: function () {
		_dialog.lock().size(200, 0, 100, 0.5, 1000, function () {
			_dialog.unlock();
		});
	});
}).show();
```

##### Demo #####

[http://www.tychio.net/dialog/](http://www.tychio.net/dialog/ 'dialog demo')

##### Test #####

[![Build Status](https://travis-ci.org/tychio/dialog.png?branch=master)](https://travis-ci.org/tychio/dialog)
