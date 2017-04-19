"use strict";

Object.defineProperty(exports, "__esModule", {
  value: !0
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || !1, descriptor.configurable = !0, "value" in descriptor && (descriptor.writable = !0), Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { return protoProps && defineProperties(Constructor.prototype, protoProps), staticProps && defineProperties(Constructor, staticProps), Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) throw new TypeError("Cannot call a class as a function"); }

/**
 * Created by sandeepkumar on 16/01/17.
 */
var VFParser = function () {
  function VFParser() {
    _classCallCheck(this, VFParser), this.self = this, this._listeners = {}, this._mapCdataTags = this.makeMap("script,style"), this._arrBlocks = [], this.lastEvent = null;
  }

  return _createClass(VFParser, [{
    key: "makeMap",
    value: function makeMap(a) {
      var b = {};
      var c = a.split(",");
      for (var d = 0; d < c.length; d++) b[c[d]] = !0;
      return b;
    }
  }, {
    key: "parse",
    value: function parse(a) {

      //Storage block
      function b(w, x, y, z) {
        var A = y - t + 1;
        void 0 === z && (z = {}), z.raw = x, z.pos = y, z.line = u, z.col = A, v.push(z), c.fire(w, z);

        for (var B = void 0; B = g.exec(x);) u++, t = y + g.lastIndex;
      }

      var c = this;
      var d = c._mapCdataTags;
      var e = /<(?:\/([^\s>]+)\s*|!--([\s\S]*?)--|!([^>]*?)|([\w\-:]+)((?:\s+[^\s"'>\/=\x00-\x0F\x7F\x80-\x9F]+(?:\s*=\s*(?:"[^"]*"|'[^']*'|[^\s"'>]*))?)*?)\s*(\/?))>/g;
      var f = /\s*([^\s"'>\/=\x00-\x0F\x7F\x80-\x9F]+)(?:\s*=\s*(?:(")([^"]*)"|(')([^']*)'|([^\s"'>]*)))?/g;
      var g = /\r?\n/g;
      var h = void 0;
      var j = void 0;
      var k = 0;
      var m = void 0;
      var n = void 0;
      var o = void 0;
      var p = void 0;
      var q = void 0;
      var r = 0;
      var s = void 0;
      var t = 0;
      var u = 1;
      var v = c._arrBlocks;

      for (c.fire('start', {
        pos: 0,
        line: 1,
        col: 1
      }); h = e.exec(a);) {

        if (j = h.index, j > k && (s = a.substring(k, j), o ? q.push(s) : b('text', s, k)), k = e.lastIndex, (m = h[1]) && (o && m == o && (s = q.join(''), b('cdata', s, r, {
          tagName: o,
          attrs: p
        }), o = null, p = null, q = null), !o)) {
          b('tagend', h[0], j, {
            tagName: m
          });

          continue;
        }

        if (o) q.push(h[0]);else if (m = h[4]) {
            n = [];

            var w = h[5];
            var x = void 0;

            for (var y = 0; x = f.exec(w);) {
              var z = x[1];

              var A = x[2] ? x[2] : x[4] ? x[4] : '';

              var B = x[3] ? x[3] : x[5] ? x[5] : x[6] ? x[6] : '';

              n.push({ name: z, value: B, quote: A, index: x.index, raw: x[0] }), y += x[0].length;
            }

            y === w.length ? (b('tagstart', h[0], j, {
              tagName: m,
              attrs: n,
              close: h[6]
            }), d[m] && (o = m, p = n.concat(), q = [], r = k)) : b('text', h[0], j);
          } else (h[2] || h[3]) && b('comment', h[0], j, {
              content: h[2] || h[3],
              long: !!h[2]
            });
      }

      a.length > k && (s = a.substring(k, a.length), b('text', s, k)), c.fire('end', {
        pos: k,
        line: u,
        col: a.length - t + 1
      });
    }
  }, {
    key: "addListener",
    value: function addListener(a, b) {
      var c = this._listeners;
      var d = a.split(/[,\s]/);
      var e = void 0;
      for (var f = 0, g = d.length; f < g; f++) e = d[f], void 0 === c[e] && (c[e] = []), c[e].push(b);
    }
  }, {
    key: "fire",
    value: function fire(a, b) {
      void 0 === b && (b = {}), b.type = a;

      var c = this;
      var d = [];
      var e = c._listeners[a];
      var f = c._listeners.all;
      void 0 !== e && (d = d.concat(e)), void 0 !== f && (d = d.concat(f));

      var g = c.lastEvent;
      null !== g && (delete g.lastEvent, b.lastEvent = g), c.lastEvent = b;

      for (var h = 0, j = d.length; h < j; h++) d[h].call(c, b);
    }
  }, {
    key: "removeListener",
    value: function removeListener(a, b) {
      var c = this._listeners[a];
      if (void 0 !== c) for (var _d = 0, _e = c.length; _d < _e; _d++) if (c[_d] === b) {
          c.splice(_d, 1);

          break;
        }
    }
  }, {
    key: "fixPos",
    value: function fixPos(a, b) {
      var c = a.raw.substr(0, b);
      var d = c.split(/\r?\n/);
      var e = d.length - 1;
      var f = a.line;
      var g = void 0;

      return 0 < e ? (f += e, g = d[e].length + 1) : g = a.col + b, {
        line: f,
        col: g
      };
    }
  }, {
    key: "getMapAttrs",
    value: function getMapAttrs(a) {
      var b = {};
      var c = void 0;
      for (var d = 0, e = a.length; d < e; d++) c = a[d], b[c.name] = c.value;
      return b;
    }
  }]), VFParser;
}();

exports.default = VFParser;
module.exports = exports["default"];