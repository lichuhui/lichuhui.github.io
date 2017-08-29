$(document).ready(function () {
  const $sidebar_tags = $('#sidebar > #tags');
  const $content_tags = $('#content > #tags');
  const $tag_cloud = $content_tags.length > 0 ? $content_tags.find('#tag-cloud') : $sidebar_tags.find('#tag-cloud');
  const tagPathMap = TAG_CLOUD_DATA.tagPathMap;
  const $root_path_for_tag = $('#root-path-for-tag');

  if ($content_tags.length > 0) {
    $sidebar_tags.remove();
  }

  const TAG_CLOUD = {
    _$tags: $content_tags.length > 0 ? $content_tags : $sidebar_tags,
    _$tagCloud: $tag_cloud,
    _reSize: function () {
      var mw = this._$tags.innerWidth() - 14;
      var w = TAG_CLOUD_DATA.tagArray.length * 10;
      w = w < 250 ? 250 : w;
      w = w > mw ? mw : w;
      this._$tagCloud.css({'width': w, 'height': w});
    },
    _generateTagCloud: function () {
      WordCloud($tag_cloud[0], {
        list: TAG_CLOUD_DATA.tagArray,
        gridSize: 8,
        minSize: '1rem',
        weightFactor: 12,
        classes: 'tag-cloud-span',
        color: 'random-dark',
        /*color: function() {
          return (['#000000','#7FDBFF','#0074D9','#F012BE','#2ECC40','#01FF70','#85144B','#001F3F','#3D9970','#FF851B','#B10DC9','#FF4136','#DDDDDD','#AAAAAA','#39CCCC','#FFDC00'])[Math.floor(Math.random() * 16)]
        },*/
        shape: 'circle',
        backgroundColor: '#FFF',
        rotateRatio: 0.5,
        //rotationSteps: 2,
        hover: function (item) {
          if (item) {
            const tip = item[0] + '【' + item[1] + '篇文章】'
            const $span = $tag_cloud.find('span:contains("' + item[0] + '")');
            $span.attr('aria-label', tip);
            $span.attr('data-microtip-position', 'top');
            $span.attr('role', 'tooltip');
          }
        },
        click: function(item) {
          if (item) {
            window.location.href = $root_path_for_tag.val() + tagPathMap[item[0]];
          }
        }});
    },
    _buildTagCloud: function () {
      TAG_CLOUD._reSize();
      TAG_CLOUD._generateTagCloud();
    }
  };

  TAG_CLOUD._buildTagCloud();

  $(window).resize(function(){
    TAG_CLOUD._$tagCloud.empty();
    TAG_CLOUD._buildTagCloud();
  });
});