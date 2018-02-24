

const SsrNet = require("../lib/net")

let p = Promise.resolve();
require('../lib/select')(false).then(res => {
    let routes = res.servers[res.group];
    //console.log(routes);
    for (let route of routes) {
        p = p.then((resolve) => {
            console.log(`test route ${route.server}:${route.server_port}`);
            return SsrNet.delayTest(route.server, route.server_port)
                .catch(() => {
                    //ignore test error,continue loop
                }).then(() => {
                    //测试后
                    console.log("");//newline
                })
        })
    }
})
