'use strict';

Object.defineProperty(exports, "__esModule", {
  value: !0
});

var _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

var _child_process = require('child_process');

var _child_process2 = _interopRequireDefault(_child_process);

var _path = require('path');

var _path2 = _interopRequireDefault(_path);

var _readline = require('readline');

var _readline2 = _interopRequireDefault(_readline);

var _lcHint = require('./lcHint');

var _lcHint2 = _interopRequireDefault(_lcHint);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = function (a, b) {
  function c(d) {
    for (var e in d) if (d.hasOwnProperty(e)) return !1;
    return !0;
  }
  return new Promise(function (d, e) {

    var f = {};

    if (b && 'object' == ('undefined' == typeof b ? 'undefined' : _typeof(b))) {
      var _iteratorNormalCompletion = !0;

      var _didIteratorError = !1;

      var _iteratorError = void 0;

      try {
        for (var _step, _iterator = b[Symbol.iterator](); !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = !0) {
          var j = _step.value;

          var _iteratorNormalCompletion2 = !0;

          var _didIteratorError2 = !1;

          var _iteratorError2 = void 0;

          try {
            for (var _step2, _iterator2 = _lcHint2.default.rules[Symbol.iterator](); !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = !0) {
              var k = _step2.value;
              k.name === j.toLowerCase() && (f[k.name] = k.type);
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

    if (c(f)) {
      var _iteratorNormalCompletion3 = !0;

      var _didIteratorError3 = !1;

      var _iteratorError3 = void 0;

      try {
        for (var _step3, _iterator3 = _lcHint2.default.rules[Symbol.iterator](); !(_iteratorNormalCompletion3 = (_step3 = _iterator3.next()).done); _iteratorNormalCompletion3 = !0) {
          var _j = _step3.value;
          f[_j.name] = _j.type;
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

    var g = _child_process2.default.spawn('node', [_path2.default.join(__dirname, '..', '..', '..', 'node_modules', '.bin', 'eslint'), a, '--rule', JSON.stringify(f), '-f', 'json']);
    var h = [];
    var i = [];

    _readline2.default.createInterface({
      input: g.stdout,
      terminal: !1
    }).on('line', function (j) {
      h.push(j);
    }), g.stderr.on('data', function (j) {
      i.push(j);
    }), g.on('error', function (j) {
      return e(j);
    }), g.on('exit', function () {
      return d(h);
    });
  });
};

module.exports = exports['default'];