const parseSSRURI = require('../lib/parse')
const program = require('commander')
const Conf = require('conf')
const config = new Conf()
const inquirer = require('inquirer')

program.parse(process.argv)

if (!program.args[0]) {
  // Mannual Add
  let tKeys = [
    'remarks',
    'group',
    'obfsparam',
    'obfs',
    'protocolparam',
    'protocol',
    'method',
    'server_port',
    'password',
    'server']
  let i = tKeys.length
  let questions = []
  while (i--) {
    questions.push({
      type: 'input',
      name: tKeys[i],
      message: 'What ' + tKeys[i] + ' will be?'
    })
  }
  inquirer.prompt(questions).then(function (answers) {
    console.log(answers)
    let servers = config.get('servers')
    servers.push(answers)
    config.set('servers', servers)
    console.log('[' + answers.group + ']' + answers.remarks + '(' + answers.server + ':' + answers.server_port + ')' + ' is added!')
  })
} else {
  // Add SSR URI
  let uri = program.args[0].split('://')
  if (uri.length !== 2) throw new Error('Parse Error!Please Check Argument!')
  if (uri[0] === 'ssr') parseSSRURI(uri[1])
  else throw new Error('Parse Error!Please Check Argument!')
}
