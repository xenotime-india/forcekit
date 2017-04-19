'use strict';

Object.defineProperty(exports, "__esModule", {
  value: !0
});

var _child_process = require('child_process');

var _child_process2 = _interopRequireDefault(_child_process);

var _path = require('path');

var _path2 = _interopRequireDefault(_path);

var _readline = require('readline');

var _readline2 = _interopRequireDefault(_readline);

var _apexHint = require('./apexHint');

var _apexHint2 = _interopRequireDefault(_apexHint);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = function (a, b) {
  return new Promise(function (c, d) {

    var e = [];

    if (b) {
      var _iteratorNormalCompletion = !0;

      var _didIteratorError = !1;

      var _iteratorError = void 0;

      try {
        for (var _step, _iterator = b[Symbol.iterator](); !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = !0) {
          var i = _step.value;

          var _iteratorNormalCompletion2 = !0;

          var _didIteratorError2 = !1;

          var _iteratorError2 = void 0;

          try {
            for (var _step2, _iterator2 = _apexHint2.default.rules[Symbol.iterator](); !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = !0) {
              var j = _step2.value;
              j.name === i.toLowerCase() && e.push(j.path);
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

    if (0 == e.length) {
      var _iteratorNormalCompletion3 = !0;

      var _didIteratorError3 = !1;

      var _iteratorError3 = void 0;

      try {
        for (var _step3, _iterator3 = _apexHint2.default.rules[Symbol.iterator](); !(_iteratorNormalCompletion3 = (_step3 = _iterator3.next()).done); _iteratorNormalCompletion3 = !0) {
          var _i = _step3.value;
          e.push(_i.path);
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

    var f = _child_process2.default.spawn(_path2.default.join(__dirname, '..', '..', '..', 'external', 'pmd', 'bin', 'run.sh'), ['pmd', '-d', a, '-f', 'csv', '-R', e.join(','), '-language', 'apex']);
    var g = [];
    var h = [];

    _readline2.default.createInterface({
      input: f.stdout,
      terminal: !1
    }).on('line', function (i) {
      g.push(i);
    }), f.stderr.on('data', function (i) {
      h.push(i);
    }), f.on('error', function (i) {
      return console.log(i), d(i);
    }), f.on('exit', function () {
      return c(g);
    });
  });
};

module.exports = exports['default'];