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
        // $(selector.con).remove();
        $(selector.bgCls).remove();
    });
    describe('Initialization and getting API', function () {
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
    describe('testing Title', function () {
        var _testTitle = 'jasmine';
        var _title = function (p_html) {
            if (typeof p_html === 'undefined') {
                return $('.' + selector.titleCls).find('label').html();
            } else {
                $('.' + selector.titleCls).find('label').html(p_html);
            }
        };
        it('title function is avaliable', function () {
            expect(dialog.title).toBeDefined();
        });
        it('setting title to value' + _testTitle, function () {
            expect(_title()).not.toEqual(_testTitle);
            var _api = dialog.title(_testTitle);
            expect(_title()).toEqual(_testTitle);
            expect(typeof _api).toEqual('object');
        });
        it('getting title string', function () {
            _title(_testTitle);
            var _val = dialog.title();
            expect(_val).toEqual(_testTitle);
        });
    });
    describe('testing Content', function () {
        it('function is avaliable', function () {
            expect(dialog.content).toBeDefined();
        });
        it('getting the content of jQuery object', function () {
            expect(dialog.content() instanceof jQuery).toBeTruthy();
        });
        it('push a bar into the content and setting style', function () {
            var _testId = 'jasmine';
            var _testStyle = '983px';
            dialog.content($('<div/>').attr('id', _testId), {
                'height':  _testStyle
            });
            expect($('#' + _testId).length).toBeGreaterThan(0);
            expect($('#' + _testId).parent().css('height')).toEqual(_testStyle);
        });
    });
    describe('testing Tip', function () {
        it('function is avaliable', function () {
            expect(dialog.tip).toBeDefined();
        });
        it('compared with getting and setting', function () {
            var _testTip = 'this is <b>jasmine</b>';
            expect(typeof dialog.tip(_testTip)).toEqual('object');
            expect(dialog.tip() instanceof jQuery).toBeTruthy();
            expect(dialog.tip().html()).toEqual(_testTip);
        });
    });
    describe('testing Button', function () {
        var _testClick = false;
        var _testSet = {
            name: 'buttonNameJasmine',
            cls: 'buttonClassJasmine',
            id: 'buttonIdJasmine',
            events: function () {
                _testClick = true;
            }
        };
        it('function is avaliable', function () {
            expect(dialog.button).toBeDefined();
        });
        it('setting name, class and id', function () {
            dialog.button(_testSet);
            var _btn = $('#' + _testSet.id);
            expect(_btn.length).toBeGreaterThan(0);
            expect(_btn.hasClass(_testSet.cls)).toBeTruthy();
            expect(_btn.html()).toEqual(_testSet.name);
        });
        it('trigger click on button', function () {
            dialog.button(_testSet);
            $('#' + _testSet.id).click();
            expect(_testClick).toBeTruthy();
        });
    });
    describe('testing Input', function () {
        it('function is avaliable', function () {
            expect(dialog.input).toBeDefined();
        });
        it('setting the input attr', function () {
            var _testAttr = 'jasmineAttribute';
            dialog.input({
                'data-attr': _testAttr,
                'inputtype': 'password'
            });
            var $input = dialog.content().children().last().find('input');
            expect($input.attr('data-attr')).toEqual(_testAttr);
            expect($input.attr('type')).toEqual('password');
        });
        it('create textarea', function () {
            dialog.input({}, '', true);
            var $bar = dialog.content().children().last();
            expect($bar.find('textarea').length).toBeGreaterThan(0);
            expect($bar.children().last()[0].tagName.toLocaleLowerCase()).toEqual('textarea');
        });
        it('add event for enter', function () {
            var key = 0;
            dialog.input({}, '', false, function (p_e) {
                key = p_e.which || p_e.keyCode;
            });
            var _e = $.Event('keyup');
            _e.which = 13;
            dialog.content().children().last().find('input').trigger(_e);
            expect(key).toEqual(13);
        });
    });
    describe('testing Clear', function () {
        it('function is avaliable', function () {
            expect(dialog.clear).toBeDefined();
        });
        it('clear title', function () {
            dialog.title('jasmine');
            expect(dialog.title().length).toBeGreaterThan(0);
            expect(dialog.title()).not.toEqual('');
            dialog.clear();
            expect(dialog.title().length).toEqual(0);
            expect(dialog.title()).toEqual('');
        });
        it('clear content', function () {
            dialog.content($('<div/>'));
            expect(dialog.content().children().length).toBeGreaterThan(0);
            expect(dialog.content().html()).not.toEqual('');
            dialog.clear();
            expect(dialog.content().children().length).toEqual(0);
            expect(dialog.content().html()).toEqual('');
        });
        it('clear tip', function () {
            dialog.tip('jasmineTip');
            expect(dialog.tip().html()).not.toEqual('');
            dialog.clear();
            expect(dialog.tip().html()).toEqual('');
        });
        it('clear button', function () {
            dialog.button('jasmineButton');
            expect(dialog.tip().siblings().length).toBeGreaterThan(0);
            dialog.clear();
            expect(dialog.tip().siblings().length).toEqual(0);
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