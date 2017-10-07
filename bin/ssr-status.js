const shell = require('shelljs')
const chalk = require('chalk')
const Conf = require('conf')
const config = new Conf()
const defaultConfig = new Conf({configName: 'default'})
const request = require('then-request')
const ora = require('ora')
const SocksProxyAgent = require('socks-proxy-agent')

let str = [chalk.green('Running'), chalk.red('Stopped')]
let res = shell.exec('sudo cat /var/run/shadowsocksr.pid', {silent: true})
process.stdout.write('SSR Python Client Status: ')
if (res.code === 0) {
  let res1 = shell.exec('ps ' + res.stdout, {silent: true})
  console.log(str[res1.code])
  if (res1.code === 0) console.log('PID:' + res.stdout)
} else console.log(str[1])
console.log(
  'Current: ' +
  '[' + chalk.yellow(config.get('default')[0] ? config.get('default')[0] : 'Unknown') + ']' +
  (config.get('default')[0] ? config.get('default')[1] : 'Unknown Host') +
  '(' + chalk.cyan(defaultConfig.get('server') && defaultConfig.get('server_port') ? defaultConfig.get('server') + ':' + defaultConfig.get('server_port') : 'Unknown') + ')'
)
let proxy = process.env.socks_proxy || 'socks://127.0.0.1:1080'
const spinner = ora(chalk.green('Connection testing...')).start()
request('GET', 'https://www.google.com/ncr', {agent: new SocksProxyAgent(proxy)})
  .then(r => {
    if (r.statusCode !== 200) throw new Error()
    else spinner.succeed('Connection test pass!')
  })
  .catch(r => {
    spinner.fail('Connection test failed!')
  })
