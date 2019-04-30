/* 
 * jQuery.announce - A micro-plugin for displaying unobtrusive announcements.
 * Developed by Cory LaViska for A Beautiful Site, LLC 
 * Licensed under the MIT license: http://opensource.org/licenses/MIT 
*/

if(jQuery) (function($) {
  'use strict';

  function create(type, options) {
    let defer = $.Deferred();
    let announcement = $('<div>');
    let timeout;

    if(typeof(options) === 'string') {
      options = { message: options };
    }

    options = $.extend({}, $.announce.defaults, options);

    /* Remove existing announcements */
    $('.' + options.className).remove();

    /* Create the announcement */
    $(announcement)
      .addClass(`${options.className}  ${options.className}-${type}`)
      .hide();

    /* Hide on click */
    if(options.hideOnClick) {
      $(announcement).on('click.announce', function() {
        clearTimeout(timeout);
        options.hide.call(announcement).then(defer.resolve);
      });
    }

    /* Set to page bottom */
    if(options.pos) {
      if(options.pos == 'bottom') {
        $(announcement)
            .removeClass()
            .addClass(`${options.className}-bt  ${options.className}-bt-${type}`)
      }
    }

    /* Set the message */
    if(options.html) {
      $(announcement).html(options.message);
    } else {
      $(announcement).text(options.message);
    }

    /* Add it to the DOM */
    $('body').append(announcement);

    /* Show it */
    options.show.call(announcement);

    /* Hide after a moment */
    timeout = setTimeout(function() {
      options.hide.call(announcement).then(defer.resolve);
    }, options.duration);

    return defer;
  }

  $.announce = {
    /* Default options */
    defaults: {
       className: 'announce',
        duration: 2000,
        hideOnClick: true,
        html: false,
        show: function() {
            let defer = $.Deferred();
            $(this).fadeIn(250, function() {
              defer.resolve();
            });
            return defer;
        },
        hide: function() {
            let defer = $.Deferred();
            $(this).fadeOut(250, function() {
              $(this).remove();
              defer.resolve();
            });
            return defer;
        }
    },
    /* Info */
    info: function(options) {
      return create('info', options);
    },

    info_outline: function(options) {
      return create('info_outline', options);
    },

    /*Danger */
    danger: function(options) {
      return create('danger', options);
    },

    danger_outline: function(options) {
      return create('danger_outline', options);
    },

    /* Success */
    success: function(options) {
      return create('success', options);
    },

    success_outline: function(options) {
      return create('success_outline', options);
    },

    /* Warning */
    warning: function(options) {
      return create('warning', options);
    },

    warning_outline: function(options) {
      return create('warning_outline', options);
    },

    /* Primary */
    primary: function(options) {
      return create('primary', options);
    },

    primary_outline: function(options) {
      return create('primary_outline', options);
    },

    /* Secondary */
    secondary: function(options) {
      return create('secondary', options);
    },

    secondary_outline: function(options) {
      return create('secondary_outline', options);
    },

    /* Dark */
    dark: function(options) {
      return create('dark', options);
    },

    dark_outline: function(options) {
      return create('dark_outline', options);
    },

    /* Light */
    light: function(options) {
      return create('light', options);
    },

    light_outline: function(options) {
      return create('light_outline', options);
    },

    /* Custom announcement */
    say: function(type, options) {
      return create(type, options);
    }
  };

})(jQuery);
