const encode = require('../lib/encode')
const Conf = require('conf')
const config = new Conf()
const inquirer = require('inquirer')

require('../lib/select')().then(res => {
  let t = res.servers[res.group][res.server]
  let tKeys = Object.keys(t)
  let i = tKeys.length
  let questions = []
  while (i--) {
    questions.push({
      type: 'input',
      name: tKeys[i],
      message: 'What ' + tKeys[i] + ' will be?',
      default: t[tKeys[i]]
    })
  }
  inquirer.prompt(questions).then(function (answers) {
    console.log(answers)
    res.servers[res.group][res.server] = answers
    config.set('servers', encode(res.servers))
    console.log(res.names[res.server].name + ' is edited!')
  })
})
