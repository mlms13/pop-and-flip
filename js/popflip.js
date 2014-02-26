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
            elements = {},
            $cloned = options.$original.clone();

        // cache the elements so we don't have to keep doing .find()
        elements.original = {
            $front: options.$original.find('.popflip-front'),
            $back: options.$original.find('.popflip-back')
        };

        elements.cloned = {
            // not needed yet: $front: $cloned.find('.popflip-front')
            $back: $cloned.find('.popflip-back')
        };

        // keep track of the original dimensions before we do any resizing
        dimensions.front = {
            height: elements.original.$front.outerHeight(),
            width: elements.original.$front.outerWidth()
        };

        dimensions.back = {
            height: elements.original.$back.outerHeight(),
            width: elements.original.$back.outerWidth()
        };

        this.showBack = function () {
            // position the clone and append it to the body
            $cloned.css({
                height: dimensions.front.height,
                width: dimensions.front.width,
                position: 'absolute',
                top: position.top,
                left: position.left
            }).appendTo('body');

            // hide the original card
            options.$original.hide();

            // scale the $back so it fits inside its parent
            elements.cloned.$back.css('width', dimensions.front.width);

            // after the element has been added to the document
            window.setTimeout(function () {
                // flip and position the clone
                $cloned.css({
                    height: dimensions.back.height,
                    width: dimensions.back.width,
                    left:  ($(window).width() / 2) - (dimensions.back.width / 2) + 'px',
                    top: '50px' // this is completely arbitrary
                }).addClass('flipped');

                // scale the back side up to its full size
                elements.cloned.$back.css('width', dimensions.back.width);
            }, 0);

            // set up a handler to un-flip the card
            elements.cloned.$back.on('click', function () {
                self.showFront();
            });
        };

        this.showFront = function () {
            var transitionend = utility.whichTransition();

            // reset the position and original dimensions,
            // then and un-flip the card
            $cloned.css({
                height: dimensions.front.height,
                width: dimensions.front.width,
                left: position.left,
                top: position.top
            }).removeClass('flipped');

            // transition back's width to match front
            elements.cloned.$back.css('width', dimensions.front.width);

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