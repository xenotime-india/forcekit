'use strict';

Object.defineProperty(exports, "__esModule", {
  value: !0
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || !1, descriptor.configurable = !0, "value" in descriptor && (descriptor.writable = !0), Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { return protoProps && defineProperties(Constructor.prototype, protoProps), staticProps && defineProperties(Constructor, staticProps), Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) throw new TypeError("Cannot call a class as a function"); }

/**
 * Created by sandeepkumar on 16/01/17.
 */
var help = function () {
  function help(a, b) {
    _classCallCheck(this, help), this.name = a, this.cli = b, this.commands = {}, this.ordered = [], this.pad = 0, this.usagePrinters = {};
  }

  return _createClass(help, [{
    key: 'printUsage',
    value: function printUsage(a) {
      var b = this.usagePrinters[a];
      b && (b.cli.io.print('Usage:'), b.print());
    }
  }, {
    key: 'add',
    value: function add(a, b) {
      this.commands.hasOwnProperty(a) || (this.commands[a] = 'function' == typeof b ? b.bind(this) : b, this.usagePrinters[a] = {
        cli: this.cli,
        print: this.commands[a]
      }, this.ordered.push(a));
    }
  }, {
    key: 'remove',
    value: function remove(a) {
      delete this.commands[a];


      for (var b = 0; b < this.ordered.length; b++) if (this.ordered[b] === a) return void this.ordered.splice(b, 1);
    }
  }, {
    key: 'line',
    value: function line(a) {
      var b = '';
      for (var d = 0; d < this.pad; d++) b += ' ';

      this.cli.io.print(b + a);
    }
  }, {
    key: 'print',
    value: function print() {
      this.line((this.name + ' Commands').verbose.underline), this.line(''), this.pad += 2;

      for (var b = 0; b < this.ordered.length; b++) {
        var d = this.commands[this.ordered[b]];

        'string' == typeof d && this.cli.io.print(d), 'function' == typeof d && d(), this.line('');
      }

      this.pad -= 2;
    }
  }, {
    key: 'getPrinter',
    value: function getPrinter() {
      return this.print.bind(this);
    }
  }]), help;
}();

exports.default = help;
module.exports = exports['default'];