'use strict';

var _colors = require('./common/colors');

var _colors2 = _interopRequireDefault(_colors);

var _package = require('../package.json');

var _package2 = _interopRequireDefault(_package);

var _updateNotifier = require('update-notifier');

var _updateNotifier2 = _interopRequireDefault(_updateNotifier);

var _winston = require('winston');

var _winston2 = _interopRequireDefault(_winston);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var cli = module.exports;
cli.version = _package2.default.version, cli.program = require('commander-plus'), cli.program.Settings.autoHelp = !1, cli.io = require('./common/io'), cli.printHeader = function () {
  cli.io.print(''), cli.io.print('     https://github.com/xenotime-india/forcekit'.verbose), cli.io.print('');
}, cli.commands = {}, cli.commands.user = require('./commands/user'), cli.commands.deployment = require('./commands/deployment'), cli.commands.codeReview = require('./commands/codeReview');


var done = function (a) {
  a ? (cli.io.error(a), process.exit(1)) : process.exit();
};

cli.runCommand = function (a, b, c) {

  function d(e) {
    var f = [b];
    e && f.push(e), f.push(done), a.apply(cli, f);
  }

  (0, _updateNotifier2.default)({ pkg: _package2.default }).notify(), (0, _updateNotifier2.default)({ pkg: _package2.default }).update && (cli.io.warning('Your version ' + diff.current.verbose + ' is behind the latest release ' + diff.latest.verbose + '.'), cli.io.print('Please update using "npm update -g forcekit"')), c ? cli.commands.user.isAuthenticated(function (e, f) {
    return f.status ? void d(f.conn) : (cli.io.error('Need to be logged in to execute this command.'), cli.io.print('Please log in with "forcekit login" command.'), done());
  }) : d();
}, cli.program.version(cli.version), cli.help = require('./common/help'), cli.routes = [require('./routes/user')(cli), require('./routes/deployment')(cli), require('./routes/codeReview')(cli)], cli.printHelp = function () {
  cli.printHeader(), cli.io.print('     Usage: forcekit <command> <param1> <param2> ...'), cli.io.print('     Help format:'.input), cli.io.print('     <command> (<alias>)'.input), cli.io.print('     <description>'.input), cli.io.print('');


  for (var a = 0; a < cli.routes.length; a++) cli.routes[a].help.pad = 5, cli.routes[a].help.print();
}, cli.program.on('noCommand', cli.printHelp), cli.program.command('help').description('Print help for all commands.').on('--help', cli.printHelp).action(cli.printHelp), cli.program.command('*').action(function () {
  cli.io.print('Command not found.');
}), cli.program.parse(process.argv);