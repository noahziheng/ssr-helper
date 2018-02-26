
const Conf = require('conf')

const Normal = require('../lib/normal')
exports.generateConfigFile = function (config_name) {
    const server = require('../lib/decode')(true)
    const dynamic_config = new Conf({ configName: config_name }).store
    const local_config = new Conf({ configName: 'local' }).store
    if (server[dynamic_config.group] == undefined) {
        console.error(`Error:\ngroup:${dynamic_config.group},doesn't exist!\nplease check config!`);
        process.exit()
    }
    const route_setting = server[dynamic_config.group][dynamic_config.servername]
    if (route_setting == undefined) {
        console.error(`Error:\ngroup:${dynamic_config.group},servername:${dynamic_config.servername},doesn't exist!\nplease check config!`);
        process.exit()
    }
    let config_file = new Conf({ configName: 'connect-tmp-' + config_name })



    //The behind cover former,so dynamic_config must at last
    config_file.store = Normal.mergeObject(local_config, route_setting, dynamic_config)

    //if don't delete.will cause an error:
    //found an error in config.json: chr() arg not in range(256)
    config_file.delete('servername')
    config_file.delete('remarks')
    return config_file
}

exports.getConfigFile = function (config_name) {
    let config_file = new Conf({ configName: 'connect-tmp-' + config_name })
    if (config_file.size === 0) console.error('Error: please use start or restart first.')
    return config_file;
}