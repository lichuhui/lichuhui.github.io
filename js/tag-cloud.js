$(document).ready(function () {
  const $content = $('#content');
  const $container = $('#tag-cloud-container');

  if ($.contains($content[0], $container[0])) {
    $('#tags').slideUp('fast',function(){
      $(this).remove();
    });
  }

  const $tagCloud = $('#tag-cloud');
  const TAG_CLOUD = {
    _$tags: $container,
    _$tagCloud: $tagCloud,
    _reSize: function () {
      var mw = this._$tags.innerWidth();
      var w = TAG_CLOUD_LIST.length * 10;
      w = w < 250 ? 250 : w;
      w = w > mw ? mw : w;
      this._$tagCloud.css({'width': w, 'height': w});
    },
    _generateTagCloud: function () {
      WordCloud($tagCloud[0], {
        list: TAG_CLOUD_LIST,
        gridSize: 16,
        minSize: '12px',
        weightFactor: 16,
        classes: 'tag-cloud-span',
        color: 'random-dark',
        /*color: function() {
          return (['#000000','#7FDBFF','#0074D9','#F012BE','#2ECC40','#01FF70','#85144B','#001F3F','#3D9970','#FF851B','#B10DC9','#FF4136','#DDDDDD','#AAAAAA','#39CCCC','#FFDC00'])[Math.floor(Math.random() * 16)]
        },*/
        shape: 'circle',
        backgroundColor: '#f8f9fa',
        rotateRatio: 0.5,
        //rotationSteps: 2,
        hover: function (item) {
          if (item) {
            const tip = item[0] + '【' + item[1] + '篇文章】'
            const $span = $tagCloud.find('span:contains("' + item[0] + '")');
            $span.attr('aria-label', tip);
            $span.attr('data-microtip-position', 'top');
            $span.attr('role', 'tooltip');
          }
        },
        click: function(item) {
          if (item) {
            window.location.href = decodeURIComponent(window.location.href) + item[0] + '/';
          }
        }});
    }
  };
  TAG_CLOUD._reSize();
  TAG_CLOUD._generateTagCloud();
  $(window).resize(function(){
    TAG_CLOUD._$tagCloud.empty();
    TAG_CLOUD._reSize();
    TAG_CLOUD._generateTagCloud();
  });
});