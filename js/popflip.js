(function ($, undefined) {
    var PopAndFlip = function (options) {
        var $el = options.$original;

        $el.on('click', function () {
            $(this).toggleClass('flipped');
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