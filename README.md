# forcekit CLI

## Introduction
Sometimes it happens that due to lack of time or knowledge or in pressure we forget to follow the specified code quality standards which somehow impact the overall quality of the product. To measures the quality standards we are only left with the manually process of reviewing the code line by line which is time consuming as well as not that much reliable. 

So to figure out this issues I have come up with a tool named forcekit CLI, which is a code review tool that lets you scan your code for Apex, Visualforce and Lightning specific issues. It helps in identifying those loop holes (dirty code) which impact the overall quality of the product i.e. Its helps you to know where there is a need to improve your code to match the standard quality.

It’s a completely automated tool which will help you to enhance the quality of the code as well as of the product.

## Installation

install the forcekit CLI using the following command:

`npm install -g forcekit`

## This CLI tool uses the following major external libraries:

1. **jsforce** - JSforce (f.k.a. Node-Salesforce) is an isomorphic JavaScript Library utilizing Salesforce's API: It works both in the browser and with Node.js. [more details](https://www.npmjs.com/package/jsforce)
2. **eslint** - ESLint is a tool for identifying and reporting on patterns found in ECMAScript/JavaScript code.[more details](https://www.npmjs.com/package/eslint)
3. **PMD** - PMD scans source code in Java and other languages and looks for potential problems.[more details](https://pmd.github.io/pmd-5.5.5/index.html)

## Usage

After installation the forcekit CLI tool will be available to you. It is the entrypoint for all the functionality mentioned above.

You can call ````forcekit <command> --help```` to find out more about all of the following commands.

## Available Commands

**User Commands**

1. **forcekit login** - Log in to your salesforce account.

   *Options* :
   ````
   --username      The username to log in with.
   --password      The password to use when logging in.
   -sandbox        Log in to sandbox org.
   ````
2. **forcekit whoami** - Know current logged in user information.
3. **forcekit logout** - Log out of your current session.

**Deployment Commands**
1. **forcekit retrieve** - Retrieve resource from org.

   *Options* :
   ````
    -D, --directory [directory]          Directory path to extract the retrieved metadata files. Should be a list (comma-separated) if there are multiple entries in packageNames
    -Z, --zipFile [zipFile]              Output file path of ZIP archive of retrieved metadata.
    -P, --packageXML [packageXML]        A package.xml file path to specify the retrieving metadata contents.
    --pid [pid]                          Process ID of previous retrieve request.
    --apiVersion [apiVersion]            API version of retrieving package.
    -P, --packageNames [packageNames]    List of package names to retrieve (comma separated).
    -M, --memberTypes [memberTypes]      Metadata types and its members. The format is like following: "[ApexClass:Class1,Class2],[ApexPage:Page1,Page2],[ApexTrigger:*]"
    --pollTimeout [pollTimeout]          Polling timeout in millisec (default is 60000ms).
    --pollInterval [pollInterval]        Polling interval in millisec (default is 5000ms).
    -v, --verbose                        Output execution detail log.
   ````
2. **forcekit deploy** - Deploy resource to another org.

   *Options* :
   ````
    -U, --username [username]        Target org user name.
    -P, --password [password]        Target org password.
    -D, --directory [directory]      Local directory path of the package to deploy.
    -Z, --zipFile [zipFile]          Input file path of ZIP archive of metadata files to deploy.
    --pid [pid]                      Process ID of previous deployment to check status.
    --dryRun                         Dry run. Same as --checkOnly.
    -RT, --testLevel [testLevel]     Specifies which tests are run as part of a deployment (NoTestRun/RunSpecifiedTests/RunLocalTests/RunAllTestsInOrg).
    -RT, --runTests [runTests]       A list of Apex tests to run during deployment (commma separated).
    -IW, --ignoreWarnings            Indicates whether a warning should allow a deployment to complete successfully (true) or not (false).
    -RB, --rollbackOnError           Indicates whether any failure causes a complete rollback (true) or not (false).
    --pollTimeout [pollTimeout]      Polling timeout in millisec (default is 60000ms).
    --pollInterval [pollInterval]    Polling interval in millisec (default is 5000ms).
    -v, --verbose                    Output execution detail log.
   ````
**Code Review Commands**
1. **forcekit review** - Review source code.

   *Options* :
   ````
    -T, --type [type]                VF/APEX/LC.
    -D, --directory [directory]      Local directory path of the package.
    -L, --list                       Show all of the rules available.
    -R, --rule                       Comma separated list of rule names to use.
   ````
## Review Rules

**Visualforce**
1.  *alt-require* : The alt attribute of an ```<img>``` element must be present and alt attribute of area[href] and input[type=image] must have a value.
2.  *attr-lowercase* : All attribute names must be in lowercase.
3.  *attr-no-duplication* : Elements cannot have duplicate attributes.
4.  *attr-unsafe-chars* : Attribute values cannot contain unsafe chars.
5.  *attr-value-double-quotes* : Attribute values must be in double quotes.
6.  *attr-value-not-empty* : All attributes must have values.
7.  *csslint* : Scan css with csslint.
8.  *form-count* : Minimize number of forms on a page.
9.  *head-script-disabled* : The ``<script>`` tag cannot be used in a ```<head>``` tag.
10. *href-abs-or-rel* : An href attribute must be either absolute or relative.
11. *html-disabled* : Do not use the ```<HTML>``` tag.
12. *id-class-ad-disabled* : The id and class attributes cannot use the ad keyword, it will be blocked by adblock software.
13. *id-class-value* : The id and class attribute values must meet the specified rules.
14. *id-unique* : The value of id attributes must be unique.
15. *inline-script-disabled* : Inline script cannot be used.
16. *inline-style-disabled* : Inline style cannot be used.
17. *jshint* : Scan script with jshint.
18. *space-tab-mixed-disabled* : Do not mix tabs and spaces for indentation.
19. *spec-char-escape* : Special characters must be escaped.
20. *src-not-empty* : The src attribute of an img(script,link) must have a value.
21. *style-disabled* : ```<style>``` tags cannot be used.
22. *tag-pair* : Tag must be paired.
23. *tag-self-close* : Empty tags must be self closed.
24. *tagname-lowercase* : All html element names must meet the camelCase style.

**Apex**
1. *security* : These rules deal with different security problems that can occur within Apex. (default)
2. *apexunit* : These rules deal with different problems that can occur with Apex unit tests. (default)
3. *complexity* : The Complexity ruleset contains rules that find problems related to code size or complexity. (default)
4. *performance* : The Performance ruleset contains a collection of good practices which should be followed. (default)
5. *style* : The Style Ruleset contains rules regarding preferred usage of names and identifiers. (default)

**Lightning JS**
1.  *eqeqeq* : This rule is aimed at eliminating the type-unsafe equality operators. 
2.  *no-eq-null* : The rule aims reduce potential bug and unwanted behavior by ensuring that comparisons to null only match null, and not also undefined. 
3.  *no-console* : This rule disallows calls to methods of the console object. 
4.  *no-alert* : This rule is aimed at catching debugging code that should be removed and popup UI elements that should be replaced with less obtrusive, custom UIs. 
5.  *no-unused-vars* : This rule is aimed at eliminating unused variables, functions, and parameters of functions. 
6.  *no-undef* : Any reference to an undeclared variable causes a warning, unless the variable is explicitly mentioned in a /*global ...*/ comment. 
7.  *no-mixed-spaces-and-tabs* : This rule disallows mixed spaces and tabs for indentation. 
8.  *block-scoped-var* : This rule aims to reduce the usage of variables outside of their binding context and emulate traditional block scope from other languages. 
9.  *consistent-return* : Require return statements to either always or never specify values (consistent-return). 
10. *curly* : This rule is aimed at preventing bugs and increasing code clarity by ensuring that block statements are wrapped in curly braces. 
11. *guard-for-in* : This rule is aimed at preventing unexpected behavior that could arise from using a for in loop without filtering the results in the loop. 
12. *no-plusplus* : This rule disallows the unary operators ++ and --. 
13. *no-redeclare* : This rule is aimed at eliminating variables that have multiple declarations in the same scope. 
14. *no-trailing-spaces* : This rule disallows trailing whitespace (spaces, tabs, and other Unicode whitespace characters) at the end of lines. 
15. *semi* : This rule enforces consistent use of semicolons. 
16. *no-array-constructor* : This rule disallows Array constructors. 
17. *no-new-object* : This rule disallows Object constructors. 

**Lightning Component**
1.  *alt-require* : The alt attribute of an ```<img>``` element must be present and alt attribute of area[href] and input[type=image] must have a value.
2.  *attr-lowercase* : All attribute names must be in lowercase.
3.  *attr-no-duplication* : Elements cannot have duplicate attributes.
4.  *attr-unsafe-chars* : Attribute values cannot contain unsafe chars.
5.  *attr-value-double-quotes* : Attribute values must be in double quotes.
6.  *attr-value-not-empty* : All attributes must have values.
7.  *href-abs-or-rel* : An href attribute must be either absolute or relative.
8.  *id-class-ad-disabled* : The id and class attributes cannot use the ad keyword, it will be blocked by adblock software.
9.  *id-class-value* : The id and class attribute values must meet the specified rules.
10. *id-unique* : The value of id attributes must be unique.
11. *inline-script-disabled* : Inline script cannot be used.
12. *inline-style-disabled* : Inline style cannot be used.
13. *jshint* : Scan script with jshint.
14. *space-tab-mixed-disabled* : Do not mix tabs and spaces for indentation.
15. *spec-char-escape* : Special characters must be escaped.
16. *src-not-empty* : The src attribute of an img(script,link) must have a value.
17. *style-disabled* : ```<style>``` tags cannot be used.
18. *tag-pair* : Tag must be paired.
19. *tag-self-close* : Empty tags must be self closed.
20. *tagname-lowercase* : All html element names must meet the camelCase style.

## How to report bugs

You can create a [new issue](https://github.com/xenotime-india/forcekit-cli/issues) in GitHub and describe your problem or suggestion.

## License

This project is licensed under the **MIT License**.
Copyright (c) 2017-2018 Xenotime < [xenotime-india@gmail.com](mailto:xenotime-india@gmail.com)>

Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.