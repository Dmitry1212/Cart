describe('Cart class', function() {

    it('Должна сделать рендер списка товаров после обращения в БД', function(done) {
        expect(Cart.renderGoodsList()).not.toThrowError();
        done();
    });

    it('Должна сделать рендер корзины после обращения в БД', function(done) {
        expect(Cart.renderCart()).toThrowError();
        done();
    });

    it('Должна счимтать сумму', function(done) {
        expect(Cart.sum(5,7)).toEqual(12);
        done();
    });

    // it('Должна удалять один товар', function() {
    //     expect(cart.deleteItem()).toThrow();
    // });
    //
    // it('Должна убирать одно наименование', function() {
    //     expect(cart.minusItem()).toThrow();
    // });
    //
    // it('Должна добавлять одно наименование', function() {
    //     expect(cart.addGood()).toThrow();
    // });
});