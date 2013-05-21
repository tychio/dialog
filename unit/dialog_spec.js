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
            var _testNo = (Math.random() + '').slice(2, 7) + '';
            d.content($('<div/>').attr('id', _testId), {
                'zoom':  _testNo
            });
            expect($('#' + _testId).length).toBeGreaterThan(0);
            expect($('#' + _testId).parent().css('zoom')).toEqual(_testNo);
        });
    });
});