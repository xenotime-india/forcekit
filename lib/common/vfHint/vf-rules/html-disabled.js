'use strict';

Object.defineProperty(exports, "__esModule", {
  value: !0
});

exports.default = function (a) {
  a.addRule({
    id: 'html-disabled',
    description: 'Do not use the <HTML> tag.',
    init: function init(b, c) {
      var d = this;
      b.addListener('tagstart', function (f) {
        var g = f.tagName.toLowerCase();
        var h = f.col + g.length + 1;
        '<html>' === g && c.warn('Do not use the <HTML> tag. This is redundant with the <apex:page> tag.', f.line, h, d, f.raw);
      });
    }
  });
};

module.exports = exports['default'];