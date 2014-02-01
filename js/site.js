
var Pres = (function() {

  var self = this;

  var hasNextSlide = false;

  //
  // private

  var determineNext = function(direction) {
    var m = window.location.pathname.match(/(\d+)\.html/);
    var n = parseInt(m[1], 10);
    if (direction === 'left') n = n - 1; else n = n + 1;
    if (n < 0) n = 0;
    return '/slides/' + n + '.html';
  };

  //
  // public

  this.init = function() {

    $.get(
      determineNext('right')
    ).done(
      function(data) { hasNextSlide = true; }
    ).fail(
      function(data) { hasNextSlide = false; }
    )

    $('body').on('keyup', function(ev) {
      if (ev.keyCode === 37 && ev.shiftKey) {
        window.location.href = '/slides/0.html';
      }
      //else if (ev.keyCode === 39 && ev.shiftKey) {
      //}
      else if (ev.keyCode === 37) {
        window.location.href = determineNext('left');
      }
      else if (ev.keyCode === 39 && hasNextSlide) {
        window.location.href = determineNext('right');
      }
    });

    $('#page').text(window.location.pathname);
  };

  //
  // over.

  return this;

}).apply({});

