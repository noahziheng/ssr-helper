
const Conf = require('conf')

const Normal = require('../lib/normal')
exports.generateConfigFile = function () {
    const server = require('../lib/decode')(true)
    const dynamic_config = new Conf({ configName: 'dynamic-config' }).store
    const local_config = new Conf({ configName: 'local' }).store
    const route_setting = server[dynamic_config.group][dynamic_config.servername]
    if (route_setting == undefined) {
        console.error(`Error:\ngroup:${dynamic_config.groupname},servername:${dynamic_config.servername},doesn't exist!\nplease check config!`);
        return;
    }
    let config_file = new Conf({ configName: 'tmp' })



    //The behind cover former,so dynamic_config must at last
    config_file.store = Normal.mergeObject(local_config, route_setting, dynamic_config)

    //if don't delete.will cause an error:
    //found an error in config.json: chr() arg not in range(256)
    config_file.delete('servername')
    config_file.delete('remarks')
    return config_file
}

exports.getConfigFile = function () {
    let config_file = new Conf({ configName: 'tmp' })
    if (config_file.size === 0) console.error('Error: please use start or restart first.')
    return config_file;
}