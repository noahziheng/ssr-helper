const shell = require('shelljs')
const Conf = require('conf')
const config = new Conf()

function main (order) {
  if (!shell.which('python')) {
    shell.echo('You need install python for the script!')
    shell.exit(1)
  }

  order = 'sudo ' + config.get('ssr-path') + '/shadowsocks/local.py ' + order
  // console.log(order)
  let result = shell.exec(order)
  if (result.code !== 0) {
    shell.echo('Error: Script execute failed!')
    // console.error(result.stderr)
    shell.exit(1)
  }
  // console.log(result.stdout)
}

module.exports = main
