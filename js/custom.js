(function($) {

    "use strict";

    jQuery(document).ready(function($) {

        /* ----------------------------------------------------------- */
        /*  PRELOADER
        /* ----------------------------------------------------------- */

        $("body").toggleClass("loaded");
        setTimeout(function() {
            $("body").addClass("loaded");
        }, 3000);

        /* ----------------------------------------------------------- */
        /*  AJAX CONTACT FORM
        /* ----------------------------------------------------------- */

        $(".contactform").on("submit", function() {
            $(".output_message").text("Loading...");

            var form = $(this);
            $.ajax({
                url: form.attr("action"),
                method: form.attr("method"),
                data: form.serialize(),
                success: function(result) {
                    if (result == "success") {
                        $(".form-inputs").css("display", "none");
                        $(".box p").css("display", "none");
                        $(".contactform").find(".output_message").addClass("success");
                        $(".output_message").text("Message Sent!");
                    } else {
                        $(".tabs-container").css("height", "440px");

                        $(".contactform").find(".output_message").addClass("error");
                        $(".output_message").text("Error Sending!");
                    }
                }
            });

            return false;
        });

        /* ----------------------------------------------------------- */
        /*  PAGE ANIMATION
        /* ----------------------------------------------------------- */

        checkScreenSize();

        function checkScreenSize() {
            var newWindowWidth = $(window).width();
            if (newWindowWidth < 993) {
                $('#nav > li').on('click', function(e) {
                    e.preventDefault();
                    $('#main').addClass('open');
                });
            } else {}
        }
        var resizeTimer;
        $(window).on('resize', function(e) {
            clearTimeout(resizeTimer);
            resizeTimer = setTimeout(function() {
                checkScreenSize();
            }, 250);
        });
		
		// STOP VIDEOS WHEN CLICKING ON MENU LINKS
		function stop_videos() {
			if (video.paused !== true && video.ended !== true) {
				video.pause();
			}
			$('.youtube-video')[0].contentWindow.postMessage('{"event":"command","func":"' + 'pauseVideo' + '","args":""}', '*');
		}
		
		// MAIN NAVIGATION MENU
        $(".navigation > li").on("click", function(e) {
            if (!$(this).hasClass("active")) {
                var tabNum = $(this).index();
                var nthChild = tabNum + 2;
                $(".navigation > li.active").removeClass("active");
                $(this).addClass("active");
                $("#main > section.active").removeClass("active");
                $("#main > section:nth-child(" + nthChild + ")").addClass("active");
				stop_videos();
            }
			e.preventDefault();
        });
		
		// LINKS IN HOMEPAGE
		$(".call-to-actions li").on("click", function(e) {
			var tabNum = $(this).index();
			var nthChild = tabNum + 3;
			$("#main > section.active").removeClass("active");
			$("#main > section:nth-child(" + nthChild + ")").addClass("active");
			$(".navigation li:first-child").removeClass("active");
			 e.preventDefault();
        });
		$(".call-to-actions .link-about").on("click", function(e) {
			$(".navigation li:nth-child(2)").addClass("active");
		});
		$(".call-to-actions .link-work").on("click", function(e) {
			$(".navigation li:nth-child(3)").addClass("active");
		});
		
		// LINK TO LATEST POSTS
		$(".call-to-actions .link-blog").on("click", function(e) {
			var tabNum = $(this).index();
			var nthChild = tabNum + 4;
			$("#main > section.active").removeClass("active");
			$("#main > section:nth-child(" + nthChild + ")").addClass("active");
			$(".navigation li:nth-child(2)").removeClass("active");
			$(".navigation li:nth-child(4)").addClass("active");
			 e.preventDefault();
        });
		
        if (window.location.hash && $('#link-' + window.location.hash.replace(/^#/, '')).length) {
            $('#link-' + window.location.hash.replace(/^#/, '')).trigger('click');
        }
        window.userInteractionTimeout = null;
        window.userInteractionInHTMLArea = false;
        window.onBrowserHistoryButtonClicked = null;
        $(document).ready(function() {
            $(document).mousedown(function() {
                clearTimeout(window.userInteractionTimeout);
                window.userInteractionInHTMLArea = true;
                window.userInteractionTimeout = setTimeout(function() {
                    window.userInteractionInHTMLArea = false;
                }, 500);
            });
            $(document).keydown(function() {
                clearTimeout(window.userInteractionTimeout);
                window.userInteractionInHTMLArea = true;
                window.userInteractionTimeout = setTimeout(function() {
                    window.userInteractionInHTMLArea = false;
                }, 500);
            });
            if (window.history && window.history.pushState) {
                $(window).on('popstate', function() {
                    if (!window.userInteractionInHTMLArea) {
                        if (window.location.hash && $('#link-' + window.location.hash.replace(/^#/, '')).length) {
                            $('#link-' + window.location.hash.replace(/^#/, '')).trigger('click');
                        }
                        if (!window.location.hash) {
                            $('#link-work').trigger('click');
                        }
                    }
                    if (window.onBrowserHistoryButtonClicked) {
                        window.onBrowserHistoryButtonClicked();
                    }
                });
            }
        });
		
		// MATERIAL CAROUSEL
        $(".carousel.carousel-slider").carousel({
            fullWidth: true,
            indicators: true,
        });
		
		// BACK TO MAIN SECTION IN MOBILE
        $('.back-mobile').on('click', function(e) {
            $('#main').removeClass('open');
			stop_videos();
        });
		
		// RESUME CARDS ANIMATION
		if ($(window).width() > 800) {
			$(".resume-list-item, .resume-card").on("click", function() {
				$(".resume-list-item").removeClass("is-active");
				var e = parseInt($(this).data("index"),10);
				$("#resume-list-item-" + e).addClass("is-active");
				var t = e + 1,
					n = e - 1,
					i = e - 2;
				$(".resume-card").removeClass("front back up-front up-up-front back-back"), $(".resume-card-" + e).addClass("front"), $(".resume-card-" + t).addClass("back"), $(".resume-card-" + n).addClass("back-back"), $(".resume-card-" + i).addClass("back")
			});
		}

    });

    /* ----------------------------------------------------------- */

})(jQuery);