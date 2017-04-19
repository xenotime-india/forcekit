'use strict';

Object.defineProperty(exports, "__esModule", {
  value: !0
});

exports.default = function (a) {
  a.addRule({
    id: 'tag-self-close',
    description: 'Empty tags must be self closed.',
    init: function init(b, c) {
      var d = this;
      var e = b.makeMap("area,base,basefont,br,col,frame,hr,img,input,isindex,link,meta,param,embed,track,command,source,keygen,wbr"); //HTML 4.01 + HTML 5
      b.addListener('tagstart', function (f) {
        var g = f.tagName.toLowerCase();
        e[g] === void 0 || f.close || c.warn('The empty tag : [ ' + g + ' ] must be self closed.', f.line, f.col, d, f.raw);
      });
    }
  });
};

module.exports = exports['default'];