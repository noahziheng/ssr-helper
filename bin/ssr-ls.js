const queryString = require('query-string')
var QRCode = require('qrcode-terminal')

function base64encode (o) {
  return o ? Buffer.from(o).toString('base64') : ''
}

function encodeCore (t) {
  const q = queryString.stringify({
    group: base64encode(t.group),
    remarks: base64encode(t.remarks),
    protoparam: base64encode(t.protocolparam) || undefined,
    obfsparam: base64encode(t.obfsparam) || undefined
  })
  return 'ssr://' + base64encode(`${t.server}:${t.server_port}:${t.protocol}:${t.method}:${t.obfs}:${base64encode(t.password)}/?${q}`)
  /* t = Buffer.from(t.toString(), 'base64').toString().split('/')
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
  tConfig.obfsparam = !tConfig.obfsparam ? '' : Buffer.from(tConfig.obfsparam, 'base64').toString()
  tConfig.protoparam = !tConfig.protoparam ? '' : Buffer.from(tConfig.protoparam, 'base64').toString()

  // console.log(tConfig)
  return tConfig */
}

require('../lib/select')().then(res => {
  const url = encodeCore(res.servers[res.group][res.server])
  console.log(res.servers[res.group][res.server])
  console.log('SSR URL:', url)
  QRCode.generate(url, {small: true})
})
