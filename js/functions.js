$(document).ready(function () {
    //ADD A VIDEO ICON FOR PHOTOS THAT HAVE VIDEOS
    $('.photo.video a').append('<span></span>');

    //ADD BLINKING CURSOR ANIMATION TO MASTHEAD
    $('.masthead input[type=text]').addClass('off');
    $('.masthead input[type=text]').on('focus', function () {
        $(this).removeClass('off');
    })


    //SETTINGS DROPDOWN TOGGLE
    $('.settings .avatar a').on('mouseover click', function () {
        $('.settings nav').toggleClass('on')
    })

    $('.settings .avatar a').on('mouseout', function () {
        $('.settings nav').toggleClass('on')
    })

    //PROFILE SETTINGS FOCUS CHANGE
    $('.profile-settings .bio input').on('focus', function () {
        $(this).parent().addClass('on');
    }).on('blur', function () {
        $(this).parent().removeClass('on');
    })


    //ADD BOTTOM BORDER IN LIST VIEW FOR POSTS WITHOUT A PHOTO
    $('.posts.view-list > .post').each(function () {
        if ($(this).children('.photo').size() > 0) {
            $(this).addClass('noborder');
        }
    })

    $('.post .content').each(function () {
        //ADD A VIEW MORE TOGGLE IF POST HAS RESPONSES
        if ($(this).siblings('.responses').size() > 0) {
            $(this).append('<a href="#!" class="expand" data-togglevalue="Collapse">Expand</a>');
        }
    })

    //EXPAND FUNCTION
    $('.post .content').on('click', '.expand', function (e) {
        var newToggleValue = $(this).text();

        $(this).text($(this).data('togglevalue'));
        $(this).data('togglevalue', newToggleValue);

        $(this).toggleClass('on');

        $(this).parent().next('.responses').slideToggle();

        e.preventDefault();
    })


    //SHOW ONLY THE FIRST FIVE POSTS ON INITIAL LOAD
    $('.post:gt(5)').hide();

    //LOAD MORE POSTS
    $('.load-more').on('click', function () {
        $('.post:gt(5)').slideToggle();
        $(this).hide();
    })

    function revertToList() {
        $('.post').removeClass('dontsplit');
        $('.posts .column').each(function () {
            $(this).children().clone(true).appendTo('.posts');
        })

        $('.posts .content .tools').remove();
        $('.posts .column').remove();
    }


    //SHOW LIST VIEW
    $('.view-mode a.view-list').on('click', function () {
        if ($('.posts.view-list').size() <= 0) {
            $('.view-mode a').removeClass('on');
            $(this).addClass('on');

            var viewmode = $(this).data('viewmode');
            var oldclass = $('.posts').attr('class').split(' ')[1];

            $('.posts').removeClass(oldclass).addClass(viewmode);

            $('.load-more').hide();

            revertToList();
        }

        return false;
    })

    //SHOW TILE VIEW
    $('.view-mode a.view-tile').on('click', function () {

        if ($('.posts.view-tile').size() <= 0) {
            $('.post').show();

            $('.view-mode a').removeClass('on');
            $(this).addClass('on');

            var viewmode = $(this).data('viewmode');
            var oldclass = $('.posts').attr('class').split(' ')[1];

            $('.posts').removeClass(oldclass).addClass(viewmode);

            //CLONE TOOLS TO ALLOW EXPANDED STICKY VIEW
            $('.posts > .post > .content').each(function () {
                if ($(this).children('.expand').size() > 0) {
                    $(this).closest('.post').children('.tools').clone().appendTo($(this).closest('.post').find('.content'));
                }
            })

            $('.post').addClass('dontsplit');
            $('.posts').columnize({ columns: 3, lastNeverTallest: true });

            $('.load-more').hide();

        }
        return false;
    })

    //SHOW ALL
    $('.filter a.all').on('click', function () {
        if ($(this).hasClass('on') == false) {
            $('.posts').removeClass('view-tile').addClass('view-list');
            $('.filter a').removeClass('on');
            $(this).addClass('on');
            $('.view-mode').show();
            $('.post').show();

            $('.load-more').hide();

            revertToList();
        }

        return false;
    })


    //SHOW ONLY PHOTOS
    $('.filter a.photos').on('click', function () {
        $('.posts').removeClass('view-list').addClass('view-tile');
        $('.filter a').removeClass('on');
        $(this).addClass('on');
        $('.view-mode').hide();

        $('.posts .column').each(function () {
            $(this).children().clone(true).appendTo('.posts');
        })

        $('.posts .content .tools').remove();
        $('.posts .column').remove();

        $('.post').addClass('dontsplit');
        $('.post ').show();
        $('.post ').not($('.photo:not(.video)').parent()).hide();
        $('.posts').columnize({ columns: 3, lastNeverTallest: true });

        $('.load-more').hide();

        return false;
    })

    //SHOW ONLY VIDEOS
    $('.filter a.videos').on('click', function () {
        $('.posts').removeClass('view-list').addClass('view-tile');
        $('.filter a').removeClass('on');
        $(this).addClass('on');
        $('.view-mode').hide();

        $('.posts .column').each(function () {
            $(this).children().clone(true).appendTo('.posts');
        })

        $('.posts .content .tools').remove();
        $('.posts .column').remove();

        $('.post').addClass('dontsplit');
        $('.post ').show();
        $('.post ').not($('.photo.video').parent()).hide();
        $('.posts').columnize({ columns: 3, lastNeverTallest: true });

        $('.load-more').hide();

        return false;
    })


    //CLOSE MODAL
    function closeModal() {
        $('.modal, .modal-bg').fadeOut().queue(function (n) {
            $('.modal, .modal-bg').remove();
            n();
        })

        return false;
    }

    //SHOW MODAL MSG WINDOW
    $('.newmsg').on('click', function () {
        $('body').append('<div class="modal-bg"></div>');
        $('body').append('<div class="modal" tabindex="0"></div>');
        $('.modal').load('sub-createmsg.html', function () {
            $('.modal section').append('<a href="#!" class="close">Close</a>')
            $('.modal-bg').fadeIn(500);
            $('.modal').delay(500).fadeIn(500);
        })

        return false;
    })

    //PHOTO MODAL
    $('.posts .photo a').on('click', function () {
        $('body').append('<div class="modal-bg"></div>');
        $('body').append('<div class="modal photo" tabindex="0"></div>');
        $(this).closest('.post').clone().appendTo('.modal');
        $('.modal .photo').prependTo('.modal');
        $('.modal .post .content').after('<div class="responses"><form method="post" action="#!"><input type="text" placeholder="Reply" /></form></div>')
        $('.modal .photo').append('<a href="#!" class="close">Close</a>')


        $('.modal-bg').fadeIn(500);
        $('.modal').delay(500).fadeIn(500);
        return false;
    });

    //CLOSE MODAL 
    $('body').on('click', '.close', closeModal);
    $('body').on('click', '.modal-bg', closeModal);

    $(document).keyup(function (e) {
        if (e.keyCode == 27) {
            closeModal();
        }
    });
})