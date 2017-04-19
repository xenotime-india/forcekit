'use strict';

Object.defineProperty(exports, "__esModule", {
  value: !0
});

exports.default = function (a) {
  a.addRule({
    id: 'alt-require',
    description: 'The alt attribute of an <img> element must be present and alt attribute of area[href] and input[type=image] must have a value.',
    init: function init(b, c) {
      var d = this;
      b.addListener('tagstart', function (e) {
        var f = e.tagName.toLowerCase();
        var g = b.getMapAttrs(e.attrs);
        var h = e.col + f.length + 1;
        var i = void 0;
        'img' !== f || 'alt' in g ? 'apex:image' === f && 'href' in g ? c.warn('An alt attribute must be present on <apex:image> elements.', e.line, h, d, e.raw) : ('area' === f && 'href' in g || 'input' === f && 'image' === g.type) && (!('alt' in g) || '' === g.alt) && (i = 'area' === f ? 'area[href]' : 'input[type=image]', c.warn('The alt attribute of ' + i + ' must have a value.', e.line, h, d, e.raw)) : c.warn('An alt attribute must be present on <img> elements.', e.line, h, d, e.raw);
      });
    }
  });
};

module.exports = exports['default'];