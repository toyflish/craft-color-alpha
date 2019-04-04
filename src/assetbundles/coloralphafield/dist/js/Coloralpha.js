/**
 * craft-color-alpha plugin for Craft CMS
 *
 * Coloralpha Field JS
 *
 * @author    Kai Rautenberg
 * @copyright Copyright (c) 2019 Kai Rautenberg
 * @link      https://toylfish.com
 * @package   Craftcoloralpha
 * @since     0.1CraftcoloralphaColoralpha
 */

(function ($, window, document, undefined) {
  var pluginName = 'CraftcoloralphaColoralpha',
    defaults = {};

  // Plugin constructor
  function Plugin(element, options) {
    this.element = element;

    this.options = $.extend({}, defaults, options);

    this._defaults = defaults;
    this._name = pluginName;

    this.init();
  }

  Plugin.prototype = {
    init: function (id) {
      var _this = this;

      $(function () {
        /* -- _this.options gives us access to the $jsonVars that our FieldType passed down to us */

        var $fields = $('.color-alpha-container');
        $fields.each(function () {
          var $container = $(this);
          var $color = $container.find('.color');
          var $preview = $container.find('.color-preview');
          var $input = $container.find('.color-alpha-input');

          var picker = new Picker({
            parent: $color.get(0),
            color: $input.val(),
            onChange: function (color) {
              $input.val(color.hex);
              $preview.css('background-color', color.hex);
            }
          });
          $container.find('.color-preview').click(() => picker.openHandler());
        });
      });
    }
  };

  // A really lightweight plugin wrapper around the constructor,
  // preventing against multiple instantiations
  $.fn[pluginName] = function (options) {
    return this.each(function () {
      if (!$.data(this, 'plugin_' + pluginName)) {
        $.data(this, 'plugin_' + pluginName, new Plugin(this, options));
      }
    });
  };
})(jQuery, window, document);
