'use strict';

Object.defineProperty(exports, "__esModule", {
  value: !0
});

var _common = require('../util/common');

var _common2 = _interopRequireDefault(_common);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = function (a) {

  var b = new a.help('deployment', a);

  // retrieve command


  return b.add('retrieve', function () {
    this.line('retrieve'.verbose), this.line('Retrieve resource from org.'.input), this.line('  options:'.input), this.line('    -D, --directory [directory]          Directory path to extract the retrieved metadata files. Should be a list (comma-separated) if there are multiple entries in packageNames'.input), this.line('    -Z, --zipFile [zipFile]              Output file path of ZIP archive of retrieved metadata.'.input), this.line('    -P, --packageXML [packageXML]        A package.xml file path to specify the retrieving metadata contents.'.input), this.line('    --pid [pid]                          Process ID of previous retrieve request.'.input), this.line('    --apiVersion [apiVersion]            API version of retrieving package.'.input), this.line('    -P, --packageNames [packageNames]    List of package names to retrieve (comma separated).'.input), this.line('    -M, --memberTypes [memberTypes]      Metadata types and its members. The format is like following: "[ApexClass:Class1,Class2],[ApexPage:Page1,Page2],[ApexTrigger:*]"'.input), this.line('    --pollTimeout [pollTimeout]          Polling timeout in millisec (default is 60000ms).'.input), this.line('    --pollInterval [pollInterval]        Polling interval in millisec (default is 5000ms).'.input), this.line('    -v, --verbose                        Output execution detail log.'.input);
  }), a.program.option('-D, --directory [directory]', 'Directory path to extract the retrieved metadata files. Should be a list (comma-separated) if there are multiple entries in packageNames', _common2.default.parseList).option('-Z, --zipFile [zipFile]', 'Output file path of ZIP archive of retrieved metadata').option('-P, --packageXML [packageXML]', 'A package.xml file path to specify the retrieving metadata contents').option('--pid [pid]', 'Process ID of previous retrieve request').option('--apiVersion [apiVersion]', 'API version of retrieving package').option('-P, --packageNames [packageNames]', 'List of package names to retrieve (comma separated)', _common2.default.parseList).option('-M, --memberTypes [memberTypes]', 'Metadata types and its members. The format is like following: "[ApexClass:Class1,Class2],[ApexPage:Page1,Page2],[ApexTrigger:*]"', _common2.default.parseSList).option('--pollTimeout [pollTimeout]', 'Polling timeout in millisec (default is 60000ms)', parseInt).option('--pollInterval [pollInterval]', 'Polling interval in millisec (default is 5000ms)', parseInt).option('-v, --verbose', 'Output execution detail log'), a.program.command('retrieve').description('retrieve resource from org.').on('--help', b.commands.retrieve).action(function () {
    a.runCommand(a.commands.deployment.retrieve, {
      directory: a.program.directory ? a.program.directory : a.program.zipFile ? void 0 : './',
      zipFile: a.program.zipFile,
      packageXML: a.program.packageXML,
      pid: a.program.pid,
      apiVersion: a.program.apiVersion,
      packageNames: a.program.packageNames,
      memberTypes: a.program.memberTypes,
      pollTimeout: a.program.pollTimeout,
      pollInterval: a.program.pollInterval,
      verbose: 'undefined' != typeof a.program.verbose && a.program.verbose
    }, !0);
  }), b.add('deploy', function () {
    this.line('deploy'.verbose), this.line('Deploy resource to org.'.input), this.line('  options:'.input), this.line('    -U, --username [username]        Target org user name.'.input), this.line('    -P, --password [password]        Target org password.'.input), this.line('    -D, --directory [directory]      Local directory path of the package to deploy.'.input), this.line('    -Z, --zipFile [zipFile]          Input file path of ZIP archive of metadata files to deploy.'.input), this.line('    --pid [pid]                      Process ID of previous deployment to check status.'.input), this.line('    --dryRun                         Dry run. Same as --checkOnly.'.input), this.line('    -RT, --testLevel [testLevel]     Specifies which tests are run as part of a deployment (NoTestRun/RunSpecifiedTests/RunLocalTests/RunAllTestsInOrg).'.input), this.line('    -RT, --runTests [runTests]       A list of Apex tests to run during deployment (commma separated).'.input), this.line('    -IW, --ignoreWarnings            Indicates whether a warning should allow a deployment to complete successfully (true) or not (false).'.input), this.line('    -RB, --rollbackOnError           Indicates whether any failure causes a complete rollback (true) or not (false).'.input), this.line('    --pollTimeout [pollTimeout]      Polling timeout in millisec (default is 60000ms).'.input), this.line('    --pollInterval [pollInterval]    Polling interval in millisec (default is 5000ms).'.input), this.line('    -v, --verbose                    Output execution detail log.'.input);
  }), a.program.option('-U, --username [username]', 'Target org user name').option('-P, --password [password]', 'Target org password').option('-D, --directory [directory]', 'Local directory path of the package to deploy').option('-Z, --zipFile [zipFile]', 'Input file path of ZIP archive of metadata files to deploy').option('--pid [pid]', 'Process ID of previous deployment to check status').option('--dryRun', 'Dry run. Same as --checkOnly').option('-TL, --testLevel [testLevel]', 'Specifies which tests are run as part of a deployment (NoTestRun/RunSpecifiedTests/RunLocalTests/RunAllTestsInOrg)').option('-RT, --runTests [runTests]', 'A list of Apex tests to run during deployment (commma separated)', _common2.default.parseList).option('-IW, --ignoreWarnings', 'Indicates whether a warning should allow a deployment to complete successfully (true) or not (false).').option('-RB, --rollbackOnError', 'Indicates whether any failure causes a complete rollback (true) or not (false)').option('--pollTimeout [pollTimeout]', 'Polling timeout in millisec (default is 60000ms)', parseInt).option('--pollInterval [pollInterval]', 'Polling interval in millisec (default is 5000ms)', parseInt).option('-v, --verbose', 'Output execution detail log'), a.program.command('deploy').description('deploy resource to org.').on('--help', b.commands.deploy).action(function () {
    a.runCommand(a.commands.deployment.deploy, {
      username: a.program.username,
      password: a.program.password,
      directory: a.program.directory ? a.program.directory : a.program.zipFile ? void 0 : './',
      zipFile: a.program.zipFile,
      pid: a.program.pid,
      dryRun: 'undefined' != typeof a.program.dryRun && a.program.dryRun,
      testLevel: a.program.testLevel,
      runTests: a.program.runTests,
      ignoreWarnings: 'undefined' != typeof a.program.ignoreWarnings && a.program.ignoreWarnings,
      rollbackOnError: 'undefined' == typeof a.program.rollbackOnError || a.program.rollbackOnError,
      pollTimeout: a.program.pollTimeout,
      pollInterval: a.program.pollInterval,
      verbose: 'undefined' != typeof a.program.verbose && a.program.verbose
    });
  }), {
    base: 'deployment',
    help: b
  };
}; /**
    * Created by sandeepkumar on 16/01/17.
    */


module.exports = exports['default'];