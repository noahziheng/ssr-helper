const Conf = require('conf')
const config = new Conf()
const queryString = require('query-string')

function main (t) {
  if (!config.has('servers')) config.set('servers', [])
  let servers = config.get('servers')
  let tConfig = praseCore(t)
  let name = '[' + tConfig.group + ']' + tConfig.remarks + '(' + tConfig.server + ':' + tConfig.port + ')'
  let i = servers.length
  let coverFlag = false
  while (i--) {
    if (servers[i].server === tConfig.server && servers[i].port === tConfig.port && servers[i].remarks === tConfig.remarks && servers[i].group === tConfig.group) {
      servers[i] = tConfig
      console.log(name + ' Config is alreay saved,so covered old config!')
      coverFlag = true
    }
  }
  if (!coverFlag) {
    servers.push(tConfig)
    console.log(name + ' Config is saved!')
  }
  config.set('servers', servers)
}

function praseCore (t) {
  t = Buffer.from(t, 'base64').toString().split('/')
  let t1 = t[0].split(':')
  let tConfig = {
    server: t1[0],
    port: t1[1],
    password: Buffer.from(t1[5], 'base64').toString(),
    method: t1[3],
    obfs: t1[4],
    protocol: t1[2]
  }
  Object.assign(tConfig, queryString.parse(t[1]))
  tConfig.group = Buffer.from(tConfig.group, 'base64').toString()
  tConfig.remarks = Buffer.from(tConfig.remarks, 'base64').toString()
  console.log(tConfig)
  return tConfig
}

module.exports = main
