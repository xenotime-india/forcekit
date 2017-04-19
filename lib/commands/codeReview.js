'use strict';

Object.defineProperty(exports, "__esModule", {
  value: !0
});

var _cli = require('../cli');

var _cli2 = _interopRequireDefault(_cli);

var _path = require('path');

var _path2 = _interopRequireDefault(_path);

var _fs = require('fs');

var _fs2 = _interopRequireDefault(_fs);

var _vfHint = require('../common/vfHint');

var _apexHint = require('../common/apexHint/apexHint');

var _apexHint2 = _interopRequireDefault(_apexHint);

var _lcHint = require('../common/lcHint/lcHint');

var _lcHint2 = _interopRequireDefault(_lcHint);

var _common = require('../util/common');

var _common2 = _interopRequireDefault(_common);

var _async = require('async');

var _async2 = _interopRequireDefault(_async);

var _parseGlob = require('parse-glob');

var _parseGlob2 = _interopRequireDefault(_parseGlob);

var _glob = require('glob');

var _glob2 = _interopRequireDefault(_glob);

var _apexLint = require('./../common/apexHint/apexLint');

var _apexLint2 = _interopRequireDefault(_apexLint);

var _lcLint = require('./../common/lcHint/lcLint');

var _lcLint2 = _interopRequireDefault(_lcLint);

var _csvtojson = require('csvtojson');

var _csvtojson2 = _interopRequireDefault(_csvtojson);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var vfFormatter = require('../common/formatter')(_vfHint.vfHint); /**
                                                                   * Created by sandeepkumar on 16/01/17.
                                                                   */


var codeReview = {};

codeReview.review = function (a, b) {

  if (!a.directory && !a.list) return b('Please set --directory option to specify the source of retrieved metadata package.');

  if (!a.type) return b('Please set --type option to specify the review type (VF/APEX/LC).');

  switch (a.type.toLowerCase()) {
    case 'vf':
      {
        if (a.list) {
          var c = _vfHint.vfHint.rules;
          var d;

          for (var f in _cli2.default.io.print(''), _cli2.default.io.print('  All vf rules:'.verbose), _cli2.default.io.print(''), c) d = c[f], _cli2.default.io.bullet('     ' + d.id.bold + ' : ' + d.description);
          _cli2.default.io.print(''), b();
        } else hintTargets(vfFormatter, _vfHint.vfHint, a);
        break;
      }
    case 'apex':
      {
        if (a.list) {
          var c = _apexHint2.default.rules;
          var d;
          _cli2.default.io.print(''), _cli2.default.io.print('  All apex rules:'.verbose), _cli2.default.io.print('');

          var _iteratorNormalCompletion = !0;

          var _didIteratorError = !1;

          var _iteratorError = void 0;

          try {
            for (var _step, _iterator = c[Symbol.iterator](); !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = !0) {
              var _f = _step.value;

              _cli2.default.io.bullet('     ' + _f.name.bold + ' : ' + _f.description + ' ' + (_f.default ? '(default)' : ''));
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

          _cli2.default.io.print(''), b();
        } else (0, _apexLint2.default)(a.directory, a.rule).then(function (f) {
            var g = [];
            f = f.join('\n'), (0, _csvtojson2.default)({ trim: !0 }).fromString(f).on('json', function (h) {
              g.push(h);
            }).on('done', function () {
              printApexLog(g), b();
            });
          }).catch(function (f) {
            _cli2.default.io.error(f), b();
          });
        break;
      }
    case 'lc':
      {
        if (a.list) {
          var c = _lcHint2.default.rules;
          var d;
          _cli2.default.io.print(''), _cli2.default.io.print('  All Lightning JS rules:'.verbose), _cli2.default.io.print('');

          var _iteratorNormalCompletion2 = !0;

          var _didIteratorError2 = !1;

          var _iteratorError2 = void 0;

          try {
            for (var _step2, _iterator2 = c[Symbol.iterator](); !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = !0) {
              var _f3 = _step2.value;

              _cli2.default.io.bullet('     ' + _f3.name.bold + ' : ' + _f3.description + ' ' + (_f3.default ? '(default)' : ''));
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

          for (var _f2 in _cli2.default.io.print(''), c = _vfHint.vfHint.rules, _cli2.default.io.print(''), _cli2.default.io.print('  All Lightning Component rules:'.verbose), _cli2.default.io.print(''), c) d = c[_f2], _cli2.default.io.bullet('     ' + d.id.bold + ' : ' + d.description);
          _cli2.default.io.print(''), b();
        } else (0, _lcLint2.default)(a.directory, a.rule).then(function (f) {
            printLCLog(JSON.parse(f.join(''))), hintTargets(vfFormatter, _vfHint.vfHint, a);
          }).catch(function (f) {
            _cli2.default.io.error(f), b();
          });
        break;
      }
    default:
      return b('Please set --type option to specify the review type (VF/APEX/LC).');

  }
};

function printLCLog(a) {
  var b = _lcHint2.default.format(a, {
    colors: !0,
    indent: 6
  });

  var _iteratorNormalCompletion3 = !0;

  var _didIteratorError3 = !1;

  var _iteratorError3 = void 0;

  try {
    for (var _step3, _iterator3 = b[Symbol.iterator](); !(_iteratorNormalCompletion3 = (_step3 = _iterator3.next()).done); _iteratorNormalCompletion3 = !0) {
      var c = _step3.value;

      _cli2.default.io.print(c);
    }
  } catch (err) {
    _didIteratorError3 = !0, _iteratorError3 = err;
  } finally {
    try {
      !_iteratorNormalCompletion3 && _iterator3.return && _iterator3.return();
    } finally {
      if (_didIteratorError3) throw _iteratorError3;
    }
  }
}

function printApexLog(a) {
  var b = _apexHint2.default.format(a, {
    colors: !0,
    indent: 6
  });

  var _iteratorNormalCompletion4 = !0;

  var _didIteratorError4 = !1;

  var _iteratorError4 = void 0;

  try {
    for (var _step4, _iterator4 = b[Symbol.iterator](); !(_iteratorNormalCompletion4 = (_step4 = _iterator4.next()).done); _iteratorNormalCompletion4 = !0) {
      var c = _step4.value;

      _cli2.default.io.print(c);
    }
  } catch (err) {
    _didIteratorError4 = !0, _iteratorError4 = err;
  } finally {
    try {
      !_iteratorNormalCompletion4 && _iterator4.return && _iterator4.return();
    } finally {
      if (_didIteratorError4) throw _iteratorError4;
    }
  }
}

function hintTargets(a, b, c) {
  var d = [];
  var f = 0;
  var g = 0;
  var h = 0;
  var i = new Date().getTime();

  // start hint
  a.emit('start');


  var j = [];
  j.push(function (k) {
    hintAllFiles(a, b, c.directory, c, function (m) {
      f += m.targetFileCount, g += m.targetHintFileCount, h += m.targetHintCount, d = d.concat(m.arrTargetMessages), k();
    });
  }), _async2.default.series(j, function () {
    // end hint
    var k = new Date().getTime() - i;
    a.emit('end', {
      arrAllMessages: d,
      allFileCount: f,
      allHintFileCount: g,
      allHintCount: h,
      time: k
    }), process.exit(0 < h ? 1 : 0);
  });
}

function hintAllFiles(a, b, c, d, f) {
  function g() {
    p && q && f({
      targetFileCount: i,
      targetHintFileCount: j,
      targetHintCount: k,
      arrTargetMessages: m
    });
  }

  var h = getGlobInfo(c, d);
  h.ignore = d.ignore;


  // hint result
  var i = 0;
  var j = 0;
  var k = 0;
  var m = [];

  // init ruleset
  var n = d.rule;

  // hint queue
  var o = _async2.default.queue(function (r, s) {
    var u = new Date().getTime();

    (function (v) {
      var w = new Date().getTime() - u;
      var x = v.length;
      0 < x && (a.emit('file', {
        file: r,
        messages: v,
        time: w
      }), m.push({
        file: r,
        messages: v,
        time: w
      }), j++, k += x), i++, setImmediate(s);
    })(hintFile(b, r, n));
  }, 10);
  // start hint
  var p = !1;
  var q = !0;
  o.drain = function () {
    q = !0, g();
  }, 'stdin' === c ? (p = !0, o.push(c)) : /^https?:\/\//.test(c) ? (p = !0, o.push(c)) : walkPath(h, function (r) {
    q = !1, o.push(r);
  }, function () {
    p = !0, g();
  });
}

// split target to base & glob
function getGlobInfo(a, b) {
  a = a.replace(/\\/g, '/');

  var c = (0, _parseGlob2.default)(a);
  var d = c.base;
  d += /\/$/.test(d) ? '' : '/';

  var f = c.glob;
  var g = c.path;
  var h = null;
  switch (b.type.toLowerCase()) {
    case 'vf':
      {
        h = '*.page';

        break;
      }
    case 'apex':
      {
        h = '*.cls';

        break;
      }
    case 'lc':
      {
        h = '*.cmp';

        break;
      }
  }

  return !0 === c.is.glob ? '' === g.basename && (f += h) : '' === g.basename ? f += '**/' + h : _fs2.default.existsSync(a) && _fs2.default.statSync(a).isDirectory() && (d += g.basename + '/', f = '**/' + h), {
    base: d,
    pattern: f
  };
}
function walkPath(a, b, c) {
  var d = a.base;
  var f = a.pattern;
  var g = a.ignore;
  var h = ['**/node_modules/**'];
  g && g.split(',').forEach(function (j) {
    h.push(j);
  });

  var i = (0, _glob2.default)(f, {
    cwd: d,
    dot: !1,
    ignore: h,
    nodir: !0,
    strict: !1,
    silent: !0
  }, function () {
    c();
  });
  i.on('match', function (j) {
    d = d.replace(/^.\//, ''), b(d + j);
  });
}

// hint file
function hintFile(a, b, c) {
  var d = '';
  try {
    d = _fs2.default.readFileSync(b, 'utf-8');
  } catch (f) {}
  return a.verify(d, c);
}

exports.default = codeReview;
module.exports = exports['default'];