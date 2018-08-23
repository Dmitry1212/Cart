var Cart = {
    renderGoodsList() {
        $('#goods').empty();
        $.get('http://localhost:3000/goods', {}, function (goods) {
            var $ul = $('<ul />');
            goods.forEach(function (item) {
                $ul.append(
                    $('<li />', {
                        text: item.name + ' ' + item.price + ' rub.'
                    })
                        .append(
                            $('<button />', {
                                text: 'Buy',
                                'data-id': item.id,
                                'data-price': item.price,
                                'data-name': item.name
                            })
                        )
                )
            });
            $('#goods').append($ul);
        }, 'json');
    },

    renderCart() {
        $('#cart').empty();
        $.get('http://localhost:3000/cart', {}, function (goods) {
            var $ul = $('<ul />');
            var total = 0;
            goods.forEach(function (item) {
                $ul.append(
                    $('<li />', {
                        text: item.name + ' (' + item.quantity + ')'
                    })
                        .append(
                            $('<button />', {
                                text: 'Remove',
                                class: "remove",
                                'data-id': item.id,
                                'data-price': item.price,
                                'data-name': item.name,
                                'data-quantity': item.quantity
                            })
                        )
                        .append(
                            $('<button />', {
                                text: '-1',
                                class: "minus"
                            })
                        )
                );
                total += +item.quantity * +item.price;
            });
            $('#cart').append($ul);
            $('#cart').append($('<div />', {text: 'Total: ' + total + ' rub.'}))
        }, 'json');
    },
    deleteItem(item, event) {
        $.ajax({
            type: 'DELETE',
            url: 'http://localhost:3000/cart/' + $(item).attr('data-id'),
            success: function () {
                Cart.renderCart();
            }
        })
    },
    minusItem(item, event) {
        var minus = $(item).prev();
        if (minus.attr('data-quantity') !== '1') {
            $.ajax({
                type: 'PATCH',
                url: 'http://localhost:3000/cart/' + minus.attr('data-id'),
                data: {quantity: +minus.attr('data-quantity') - 1},
                success: function () {
                    Cart.renderCart();
                }
            });
        } else {
            $.ajax({
                type: 'DELETE',
                url: 'http://localhost:3000/cart/' + minus.attr('data-id'),
                success: function () {
                    Cart.renderCart();
                }
            })
        }
    },
    addGood(item, event) {
        var good = {
            id: $(item).attr('data-id'),
            price: $(item).attr('data-price'),
            name: $(item).attr('data-name'),
            quantity: 1
        };
        if ($('#cart li button[data-id="' + good.id + '"]').length) {
            var $good = $('#cart li button[data-id="' + good.id + '"]');

            $.ajax({
                type: 'PATCH',
                url: 'http://localhost:3000/cart/' + good.id,
                data: {quantity: +$good.attr('data-quantity') + 1},
                success: function () {
                    Cart.renderCart();
                }
            });
        } else {
            $.ajax({
                type: 'POST',
                url: 'http://localhost:3000/cart',
                data: good,
                success: function () {
                    Cart.renderCart();
                }
            });
        }
    }
};


(function ($) {
    $(document).ready(function () {
        $('.slider').bxSlider();

        Cart.renderGoodsList();
        Cart.renderCart();

        $('#cart').on('click', 'li button.remove', function (event) {
            Cart.deleteItem(this, event);
        });


        $('#cart').on('click', 'li button.minus', function (event) {
            Cart.minusItem(this, event);
        });

        $('#goods').on('click', 'li button', function ( event) {
            Cart.addGood(this, event);
            event.preventDefault();
        })
    });
})
(jQuery);

