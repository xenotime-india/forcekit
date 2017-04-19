'use strict';

Object.defineProperty(exports, "__esModule", {
  value: !0
});
var APEXHint = {};

// format messages

APEXHint.rules = [{
  name: 'security',
  default: !0,
  path: 'rulesets/apex/security.xml',
  description: 'These rules deal with different security problems that can occur within Apex.'
}, {
  name: 'apexunit',
  default: !0,
  path: 'rulesets/apex/apexunit.xml',
  description: 'These rules deal with different problems that can occur with Apex unit tests.'
}, {
  name: 'complexity',
  default: !0,
  path: 'rulesets/apex/complexity.xml',
  description: 'The Complexity ruleset contains rules that find problems related to code size or complexity.'
}, {
  name: 'performance',
  default: !0,
  path: 'rulesets/apex/performance.xml',
  description: 'The Performance ruleset contains a collection of good practices which should be followed.'
}, {
  name: 'style',
  default: !0,
  path: 'rulesets/apex/style.xml',
  description: 'The Style Ruleset contains rules regarding preferred usage of names and identifiers.'
}], APEXHint.format = function (a, b) {
  b = b || {};

  var c = [];
  var d = b.indent || 0;

  var e = null;

  return a.forEach(function (f) {
    var g = f.Line;

    e !== f.File && (c.push(''), c.push(''), c.push(repeatStr(2) + f.File.gray), c.push('')), c.push(repeatStr(d) + 'L' + g + (2 < g.toString().length ? ' ' : 1 < g.toString().length ? '  ' : '   ') + ' |  ' + ('1' === f.Priority ? f.Description.red : '2' === f.Priority ? f.Description.blue : f.Description.yellow) + ' ( '.gray + 'Rule: '.white + f.Rule.bold.gray + ', Priority: '.white + ('1' === f.Priority ? f.Priority.red : '2' === f.Priority ? f.Priority.blue : f.Priority.yellow).bold + ' )'), e = f.File;
  }), c;
};


// repeat string
function repeatStr(a, b) {
  return Array(a + 1).join(b || ' ');
}
exports.default = APEXHint;
module.exports = exports['default'];