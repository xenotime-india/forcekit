'use strict';

Object.defineProperty(exports, "__esModule", {
  value: !0
});

var _common = require('../util/common');

var _common2 = _interopRequireDefault(_common);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = function (a) {

  var b = new a.help('Code - Review', a);

  // retrieve command


  return b.add('review', function () {
    this.line('review'.verbose), this.line('Review source code.'.input), this.line('  options:'.input), this.line('    -T, --type [type]                VF/APEX.'.input), this.line('    -D, --directory [directory]      Local directory path of the package.'.input), this.line('    -L, --list                       Show all of the rules available.'.input), this.line('    -R, --rule [name]                Comma separated list of rule names to use.'.input), this.line('    -I, --ignore [pattern]           Add pattern to exclude matches.'.input);
  }), a.program.option('-T, --type [type]', 'VF/APEX.').option('-D, --directory [directory]', 'Local directory path of the package. ').option('-L, --list', 'Show all of the rules available.').option('-R, --rule [name]', 'Comma separated list of rule names to use.', _common2.default.parseList).option('-I, --ignore [ignore]', 'Add pattern to exclude matches.'), a.program.command('review').description('Review source code.').on('--help', b.commands.review).action(function () {
    a.runCommand(a.commands.codeReview.review, {
      type: a.program.type,
      directory: a.program.directory ? a.program.directory : './',
      list: 'undefined' != typeof a.program.list && a.program.list,
      rule: a.program.rule,
      ignore: a.program.ignore
    }, !1);
  }), {
    base: 'codeReview',
    help: b
  };
}; /**
    * Created by sandeepkumar on 16/01/17.
    */


module.exports = exports['default'];