const encode = require('../lib/encode')
const Conf = require('conf')
const config = new Conf()

require('../lib/select')(false).then(res => {
  res.servers[res.group] = []
  config.set('servers', encode(res.servers))
  console.log(res.group + ' Group is removed!')
})
