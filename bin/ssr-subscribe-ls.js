const Conf = require('conf')
const chalk = require('chalk')
const config = new Conf()

if (!config.has('subscribe')) config.set('subscribe', [])
let list = config.get('subscribe')
let i = list.length
if (i === 0) console.error('Error: You havn\'t add any subscribe url!')
while (i--) console.log('[' + chalk.yellow(i) + '] ' + list[i])
