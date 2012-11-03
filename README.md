##基于jQuery的一个对话框插件 - dialog

###API
	init - 初始化
	title - 设置标题
	content - 设置内容
	input - 添加输入框内容
	tip - 设置提示
	button - 添加按钮
	show - 显示对话框
	hide - 隐藏对话框
	clear - 清空内容
	lock - 锁住对话框
	unlock - 解锁对话框
	size - 设置尺寸

###Example
>var dia = $.dialog().init().title('标题').content('内容')；
>dia.button({<br/>
>	name: '按钮1',<br/>
>	cls: 'className',<br/>
>	id: 'idSelect',<br/>
>	events: function () {alert('按钮1被点了')；}<br/>
>}).show().size(200, 0, 100, 0.5, 1000);