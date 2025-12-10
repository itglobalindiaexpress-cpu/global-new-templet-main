jQuery(document).ready(function () {
   
    function show_monthly() {
        console.log("inside if");
        jQuery(".monthly").show();
        jQuery(this).attr("checked", "checked");
        jQuery("#r1").removeAttr("checked", "checked");
        let priceArray = jQuery(".plans-card .monthly .price h2");
        let td_value = jQuery(
            ".detailed-comparison .table.table-striped tr:nth-child(3) td"
        );
        for (let i = 0; i < priceArray.length; i++) {
            $(td_value[i]).text($(priceArray[i]).text());
        }
        jQuery(".yearly").hide();
        jQuery(".payment p").hide();
        jQuery(".holiday-sale").hide();
        jQuery(".slider.round").one("click", show_yearly);
    }

    jQuery(".slider.round").one("click", show_monthly);

    new WOW().init();
    jQuery("#productSeries").owlCarousel({
        loop: true,
        margin: 20,
        nav: false,
        dots: false,
        autoplay: true,
        autoplayTimeout: 1000,
        autoplayHoverPause: true,
        responsiveClass: true,
        responsive: {
            0: {
                items: 1,
                nav: false,
            },
            600: {
                items: 1,
                nav: false,
                margin: 30,
            },
            768: {
                items: 1,
                nav: false,
            },
            1000: {
                items: 2,
                nav: true,
                loop: true,
            },
        },
    });
  
    let footerPos = $(".equal-space").offset().top;
    $(window).scroll(function () {
        if ($(this).scrollTop() > 50) {
            $("#header").addClass("shrink-nav");
        } else {
            $("#header").removeClass("shrink-nav");
        }

      
    });
  
    var swiper = new Swiper(".swiper-container.two", {
        speed: 800,
        autoplay: 2000,
        spaceBetween: 0,
        pagination: ".swiper-pagination",
        paginationClickable: true,
        effect: "coverflow",
        loop: true,
        centeredSlides: true,
        slidesPerView: "auto",
        coverflow: {
            rotate: 10,
            stretch: 100,
            depth: 150,
            modifier: 1.5,
            slideShadows: false,
        },
    });
   
});

var sections = $('.tabs-list')
  , nav = $('.side-tab')
  , nav_height = nav.outerHeight();

$(window).on('scroll', function () {
    var cur_pos = $(this).scrollTop();

    sections.each(function () {
        var top = $(this).offset().top - nav_height,
            bottom = top + $(this).outerHeight();

        if (cur_pos >= top && cur_pos <= bottom) {
            nav.find('a').removeClass('active');
            sections.removeClass('active');

            $(this).addClass('active');
            nav.find('a[href="#' + $(this).attr('id') + '"]').addClass('active');
        }
    });
});