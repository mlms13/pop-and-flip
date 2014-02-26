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
            $cloned = options.$original.clone();

        this.showBack = function () {
            // position the clone and append it to the body
            $cloned.css({
                'min-height': options.$original.find('.popflip-front').height(),
                'min-width': options.$original.find('.popflip-front').width(),
                'position': 'absolute',
                'top': position.top,
                'left': position.left
            }).appendTo('body');

            // hide the original card
            options.$original.hide();

            // flip and position the clone
            window.setTimeout(function () {
                $cloned.css({
                    left:  ($(window).width() / 2) - ($cloned.width() / 2) + 'px',
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