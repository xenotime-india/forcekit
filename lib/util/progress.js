'use strict';

Object.defineProperty(exports, "__esModule", {
  value: !0
});
/**
 * Created by sandeepkumar on 16/01/17.
 */
var Progress = {};

Progress.indeterminate = function (a) {
  var b = 1 < arguments.length && void 0 !== arguments[1] ? arguments[1] : {};
  this.fmt = a, this.width = b.width || 20, this.animateTime = b.animateTime || 250, this.timeout = null, this.curr = 0, this.rl = require('readline').createInterface({
    input: process.stdin,
    output: b.stream || process.stdout
  }), this.rl.setPrompt('', 0);
}, Progress.indeterminate.prototype.start = function () {
  this.curr = 0, this.tick();
}, Progress.indeterminate.prototype.stop = function () {
  clearTimeout(this.timeout), this.rl.resume(), this.rl.close();
}, Progress.indeterminate.prototype.tick = function () {
  var a = Array(this.width).join(' ');
  a = a.substring(0, this.curr) + '=' + a.substring(this.curr);

  var b = this.fmt.replace(':bar', a);
  this.rl.write(null, { ctrl: !0, name: 'u' }), this.rl.write(b), this.curr = (this.curr + 1) % this.width;

  var c = this;
  this.timeout = setTimeout(function () {
    c.tick();
  }, this.animateTime);
};
exports.default = Progress;
module.exports = exports['default'];