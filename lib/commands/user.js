'use strict';

Object.defineProperty(exports, "__esModule", {
  value: !0
});

var _cli = require('../cli');

var _cli2 = _interopRequireDefault(_cli);

var _userConfig = require('../common/userConfig');

var _userConfig2 = _interopRequireDefault(_userConfig);

var _util = require('util');

var _util2 = _interopRequireDefault(_util);

var _jsforce = require('jsforce');

var _jsforce2 = _interopRequireDefault(_jsforce);

var _errors = require('./../util/errors');

var _errors2 = _interopRequireDefault(_errors);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var user = {}; /**
                * Created by sandeepkumar on 16/01/17.
                */
user.authenticate = function (a, b, c, d) {
  var e = new _jsforce2.default.Connection({
    loginUrl: c ? 'https://test.salesforce.com' : 'https://login.salesforce.com'
  });
  e.login(a, b, function (f, g) {
    if (f) return d(f.message);

    var h = {
      username: a,
      password: b,
      userId: g.id,
      isSandbox: c,
      accessToken: e.accessToken,
      instanceUrl: e.instanceUrl
    };

    return _userConfig2.default.save(h), _cli2.default.io.success('Signed in as user ' + a), d(null, e);
  });
}, user.isAuthenticated = function (a) {
  if (_userConfig2.default.load(), _userConfig2.default.data && _userConfig2.default.data.userId) {

    var b = new _jsforce2.default.Connection({
      instanceUrl: _userConfig2.default.data.instanceUrl,
      accessToken: _userConfig2.default.data.accessToken
    });
    b.identity(function (c, d) {
      c ? user.authenticate.call(user, _userConfig2.default.data.username, _userConfig2.default.data.password, _userConfig2.default.data.isSandbox, function (e, f) {
        e || a(null, { status: !0, conn: f });
      }) : (_cli2.default.io.print('You are logged in as ' + d.display_name), a(null, { status: !0, conn: b }));
    });
  } else a(new Error('NOT_AUTHENTICATED'));
}, user.login = function (a, b) {
  var c = a.username;
  var d = a.password;
  var e = a.isSandbox;
  var f = [];

  ('string' != typeof c || 1 > c.length) && (f.push({
    name: 'login',
    description: 'Enter your username or email:',
    required: !0
  }), c = void 0), ('string' != typeof d || 1 > d.length) && (f.push({
    name: 'password',
    description: 'Enter your password:',
    hidden: !0,
    required: !0
  }), d = void 0), 0 < f.length ? (f.push({
    name: 'isSandbox',
    description: 'Is this a sandbox org (Y/N):',
    pattern: /^(?:Y|N|y|n)$/,
    hidden: !1,
    required: !0
  }), e = void 0, _cli2.default.io.prompt.get(f, function (g, h) {
    g && (_cli2.default.io.print(''), _cli2.default.io.print('CLI terminated....'), _cli2.default.io.error(_errors2.default.handlePromptError(g)), b()), user.authenticate.call(user, c || h.login, d || h.password, 'Y' == h.isSandbox || 'y' == h.isSandbox, b);
  })) : user.authenticate.call(user, c, a.password, e, b);
}, user.logout = function () {
  _userConfig2.default.load();

  var a = null;
  _userConfig2.default.data && _userConfig2.default.data.userId ? (a = _userConfig2.default.data.username, _userConfig2.default.clearSession(), _cli2.default.io.success('You have signed out of ' + a)) : _cli2.default.io.error('No login data saved in your local machine.');
}, user.whoami = function () {
  _userConfig2.default.load();

  var a = null;
  _userConfig2.default.data && _userConfig2.default.data.userId ? (a = _userConfig2.default.data.username, _cli2.default.io.success('You have logged in with ' + a)) : _cli2.default.io.error('No login data saved in your local machine.');
};
exports.default = user;
module.exports = exports['default'];