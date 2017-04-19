'use strict';

Object.defineProperty(exports, "__esModule", {
  value: !0
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || !1, descriptor.configurable = !0, "value" in descriptor && (descriptor.writable = !0), Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { return protoProps && defineProperties(Constructor.prototype, protoProps), staticProps && defineProperties(Constructor, staticProps), Constructor; }; }();

var _fs = require('fs');

var _fs2 = _interopRequireDefault(_fs);

var _path = require('path');

var _path2 = _interopRequireDefault(_path);

var _objectEncrypter = require('object-encrypter');

var _objectEncrypter2 = _interopRequireDefault(_objectEncrypter);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) throw new TypeError("Cannot call a class as a function"); }

var engine = (0, _objectEncrypter2.default)('6E6F846E16A1FD877B17B42697B5E', { ttl: !1 });

var configFile = 'forcekit.json';
var homedir = process.env['win32' == process.platform ? 'USERPROFILE' : 'HOME'];
var defaultsFile = _path2.default.join(homedir, configFile);

var UserConfig = function () {
  function UserConfig() {
    _classCallCheck(this, UserConfig), _fs2.default.existsSync(defaultsFile) || _fs2.default.writeFileSync(defaultsFile, '', 'utf8');
  }

  return _createClass(UserConfig, [{
    key: 'load',
    value: function load() {
      if (_fs2.default.existsSync(defaultsFile)) {
        try {
          this.data = engine.decrypt(_fs2.default.readFileSync(defaultsFile, 'utf8'));
        } catch (a) {
          this.data = null;
        }
        return !0;
      }

      return !1;
    }
  }, {
    key: 'save',
    value: function save(a) {
      return _fs2.default.writeFileSync(defaultsFile, engine.encrypt(a), 'utf8'), !0;
    }
  }, {
    key: 'clearSession',
    value: function clearSession() {

      return this.load(), delete this.data.accessToken, delete this.data.userId, delete this.data.instanceUrl, delete this.data.username, delete this.data.password, delete this.data.isSandbox, this.save(this.data), !0;
    }
  }]), UserConfig;
}();

exports.default = new UserConfig();
module.exports = exports['default'];