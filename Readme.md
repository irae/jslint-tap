# Node-JSLint

A CLI for running JSLint (oficial from git submodule) and outputing tap files.

###Usage:

To run jslinttap use the following command: the `grep -v node_modules` is to exclude any file matching this names.

    jslinttap `find * -name '*.js' | grep -v node_modules | xargs echo`

