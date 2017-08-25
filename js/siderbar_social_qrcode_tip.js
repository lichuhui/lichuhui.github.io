$(function ($) {
  function generateQrcode($this) {
    $this.empty().qrcode({
      minVersion: 6,
      ecLevel: 'H',
      text: $this.attr('data-link'),
      quiet: 1,
      mode: 4,
      mSize: 0.3,
      image: $('#qrlogo')[0]
    });
  }

  var drops = function() {
    return $('.drop-target').each(function (index, ele) {
      var $dropContent = $('#drop-content-' + index);
      var content = '';
      if ($dropContent.attr('data-qrcode') === '/') {
        generateQrcode($dropContent);
        content = $dropContent.find('canvas')[0];
      } else {
        content = $dropContent.html();
      }
      return new Drop({
        target: this,
        classes: 'drop-theme-arrows-bounce',
        position: 'left center',
        constrainToWindow: true,
        constrainToScrollParent: false,
        openOn: 'hover',
        content: content
      });
    });
  }
  drops();
});