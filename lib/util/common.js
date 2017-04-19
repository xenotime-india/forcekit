'use strict';

Object.defineProperty(exports, "__esModule", {
  value: !0
});
/**
 * Created by sandeepkumar on 17/01/17.
 */
var common = {};

common.readOptions = function (b, c) {
  var d = readOptions(c);

  return b.split(',').forEach(function (e) {
    'undefined' != typeof c[e] && (d[e] = c[e]);
  }), c.dryRun && (d.checkOnly = !0), d;
}, common.parseList = function (b) {
  return b.split(/\s*,\s*/);
}, common.parseSList = function (b) {
  return common.parseList(b).map(function (c) {
    return c.replace(/[\[\]']+/g, '').trim();
  });
};
exports.default = common;
module.exports = exports['default'];