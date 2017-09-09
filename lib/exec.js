const shell = require('shelljs')
const Conf = require('conf')
const config = new Conf()
const defaultConfig = new Conf({configName: 'default'})

function main (order, back) {
  if (!shell.which('python')) {
    shell.echo('You need install python for the script!')
    shell.exit(1)
  }
  if (defaultConfig.size === 0) console.error('Error: the default connection is unset!')
  else {
    order = (back ? '' : 'sudo ') + '/usr/bin/python ' + config.get('ssr-path') + '/shadowsocks/local.py --fast-open -c ' + defaultConfig.path + ' -d ' + order
    if (back) return order
    else {
      let result = shell.exec(order)
      if (result.code !== 0) shell.echo('Error: Script execute failed!')
      else shell.echo('Success!')
    }
    shell.exit(1)
  }
}

module.exports = main
