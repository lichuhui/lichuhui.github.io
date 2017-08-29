(function($) {
  const $sidebar_categories = $('#sidebar_container > #categories');
  const $content_categories = $('#content > #categories');
  const CATEGORY_LIST = {
    _filterList: function ($list) {
      $('#jquery-accordion-menu-filter-input').change(function() {
        var filter = $.trim($(this).val());
        if (filter) {
          $matches = $list.find('a:contains(' + filter + ')').parent();
          console.log('$matches: ' + $matches.length);
          $list.find('li').not($matches).slideUp();
          $matches.slideDown();
        } else {
          $list.find('li').slideDown();
        }
        return false;
      }).keyup(function() {
        $(this).change();
      });
    },
    _toggleActive: function ($ele) {
      var $first = null;
      $ele.find('li').each(function(index, ele){
        if (index === 0) {
          $first = $(ele);
        }
        $(this).bind('click', function () {
          $ele.find('li.active').removeClass('active');
          $(this).addClass('active');
        })
      });
      $first.addClass('active');
    },
    _buildMenu: function ($accordionMenu, $ele) {
      CATEGORY_LIST._toggleActive($ele)
      CATEGORY_LIST._filterList($ele);
      $accordionMenu.jqueryAccordionMenu();
    }
  };
  if ($content_categories.length > 0) {
    const $accordionMenu = $content_categories.find('#jquery-accordion-menu');
    const $ele = $accordionMenu.find('.category-list:first');
    if ($sidebar_categories.length > 0) {
      $sidebar_categories.slideUp('fast',function(){
        $(this).remove();
        CATEGORY_LIST._buildMenu($accordionMenu, $ele);
      });
    } else {
      CATEGORY_LIST._buildMenu($accordionMenu, $ele);
    }
  } else {
    const $accordionMenu = $sidebar_categories.find('#jquery-accordion-menu');
    const $ele = $accordionMenu.find('.category-list:first');
    CATEGORY_LIST._buildMenu($accordionMenu, $ele)
  }
})(jQuery);