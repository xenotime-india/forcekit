'use strict';

Object.defineProperty(exports, "__esModule", {
  value: !0
});

var _vfparser = require('./vfparser');

var _vfparser2 = _interopRequireDefault(_vfparser);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var VFHint = {};

VFHint.version = '@VERSION', VFHint.release = '@RELEASE', VFHint.rules = {}, VFHint.defaultRuleset = {
  'tagname-lowercase': !0,
  'attr-lowercase': !0,
  'attr-value-double-quotes': !0,
  'doctype-first': !0,
  'tag-pair': !0,
  'spec-char-escape': !0,
  'id-unique': !0,
  'src-not-empty': !0,
  'attr-no-duplication': !0,
  'title-require': !0
}, VFHint.addRule = function (a) {
  VFHint.rules[a.id] = a;
}, VFHint.verify = function (a, b) {

  var c = [];

  if (void 0 === b || 0 === Object.keys(b).length) for (var _g in VFHint.defaultRuleset) VFHint.defaultRuleset[_g] && c.push(_g);else {
    var _iteratorNormalCompletion = !0;

    var _didIteratorError = !1;

    var _iteratorError = void 0;

    try {
      for (var _step, _iterator = b[Symbol.iterator](); !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = !0) {
        var _g2 = _step.value;

        for (var h in VFHint.defaultRuleset) h == _g2.toLocaleString() && VFHint.defaultRuleset[h] && c.push(h);
      }
    } catch (err) {
      _didIteratorError = !0, _iteratorError = err;
    } finally {
      try {
        !_iteratorNormalCompletion && _iterator.return && _iterator.return();
      } finally {
        if (_didIteratorError) throw _iteratorError;
      }
    }
  }

  var d = new _vfparser2.default();
  var e = new VFHint.Reporter(a, b);
  var f = VFHint.rules;

  var _iteratorNormalCompletion2 = !0;

  var _didIteratorError2 = !1;

  var _iteratorError2 = void 0;

  try {
    for (var _step2, _iterator2 = c[Symbol.iterator](); !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = !0) {
      var _g3 = _step2.value;

      var _h = f[_g3];
      void 0 !== _h && !1 !== _g3 && _h.init(d, e, _g3);
    }
  } catch (err) {
    _didIteratorError2 = !0, _iteratorError2 = err;
  } finally {
    try {
      !_iteratorNormalCompletion2 && _iterator2.return && _iterator2.return();
    } finally {
      if (_didIteratorError2) throw _iteratorError2;
    }
  }

  return d.parse(a), e.messages;
}, VFHint.format = function (a, b) {
  b = b || {};

  var c = [];

  var d = b.indent || 0;

  return a.forEach(function (e) {
    var f = 40;
    var g = f + 20;
    var h = e.evidence;
    var i = e.line;
    var j = e.col;
    var k = h.length;
    var l = j > f + 1 ? j - f : 1;
    var m = h.length > j + g ? j + g : k;
    j < f + 1 && (m += f - j + 1), h = h.replace(/\t/g, ' ').substring(l - 1, m), 1 < l && (h = '...' + h, l -= 3), m < k && (h += '...'), c.push(repeatStr(d) + ('L' + i + ' |').white + h.gray);

    // show pointer & message
    var o = j - l;
    // add double byte character
    var p = h.substring(0, o).match(/[^\u0000-\u00ff]/g);
    null !== p && (o += p.length), c.push(repeatStr(d) + repeatStr((i + '').length + 3 + o) + ('^ ' + e.message).red + ' ( '.gray + 'Rule: '.white + e.rule.id.bold.gray + ' )'.gray);
  }), c;
};


// repeat string
function repeatStr(a, b) {
  return Array(a + 1).join(b || ' ');
}

exports.default = VFHint;
module.exports = exports['default'];