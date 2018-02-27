
const Dynamic = require('../lib/dynamic');
const Program = require('commander')
const Exec = require('../lib/exec')
Program.option("-d, --dynamic [filename]", "Dynamic config file.for docker or other use")
    .parse(process.argv)

if (Program.dynamic) {
    if (Program.dynamic === true) {
        console.warn("please add filename option")
        process.exit()
    }
    let config_file = Dynamic.generateConfigFile(Program.dynamic);
    Exec('start', false, config_file.path, false)
}
else {
    Exec('start')
}

