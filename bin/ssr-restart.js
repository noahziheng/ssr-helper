const Conf = require('conf')
const config = new Conf({configName: 'default'})

if (config.size === 0) require('../lib/exec')('-d restart --fast-open -c ' + config.path)
else console.error('Error: the default connection is unset!')
