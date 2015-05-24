var viewPortHeight = $(window).height();

(function sizeHandler() {

  var setMainCoverHeight = function() {
    viewPortHeight = $(window).height()
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

(function navHandler() {

  var setNavPosition = function() {
    $(document).scroll(function() {
      var scrollAmount = $(window).scrollTop();
      if (scrollAmount >= viewPortHeight/2) {
        $('nav').addClass('hidden');
      } else {
        $('nav').removeClass('hidden');
      }
    });
  };

  var init = function() {
    setNavPosition();
  };

  init();
})();

(function materialHandler() {

  var init = function() {
    $(".button-collapse").sideNav();
  };

  init();
})();

(function sideTab() {

  var setIndicator = function(fromIndex, toIndex) {
    var tabHeight = $('.side-tab').eq(0).outerHeight(),
      animateDuration = 150, first, second;

    if (toIndex > fromIndex) {
      $('.indicator-cover.bottom').css('margin-top',
        tabHeight * (toIndex + 1) + 'px');

      setTimeout(function() {
        $('.indicator-cover.top').css('margin-top',
          '-' + (tabHeight * 4 - tabHeight * toIndex) + 'px');
      }, animateDuration);
    } else {
      $('.indicator-cover.top').css('margin-top',
        '-' + (tabHeight * 4 - tabHeight * toIndex) + 'px');

      setTimeout(function() {
        $('.indicator-cover.bottom').css('margin-top',
          tabHeight * (toIndex + 1) + 'px');
      }, animateDuration);
    }
  };

  var tabsInit = function() {
    $('.side-tabs .side-tab a').click(function(e) {
      e.preventDefault();
      if ($(this).hasClass('active')) {
        return;
      }
      var activeTab = $('.side-tabs .side-tab a.active'),
        activeTabPanel = $('.tabs-contents .panel.active'),
        targetTab = $(this),
        targetTabPanel = $(targetTab.attr('href'));

      setIndicator(parseInt(activeTab.attr('tab-index')),
        parseInt(targetTab.attr('tab-index')));

      activeTab.removeClass('active');
      targetTab.addClass('active');

      activeTabPanel.removeClass('in');
      setTimeout(function() {
        activeTabPanel.removeClass('active');
        targetTabPanel.addClass('active');
        targetTabPanel.addClass('in');
      }, 350);

    });
  };

  $(document).ready(function(){
    tabsInit();
  });

})();

(function abc() {

  var methods = {
    init : function() {
      return this.each(function() {

      // For each set of tabs, we want to keep track of
      // which tab is active and its associated content
      var $this = $(this);
      var $active, $content, $links = $this.find('div.tab a'),
          $tabs_width = $this.width(),
          $tab_width = $this.find('div').first().outerWidth(),
          $index = 0;

      // If the location.hash matches one of the links, use that as the active tab.
      $active = $($links.filter('[href="'+location.hash+'"]'));

      // If no match is found, use the first link or any with class 'active' as the initial active tab.
      if ($active.length === 0) {
          $active = $(this).find('div.tab a.active').first();
      }
      if ($active.length === 0) {
        $active = $(this).find('div.tab a').first();
      }

      $active.addClass('active');
      $index = $links.index($active);
      if ($index < 0) {
        $index = 0;
      }

      $content = $($active[0].hash);

      // append indicator then set indicator width to tab width
      $this.append('<div class="indicator"></div>');
      var $indicator = $this.find('.indicator');
      if ($this.is(":visible")) {
        $indicator.css({"right": $tabs_width - (($index + 1) * $tab_width)});
        $indicator.css({"left": $index * $tab_width});
      }
      $(window).resize(function () {
        $tabs_width = $this.width();
        $tab_width = $this.find('div').first().outerWidth();
        if ($index < 0) {
          $index = 0;
        }
        if ($tab_width !== 0 && $tabs_width !== 0) {
          $indicator.css({"right": $tabs_width - (($index + 1) * $tab_width)});
          $indicator.css({"left": $index * $tab_width});
        }
      });

      // Hide the remaining content
      $links.not($active).each(function () {
        $(this.hash).hide();
      });


      // Bind the click event handler
      $this.on('click', 'a', function(e){
        $tabs_width = $this.width();
        $tab_width = $this.find('div').first().outerWidth();

        // Make the old tab inactive.
        $active.removeClass('active');
        $content.hide();

        // Update the variables with the new link and content
        $active = $(this);
        $content = $(this.hash);
        $links = $this.find('div.tab a');

        // Make the tab active.
        $active.addClass('active');
        var $prev_index = $index;
        $index = $links.index($(this));
        if ($index < 0) {
          $index = 0;
        }
        // Change url to current tab
        // window.location.hash = $active.attr('href');

        $content.show();

        // Update indicator
        if (($index - $prev_index) >= 0) {
          $indicator.velocity({"right": $tabs_width - (($index + 1) * $tab_width)}, { duration: 300, queue: false, easing: 'easeOutQuad'});
          $indicator.velocity({"left": $index * $tab_width}, {duration: 300, queue: false, easing: 'easeOutQuad', delay: 90});

        }
        else {
          $indicator.velocity({"left": $index * $tab_width}, { duration: 300, queue: false, easing: 'easeOutQuad'});
          $indicator.velocity({"right": $tabs_width - (($index + 1) * $tab_width)}, {duration: 300, queue: false, easing: 'easeOutQuad', delay: 90});
        }

        // Prevent the anchor's default click action
        e.preventDefault();
      });
    });

    },
    select_tab : function( id ) {
      this.find('a[href="#' + id + '"]').trigger('click');
    }
  };

  $.fn.tabs = function(methodOrOptions) {
    if ( methods[methodOrOptions] ) {
      return methods[ methodOrOptions ].apply( this, Array.prototype.slice.call( arguments, 1 ));
    } else if ( typeof methodOrOptions === 'object' || ! methodOrOptions ) {
      // Default to "init"
      return methods.init.apply( this, arguments );
    } else {
      $.error( 'Method ' +  methodOrOptions + ' does not exist on jQuery.tooltip' );
    }
  };

})();