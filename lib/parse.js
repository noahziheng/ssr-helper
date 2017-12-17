const Conf = require('conf')
const config = new Conf()
const queryString = require('query-string')
const base64 = require('base64-js')

function main (t) {
  if (!config.has('servers')) config.set('servers', [])
  let servers = config.get('servers')
  if (!t) return
  let tConfig = parseCore(t)
  let name = '[' + tConfig.group + ']' + tConfig.remarks + '(' + tConfig.server + ':' + tConfig.server_port + ')'
  let i = servers.length
  let coverFlag = false
  while (i--) {
    if (servers[i].server === tConfig.server && servers[i].server_port === tConfig.server_port && servers[i].remarks === tConfig.remarks && servers[i].group === tConfig.group) {
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

function parseCore (t) {
  t = Buffer.from(t.toString(), 'base64').toString().split('/')
  let t1 = t[0].split(':')
  let tConfig = {
    server: t1[0],
    server_port: parseInt(t1[1]),
    password: Buffer.from(t1[5], 'base64').toString(),
    method: t1[3],
    obfs: t1[4],
    protocol: t1[2]
  }
  Object.assign(tConfig, queryString.parse(t[1]))
  
  // 解析 Base64 编码的分组、备注
  tConfig.group = !tConfig.group ? 'Unknown' : Buffer.from(tConfig.group, 'base64').toString()
  tConfig.remarks = !tConfig.remarks ? 'Unknown Server' : Buffer.from(tConfig.remarks, 'base64').toString()

  // 解析 Base64 编码的混淆参数
  tConfig.obfsparam = !tConfig.obfsparam ? '' : Buffer.from(tConfig.group, 'base64').toString()
  tConfig.protoparam = !tConfig.protoparam ? '' : Buffer.from(tConfig.group, 'base64').toString()

  // console.log(tConfig)
  return tConfig
}

module.exports = main
