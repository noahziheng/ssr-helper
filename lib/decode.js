const Conf = require('conf')
const config = new Conf()

let servers = config.get('servers')
let t = {}

function main () {
  let i = servers.length
  while (i--) {
    if (!servers[i].group) servers[i].group = 'Ungrouped'
    if (!t[servers[i].group]) t[servers[i].group] = []
    t[servers[i].group].push(servers[i])
  }
  return t
}

module.exports = main
