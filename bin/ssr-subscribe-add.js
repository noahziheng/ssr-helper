const Conf = require('conf')
const config = new Conf()
const program = require('commander')

program.parse(process.argv)

if (!config.has('subscribe')) config.set('subscribe', [])
let list = config.get('subscribe')
list.push(program.args[0])
config.set('subscribe', list)
console.log(program.args[0] + ' is added to subscribe list!')
