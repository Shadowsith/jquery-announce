# jQuery.announce - A micro-plugin for displaying unobtrusive announcements.

Developed by Cory LaViska for A Beautiful Site, LLC, 2017<br>
Extended by Philip Mayer 2019

Licensed under the MIT license: http://opensource.org/licenses/MIT

## Overview:

This plugin provides a minimal, lightweight, and customizable notification API for showing unobtrusive announcements in various styles. It's flexible enough to mold to your application's existing stylesheet and markup.

Features:

- Simple syntax:
  - `$.announce.info('Hello there!')`
  - `$.announce.danger('Delete this?')`
  - `$.announce.success('All done?')`
  - `$.announce.warning('Are you sure?')`
- Minimal default styles; easy to customize or write your own.
- Show/hide hooks for adding custom animation (works well with Velocity.js).
- Responsive
- Works well with Bootstrap and other frameworks
- Same colorscheme as Bootstrap 4
- Compact! (about 160 lines)

## Demo

A quick demo can be found on CodePen: https://codepen.io/Shadowsith/pen/bJXqYQ

A local demo can be found in `example.html`.

## Installing

Include the minified version of this plugin in your project or install via NPM:

```
npm install --save jquery-announce
```

For webpage usage you can also use the jsDelivr CDN:
```html
<!--Bind jquery here-->
<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/jquery-announce@1.0.6/jquery.announce.min.css">
<script src="https://cdn.jsdelivr.net/npm/jquery-announce@1.0.6/jquery.announce.min.js"></script>
```
## Using the plugin

```javascript
// Minimal example
$.announce.info('Hi there!');

// Example with options
$.announce.info({
  message: 'Well <em>hello</em> there!',
  hPos: 'bottom',
  vPos: `left`,
  outline: true
  duration: 2000,
  hideOnClick: true,
  html: true
});

// Use own colors
$.announce.info({
  message: 'Purple power!',
  customColors: true,
  // important: you need to set the same colors property as the announcement-type
  // text is the color of the announcement text
  colors: {info : 'purple', text: 'mistyrose'}
});
```

### Methods

The following announcements are included by default:

```javascript
$.announce.info(options)
$.announce.danger(options)
$.announce.success(options)
$.announce.warning(options)
$.announce.primary(options)
$.announce.secondary(options)
$.announce.dark(options)
$.announce.light(options)
```

There is also a method to create custom announcements:

- `$.announce.say('your-custom-type', options)`

In this case, the resulting announcement will be assigned the following classes that you can use for styling purposes: `announce announce-your-custom-type`

**Note:** By design, only one announcement will ever be shown at a time. Multiple notifications (i.e. stacking or growl-style) are outside the scope of this micro-plugin.

### Options

If `options` is a string, it will be used as the message. If options is an object, it will be merged with `$.announce.defaults`.

Available options:

- `className`: The class name to assign to the announcement.
- `duration`: The length of time in milliseconds to show the announcement.
- `hideOnClick`: If true, the announcement will be hidden when the user clicks on it.
- `html`: If true, HTML will not be escaped when setting the message.
- `show`: Function for showing the announcement. Use `this` to reference the announcement element. Must return a promise-compatible object that resolves when the promise is completely visible. (This promise is currently not used, but is included for future enhancements.) Default value:
- `outline`: If true, the announcement will be outlined
- `outlineColor`: Color of announcement background-color. Default value: `'transparent'`
- `hPos`: Horizontal position, values `top|bottom|center`. Default value: `top`
- `vPos`: Vertical position, values `left|right|center`. Default value: `center`
- `customColors`: If true, custom color/colorschemes for announcement can be used. By
  default the custom color set are bootstrap 4 colors.
- `colors`: Color set for custom colors. Usable options are: `info danger warning
  success primary secondary light text dark`. `text` is for css color property.
  ```javascript
  function() {
    var defer = $.Deferred();
    $(this).fadeIn(250, function() {
      defer.resolve();
    });
    return defer;
  }
  ```
- `hide`: Function for hiding the announcement. Use `this` to reference the announcement element. Must return a promise-compatible object that resolves when the announcement is completely hidden. Default value:
  ```javascript
  function() {
    var defer = $.Deferred();
    $(this).fadeOut(250, function() {
      $(this).remove();
      defer.resolve();
    });
    return defer;
  }
  ```

You may also update the default options *before calling either method*:

```javascript
$.announce.defaults.optionName = yourValue;
```

### Promises

All announcements return a promise-compatible ([jQuery-deferred](https://api.jquery.com/jquery.deferred/)) object that will resolve once the announcement is completely hidden:

```javascript
$.announce.info('Hi there!').then(function() {
  console.log('Dismissed!');
});
```
