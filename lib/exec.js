const shell = require('shelljs')
const Conf = require('conf')
const config = new Conf()
const defaultConfig = new Conf({ configName: 'default' })
const isRoot = require('is-root');
function main(order, back, config_path = defaultConfig.path, damon = true) {
  if (!shell.which('python')) {
    shell.echo('You need install python for the script!')
    shell.exit(1)
  }
  if (config_path == defaultConfig.path && defaultConfig.size === 0) console.error('Error: the default connection is unset!')
  else {
    if (damon) {
      order = ' -d ' + order
    }
    else {
      order = ''
    }
    order = (back ? '' : isRoot() ? '' : 'sudo ') + '/usr/bin/python ' + config.get('ssr-path') + '/shadowsocks/local.py --fast-open -c ' + config_path + order
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
