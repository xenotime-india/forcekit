'use strict';

Object.defineProperty(exports, "__esModule", {
  value: !0
});

exports.default = function (a) {
  a.addRule({
    id: 'style-disabled',
    description: '<style> tags cannot be used.',
    init: function init(b, c) {
      var d = this;
      b.addListener('tagstart', function (e) {
        'style' === e.tagName.toLowerCase() && c.warn('The <style> tag cannot be used.', e.line, e.col, d, e.raw);
      });
    }
  });
};

module.exports = exports['default'];