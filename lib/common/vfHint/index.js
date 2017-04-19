'use strict';

Object.defineProperty(exports, "__esModule", {
  value: !0
});

var _vfHint = require('./vfHint');

var _vfHint2 = _interopRequireDefault(_vfHint);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

require('./../reporter')(_vfHint2.default);

var normalizedPath = require("path").join(__dirname, "vf-rules");

require("fs").readdirSync(normalizedPath).forEach(function (a) {
  require('./vf-rules/' + a)(_vfHint2.default);
});

exports.default = {
  vfHint: _vfHint2.default
};
module.exports = exports['default'];