//
// jquery.announce.js - A micro-plugin for displaying unobtrusive announcements.
//
// Developed by Cory LaViska for A Beautiful Site, LLC
//
// Licensed under the MIT license: http://opensource.org/licenses/MIT
//
if(jQuery) (function($) {
  'use strict';

  function create(type, options) {
    var defer = $.Deferred();
    var announcement = $('<div>');
    var timeout;

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
      show: function() {
        var defer = $.Deferred();
        $(this).fadeIn(250, function() {
          defer.resolve();
        });
        return defer;
      },
      hide: function() {
        var defer = $.Deferred();
        $(this).fadeOut(250, function() {
          $(this).remove();
          defer.resolve();
        });
        return defer;
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

    // Custom announcement
    say: function(type, options) {
      return create(type, options);
    }
  };
})(jQuery);
