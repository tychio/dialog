function getRandom (p_len) {
    var _num = (Math.random() + '').slice(2, 2 + p_len) + '';
    return _num > 1 ? _num : getRandom(p_len);
}
// try it out unit test
describe('Dialog', function () {
    var dialog,
    selector = {
        con: '#dialog',
        bgCls: 'dialog-bg',
        holderCls: 'dialog',
        titleCls: 'dialog-title',
        contentCls: 'dialog-content',
        barCls: 'dialog-bar',
        bottomCls: 'dialog-bottom',
        buttonCls: 'dialog-button',
        tipCls: 'dialog-tip'
    };
    beforeEach(function () {
        dialog = $.dialog(selector);
        dialog.init();
    });
    afterEach(function () {
        $(selector.con).remove();
        $(selector.bgCls).remove();
    });
    describe('Init Dialog and testing DOM', function () {
        it('APIs is avaliable', function () {
            expect(typeof dialog).toEqual('object');
            expect(dialog.init).toBeDefined();
            expect(dialog.title).toBeDefined();
            expect(dialog.content).toBeDefined();
            expect(dialog.input).toBeDefined();
            expect(dialog.tip).toBeDefined();
            expect(dialog.button).toBeDefined();
            expect(dialog.show).toBeDefined();
            expect(dialog.hide).toBeDefined();
            expect(dialog.clear).toBeDefined();
            expect(dialog.lock).toBeDefined();
            expect(dialog.unlock).toBeDefined();
            expect(dialog.size).toBeDefined();
        });
        it('exsiting document of module', function () {
            expect($(selector.con).length).toBeGreaterThan(0);
            expect($('.' + selector.bgCls).length).toBeGreaterThan(0);
            expect($('.' + selector.holderCls).length).toBeGreaterThan(0);
            expect($('.' + selector.titleCls).length).toBeGreaterThan(0);
            expect($('.' + selector.contentCls).length).toBeGreaterThan(0);
            expect($('.' + selector.bottomCls).length).toBeGreaterThan(0);
            expect($('.' + selector.tipCls).length).toBeGreaterThan(0);
        });
    });
    xdescribe('Testing API function Title', function () {
        it('exsit title function', function () {
            expect(d.title).not.toBeUndefined();
        });
        it('the text before is compared with the text after the setting title', function () {
            var _testTitle = 'this title made by jasmine.';
            expect(d.title()).not.toEqual(_testTitle);
            d.title(_testTitle);
            expect(d.title()).toEqual(_testTitle);
        });
    });
    xdescribe('Testing API function - content', function () {
        it('exsit content function', function () {
            expect(d.content).not.toBeUndefined();
        });
        it('getting the content of jQuery object', function () {
            expect(d.content() instanceof jQuery).toBeTruthy();
        });
        it('push a bar into the content and setting style', function () {
            var _testId = 'jasmine_test_content';
            var _testNo = getRandom(5) - 0;
            d.content($('<div/>').attr('id', _testId), {
                'zoom':  _testNo
            });
            expect($('#' + _testId).length).toBeGreaterThan(0);
            expect($('#' + _testId).parent().css('zoom') - 0).toEqual(_testNo);
        });
        describe('Testing API function - input(refer content)', function () {
            it('setting the input attr', function () {
                var _testAttr = getRandom(5);
                d.input({
                    'data-attr': _testAttr,
                    'inputtype': 'password'
                });
                var $input = d.content().children().last().find('input');
                expect($input.attr('data-attr')).toEqual(_testAttr);
                expect($input.attr('type')).toEqual('password');
            });
            it('create textarea', function () {
                d.input({}, '', true);
                var $bar = d.content().children().last();
                expect($bar.find('textarea').length).toBeGreaterThan(0);
                expect($bar.children().last()[0].tagName.toLocaleLowerCase()).toEqual('textarea');
            });
            it('add event for enter', function () {
                var flag, enter, key;
                runs(function () {
                    flag = false;
                    enter = 0;
                    key = -1;
                    d.input({}, '', false, function (p_e) {
                        flag = true;
                        key = p_e.which || p_e.keyCode;
                    });
                    setTimeout(function () {
                        var _e = $.Event('keyup');
                        _e.which = 13;
                        d.content().children().last().find('input').trigger(_e);
                    }, 200);
                });
                waitsFor(function () {
                    enter++;
                    return flag;
                }, 'trigger the input enter event', 1000);
                runs(function () {
                    expect(enter).toBeGreaterThan(0);
                    expect(key).toEqual(13);
                });
            });
        });
    });
    xdescribe('Testing API function - tip', function () {
        it('compared with getting and setting', function () {
            var _testTip = 'dialog tip text<b>' + getRandom(4) + '</b>';
            d.tip(_testTip);
            expect(d.tip().html()).toEqual(_testTip);
        });
    });
    xdescribe('Testing API function - button', function () {
        var _testClick = false;
        var _testSet = {
            name: 'buttonName' + getRandom(4),
            cls: 'buttonClass' + getRandom(4),
            id: 'buttonId' + getRandom(4),
            events: function () {
                _testClick = true;
            }
        };
        it('setting name, class and id', function () {
            d.button(_testSet);
            var _btn = $('#' + _testSet.id);
            expect(_btn.length).toBeGreaterThan(0);
            expect(_btn.hasClass(_testSet.cls)).toBeTruthy();
            expect(_btn.html()).toEqual(_testSet.name);
        });
        it('trigger click button', function () {
            $('#' + _testSet.id).click();
            expect(_testClick).toBeTruthy();
        });
    });
    xdescribe('Testing API function - clear', function () {
        it('clear title', function () {
            d.clear();
            expect(d.title().length).toEqual(0);
        });
        it('clear content', function () {
            expect(d.content().html()).toEqual('');
        });
        it('clear tip', function () {
            expect(d.tip().html()).toEqual('');
        });
        it('clear button', function () {
            expect(d.tip().siblings().length).toEqual(0);
        });
    });
    xdescribe('Testing API function - other', function () {
        it('show dialog', function () {
            var _dialog = $('#dialog');
            expect(_dialog.css('display')).toEqual('none');
            d.show();
            expect(_dialog.css('display')).not.toEqual('none');
        });
        it('hide dialog', function () {
            var _dialog = $('#dialog');
            expect(_dialog.css('display')).not.toEqual('none');
            d.hide();
            expect(_dialog.css('display')).toEqual('none');
        });
        it('lock dialog', function () {
            var _dialog = $('#dialog');
            expect(_dialog.css('display')).toEqual('none');
            d.lock();
            d.show();
            expect(_dialog.css('display')).toEqual('none');
        });
        it('unlock dialog', function () {
            var _dialog = $('#dialog');
            expect(_dialog.css('display')).toEqual('none');
            d.lock();
            d.show();
            expect(_dialog.css('display')).toEqual('none');
            d.unlock();
            d.show();
            expect(_dialog.css('display')).not.toEqual('none');
        });
    });
    xdescribe('Testing API function - set', function () {
        var _testSize = [
            getRandom(2) - 0,
            getRandom(2) - 0,
            getRandom(2) - 0,
            getRandom(2) - 0,
            0
        ];
        it('set dialog size', function () {
            d.size(_testSize);
            var _dialog = $('#dialog')[0];
            expect(_dialog.style.width).toEqual(_testSize[0] + 'px');
            expect(_dialog.style.height).toEqual(_testSize[1] + 'px');
            expect(_dialog.style.top).toEqual(_testSize[2] + 'px');
            expect(_dialog.style.left).toEqual(_testSize[3] + 'px');
        });
    });
});