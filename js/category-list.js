(function($) {
  function filterList($list) {
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
  }

  function replaceHref($this) {
    $this.find('a').each(function(){
      $(this).attr('href', 'javascript:void(0);');
    });
  }

  function toggleActive($ele) {
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
  }

  function removeSpan($ele) {
    // $ele.find('li:has(ul) > span').remove();
  }

  $(function() {
    var $ele = $('#jquery-accordion-menu > .category-list:first');
    removeSpan($ele);
    toggleActive($ele)
    // replaceHref($ele);
    filterList($ele);
    $("#jquery-accordion-menu").jqueryAccordionMenu();
  });
})(jQuery);