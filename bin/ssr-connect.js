const Conf = require('conf')
const config = new Conf()
const defaultConfig = new Conf({configName: 'default'})

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
  defaultConfig.set({
    local_address: '127.0.0.1',
    local_port: 1080,
    timeout: 300,
    workers: 1
  })
  console.log(res.names[res.server].name + ' is set to default!')
  require('../lib/exec')('restart')
})
