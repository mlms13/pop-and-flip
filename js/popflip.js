(function ($, undefined) {
    var PopAndFlip = function (options) {
        var self = this;

        this.showBack = function () {
            var $cloned = options.$original.clone(),
                position = options.$original.position();

            // position the clone and append it to the body
            $cloned.css({
                    'position': 'absolute',
                    'top': position.top,
                    'left': position.left
                }).appendTo('body');

            // hide the original card
            options.$original.hide();

            // flip the clone
            window.setTimeout(function () {
                $cloned.addClass('flipped')
            }, 0);
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