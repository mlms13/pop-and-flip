(function ($, undefined) {
    var PopAndFlip, utility = {};

    utility.whichTransition = function () {
        // stolen from Bootstrap and Modernizr, via Stack Overflow
        // http://stackoverflow.com/a/9090128/388639
        var t, el, transitions;

        el = document.createElement('fake');
        transitions = {
            'transition':'transitionend',
            'OTransition':'oTransitionEnd',
            'MozTransition':'transitionend',
            'WebkitTransition':'webkitTransitionEnd'
        };

        for (t in transitions) {
            if (el.style[t] !== undefined) {
                return transitions[t];
            }
        }
        return false;
    };

    PopAndFlip = function (options) {
        var self = this,
            position = options.$original.position(),
            dimensions = {},
            $cloned = options.$original.clone();

        // keep track of the original dimensions before we do any resizing
        dimensions.front = {
            height: options.$original.find('.popflip-front').height(),
            width: options.$original.find('.popflip-front').width()
        };

        dimensions.back = {
            height: options.$original.find('.popflip-back').height(),
            width: options.$original.find('.popflip-back').width()
        };

        this.showBack = function () {
            // position the clone and append it to the body
            $cloned.css({
                'height': dimensions.front.height,
                'width': dimensions.front.width,
                'position': 'absolute',
                'top': position.top,
                'left': position.left
            }).appendTo('body');

            // hide the original card
            options.$original.hide();

            // flip and position the clone
            window.setTimeout(function () {
                $cloned.css({
                    'height': dimensions.back.height,
                    'width': dimensions.back.width,
                    left:  ($(window).width() / 2) - (dimensions.back.width / 2) + 'px',
                    top: '50px' // this is completely arbitrary
                }).addClass('flipped');
            }, 0);

            // set up a handler to un-flip the card
            $cloned.find('.popflip-back').on('click', function () {
                self.showFront();
            });
        };

        this.showFront = function () {
            var transitionend = utility.whichTransition();

            // reset the position and un-flip the card
            $cloned.css(position).removeClass('flipped');

            // after the transition ends,
            // show original and remove the clone
            $cloned.on(transitionend, function () {
                options.$original.show();
                $cloned.remove();
            });
        };

        options.$original.on('click', function () {
            self.showBack();
        });
    };

    $.fn.popAndFlip = function () {
        return this.each(function () {
            var card = new PopAndFlip({
                '$original': $(this)
            });
        });
    };
}(jQuery));