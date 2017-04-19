'use strict';

Object.defineProperty(exports, "__esModule", {
  value: !0
});

exports.default = function (a) {
  a.addRule({
    id: 'tag-pair',
    description: 'Tag must be paired.',
    init: function init(b, c) {
      var d = this;
      var e = []; //HTML 4.01 + HTML 5
      var f = b.makeMap("area,base,basefont,br,col,frame,hr,img,input,isindex,link,meta,param,embed,track,command,source,keygen,wbr");
      b.addListener('tagstart', function (g) {
        var h = g.tagName.toLowerCase();
        f[h] !== void 0 || g.close || e.push({
          tagName: h,
          line: g.line,
          raw: g.raw
        });
      }), b.addListener('tagend', function (g) {
        var h = g.tagName.toLowerCase();
        for (var j = e.length - 1; 0 <= j && !(e[j].tagName === h); j--);
        if (0 <= j) {
          var k = [];
          for (var l = e.length - 1; l > j; l--) k.push('</' + e[l].tagName + '>');
          if (0 < k.length) {
            var _l = e[e.length - 1];
            c.error('Tag must be paired, missing: [ ' + k.join('') + ' ], start tag match failed [ ' + _l.raw + ' ] on line ' + _l.line + '.', g.line, g.col, d, g.raw);
          }
          e.length = j;
        } else c.error('Tag must be paired, no start tag: [ ' + g.raw + ' ]', g.line, g.col, d, g.raw);
      }), b.addListener('end', function (g) {
        var h = [];
        for (var j = e.length - 1; 0 <= j; j--) h.push('</' + e[j].tagName + '>');
        if (0 < h.length) {
          var _j = e[e.length - 1];
          c.error('Tag must be paired, missing: [ ' + h.join('') + ' ], open tag match failed [ ' + _j.raw + ' ] on line ' + _j.line + '.', g.line, g.col, d, '');
        }
      });
    }
  });
};

module.exports = exports['default'];