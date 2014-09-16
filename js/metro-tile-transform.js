(function ($) {
    $.widget("metro.tileTransform", {

        version: "1.0.0",

        options: {
        },

        _create: function () {
            var element = this.element;
            var dim = {w: element.width(), h: element.height()};
            var mouseIsUp = false;

            function onMouseUp() {
                mouseIsUp = true;
                $(document).unbind('mouseup', onMouseUp);
            }

            element.on('click', function (e) {
//                e.preventDefault();
//                if (element[0].tagName == 'A' && element.attr('href')) {
//                    document.location.href = element.attr('href');
//                }
            });

            element.on('mousedown', function (e) {
                $(document).mouseup(onMouseUp);
                mouseIsUp = false;

                var X = e.pageX - $(this).offset().left, Y = e.pageY - $(this).offset().top;
                var transform = 'top';

                if (X < dim.w * 1 / 3 && (Y < dim.h * 1 / 2 || Y > dim.h * 1 / 2 )) {
                    transform = 'left';
                } else if (X > dim.w * 2 / 3 && (Y < dim.h * 1 / 2 || Y > dim.h * 1 / 2 )) {
                    transform = 'right'
                } else if (X > dim.w * 1 / 3 && X < dim.w * 2 / 3 && Y > dim.h / 2) {
                    transform = 'bottom';
                }

                $(this).addClass("tile-transform-" + transform);

                if (element[0].tagName == 'A' && element.attr('href')) {
                    setTimeout(function () {
                        document.location.href = element.attr('href');
                    }, 500);
                }
            });

            element.on('mouseup', function () {
                $(this)
                    .removeClass("tile-transform-left")
                    .removeClass("tile-transform-right")
                    .removeClass("tile-transform-top")
                    .removeClass("tile-transform-bottom");
            });
            element.on('mouseleave', function () {

                var fromTransition = $(this).hasClass('tile-transform-left')
                    || $(this).hasClass('tile-transform-right')
                    || $(this).hasClass('tile-transform-top')
                    || $(this).hasClass('tile-transform-bottom');

                $(this)
                    .removeClass("tile-transform-left")
                    .removeClass("tile-transform-right")
                    .removeClass("tile-transform-top")
                    .removeClass("tile-transform-bottom");

                if (fromTransition && mouseIsUp)
                    $(this).click();
            });
        },

        _destroy: function () {

        },

        _setOption: function (key, value) {
            this._super('_setOption', key, value);
        }
    })
})(jQuery);
