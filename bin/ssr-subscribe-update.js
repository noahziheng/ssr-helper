const request = require('then-request')
const parseSSRURI = require('../lib/parse')
const Conf = require('conf')
const chalk = require('chalk')
const config = new Conf()
const ora = require('ora')
const inquirer = require('inquirer')
const SocksProxyAgent = require('socks-proxy-agent')
const program = require('commander')

const socksaddress = 'socks://127.0.0.1:1080'
if (!config.has('subscribe')) config.set('subscribe', [])
let list = config.get('subscribe')
let i = list.length
if (i === 0) console.error('Error: You havn\'t add any subscribe url!')

program.option("-d, --direct", "Direct(without proxy)")
  .option("-p, --proxy", "Through connected SSR proxy")
  .parse(process.argv)
new Promise((resolve, reject) => {
  if (program.proxy) return resolve(new SocksProxyAgent(socksaddress));
  else if (program.direct) return resolve(false);
  //interactive mode
  else resolve(inquirer.prompt([
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
    return answers.proxy ? new SocksProxyAgent(socksaddress) : false
  }))
}).then(proxy => {
  //fetch and update
  while (i--) {
    const spinner = ora(chalk.green(chalk.green(list[i]))).start()
    request('GET', list[i], { agent: proxy })
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
