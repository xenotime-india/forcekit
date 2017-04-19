'use strict';

Object.defineProperty(exports, "__esModule", {
  value: !0
});
var LCHint = {};

// format messages

LCHint.rules = [{
  name: 'eqeqeq',
  type: 'error',
  description: 'This rule is aimed at eliminating the type-unsafe equality operators.'
}, {
  name: 'no-eq-null',
  type: 'error',
  description: 'The rule aims reduce potential bug and unwanted behavior by ensuring that comparisons to null only match null, and not also undefined.'
}, {
  name: 'no-console',
  type: 'error',
  description: 'This rule disallows calls to methods of the console object.'
}, {
  name: 'no-alert',
  type: 'error',
  description: 'This rule is aimed at catching debugging code that should be removed and popup UI elements that should be replaced with less obtrusive, custom UIs.'
}, {
  name: 'no-unused-vars',
  type: 'error',
  description: 'This rule is aimed at eliminating unused variables, functions, and parameters of functions.'
}, {
  name: 'no-undef',
  type: 'error',
  description: 'Any reference to an undeclared variable causes a warning, unless the variable is explicitly mentioned in a /*global ...*/ comment.'
}, {
  name: 'no-mixed-spaces-and-tabs',
  type: 'warn',
  description: 'This rule disallows mixed spaces and tabs for indentation.'
}, {
  name: 'block-scoped-var',
  type: 'warn',
  description: 'This rule aims to reduce the usage of variables outside of their binding context and emulate traditional block scope from other languages.'
}, {
  name: 'consistent-return',
  type: 'warn',
  description: 'Require return statements to either always or never specify values (consistent-return).'
}, {
  name: 'curly',
  type: 'warn',
  description: 'This rule is aimed at preventing bugs and increasing code clarity by ensuring that block statements are wrapped in curly braces.'
}, {
  name: 'guard-for-in',
  type: 'warn',
  description: 'This rule is aimed at preventing unexpected behavior that could arise from using a for in loop without filtering the results in the loop.'
}, {
  name: 'no-plusplus',
  type: ['error', {
    allowForLoopAfterthoughts: !0
  }],
  description: 'This rule disallows the unary operators ++ and --.'
}, {
  name: 'no-redeclare',
  type: 'error',
  description: 'This rule is aimed at eliminating variables that have multiple declarations in the same scope.'
}, {
  name: 'no-trailing-spaces',
  type: 'warn',
  description: 'This rule disallows trailing whitespace (spaces, tabs, and other Unicode whitespace characters) at the end of lines.'
}, {
  name: 'semi',
  type: 'warn',
  description: 'This rule enforces consistent use of semicolons.'
}, {
  name: 'no-array-constructor',
  type: 'error',
  description: 'This rule disallows Array constructors.'
}, {
  name: 'no-new-object',
  type: 'error',
  description: 'This rule disallows Object constructors.'
}], LCHint.format = function (a, b) {
  b = b || {};

  var c = [];
  var d = b.indent || 0;

  return a.forEach(function (e) {
    c.push(''), c.push(''), c.push(repeatStr(2) + e.filePath.gray), c.push(''), e.messages.forEach(function (f) {
      c.push(repeatStr(d) + 'L' + f.line + (2 < f.line.toString().length ? ' ' : 1 < f.line.toString().length ? '  ' : '   ') + ' |  ' + (1 === f.severity ? f.message.red : f.message.yellow) + ' ( '.gray + 'Rule: '.white + f.ruleId.bold.gray + ' )');
    });
  }), c;
};


// repeat string
function repeatStr(a, b) {
  return Array(a + 1).join(b || ' ');
}
exports.default = LCHint;
module.exports = exports['default'];