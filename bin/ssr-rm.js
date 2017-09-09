const encode = require('../lib/encode')
const Conf = require('conf')
const config = new Conf()

require('../lib/select')().then(res => {
  res.servers[res.group][res.server] = undefined
  config.set('servers', encode(res.servers))
  console.log(res.names[res.server].name + ' is removed!')
})
