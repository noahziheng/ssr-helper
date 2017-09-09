const shell = require('shelljs')
let result = shell.exec('sudo rm /etc/profile.d/ssr-helper.sh')
if (result.code !== 0) shell.echo('Failed!')
else shell.echo('Success!')
