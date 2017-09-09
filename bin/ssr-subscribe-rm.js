const Conf = require('conf')
const config = new Conf()
const program = require('commander')

program.parse(process.argv)

if (!config.has('subscribe')) config.set('subscribe', [])
let list = config.get('subscribe')
if (list.length === 0) console.error('Error: You havn\'t add any subscribe url!')
else {
  console.log(list[program.args[0]] + ' is removed!')
  list.splice(program.args[0], 1)
  config.set('subscribe', list)
}
