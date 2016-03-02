(function($) {

    var defaults = {
        autoPlay: true,
        timer: 2000,
        showControls: true,
        arrows: true
    };

    var Playrr = function(element, options) {
        this.element = element;
        this.settings = $.extend({}, defaults, options);
        this.init();

    };
    Playrr.prototype.init = function() {
        if (this.settings.showControls) {
            this.controls();
        } else {
            this.runPlugin();
        }

        if (this.settings.autoPlay) {
            this.autoPlayer();
            this.pauseAutoPlayer();
        }

    };
    Playrr.prototype.nextSlide = function() {
        var currentSlide = $(".active");
        var nextSlide = currentSlide.next();
        if (!nextSlide.hasClass('slide')) {
            nextSlide = $(".slide").first();
        }
        currentSlide.fadeOut('fast').removeClass('active');
        nextSlide.fadeIn('fast').addClass('active');

        //    handling the dots
        var currentDot = $('.active-dot');
        var nextDot = currentDot.next();
        if (nextDot.length == 0) {
            nextDot = $('.dot').first();
        }
        currentDot.removeClass('active-dot');
        nextDot.addClass('active-dot');
    };
    Playrr.prototype.prevSlide = function() {
        var currentSlide = $('.active');
        var prevSlide = $('.active').prev();
        if (!prevSlide.hasClass('slide')) {
            prevSlide = $('.slide').last();
        }
        currentSlide.fadeOut('fast').removeClass('active');
        prevSlide.fadeIn('fast').addClass('active');
        //    handling the dots
        var currentDot = $('.active-dot');
        var prevDot = currentDot.prev();
        if (prevDot.length == 0) {
            prevDot = $('.dot').last();
        }
        currentDot.removeClass('active-dot');
        prevDot.addClass('active-dot');
    };
    Playrr.prototype.runPlugin = function() {
        var _ = this;
        // initiate the first slide
        $('.slide').first().addClass('active');

        //    attaching event handlers

        $('#next').click(function() {
            _.nextSlide();
        });

        $('#prev').click(function() {
            _.prevSlide();
        });

        // dot navigation
        $('.dot').click(function() {
            var dotClicked = $(this).index();
            if (!$('.slide').eq(dotClicked).hasClass('active')) {
                $('.active').fadeOut('fast').removeClass('active');
                $('.slide').eq(dotClicked).fadeIn('fast').addClass('active');
            }

            $('.active-dot').removeClass('active-dot');
            $(this).addClass('active-dot');
        });

    };
    Playrr.prototype.controls = function() {
        //    creating the main control div
        var nav = document.createElement('nav');
        nav.id = 'controls';
        //    appending it to the dom
        this.element.append(nav);

        if (this.settings.arrows) {

            //    creating the next/prev and the dots
            var next = document.createElement('span');
            next.id = 'next';
            $('#controls').append(next);

            var prev = document.createElement('span');
            prev.id = 'prev';
            $('#controls').append(prev);

        }
        var totalSlides = $('.slide').length;
        var dots = document.createElement('ul');
        dots.id = 'dots';
        for (var i = 0; i < totalSlides; i++) {
            var li = document.createElement('li');
            li.className = 'dot';
            dots.appendChild(li);
        }

        $('#controls').append(dots);

        $(this.element).children().eq(0).addClass('active');
        $('.dot').first().addClass('active-dot');

        this.runPlugin();
    };

    Playrr.prototype.autoPlayer = function() {
        var _ = this;

        timer = setInterval(function() {
            _.nextSlide();
        }, _.settings.timer);

    };
    Playrr.prototype.pauseAutoPlayer = function() {
        var _ = this;

        _.element.hover(function() {
            clearInterval(timer);
            timer = false;
        }, function() {
            if (!timer) {
                _.autoPlayer();
            }
        });

    };

    $.fn.playrr = function(options) {
        if (this.length !== 0) {
            new Playrr(this, options);
        }
    }
}(jQuery));
