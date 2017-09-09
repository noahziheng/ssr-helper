require('../lib/select')().then(res => {
  console.log(res.servers[res.group][res.server])
})
