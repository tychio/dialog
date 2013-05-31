function getRandom (p_len) {
    return (Math.random() + '').slice(2, 2 + p_len) + '';
}

describe('Dialog', function () {
    var d,
    testStr = {
        con: '#dialog',
        title: 'dialog-title'
    };
    describe('Init Dialog and testing DOM', function () {
        d = $.dialog(testStr);
        it('avaliable api', function () {
            expect(typeof d).toEqual('object');
        });
        it('exsiting document of module', function () {
            d.init();
            expect($(testStr.con).length).toBeGreaterThan(0);
        });
    });
    describe('Testing api function - Title', function () {
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
    describe('Testing api function - content', function () {
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
        describe('Testing api function - input(refer content)', function () {
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
    describe('Testing api function - tip', function () {
        it('compared with getting and setting', function () {
            var _testTip = 'dialog tip text<b>' + getRandom(4) + '</b>';
            d.tip(_testTip);
            expect(d.tip().html()).toEqual(_testTip);
        });
    });
    describe('Testing api function - button', function () {
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
});