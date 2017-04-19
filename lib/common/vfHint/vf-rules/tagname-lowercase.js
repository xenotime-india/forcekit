'use strict';

Object.defineProperty(exports, "__esModule", {
  value: !0
});

exports.default = function (a) {
  a.addRule({
    id: 'tagname-lowercase',
    description: 'All html element names must meet the camelCase style.',
    init: function init(b, c) {
      var d = this;
      b.addListener('tagstart,tagend', function (e) {
        var f = e.tagName;
        var g = f.split(':');
        for (var h = 0; h < g.length; h++) if (!1 === /^[a-z][a-zA-Z\d]*([A-Z][a-zA-Z\d]*)*$/.test(g[h])) {
          c.error('The vf element name of [ ' + f + ' ] must be in camelCase style.', e.line, e.col, d, e.raw);

          break;
        }
      });
    }
  });
};

module.exports = exports['default'];