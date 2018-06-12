const net = require('net')
const chalk = require('chalk')
const ora = require('ora')

exports.delayTest = function (host, port, timeout = 3000) {
  return new Promise((resolve, reject) => {
    const spinner = ora(chalk.green('Connection testing...')).start()
    // sock init
    let sock = net.Socket()
    sock.setNoDelay(true)
    sock.on('error', function (err) {
      clearTimeout(timerId)
      spinner.fail('Connection error : \n' + err)
      sock.destroy()
      reject(new Error('Connection error : \n' + err))
    })
    // time init
    let timerId = setTimeout(() => {
      // sock.removeListener('connection');
      sock.destroy()
      spinner.fail('Establish Connection timeout')
      reject(new Error('Establish Connection timeout'))
    }, timeout)
    let oldTime = Date.now()

    sock.connect(port, host, () => {
      clearTimeout(timerId)
      sock.end()
      let newTime = Date.now()
      let delay = newTime - oldTime
      spinner.succeed(`delay:${delay}ms`)
      resolve()
    })
  })
}
