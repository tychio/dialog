/**
/* dialog 对话框jQuery插件
/* auther czz
/* date 2012.10.30
/* version 1.0
**/
(function () {
    $.dialog = function (p_conf) {
	    //接口
	    var api = {
	        init: initDialog,//初始化
	        title: setTitle,//设置标题
	        content: changeContent,//设置内容
	        input: inputText,//添加输入框内容
	        tip: changeTip,//设置提示
	        button: addButton,//添加按钮
	        show: showDialog,//显示对话框
	        hide: hideDialog,//隐藏对话框
	        clear: clearContent,//清空内容
	        lock: createLock,//锁住对话框
	        unlock: removeLock,//解锁对话框
	        size: setSize//设置尺寸
	    };
	    //配置
	    var conf = {
	    	con: 			'#dialog',//容器选择器表达式
	        bg: 			'background',//背景选择器表达式
	        holderCls: 		'dialog',//容器类名
	        titleCls: 		'dialog-title',//标题类名
	        contentCls: 	'dialog-content',//内容类名
	        barCls: 		'dialog-bar',//内容条类名
	        bottomCls: 		'dialog-bottom',//底部类名
	        buttonCls: 		'dialog-button',//按钮类名
	        tipCls: 		'dialog-tip',//提示类名
	        unselectCls: 	'unselect',
	        closeText: 		'×',//关闭按钮字符
	        bgClose: 		true,//点击背景关闭
	        drag: 			true,//是否可以拖拽
	        fix: 			true,//是否跟随滚屏 
	        width: 			360,//宽度
	        height: 		0,//高度
	        top: 			150,//顶部距离
	        left: 			0.5//左侧距离
	    };
	    var _countBtn = 0; //按钮计数
	    var _lock = false; //锁
		//配置参数处理
		switch (typeof p_conf) {
			//number默认为顶部距离
			case 'number': conf.top = p_conf; break;
			//string默认为容器选择器表达式
			case 'string': conf.con = p_conf; break;
			//object扩展conf
			case 'object': conf = $.extend(conf, p_conf);
		}
		/********************* 外部方法 ***********************/
	  	/**
	  	/* 初始化
	  	/* 生成组成dialog的DOM
	  	**/
	  	function initDialog () {
	      	//对话框html的字符串
	      	var _title = $('<div></div>', {
	       		'class': conf.titleCls
	      	});
	      	_title.append($('<label></label>'));
	      	_title.append($('<a></a>').html(conf.closeText));
	      	var _content = $('<div></div>', {
	      		'class': conf.contentCls
	      	});
	      	var _bottom = $('<div></div>', {
	      		'class': conf.bottomCls
	      	});
	      	_bottom.append($('<div></div>', {
	      		'class': conf.tipCls
	      	}));
		    //设置尺寸，添加类，放入生成的html标签
	        $(conf.con).css({
	        		'position': 	conf.fix ? 'fixed' : 'absolute', 
	        		'display': 		'none', 
	        		'z-index': 		10001, 
	        		'top': 			_num2css(conf.top),
	        		'left': 		_num2css(conf.left),
	        		'width': 		_num2css(conf.width),
	        		'height': 		_num2css(conf.height)
	        	}).addClass(conf.holderCls)
	        .html(_title).append(_content).append(_bottom)
	        .find('.' + conf.titleCls + ' a').click(hideDialog);
	        $('body').append($('<div></div>', {
	        	'id': conf.bg
	        }).css('z-index', '10000'));
	        //根据当前宽度设置左边距使之居中
	        var _margin = (0 - $(conf.con).width()*0.5) + 'px';
	        $(conf.con).css('margin-left', _margin);
	        if (conf.drag) {
	        	_drag();
	        }
	        return api;
	    }
	    /**
	    /* 设置标题
	    /* @param p_text 标题文字
	    **/
	    function setTitle (p_text) {
	        if (_lock) { return api; }
	        $(conf.con).find('.' + conf.titleCls + ' label').html(p_text);
	        return api;
	    }
	    /**
	    /* 设置内容
	    /* @param p_html 包裹bar后添加到content中的html标签
	    /* @param p_height bar高度，使用上下padding实现
	    **/
	    function changeContent (p_html, p_height) {
	        if (_lock) { return api; }
	    	//jquery对象 对话框内容
	    	var _$con = $(conf.con + ' .' + conf.contentCls);
	        if (p_html == null) {
	        	//无参数时返回内容的jquery对象，在外部直接对其进行操作
	            return _$con;
	        } else {
	        	//根据参数修改内容
		        _$con.append($('<div></div>', {
		        	'class': conf.barCls
		        }).html(p_html));
		        if (p_height != null && p_height > 0) {
		        	//设置高度
		            _$con.find('.' + conf.barCls).css({
		            	'padding-top': p_height + 'px',
		            	'padding-bottom': p_height + 'px'
		            });
		        }
		        return api;
		    }
	    }
	    /**
	    /* 清空内容
	    **/
	    function clearContent () {
	        if (_lock) { return api; }
	    	$(conf.con).find('.' + conf.titleCls + ' label').empty();
	    	$(conf.con).find('.' + conf.contentCls).empty();
	    	$('.' + conf.bottomCls).empty();
	    	return api;
	    }
	    /**
	    /* 改变提示
	    /* @param p_tip 提示信息
	    **/
	    function changeTip (p_tip) {
	        if (_lock) { return api; }
	        if (p_tip == null) {
	        	//无参数时返回提示部分的jquery对象
	            return $(conf.con).find('.' + conf.bottomCls)
	            	.find('.' + conf.tipCls);
	        } else {
	        	//有参数时设置提示信息
	            $(conf.con).find('.' + conf.bottomCls)
	            	.find('.' + conf.tipCls).html(p_tip);
	            return api;
	        }
	    }
	    /**
	    /* 添加按钮
	    /* @param p_set 按钮设置object 
	    **/
	    function addButton (p_set) {
	        if (_lock) { return api; }
	        _countBtn++;
	        var _dSet = {
	            name: '确定',//按钮名称
	            cls: conf.buttonCls,//按钮类名
	            id: '',//按钮id
	            events: hideDialog//按钮绑定事件
	        };
	       	if (typeof p_set == 'function') {
	       		//参数为function时，绑定按钮的点击事件为该方法
	            _dSet.events = p_set;
	        } else if (typeof p_set == 'string') {
	        	//参数为string时，设置为按钮名称
	        	_dSet.name = p_set
	        } else if (typeof p_set == 'object') {
	        	//参数为object时，扩展_dSet
	        	_dSet = $.extend(_dSet, p_set);
	        }
	        //html属性部分的字符串
	        var _attr = {
	        	'class': conf.buttonCls + '_' + _countBtn + ' ' + _dSet.cls
	        };
	        var _id = '';
	        if (_dSet.id != '') {
	            _attr['id'] = _dSet.id;
	        }
	        //添加按钮并绑定事件
	        $(conf.con).find('.' + conf.bottomCls)
	        	.append($('<a></a>', _attr).html(_dSet.name))
				.find('.' + conf.buttonCls + '_' + _countBtn)
				.click(_dSet.events);
	        return api;
	    }
	    /**
	    /* 使用输入框模板
	    /* @param p_tip 输入框空白时提示
	    /* @param p_attr 属性
	    /* @param p_input 输入框还是输入区域, true 为textarea
	    **/
	    function inputText (p_tip, p_attr, p_input) {
	        if (_lock) { return api; }
	        //检查输入框是否为空，显示或隐藏label
	        var _checkInput = function () {
	        	var _$label = $(this).parent().find('label');
	            if ($(this).val() != '') {
	                _$label.hide();
	            } else {
	                _$label.show();
	            }
	        }
	        var _isIe = $.browser === 'msie';
	        var _tip = '';
	        var _attr = '';
	        var _content = '';
	        if (typeof p_attr == 'object') {
	        	$.each(p_attr, function (p_k, p_v) {
	        		_attr += p_k + '="' + p_v + '"';
	        	});
	        }
	        if (_isIe) {
	        //ie不支持placeholder，使用label+js模拟
	            if (p_tip != null || p_tip != '') {
	                var _hideLabel = '';
	                if (p_attr.value != null && p_attr.value != '') {
	                    _hideLabel = 'display: none;';
	                }
	                var _tipDom = $('<label></label>', {
	                	'for': p_attr.id,
	                	'style': _hideLabel
	                }).html(p_tip);
	            }
	            if (p_attr.value == null) {
	            	p_attr.value = '';
	            }
	            //判断是input还是textarea
	            if (p_input) {
	                _content = _tipDom + '<textarea ' + _attr + ' >' + p_attr.value + '</textarea>';
	            } else {
	                _content = _tipDom + '<input ' + _attr + ' />';
	            }
	            //获取内容的jquery对象，绑定显示隐藏label的事件
	            $(conf.con + ' .' + conf.contentCls)
	            	.delegate('input, textarea', 'focus, keyup', _checkInput)
	            	.find('input, textarea').focus();
	        } else {
	        //非ie，支持placeholder
	            if (p_tip != null || p_tip != '') {
	                _attr += 'placeholder=' + p_tip;
	            }
	            if (p_attr.value == null) {
	            	p_attr.value = '';
	            }
	            if (p_input) {
	                _content = '<textarea ' + _attr + '>' + p_attr.value + '</textarea>';
	            } else {
	                _content = '<input ' + _attr + ' >';
	            }
	        }
	        //添加内容
	        changeContent(_content);
		    //获取最后添加的内容条jquery对象
		    var _$content = $(conf.con + ' .' + conf.contentCls).children().last();
	        if (_isIe) {
		        //将label定位到input中
		        var _padding = _$content.css('padding').split('px')[0] - 0;
		        var _inputTop = 10 + _padding;
		        var _inputLeft = 10 + _padding;
		        _$content.find('label').css({
		        	'top': _inputTop + 'px',
		        	'left': _inputLeft + 'px'
		        });
	        }
	        _$content.find(p_input? 'textarea' : 'input').keydown(function (p_e) {//回车模拟点击最左侧的按钮
	        	if (p_e.which == 13) {
	        		$(conf.con).find('.' + conf.buttonCls).last().trigger('click');
	        	}
	        }, p_input);
	        return api;
	    }
	    /**
	    /* 显示对话框
	    **/
	    function showDialog () {
	        if (_lock) { return api; }
	        if (_countBtn == 0) {
	        	//至少需要一个按钮
	            addButton();
	        }
	        //显示对话框和背景，并获取其jquery对象
	        var _$con = $(conf.con).show();
	        var _$bg = $('#' + conf.bg).show();
	        //绑定点击背景隐藏对话框的事件
	        if (conf.bgClose) {
	            _$bg.click(hideDialog);
	        }
	        //输入框获取焦点
	        _$con.find('.' + conf.contentCls).find('textarea, input').focus();
	        return api;
	    }
	    /**
	    /* 隐藏对话框
	    **/
	    function hideDialog () {
	        if (_lock) { return api; }
	        $(conf.con + ', #' + conf.bg).hide();
	        return api;
	    }
	    /**
	    /* 锁定对话框
	    **/
	    function createLock () {
	    	var _$input = $(conf.con + ' input, ' + conf.con + ' textarea');
            _$input.attr('disabled', 'disabled');
            _lock = true;
	        return api;
	    }
	    /**
	    /* 解锁对话框
	    **/
	    function removeLock () {
	    	var _$input = $(conf.con + ' input, ' + conf.con + ' textarea');
            _$input.removeAttr('disabled');
            _lock = false;
            return api;
	    }
	    /**
	    /* 设置尺寸
	    /* @param p_w
	    /* @param p_h
	    /* @param p_t
	    /* @param p_l
	    **/
	    function setSize (p_w, p_h, p_t, p_l, p_timeout, p_callback) {
	        if (_lock) { return api; }
	        if ($.isArray(p_w)) {
	        	p_h = p_w[1];
	        	p_t = p_w[2];
	        	p_l = p_w[3];
	        	p_timeout = p_w[4];
	        	p_callback = p_w[5];
	        	p_w = p_w[0];
	        }
	    	//根据参数修改尺寸配置数据
	        conf.width = p_w == null ? conf.width : p_w;
	        conf.height = p_h == null ? conf.height : p_h;
	        conf.top = p_t == null ? conf.top : p_t;
	        conf.left = p_l == null ? conf.left : p_l;
	        if (p_callback == null) {
	        	p_callback = removeLock;
	        }
	        if (p_timeout == null) {
		        //设置为对应尺寸的css值
		        $(conf.con).css({
		            'width': _num2css(conf.width), 
		            'height': _num2css(conf.height),
		            'top': _num2css(conf.top),
		            'left': _num2css(conf.left) 
		        });
			    p_callback.call(this);
		    } else {
		    	if (conf.height == 0) {
		    		_temp = $(conf.con).clone()
		    			.appendTo($(conf.con).parent()).css('height', 'auto');
		    		conf.height = _temp.height();
		    		_temp.detach();
		    	}
		    	$(conf.con).animate({
		    		width: _num2css(conf.width, 'width'),
		    		height: _num2css(conf.height, 'height'),
		    		top: _num2css(conf.top, 'top'),
		    		left: _num2css(conf.left, 'left')
		    	}, p_timeout, p_callback);
		    }
	        return api;
	    }
		return api;
		/* ----------------- 内部方法 ------------------ */
		//将数值转换成css尺寸值
		function _num2css (p_num, p_isnum) {//p_isnum[boolean] 是否返回数值
			var _rtn = false;
			if (p_num > 1) {
				_rtn = p_isnum ? p_num : p_num + 'px';
			} else if (p_num > 0) {
				var _size = 0;
				if (p_isnum == 'width' || p_isnum == 'left') {
					_size = $(conf.con).parent().width();
				} else if (p_isnum == 'height' || p_isnum == 'top') {
					_size = $(conf.con).parent().height();
				}
				_rtn = p_isnum ? p_num*_size : p_num*100 + '%';
			} else if (p_num === 0) {
				_rtn = p_isnum ? undefined : 'auto';
			}
			return _rtn;
		}
		//添加拖拽事件
		function _drag () {
			var _isDown = false;
			var _clickPos = {
				'x': 0,
				'y': 0
			};
			var _showPos = {
				'x': 0,
				'y': 0	
			};
			var _$dialog = $(conf.con);
			_$dialog.find('.' + conf.titleCls).css('cursor', 'move')
				.mouseup(function () {
					_isDown = false;
					_showPos = {
						'x': 0,
						'y': 0	
					};
					_$dialog.removeClass(conf.unselectCls);
				}).mousedown(function (p_e) {
					_isDown = true;
					_clickPos.x = p_e.pageX;
					_clickPos.y = p_e.pageY;
					_showPos.x = _$dialog.position().left;
					_showPos.y = _$dialog.position().top;
					_$dialog.addClass(conf.unselectCls);
				});
			$('body').mousemove(function (p_e) {
				if (_lock) { return; }
				if (_isDown) {
					var _top = p_e.pageY - _clickPos.y + _showPos.y;
					var _left = p_e.pageX - _clickPos.x + _showPos.x;
					if (conf.fix) {
						 _left -= $(window).scrollLeft();
						 _top -= $(window).scrollTop();
					}
					_$dialog.css({
						'left': _left + 'px',
						'top': _top + 'px'
					});
				}
				p_e.originalEvent.preventDefault();
			});
		}
	};
})();