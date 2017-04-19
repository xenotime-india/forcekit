'use strict';

Object.defineProperty(exports, "__esModule", {
  value: !0
});
var Errors = {};

/**
 * Finds the message from within the error object.
 * @param {object} err The error object.
 * @returns {string} Error message, if found.
 */
//-----------------------------------------------------------------------------
Errors.handlePromptError = function (a) {
  try {
    return a.message;
  } catch (b) {
    return 'UNKOWN ERROR';
  }
}, Errors.getMessage = function (a) {
  if (!a) return '';

  if (a.message) return a.message;

  if (a.errors) return a.errors[0].message;

  try {
    return JSON.stringify(a);
  } catch (b) {
    return '';
  }
};
exports.default = Errors;
module.exports = exports['default'];