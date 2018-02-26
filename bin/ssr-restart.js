const Program = require('commander')
const Exec = require('../lib/exec')
const Dynamic = require('../lib/dynamic')
Program.option("-d, --dynamic", "Dynamic config file.for docker or other use")
    .parse(process.argv)

if (Program.dynamic) {
    let config_file = Dynamic.generateConfigFile();
    Exec('restart', false, config_file.path)
}
else {
    Exec('restart')
}

