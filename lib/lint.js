var jslint,
    vm = require("vm"),
    fs = require('fs'),
    path = require('path'),
    jslint = require('./../packages/JSLint/jslint.js'),
    ctx = vm.createContext(),
    crowkfordLint = fs.readFileSync(__dirname + '/../packages/JSLint/jslint.js', 'utf-8');

// get jslint
vm.runInContext(crowkfordLint, ctx);
jslint = ctx.JSLINT;

// output
function reporter(results) {
    var len = results.length,
        str = '1..'+(len+1)+'\nok 1 Test was run\n',
        file, error, counter = 1;

    results.forEach(function (result) {
        counter+=1;
        file = result.file;
        error = result.error;
        str += 'not ok ' + counter + ' ' + file + ': line ' + error.line + ', col ' +
            error.character + ', ' + error.reason + '\n';
    });

    if (str) {
        process.stdout.write(str + "#TAP meta information\n" + len + ' errors\n');
    }
}

// module
module.exports = {
    lint: function (files, config) {
        var data = [],
            results = [];
            
        config = JSON.parse(fs.readFileSync(config, 'utf-8'));
        
        files.forEach(function (file) {
            var buffer,
                lintdata;
            
            try {
                buffer = fs.readFileSync(file, 'utf-8');
            } catch (e) {
                process.stdout.write("Error: Cant open: " + file);
                process.stdout.write(e + '\n');
            }
            // Remove potential Unicode Byte Order Mark.
            buffer = buffer.replace(/^\uFEFF/, '');
            
            if (!jslint(buffer, config)) {
                jslint.errors.forEach(function (error) {
                    if (error) {
                        results.push({file: file, error: error});
                    }
                });
            }

            lintdata = jslint.data();

            if (lintdata) {
                lintdata.file = file;
                data.push(lintdata);
            }
            
        });
        
        return reporter(results);
    }
};
