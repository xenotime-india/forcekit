'use strict';

Object.defineProperty(exports, "__esModule", {
  value: !0
});

var _fs = require('fs');

var _fs2 = _interopRequireDefault(_fs);

var _fstream = require('fstream');

var _fstream2 = _interopRequireDefault(_fstream);

var _path = require('path');

var _path2 = _interopRequireDefault(_path);

var _readableStream = require('readable-stream');

var _readableStream2 = _interopRequireDefault(_readableStream);

var _jsforce = require('jsforce');

var _jsforce2 = _interopRequireDefault(_jsforce);

var _unzip = require('unzip');

var _unzip2 = _interopRequireDefault(_unzip);

var _xml2js = require('xml2js');

var _xml2js2 = _interopRequireDefault(_xml2js);

var _cli = require('../cli');

var _cli2 = _interopRequireDefault(_cli);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Promise = _jsforce2.default.Promise;

var RETRIEVE_OPTIONS = "apiVersion,packageNames,singlePackage,specificFiles,unpackaged".split(',');

/**
 *
 */
function retrieve(a, b) {
  b.metadata.pollTimeout = a.pollTimeout || 60000, b.metadata.pollInterval = a.pollInterval || 5000;
  // polling interval to 5 sec by default
  var c = {};

  return RETRIEVE_OPTIONS.forEach(function (d) {
    'undefined' != typeof a[d] && (c[d] = a[d]);
  }), c.apiVersion || (c.apiVersion = b.version), b.metadata.retrieve(c).complete({ details: !0 });
}

/**
 *
 */
function retrieveByTypes(a, b, c) {
  var d = a.filter(function (e) {
    return e;
  }).map(function (e) {
    var g = e.split(/\s*:\s*/);
    var h = g[0];
    var i = g[1] ? g[1].split(/\s*,\s*/) : ['*'];
    return { name: h, members: i };
  });

  return b.unpackaged = { types: d }, retrieve(b, c);
}

/**
 *
 */
function retrieveByPackageNames(a, b, c) {
  return b.packageNames = a, retrieve(b, c);
}

/**
 *
 */
function retrieveByPackageXML(a, b, c) {
  return new Promise(function (d, e) {
    _fs2.default.readFile(a, 'utf-8', function (g, h) {
      g ? e(g) : d(h);
    });
  }).then(function (d) {
    return new Promise(function (e, g) {
      _xml2js2.default.parseString(d, { explicitArray: !1 }, function (h, i) {
        h ? g(h) : e(i);
      });
    });
  }).then(function (d) {
    return delete d.Package.$, b.unpackaged = d.Package, retrieve(b, c);
  });
}

/**
 *
 */
function checkRetrieveStatus(a, b) {
  return connect(b).then(function (d) {
    return _cli2.default.io.print('Retrieving previous request result from server...'), d.metadata.checkRetrieveStatus(a, { details: !0 }, d);
  });
}

/**
 *
 */
function reportRetrieveResult(a, b) {
  'true' === a.success + '' ? _cli2.default.io.success('Retrieve Succeeded.') : 'true' === a.done + '' ? _cli2.default.io.error('Retrieve Failed.') : _cli2.default.io.warning('Retrieve Not Completed Yet.'), a.errorMessage && _cli2.default.io.error(a.errorMessage), b && reportRetreiveFileProperties(a.fileProperties);
}

function asArray(a) {
  return a ? ('[object Array]' !== Object.prototype.toString.apply(a) && (a = [a]), a) : [];
}

function reportRetreiveFileProperties(a) {
  a = asArray(a), 0 < a.length && (console.log(''), _cli2.default.io.print('Files:'), a.forEach(function (b) {
    _cli2.default.io.log(' - [retreiving]' + b.fileName + (b.type ? ' [' + b.type.magenta + ']' : ''));
  }));
}

/**
 *
 */
function extractZipContents(a, b, c) {
  return _cli2.default.io.print(''), new Promise(function (d, e) {
    var g = [];
    var h = new _readableStream2.default.PassThrough();
    h.end(new Buffer(a, 'base64')), h.pipe(_unzip2.default.Parse()).on('entry', function (i) {
      var j = i.path.split('/');
      var k = j[0];
      var l = b[k] || b['*'];
      if (l) {
        var m = j.slice(1).join('/');
        var n = _path2.default.join(l, m);
        g.push(new Promise(function (o, q) {
          c && _cli2.default.io.log(' - [extracting] ' + n), i.pipe(_fstream2.default.Writer({
            type: i.type,
            path: n
          })).on('finish', o).on('error', q);
        }));
      } else i.autodrain();
    }).on('finish', function () {
      setTimeout(function () {
        Promise.all(g).then(d, e);
      }, 1000);
    }).on('error', e);
  });
}

/**
 *
 */
exports.default = {
  retrieve: retrieve,
  retrieveByTypes: retrieveByTypes,
  retrieveByPackageNames: retrieveByPackageNames,
  retrieveByPackageXML: retrieveByPackageXML,
  checkRetrieveStatus: checkRetrieveStatus,
  reportRetrieveResult: reportRetrieveResult,
  extractZipContents: extractZipContents
};
module.exports = exports['default'];