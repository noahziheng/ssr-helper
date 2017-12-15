const Conf = require('conf')
const localConfig = new Conf({configName: 'local'})
const inquirer = require('inquirer')

let t = localConfig.store
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
console.log(questions)
inquirer.prompt(questions).then(function (answers) {
  localConfig.store = answers
  console.log(answers)
})
