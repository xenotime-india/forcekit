'use strict';

Object.defineProperty(exports, "__esModule", {
  value: !0
});

var _path = require('path');

var _path2 = _interopRequireDefault(_path);

var _jsforce = require('jsforce');

var _jsforce2 = _interopRequireDefault(_jsforce);

var _archiver = require('archiver');

var _archiver2 = _interopRequireDefault(_archiver);

var _cli = require('../cli');

var _cli2 = _interopRequireDefault(_cli);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Promise = _jsforce2.default.Promise;


var DEPLOY_OPTIONS = "allowMissingFiles,autoUpdatePackage,checkOnly,ignoreWarnings,performRetrieve,purgeOnDelete,rollbackOnError,runAllTests,runTests,singlePackage,testLevel".split(',');

/**
 *
 */
function deployFromZipStream(a, b, c) {
  _cli2.default.io.print('Deploying to server...'), c.metadata.pollTimeout = b.pollTimeout || 60000, c.metadata.pollInterval = b.pollInterval || 5000;
  // polling interval to 5 sec by default
  var d = {};

  return DEPLOY_OPTIONS.forEach(function (e) {
    'undefined' != typeof b[e] && (d[e] = b[e]);
  }), c.metadata.deploy(a, d).complete({ details: !0 });
}

/**
 *
 */
function deployFromFileMapping(a, b, c) {
  var d = (0, _archiver2.default)('zip');

  return d.bulk(a), d.finalize(), deployFromZipStream(d, b, c);
}

/**
 *
 */
function deployFromDirectory(a, b, c) {
  return deployFromFileMapping({
    expand: !0,
    cwd: _path2.default.join(a, '..'),
    src: [_path2.default.basename(a) + '/**']
  }, b, c);
}

/**
 *
 */
function checkDeployStatus(a, b, c) {
  return c.metadata.checkDeployStatus(a, { details: !0 });
}

/**
 *
 */
function reportDeployResult(a, b) {
  'true' === a.success + '' ? 'SucceededPartial' === a.status ? _cli2.default.io.success('Deploy Succeeded Patially.') : _cli2.default.io.success('Deploy Succeeded.') : 'true' === a.done + '' ? _cli2.default.io.error('Deploy Failed.') : _cli2.default.io.warning('Deploy Not Completed Yet.'), a.errorMessage && _cli2.default.io.error(a.errorMessage), console.log(''), _cli2.default.io.info('Id: - ' + (a.id + '').magenta), _cli2.default.io.info('Status: - ' + (a.status + '').magenta), _cli2.default.io.info('Success: - ' + (a.success + '').magenta), _cli2.default.io.info('Done: - ' + (a.done + '').magenta), _cli2.default.io.info('Number Component Errors: - ' + (a.numberComponentErrors + '').magenta), _cli2.default.io.info('Number Components Deployed: - ' + (a.numberComponentsDeployed + '').magenta), _cli2.default.io.info('Number Components Total: - ' + (a.numberComponentsTotal + '').magenta), _cli2.default.io.info('Number Test Errors: - ' + (a.numberTestErrors + '').magenta), _cli2.default.io.info('Number Tests Completed: - ' + (a.numberTestsCompleted + '').magenta), _cli2.default.io.info('Number Tests Total: - ' + (a.numberTestsTotal + '').magenta), reportDeployResultDetails(a.details, b);
}

function reportDeployResultDetails(a, b) {
  if (a) {
    if (console.log(''), b) {
      var e = asArray(a.componentSuccesses);
      0 < e.length && _cli2.default.io.success('Successes:'), e.forEach(function (g) {
        var h = 'true' === g.changed + '' ? '(M)' : 'true' === g.created + '' ? '(A)' : 'true' === g.deleted + '' ? '(D)' : '(~)';

        _cli2.default.io.log(' - ' + h + ' ' + g.fileName + (g.componentType ? ' [' + g.componentType.magenta + ']' : ''));
      });
    }
    var c = asArray(a.componentFailures);
    c && (0 < c.length && _cli2.default.io.log('Failures:'), c.forEach(function (e) {
      _cli2.default.io.log(' - ' + e.problemType + ' on ' + e.fileName + ('undefined' == typeof e.lineNumber ? '' : ' (' + e.lineNumber + ':' + e.columnNumber + ')') + ' : ' + e.problem);
    }));

    var d = a.runTestResult;
    if (d && 0 < +d.numTestsRun) {
      if (console.log(''), _cli2.default.io.log('Test Total Time: ' + +d.totalTime), console.log(''), b) {
        var g = asArray(d.successes) || [];
        0 < g.length && (console.log(''), _cli2.default.io.success('Test Successes:'), console.log('')), g.forEach(function (h) {
          _cli2.default.io.print('    - ' + ((h.namespace ? h.namespace + '__' : '') + h.name + '.' + h.methodName).green);
        });
      }
      var _e = asArray(d.failures) || [];

      if (0 < _e.length && (console.log(''), _cli2.default.io.error('Test Failures:'), console.log('')), _e.forEach(function (g) {
        _cli2.default.io.print('    - ' + (('string' == typeof g.namespace ? g.namespace + '__' : '') + g.name + '.' + g.methodName).error), _cli2.default.io.print('          ' + g.message), g.stackTrace && g.stackTrace.split(/\n/).forEach(function (h) {
          _cli2.default.io.print('             at ' + h);
        });
      }), b) {
        var _g = asArray(d.codeCoverage) || [];
        0 < _g.length && (console.log(''), console.log('Code Coverage:'), console.log('')), _g.forEach(function (h) {
          var i = Math.floor(100 - 100 * (h.numLocationsNotCovered / h.numLocations));
          isNaN(i) && (i = 100), _cli2.default.io.print('    - [' + (10 > i ? '  ' : 100 > i ? ' ' : '') + (90 < i ? (i + '').yellow : 75 <= i && 90 >= i ? (i + '').yellow : (i + '').error) + ' %] '.white + (75 < i ? (('string' == typeof h.namespace ? h.namespace + '__' : '') + h.name).green : (('string' == typeof h.namespace ? h.namespace + '__' : '') + h.name).error));
        });
      }
    }
  }
}

function asArray(a) {
  return a ? ('[object Array]' !== Object.prototype.toString.apply(a) && (a = [a]), a) : [];
}

/**
 *
 */
exports.default = {
  deployFromZipStream: deployFromZipStream,
  deployFromFileMapping: deployFromFileMapping,
  deployFromDirectory: deployFromDirectory,
  checkDeployStatus: checkDeployStatus,
  reportDeployResult: reportDeployResult
};
module.exports = exports['default'];