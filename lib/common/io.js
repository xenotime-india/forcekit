'use strict';

Object.defineProperty(exports, "__esModule", {
  value: !0
});

var _prompt = require('prompt');

var _prompt2 = _interopRequireDefault(_prompt);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

_prompt2.default.start(), _prompt2.default.message = '[' + '?'.yellow + '] ', _prompt2.default.delimiter = ''; /**
                                                                                                                * Created by sandeepkumar on 16/01/17.
                                                                                                                */

var io = {};

io.print = function (a) {
  console.log(a.white);
}, io.write = function (a) {
  process.stdout.write(a);
}, io.bullet = function (a) {
  io.print('    →'.verbose + ' ' + a.gray);
}, io.log = function (a) {
  io.print('      [' + 'log'.verbose + ']'.white + ' ' + a.white);
}, io.info = function (a) {
  io.print('[' + 'ℹ'.debug + ']'.white + ' ' + a.white);
}, io.success = function (a) {
  io.print('[' + '✓'.green + '] ' + a);
}, io.warning = function (a) {
  io.print('[' + '⚠'.warn + '] ' + a);
}, io.error = function (a) {
  io.print('[' + '×'.error + '] ' + a);
}, io.startIndeterminate = function (a) {
  if (process.stdout.isTTY) return a.start();
}, io.stopIndeterminate = function (a) {
  if (process.stdout.isTTY) return a.stop();
}, io.prompt = _prompt2.default;
exports.default = io;
module.exports = exports['default'];