const request = require('then-request')
const parseSSRURI = require('../lib/parse')
const Conf = require('conf')
const chalk = require('chalk')
const config = new Conf()
const ora = require('ora')

if (!config.has('subscribe')) config.set('subscribe', [])
let list = config.get('subscribe')
let i = list.length
if (i === 0) console.error('Error: You havn\'t add any subscribe url!')
while (i--) {
  let action = request('GET', list[i])
  action.done(function (res) {
    let body = res.getBody('utf8')
    let tArr = Buffer.from(body, 'base64')
        .toString()
        .replace(/\r\n/g, '')
        .replace(/\n/g, '')
        .split('ssr://')
        .reverse()
    let j = tArr.length
    console.log()
    while (j--) parseSSRURI(tArr[j])
  })
  ora.promise(action, chalk.green(list[i]))
}
