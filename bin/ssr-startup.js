const order = require('../lib/exec')('start', true)
const fs = require('fs')
const shell = require('shelljs')

let content = '#!/bin/sh\n' + order
fs.writeFileSync('startup.sh', content)
let result = shell.exec('sudo cp -f startup.sh /etc/profile.d/ssr-helper.sh')
if (result.code !== 0) shell.echo('Failed!')
else shell.echo('Success!')
fs.unlinkSync('startup.sh')
