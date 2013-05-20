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
        it('avaliable setting title function', function () {
            var _title = 'this title made by jasmine.';
            expect(d.title()).not.toEqual(_title);
            d.title(_title);
            expect(d.title()).toEqual(_title);
        });
    });
});