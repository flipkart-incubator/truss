describe('Truss', function() {

    it('Should exist', function() {
        expect(Truss).toBeTruthy();
    });

    it('Should expose method to "createInstance"', function () {
        expect(typeof Truss.createInstance).toBe("function");
    });

    it('Should be able to render nested modules with static data [No Custom render, No initOn, No resolveRenderOn]', function(){

    })
});