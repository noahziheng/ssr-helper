const Conf = require('conf')
const config = new Conf()
const program = require('commander')
const queryString = require('query-string')

let tConfig = {}

program.parse(process.argv)

let uri = program.args[0].split('://')
if (uri.length !== 2) throw new Error('Parse Error!Please Check Argument!')
if (uri[0] === 'ssr') parseSSRURI(uri[1])
else throw new Error('Parse Error!Please Check Argument!')

function parseSSRURI (t) {
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
}
