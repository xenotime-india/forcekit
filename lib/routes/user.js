'use strict';

Object.defineProperty(exports, "__esModule", {
  value: !0
});

/**
 * Created by sandeepkumar on 16/01/17.
 */
exports.default = function (a) {
  var b = new a.help('User', a);

  // login command


  return b.add('login', function () {
    this.line('login'.verbose), this.line('Log in to your salesforce account.'.input), this.line('  options:'.input), this.line('    --username      The username to log in with.'.input), this.line('    --password      The password to use when logging in.'.input), this.line('    -sandbox    Log in to sandbox org.'.input);
  }), a.program.option('-u, --username [value]', 'The username to log in with.').option('-P, --password [value]', 'The password to use when logging in.').option('-sandbox', 'Log in to sandbox org.'), a.program.command('login').description('Log into an account.').on('--help', b.commands.login).action(function () {
    a.runCommand(a.commands.user.login, {
      username: a.program.username,
      password: a.program.password,
      isSandbox: 'undefined' != typeof a.program.sandbox && a.program.sandbox
    });
  }), b.add('whoami', function () {
    this.line('whoami'.verbose), this.line('Know current logged in user information.'.input);
  }), a.program.command('whoami').description('Know current logged in user information.').on('--help', b.commands.whoami).action(function () {
    a.runCommand(a.commands.user.whoami);
  }), b.add('logout', function () {
    this.line('logout'.verbose), this.line('Log out of your current session.'.input);
  }), a.program.command('logout').description('Log out of current account.').on('--help', b.commands.logout).action(function () {
    a.runCommand(a.commands.user.logout);
  }), {
    base: 'user',
    help: b
  };
};

module.exports = exports['default'];