'use strict';

Object.defineProperty(exports, "__esModule", {
  value: !0
});

var _cli = require('../cli');

var _cli2 = _interopRequireDefault(_cli);

var _userConfig = require('../common/userConfig');

var _userConfig2 = _interopRequireDefault(_userConfig);

var _path = require('path');

var _path2 = _interopRequireDefault(_path);

var _retrieve = require('../common/retrieve');

var _retrieve2 = _interopRequireDefault(_retrieve);

var _deploy = require('../common/deploy');

var _deploy2 = _interopRequireDefault(_deploy);

var _fs = require('fs');

var _fs2 = _interopRequireDefault(_fs);

var _jsforce = require('jsforce');

var _jsforce2 = _interopRequireDefault(_jsforce);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var deployment = {}; /**
                      * Created by sandeepkumar on 16/01/17.
                      */
deployment.retrieve = function (a, b, c) {
  return a.directory || a.zipFile ? a.packageNames && a.directory && a.packageNames.length !== a.directory.length ? c('Please set output directory paths in --directory option, corresponding to entiries in packageNames option.') : a.pid || a.memberTypes || a.packageNames || a.packageXML || a.directory && 1 === a.directory.length ? void (a.pid ? _retrieve2.default.checkRetrieveStatus(a.pid, a, b) : a.memberTypes ? _retrieve2.default.retrieveByTypes(a.memberTypes, a, b) : a.packageNames ? _retrieve2.default.retrieveByPackageNames(a.packageNames, a, b) : a.packageXML ? _retrieve2.default.retrieveByPackageXML(a.packageXML, a, b) : a.directory && 1 === a.directory.length ? _retrieve2.default.retrieveByPackageXML(_path2.default.join(a.directory[0], 'package.xml'), a, b) : Promise.reject(new Error('Invalid option'))).then(function (d) {
    if (console.log(''), _retrieve2.default.reportRetrieveResult(d, a.verbose), !d.success) return console.log(''), _cli2.default.io.warning('No output files generated.'), !1;
    if (a.zipFile) return _fs2.default.writeFileSync(a.zipFile, new Buffer(d.zipFile, 'base64')), console.log(''), _cli2.default.io.print('Retrieved metadata files are saved in a ZIP archive: ' + a.zipFile.magenta), !0;if (a.directory) {
      var e = {};
      if (a.packageNames) for (var _f = 0; _f < a.packageNames.length; _f++) e[a.packageNames[_f]] = a.directory[_f];else e['*'] = a.directory[0];
      return _retrieve2.default.extractZipContents(d.zipFile, e, a.verbose).then(function () {
        return console.log(''), _cli2.default.io.print('Retrieved metadata files are saved under the directory: '), a.directory.forEach(function (f) {
          _cli2.default.io.print('  ' + f.magenta);
        }), !0;
      });
    }
    return !1;
  }).then(function () {
    c();
  }).catch(function (d) {
    return c(d.message);
  }) : c('Please set --packageNames or --memberTypes in options, or speclify package.xml file path in --packageXML option') : c('Please set --directory or --zipFile option to specify the destination of retrieved metadata package.');
}, deployment.validateTargetUser = function (a, b, c, d) {
  var e = new _jsforce2.default.Connection({
    loginUrl: 'https://login.salesforce.com'
  });
  e.login(a, b, function (f) {
    return f ? d(f) : (_cli2.default.io.success('Signed in as user ' + a), d(null, e));
  });
}, deployment.executeDeployment = function (a, b, c) {
  (a.zipFile ? _deploy2.default.deployFromZipStream(_fs2.default.createReadStream(a.zipFile), a, b) : a.directory ? _deploy2.default.deployFromDirectory(a.directory, a, b) : a.pid ? _deploy2.default.checkDeployStatus(a.pid, a, b) : Promise.reject(new Error('Invalid Options'))).then(function (d) {
    console.log(''), _deploy2.default.reportDeployResult(d, console, a.verbose), c();
  }).catch(function (d) {
    return c(d.message);
  });
}, deployment.deploy = function (a, b) {
  if (!a.zipFile && !a.directory && !a.pid) return b('Please set --directory or --zipFile option to specify deploying package content, or set --pid for previous deployment process ID.');

  var c = a.username;
  var d = a.password;
  var e = [];

  ('string' != typeof c || 1 > c.length) && (e.push({
    name: 'login',
    description: 'Enter your username [target]:',
    required: !0
  }), c = void 0), ('string' != typeof d || 1 > d.length) && (e.push({
    name: 'password',
    description: 'Enter your password [target]:',
    hidden: !0,
    required: !0
  }), d = void 0), 0 < e.length ? _cli2.default.io.prompt.get(e, function (f, g) {
    return f ? error.handlePromptError(f, b) : void deployment.validateTargetUser.call(deployment, c || g.login, d || g.password, null, function (h, j) {
      return h ? b(h.message) : void deployment.executeDeployment(a, j, b);
    });
  }) : deployment.validateTargetUser.call(deployment, c, d, null, function (f, g) {
    return f ? b(f.message) : void deployment.executeDeployment(a, g, b);
  });
};
exports.default = deployment;
module.exports = exports['default'];