const Conf = require('conf')
const config = new Conf()
const defaultConfig = new Conf({configName: 'default'})
const localConfig = new Conf({configName: 'local'})

require('../lib/select')().then(res => {
  defaultConfig.store = res.servers[res.group][res.server]
  // SSRURI中设置与SSR Python设置兼容处理
  config.set('default', [
    defaultConfig.get('group'),
    defaultConfig.get('remarks')
  ])
  defaultConfig.set('group', undefined)
  defaultConfig.set('remarks', undefined)
  if (defaultConfig.get('obfsparam')) defaultConfig.set('obfs_param', defaultConfig.get('obfsparam'))
  defaultConfig.set('obfsparam', undefined)
  if (defaultConfig.get('protocolparam')) defaultConfig.set('protocol_param', defaultConfig.get('protocolparam'))
  defaultConfig.set('protocolparam', undefined)
  defaultConfig.set(localConfig.store)
  console.log(res.names[res.server].name + ' is set to default!')
  require('../lib/exec')('restart')
})
