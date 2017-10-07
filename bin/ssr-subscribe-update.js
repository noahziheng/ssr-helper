const request = require('then-request')
const parseSSRURI = require('../lib/parse')
const Conf = require('conf')
const chalk = require('chalk')
const config = new Conf()
const ora = require('ora')
const inquirer = require('inquirer')
const SocksProxyAgent = require('socks-proxy-agent')

if (!config.has('subscribe')) config.set('subscribe', [])
let list = config.get('subscribe')
let i = list.length
if (i === 0) console.error('Error: You havn\'t add any subscribe url!')

inquirer.prompt([
  {
    type: 'list',
    name: 'proxy',
    message: 'Do you want to update list through proxy?',
    choices: [{
      name: 'Direct(without proxy)',
      value: 0
    }, {
      name: 'Through connected SSR proxy',
      value: 1
    }]
  }
]).then(function (answers) {
  return answers.proxy ? new SocksProxyAgent('socks://127.0.0.1:1080') : false
}).then(proxy => {
  while (i--) {
    const spinner = ora(chalk.green(chalk.green(list[i]))).start()
    request('GET', list[i], {agent: proxy})
      .then(r => {
        if (r.statusCode !== 200) throw new Error()
        else {
          spinner.succeed()
          let body = r.getBody('utf8')
          let tArr = Buffer.from(body, 'base64')
              .toString()
              .replace(/\r\n/g, '')
              .replace(/\n/g, '')
              .split('ssr://')
              .reverse()
          let j = tArr.length
          console.log()
          while (j--) parseSSRURI(tArr[j])
        }
      })
      .catch(r => {
        spinner.fail()
      })
  }
})
/*

*/
