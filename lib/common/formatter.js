'use strict';

Object.defineProperty(exports, "__esModule", {
  value: !0
});

var _events = require('events');

var _events2 = _interopRequireDefault(_events);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var formatter = new _events2.default.EventEmitter();

exports.default = function (a) {

  return formatter.on('start', function () {
    console.log('');
  }), formatter.on('config', function (b) {
    var c = b.configPath;
    console.log('   Config loaded: %s', nocolor ? c : c.cyan), console.log('');
  }), formatter.on('file', function (b) {
    console.log('   ' + b.file.white);

    var c = a.format(b.messages, {
      colors: !0,
      indent: 6
    });
    c.forEach(function (d) {
      console.log(d);
    }), console.log('');
  }), formatter.on('end', function (b) {
    var c = b.allFileCount;
    var d = b.allHintCount;
    var e = b.allHintFileCount;
    var f = b.time;
    var g = void 0;
    0 < d ? (g = 'Scanned %d files, found %d errors in %d files (%d ms)', console.log(g.red, c, d, e, f)) : (g = 'Scanned %d files, no errors found (%d ms).', console.log(g.green, c, f));
  }), formatter;
};

module.exports = exports['default'];