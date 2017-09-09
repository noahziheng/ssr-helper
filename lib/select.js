const inquirer = require('inquirer')
const decode = require('../lib/decode')

let servers = decode()
let groups = Object.keys(servers)
let names = []
let questions = [
  {
    type: 'list',
    name: 'group',
    message: 'Please select group',
    choices: groups
  },
  {
    type: 'list',
    name: 'server',
    message: 'Please select server',
    choices: param => getNameArr(servers[param.group])
  }
]

function main () {
  return new Promise((resolve) => {
    if (groups.length === 0) console.error('Error: You havn\'t add any host!')
    else {
      inquirer.prompt(questions).then(function (answers) {
        answers.servers = servers
        answers.names = names
        resolve(answers)
      })
    }
  })
}

function getNameArr (param) {
  let i = param.length
  let t = []
  while (i--) {
    t.push({
      name: '[' + param[i].group + ']' + param[i].remarks + '(' + param[i].server + ':' + param[i].server_port + ')',
      value: i
    })
  }
  names = t.reverse()
  return names
}

module.exports = main
