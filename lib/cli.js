var argsparser = require('argsparser'),
    path = require('path'),
    lintFiles = require('./lint').lint;

module.exports = {
    interpret: function (args) {
        var targets,
            options = argsparser.parse(args),
            config = path.join(process.cwd(), '.jslintrc');
        
        (function () {
            var arg;

            for (arg in options) {
                if(options.hasOwnProperty(arg)) {
                    if (/node(.exe)?$/.test(path.basename(arg))) {
                        targets = options[arg].slice(1);
                        break;
                    }
                }
            }
        }());
        
        lintFiles(targets, config);
    }
};
