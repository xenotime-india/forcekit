'use strict';

Object.defineProperty(exports, "__esModule", {
  value: !0
});

exports.default = function (a) {
  a.addRule({
    id: 'form-count',
    description: 'Minimize number of forms on a page.',
    init: function init(b, c) {
      var d = this;
      var e = 0;
      b.addListener('tagstart', function (f) {
        var g = f.tagName.toLowerCase();
        var h = f.col + g.length + 1;
        'apex:form' === g && (e++, 1 < e && c.warn('Multiple <apex:form> tag found.', f.line, h, d, f.raw));
      });
    }
  });
};

module.exports = exports['default'];