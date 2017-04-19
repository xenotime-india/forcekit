'use strict';

/**
 * Created by sandeepkumar on 16/01/17.
 */
var fs = require('fs');
var util = require('util');
var async = require('async');
var findFileSync = require('find-file-sync');

var checkStartScript = function (a, b) {
  var d = [];

  return a.scripts && a.scripts.start ? void (['forever', 'pm2', 'nodemon'].forEach(function (f) {
    a.scripts.start.match(new RegExp(f, 'g')) && d.push({
      level: 'FATAL',
      message: util.format(['Your application is currently configured to run using %s,', 'which is not supported on sfdc-cli. Please change your start script to simply start', 'the application and we\'ll handle the rest.\n'].join('\n'), f.red)
    });
  }), b(null, d)) : b(null, d);
};

var checkDependencies = function (a, b) {
  var c = [];
  var d = a.dependencies;

  return a.dependencies ? void (Object.keys(d).forEach(function (f) {
    '*' === d[f] && c.push({
      level: 'WARN',
      message: util.format(['The dependency %s is configured with the version %s, which may cause', 'issues if the module is updated with breaking changes. You should change this to a', 'more specific version.\n'].join('\n'), f.red, '"*"'.red)
    });
  }), b(null, c)) : b(null, c);
};

module.exports = function (a, b) {
  var c = void 0;
  var d = void 0;

  if (!a) return b(null);

  c = findFileSync(a, 'package.json', ['.git', 'node_modules']);


  try {
    d = JSON.parse(fs.readFileSync(c), 'utf8');
  } catch (f) {
    return b(null);
  }

  async.series([function (f) {
    checkDependencies(d, f);
  }, function (f) {
    checkStartScript(d, f);
  }], function (f, g) {
    b(f, g[0].concat(g[1]));
  });
};