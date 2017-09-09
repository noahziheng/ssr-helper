/* eslint-disable no-multi-str */
const order = require('../lib/exec')('start', true)
const fs = require('fs')
const shell = require('shelljs')

let content = '\
[Unit]\n\
Description=SSR Helper Startup Service\n\
After=network.target\n\
Wants=network.target\n\
\n\
[Service]\n\
Type=forking\n\
ExecStart=' + order + '\n\
\n\
[Install]\n\
WantedBy=multi-user.target'
fs.writeFileSync('startup.service', content)
let result = shell.exec('sudo cp -f startup.service /etc/systemd/system/ssr-helper.service')
let result1 = shell.exec('sudo systemctl enable ssr-helper')
if (result.code !== 0 || result1.code !== 0) shell.echo('Failed!')
else shell.echo('Success!')
fs.unlinkSync('startup.service')
