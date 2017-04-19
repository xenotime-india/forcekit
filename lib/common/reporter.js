'use strict';

Object.defineProperty(exports, "__esModule", {
  value: !0
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || !1, descriptor.configurable = !0, "value" in descriptor && (descriptor.writable = !0), Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { return protoProps && defineProperties(Constructor.prototype, protoProps), staticProps && defineProperties(Constructor, staticProps), Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) throw new TypeError("Cannot call a class as a function"); }

/**
 * Copyright (c) 2015, Sandeep Kumar <sandeepkhoj@gmail.com>
 * MIT Licensed
 */
exports.default = function (a) {
  var b = function () {
    function b() {
      _classCallCheck(this, b);

      var c = this;

      c._init.apply(c, arguments);
    }

    return _createClass(b, [{
      key: '_init',
      value: function _init(c, d) {
        var e = this;
        e.html = c, e.lines = c.split(/\r?\n/);

        var f = c.match(/\r?\n/);
        e.brLen = null === f ? 0 : f[0].length, e.ruleset = d, e.messages = [];
      }

      // error message

    }, {
      key: 'error',
      value: function error(c, d, e, f, g) {
        this.report('error', c, d, e, f, g);
      }

      // warning message

    }, {
      key: 'warn',
      value: function warn(c, d, e, f, g) {
        this.report('warning', c, d, e, f, g);
      }

      // info message

    }, {
      key: 'info',
      value: function info(c, d, e, f, g) {
        this.report('info', c, d, e, f, g);
      }

      // save report

    }, {
      key: 'report',
      value: function report(c, d, e, f, g, h) {
        var j = this;
        var k = j.lines;
        var l = j.brLen;
        var m = void 0;
        var n = void 0;
        for (var o = e - 1, p = k.length; o < p && (m = k[o], n = m.length, f > n && e < p); o++) e++, f -= n, 1 !== f && (f -= l);
        j.messages.push({
          type: c,
          message: d,
          raw: h,
          evidence: m,
          line: e,
          col: f,
          rule: {
            id: g.id,
            description: g.description,
            link: 'https://github.com/xenotime-india/VFHint/wiki/' + g.id
          }
        });
      }
    }]), b;
  }();

  a.Reporter = b;
};

module.exports = exports['default'];