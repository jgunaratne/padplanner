$('.item').hide();

var activeItem;
var onTarget = false;

$('.thumb').draggable({ 
	revert: 'invalid',
    helper: 'clone',
    start: function(e, ui) {
    	var itemClass = e.currentTarget.className.replace(' thumb ui-draggable','');
    	activeItem = $('.' + itemClass + '.item');
    	activeItem.show();
        checkItemOverlap();
        activeItem.show();
    	activeItem.addClass('highlight');
        onTarget = false;
    },
    stop: function(e, ui) {
    	activeItem.removeClass('highlight');
        if (onTarget) {
            activeItem.show();
        } else {
            activeItem.hide();
        }
    }
});

$('.room').droppable({
	drop: function(e, ui) {
		calcPrice();
        onTarget = true;
	}
});

$('.item').click(function() {
	$(this).hide();
    calcPrice();
});

function checkItemOverlap() {
    var visibleItems = $('.item:visible');
    var classNames = [];
    for (var i = 0; i < visibleItems.length; i++) {
        for (var j = 0; j < visibleItems[i].classList.length; j++) {
            var itemClass = visibleItems[i].classList[j];
            if (itemClass != 'item' && itemClass != 'highlight' && itemClass != 'ui-draggable') {
                if (classNames[itemClass] == null) {
                    classNames[itemClass] = 0;
                } else {
                    classNames[itemClass]++;
                }
                
            }
        }
    }
    for (n in classNames) {
        if (classNames[n] > 0) {
            $('.' + n).hide();
        }
    }
}

function calcPrice() {
    var total = 0;
    var items = $('.item:visible');
    for (var i = 0; i < items.length; i++) {
        total += items[i].getAttribute('price') * 1;
    }
    $('.total').html('$' + total);
}