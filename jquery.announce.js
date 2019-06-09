//
// jQuery.announce - A micro-plugin for displaying unobtrusive announcements.
//
// Developed by Cory LaViska for A Beautiful Site, LLC
//
// Licensed under the MIT license: http://opensource.org/licenses/MIT
//
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

    // Remove existing announcements
    $('.' + options.className).remove();

    // Create the announcement
    $(announcement)
      .addClass(options.className + ' ' + options.className + '-' + type)
      .hide();

    // Hide on click
    if(options.hideOnClick) {
      $(announcement).on('click.announce', function() {
        clearTimeout(timeout);
        options.hide.call(announcement).then(defer.resolve);
      });
    }

    // Set the message
    if(options.html) {
      $(announcement).html(options.message);
    } else {
      $(announcement).text(options.message);
    }

    // Add it to the DOM
    $('body').append(announcement);

    if(options.vPos != 'top') {
      switch(options.vPos) {
        case 'bottom':
          $(announcement).addClass('announce-bottom');
          break;
        case 'center':
          $(announcement).addClass('announce-center');
          break;
      }
    } else {
      $(announcement).css('top', 0);
    }

    if(options.hPos != 'center') {
      switch(options.hPos) {
        case 'left':
          $(announcement).css('left', 0);
          break;

        case 'right':
          $(announcement).css({'left' : 
              `calc(100% - ${$(announcement).width()}px)`});
          break;
        }
    }

    if(options.bootstrap) {
      let type = $(announcement).prop('class');
      type = type.split(' ')[1].split('-')[1];
      $(announcement).css('background-color', options.btColors[type]);
      if(type == 'light' || type == 'warning') {
        $(announcement).css('color', options.btColors.light_fg);
      }
    }

    if(options.outline) {
      $(announcement).css('color', $(announcement).css('background-color'));
      $(announcement).css('background-color', options.outlineColor);
      $(announcement).addClass('announce-border');
    }

    // Show it
    options.show.call(announcement);

    // Hide after a moment
    timeout = setTimeout(function() {
      options.hide.call(announcement).then(defer.resolve);
    }, options.duration);

    return defer;
  }

  $.announce = {
    // Default options
    defaults: {
      className: 'announce',
      duration: 2000,
      hideOnClick: true,
      html: false,
      bootstrap: false,
      outline: false,
      outlineColor: 'transparent',
      vPos: 'top',
      hPos: 'center',
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
      },
      btColors: {
          info: '#17a2b8',
          danger: '#dc3545',
          warning: '#ffc107',
          success: '#28a745',
          primary: '#007bff',
          secondary: '#6c757d',
          light: '#f8f9fa',
          light_fg: '#343a40',
          dark: '#343a40'
      }
    },

    // Info
    info: function(options) {
      return create('info', options);
    },

    // Danger
    danger: function(options) {
      return create('danger', options);
    },

    // Success
    success: function(options) {
      return create('success', options);
    },

    // Warning
    warning: function(options) {
      return create('warning', options);
    },

    primary: function(options) {
      return create('primary', options);
    },

    secondary: function(options) {
      return create('secondary', options);
    },

    light: function(options) {
      return create('light', options);
    },

    dark: function(options) {
      return create('dark', options);
    },

    // Custom announcement
    say: function(type, options) {
      return create(type, options);
    }
  };
})(jQuery);
