const shell = require('shelljs')
const chalk = require('chalk')

let str = [chalk.green('Running'), chalk.red('Stopped')]
let res = shell.exec('sudo cat /var/run/shadowsocksr.pid', {silent: true})
process.stdout.write('SSR Python Client Status: ')
if (res.code === 0) {
  let res1 = shell.exec('ps ' + res.stdout, {silent: true})
  console.log(str[res1.code])
  if (res1.code === 0) console.log('PID:' + res.stdout)
} else console.log(str[1])
