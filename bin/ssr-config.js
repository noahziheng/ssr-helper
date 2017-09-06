const Conf = require('conf')
const config = new Conf()
const program = require('commander')

program.parse(process.argv)

let path = program.args[0]
config.set('ssr-path', path)
console.log('SSR Python Client Path is ' + config.get('ssr-path') + ' now.')
