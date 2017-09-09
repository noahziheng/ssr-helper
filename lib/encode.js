let t = []

function main (servers) {
  let groups = Object.keys(servers)
  let i = groups.length
  let j = 0
  while (i--) {
    j = servers[groups[i]].length
    while (j--) if (servers[groups[i]][j]) t.push(servers[groups[i]][j])
  }
  return t
}

module.exports = main
