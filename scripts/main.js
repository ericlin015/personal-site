
(function sizeHandler() {

  var setMainCoverHeight = function() {
    var viewPortHeight = $(window).height();
    $('#main-cover').height(viewPortHeight);
    $('#main-backdrop').height(viewPortHeight);
  };

  var resizeHandler = function() {
    $(window).resize(function() {
      setMainCoverHeight();
    });
  };

  var init = function() {
    setMainCoverHeight();
    resizeHandler();
  };

  init();
})();