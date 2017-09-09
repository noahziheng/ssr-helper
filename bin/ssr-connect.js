const Conf = require('conf')
const config = new Conf({configName: 'default'})

require('../lib/select')().then(res => {
  config.store = res.servers[res.group][res.server]
  // SSRURI中设置与SSR Python设置兼容处理
  config.set('group', undefined)
  config.set('remarks', undefined)
  if (config.get('obfsparam')) config.set('obfs_param', config.get('obfsparam'))
  config.set('obfsparam', undefined)
  if (config.get('protocolparam')) config.set('protocol_param', config.get('protocolparam'))
  config.set('protocolparam', undefined)
  config.set({
    local_address: '127.0.0.1',
    local_port: 1080,
    timeout: 300,
    workers: 1
  })
  console.log(res.names[res.server].name + ' is set to default!')
  require('../lib/exec')('restart')
})
