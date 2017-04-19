'use strict';

Object.defineProperty(exports, "__esModule", {
  value: !0
});

var _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

exports.default = function (a) {
  a.addRule({
    id: 'csslint',
    description: 'Scan css with csslint.',
    init: function init(b, c, d) {
      var f = this;
      b.addListener('cdata', function (g) {
        if ('style' === g.tagName.toLowerCase()) {

          var h = void 0;

          if (h = 'object' == ('undefined' == typeof exports ? 'undefined' : _typeof(exports)) && require ? require("csslint").CSSLint.verify : CSSLint.verify, void 0 !== d) {
            var i = g.line - 1;
            var j = g.col - 1;
            try {
              var k = h(g.raw, d).messages;
              k.forEach(function (l) {
                var m = l.line;
                c['warning' === l.type ? 'warn' : 'error']('[' + l.rule.id + '] ' + l.message, i + m, (1 === m ? j : 0) + l.col, f, l.evidence);
              });
            } catch (k) {}
          }
        }
      });
    }
  });
};

module.exports = exports['default'];