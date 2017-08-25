;(function ($, window, document, undefined) {
  var pluginName = "jqueryAccordionMenu";
  var defaults = {
    speed: 300,
    showDelay: 0,
    hideDelay: 0,
    singleOpen: true,
    clickEffect: true
  };

  function Plugin(element, options) {
    this.element = element;
    this.settings = $.extend({},
      defaults, options);
    this._defaults = defaults;
    this._name = pluginName;
    this.init()
  };
  $.extend(Plugin.prototype, {
    init: function () {
      this.openSubmenu();
      this.submenuIndicators();
      if (defaults.clickEffect) {
        this.addClickEffect()
      }
    },
    openSubmenu: function () {
      $(this.element).children("ul").find("li").bind("click touchstart",
        function (e) {
          e.stopPropagation();
          e.preventDefault();
          if ($(this).children(".category-list-child").length > 0) {
            if ($(this).children(".category-list-child").css("display") == "none") {
              $(this).children(".category-list-child").delay(defaults.showDelay).slideDown(defaults.speed);
              $(this).children(".category-list-child").siblings("a").addClass("submenu-indicator-minus");
              if (defaults.singleOpen) {
                $(this).siblings().children(".category-list-child").slideUp(defaults.speed);
                $(this).siblings().children(".category-list-child").siblings("a").removeClass("submenu-indicator-minus")
              }
              return false
            } else {
              $(this).children(".category-list-child").delay(defaults.hideDelay).slideUp(defaults.speed)
            }
            if ($(this).children(".category-list-child").siblings("a").hasClass("submenu-indicator-minus")) {
              $(this).children(".category-list-child").siblings("a").removeClass("submenu-indicator-minus")
            }
          }
          var href = $(this).children("a").attr("href");
          var win_href = decodeURIComponent(window.location.href);
          if (win_href && win_href.substr(win_href.indexOf('/', win_href.indexOf('//') + 2)) !== href) {
            window.location.href = href;
          }
        })
    },
    submenuIndicators: function () {
      if ($(this.element).find(".category-list-child").length > 0) {
        $(this.element).find(".category-list-child").siblings("a").append("<span class='submenu-indicator'>+</span>")
      }
    },
    addClickEffect: function () {
      var ink, d, x, y;
      $(this.element).find("a").bind("click touchstart",
        function (e) {
          $(".ink").remove();
          if ($(this).children(".ink").length === 0) {
            $(this).prepend("<span class='ink'></span>")
          }
          ink = $(this).find(".ink");
          ink.removeClass("animate-ink");
          if (!ink.height() && !ink.width()) {
            d = Math.max($(this).outerWidth(), $(this).outerHeight());
            ink.css({
              height: d,
              width: d
            })
          }
          x = e.pageX - $(this).offset().left - ink.width() / 2;
          y = e.pageY - $(this).offset().top - ink.height() / 2;
          ink.css({
            top: y + 'px',
            left: x + 'px'
          }).addClass("animate-ink")
        })
    }
  });
  $.fn[pluginName] = function (options) {
    this.each(function () {
      if (!$.data(this, "plugin_" + pluginName)) {
        $.data(this, "plugin_" + pluginName, new Plugin(this, options))
      }
    });
    return this
  }
})(jQuery, window, document);