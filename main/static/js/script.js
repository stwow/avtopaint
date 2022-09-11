$(function () {
  //Modals
  const $modalCall = $("[data-modal]");
  const $modalClose = $("[data-close]");
  const $modalSuccess = $('#message-success');
  const $modalError = $('#message-error');
  //Sliders
  const $servicesSlider = $('[data-slider="service"]');
  const $worksSlider = $('[data-slider="work"]');
  const worksCount = $('.work__item').length;
  const $reviewsSlider = $('[data-slider="review"]');
  //Nav
  const nav = $('#top_nav');
  const navToggle = $("#navToggle");
  //Popup
  const h_popup = '[data-popup="header"]';
  const b_popup = '[data-popup="body"]';
  //addPopups
  const ph_footer = '.footer__title';
  const exclude_parent = '.footer__contacts';
  const footer__col = '.footer__col';
  const footer__popups = '.footer__popups';

  //for media
  const fp_width = 1250;
  const w_tablet = 991;
  const w_mobile = 767;
  const w_mobile_sm = 565;
  const w_mobile_ssm = 380;
  const h_sm = 700;



  /* Initialization
  =========================*/

  //modals
  $('[data-modal]').css('cursor', 'pointer');
  //popups
  $(h_popup).css('cursor', 'pointer');

  //for footer popus
  //media footer popups replace
  if ($(window).width() < fp_width && !$(ph_footer).attr('data-popup')) {
    setPopup($(ph_footer), exclude_parent);
    replace($(footer__col).not(':first-child').children(), footer__popups);
    $(footer__col + ':last-child').css('display', 'none');
  }

  if ($(window).width() < w_tablet) {
    //title button replace
    replaceMany($('.title__header_col .btn'), $('.title__header_col--main'));

    //nav links rename
    if ($(window).width() > w_mobile) {
      renameLinksToS();
    }
  }

  //popups click bind
  $(h_popup).not($(ph_footer)).on("click", function (event) {
    slidePopup($(this));
  });

  // Navigation
  if ($(window).height() > h_sm) {
    fixNavigation();
  }

  // Sliders
  let slideCount = 3;
  let centerMode = true;

  if (worksCount < 4) {
    slideCount = 1;
    centerMode = false;

    if ($(window).width() > w_tablet) {
      addWorkFew();
    }
  }

  $(function () {
    $(window).scroll(function () {
      if ($(window).height() > h_sm ||
        $(window).width() < w_mobile) {
        fixNavigation();
      }
    });
  });

  /* /Initialization */



  /* @Media
  ====================*/

  //window resize
  $(window).resize(function () {
    //nav fixed
    if ($(window).height() > h_sm) {
      fixNavigation();
    } else {
      nav.removeAttr('style', 'top');
    }

    //footer popups
    if ($(window).width() < fp_width) {
      if (!$(ph_footer).attr('data-popup')) {
        setPopup($(ph_footer), exclude_parent);
        replace($(footer__col).not(':first-child').children(), footer__popups);
        $(footer__col + ':last-child').css('display', 'none');
      }
    } else {
      if ($(ph_footer).attr('data-popup')) {
        removePopup($(ph_footer));
        replace($(footer__popups).children().not(exclude_parent), $(footer__col).not(':first-child'));
        $(footer__col + ':last-child').css('display', 'flex');
      }
    } //footer popups

    //tablet
    if ($(window).width() < w_tablet) {
      //title button replace
      replaceMany($('.title__header_col .btn'), $('.title__header_col--main'));

      if ($(window).width() > w_mobile) {
        renameLinksToS();
      } else {
        renameLinksToL();
      }
    } else {
      replaceMany($('.title__header_col--main .btn'), $('.title__header_col.text-right'));
      renameLinksToL();
    }

    if (worksCount < 4) {
      if ($(window).width() > w_tablet) {
        if ($('.work.work--few')) addWorkFew();
      } else {
        removeWorkFew();
      }
    }
  })
  /* /@Media */


  /* Navigation
  ======================*/

  function fixNavigation() {
    let top = $(this).scrollTop();
    let h_mrg = 0; // отступ когда меню уже не видно

    if ($(window).width() > w_mobile) {
      let nav_h = nav.parent().height(); // высота меню

      if (top + h_mrg < nav_h) {
        nav.css('top', (nav_h - top));
      } else {
        nav.css('top', h_mrg);
      }

    } else {
      nav.removeAttr('style', 'top');
    }
  }

  function navHeight() {
    nav.parent().height();
  }
  /* /Navigation */


  /* Mobile nav
  ==================*/

  navToggle.on("click", function (event) {
    event.preventDefault();

    navToggle.find('.burger__lines').toggleClass("active");
    nav.toggleClass("show");
  });


  /* Scroll
  ====================*/

  $(".nav__link").on("click", function (event) {
    event.preventDefault();

    let nav_h = nav.parent().height();
    let id = $(this).attr('href');
    let mark = $(id).offset().top;

    $('body,html').animate({
      scrollTop: (mark - nav_h)
    }, 1500);
  });

  $('#up').click(function () {
    $('body,html').animate({
      scrollTop: 0
    }, 500);
    return false;
  })
  /* /Scroll */



  /* Input for photos
  ====================*/

  $('input[type="file"]').on('change', function () {
    let $parent = $(this).parents('.add-files');
    let $label = $(this).parent('label.add-photo');
    let $text = $label.find('span');
    let length = this.files.length;

    if ($ul = $parent.find('ul')) {
      $ul.remove();
      $label.removeClass('input--bd');
    }

    if (length > 0) {
      $parent.append('<ul></ul>');
      $label.addClass('input--bd');
      $text.text('Прикрепленные фотографии:');
      for (var i = 0; i < length; i++) {
        $parent.find('ul').append('<li>' + this.files[i].name + /*+ <span>&#215;</span> + */ '</li>')
      }
    } else {
      $text.text('Прикрепить фотографии');
    }

    //удалять фото по клику на крестик - доработать
    /*$('.add-files li span').on('click', function () {
      $(this).parent('li').remove();
    });*/
  });
  /* /Input for photos */


  /* Submit
  ======================*/

  $('[data-submit]').on('click', function (event) {
    event.preventDefault();
    let $this = $(this);
    let url = $this.parents('form').attr('action');
    let data = new FormData($this.parents('form')[0]);
    // let $captcha_container = $this.parent('form').find('.captcha__container');

    // let result = true;
    //
    // if (result) {
    //   modalShow($modalSuccess);
    //   $this.parent('form').trigger('reset');
    //   $captcha_container.find('.error__text').remove();
    // } else {
    //
    //   if ($captcha_container.find('.error__text').length == 0) {
    //     $captcha_container.find('input[type=text]').before('<p class="error__text">Не верный ответ</p>');
    //   }
    // }
    $.ajax({
        url: url,
        type: "POST",
        processData: false,
        contentType: false,
        data: data
      })
      .done(response => {
        let result = $.parseJSON(response);
        let $captcha_container = $this.parent('form').find('.captcha__container');

        if (result.haveErrors) {
          modalShow($modalSuccess);
          $this.parent('form').trigger('reset');
          $captcha_container.find('.error__text').remove();
        } else {

          if ($captcha_container.find('.error__text').length == 0) {
            $captcha_container.find('input[type=text]').before('<p class="error__text">Не верный ответ</p>');
          }
        }
      })
      .fail((error) => {
        $modalError.find('.modal__title').text('Ошибка!')
        $modalError.find('.message__text').text(error.responseText);

        modalShow($modalError);
      })
  })
  /* Submit */


  /* Modals
  ======================*/

  function modalShow(modal) {
    $('.modal.show').each((i, elem) => {
      modalClose(elem);
    })

    $(modal).addClass('show');
    $("body").addClass('no-scroll');

    setTimeout(function () {
      $(modal).find(".modal__dialog").css({
        transform: "scale(1)"
      });
    }, 200);

    if (modal.indexOf("#service_") >= 0) {
      $servicesSlider.slick('setPosition');
    }
  }

  function modalClose(modal) {
    let $modal = $(modal);

    $modal.find(".modal__dialog").css({
      transform: "scale(0)"
    });

    setTimeout(function () {
      $modal.removeClass('show');
    }, 200);

    $("body").removeClass('no-scroll');
  }

  $modalCall.on("click", function (event) {
    event.preventDefault();
    let modalId = $(this).data('modal');

    if (modalId.indexOf("#service_") >= 0) {
      $.get("/", {modalId: modalId})
        .done(response => {
          //заполнить модалку данными
        })
        .fail(error => {
          $modalError.find('.modal__title').text('Ошибка!')
          $modalError.find('.message__text').text(error.responseText);

          modalShow($modalError);
        })
    } else {
      modalShow(modalId);
    }
  });


  function addWorkFew() {
    $('.work').addClass('work--few');
  }

  function removeWorkFew() {
    $('.work').removeClass('work--few');
  }

  $modalClose.on("click", function (event) {
    event.preventDefault();

    let modal = $(this).parents('.modal');
    modalClose(modal);
  });


  $(".modal").on("click", function (event) {
    modalClose(this)
  });

  $(".modal__dialog").on("click", function (event) {
    event.stopPropagation();
  });
  /* /Modals */



  /* Sliders: https://kenwheeler.github.io/slick/
    =====================*/

  function servicesSlickInit() {
    $servicesSlider.slick({
      infinite: true,
      slidesToShow: 1,
      slidesToScroll: 1,
      fade: true,
      arrows: true,
      dots: true,
      lazyLoad: true,
      autoplay: true,
      autoplaySpeed: 2000,
      draggable: false,
      responsive: [{
        breakpoint: w_mobile_ssm,
        settings: {
          arrows: false
        }
    }]
    });
  }

  $worksSlider.slick({
    slidesToShow: slideCount,
    centerMode: centerMode,
    speed: 650,
    draggable: false,
    //    autoplay: true,
    autoplaySpeed: 2000,
    lazyLoad: true,
    responsive: [{
        breakpoint: w_tablet,
        settings: {
          fade: true,
          slidesToShow: 1
        }
    },
      {
        breakpoint: w_mobile,
        settings: {
          centerMode: true,
          fade: true,
          slidesToShow: 1,
          arrows: false
        }
      }]
  });

  $reviewsSlider.slick({
    centerMode: true,
    slidesToShow: 3,
    draggable: false,
    autoplay: true,
    autoplaySpeed: 2000,
    responsive: [{
        breakpoint: w_tablet,
        settings: {
          slidesToShow: 1,
        }
    },
      {
        breakpoint: w_mobile_sm,
        settings: {
          fade: true,
          slidesToShow: 1,
          arrows: false
        }
                }]
  });

  $(".slickPrev").on("click", function (event) {
    event.preventDefault();

    let currentSlider = $(this).parents('.modal').find('[data-slider="service"]');

    currentSlider.slick("slickPrev");
  });

  $(".slickNext").on("click", function (event) {
    event.preventDefault();

    let currentSlider = $(this).parents('.modal').find('[data-slider="service"]');

    currentSlider.slick("slickNext");
  });
  /* /Sliders */


  /* Helpers
  ========================*/

  function replace($from, to) {
    $from.detach().appendTo(to);
  }

  function replaceMany($from, to) {
    $from.each(function (i, elem) {
      $(elem).detach().appendTo(to.get(i));
    });
  }

  function renameLinksToS() {
    $('nav a[href="#works"]').text("Примеры");
    $('nav a[href="#faq"]').text("Вопросы");
    $('nav a[href="#submit_photos"]').text("Оценка ремонта");
  }

  function renameLinksToL() {
    $('nav a[href="#works"]').text("Примеры работ");
    $('nav a[href="#faq"]').text("Частые вопросы");
    $('nav a[href="#submit_photos"]').text("Оценка ремонта по фото");
  }
  /* Helpers */

  /* Poppup
  ===========================*/

  function setPopup(elem) {
    setPopup(elem, false);
  }

  function setPopup(elem, set_active) {
    let body = elem.next();
    let $b_active = '';

    elem.attr('data-popup', 'header');
    elem.addClass('popup__header');
    elem.parent().addClass('popup');
    body.attr('data-popup', 'body');

    if (set_active) {
      let $parent = elem.parents(set_active);
      let $h_active = $parent.find(elem);

      $b_active = $h_active.next();
      $h_active.addClass('active');
    }

    body.not($b_active).slideUp();

    elem.on('click', function (event) {
      slidePopup($(this));
    });
  }

  function removePopup(elem) {
    let body = elem.next();

    if (elem.is('.active')) {
      elem.removeClass('active');
    }
    body.slideDown();
    elem.attr("onclick", "").unbind("click");
    elem.parent().removeClass('popup');
    elem.removeClass('popup__header');
    elem.removeAttr('data-popup');
    body.removeAttr('data-popup');
  }

  function slidePopup(elem) {
    let one_active = 'popups-one_active';
    let $parent = elem.parents('.popups');

    if ($parent.hasClass(one_active)) {
      let not_elem = $parent.find(h_popup).not(elem);
      not_elem.removeClass('active').next().slideUp();
      not_elem.find('img').removeClass('open');
    }
    elem.toggleClass('active').next().slideToggle();
    elem.find('img').toggleClass('open');
  }
  /* /Poppup */
});