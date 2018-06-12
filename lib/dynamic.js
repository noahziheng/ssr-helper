
const Conf = require('conf')

const Normal = require('../lib/normal')
exports.generateConfigFile = function (configName) {
  const server = require('../lib/decode')(true)
  const dynamicConfig = new Conf({ configName: configName }).store
  const localConfig = new Conf({ configName: 'local' }).store
  if (server[dynamicConfig.group] === undefined) {
    console.error(`Error:\ngroup:${dynamicConfig.group},doesn't exist!\nplease check config!`)
    process.exit()
  }
  const routeSetting = server[dynamicConfig.group][dynamicConfig.servername]
  if (routeSetting === undefined) {
    console.error(`Error:\ngroup:${dynamicConfig.group},servername:${dynamicConfig.servername},doesn't exist!\nplease check config!`)
    process.exit()
  }
  let configFile = new Conf({ configName: 'connect-tmp-' + configName })

  // The behind cover former,so dynamicConfig must at last
  configFile.store = Normal.mergeObject(localConfig, routeSetting, dynamicConfig)

  // if don't delete.will cause an error:
  // found an error in config.json: chr() arg not in range(256)
  configFile.delete('servername')
  configFile.delete('remarks')
  return configFile
}

exports.getConfigFile = function (configName) {
  let configFile = new Conf({ configName: 'connect-tmp-' + configName })
  if (configFile.size === 0) console.error('Error: please use start or restart first.')
  return configFile
}
