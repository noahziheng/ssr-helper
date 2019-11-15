// var Array = require("node-array");
const Conf = require("conf");
const SsrNet = require("../lib/net");
const parallel = require("../lib/parallel");

const config = new Conf();
let servers = config.get("servers");

let t = [];
let count = 0;
// 单线程
// (async function() {
//   for (let s of servers) {
//     console.log(`(${count++})test route ${s.server}:${s.server_port}`);
//     try {
//       await SsrNet.delayTest(s.server, s.server_port);
//       t.push(s);
//       console.log("ok");
//     } catch (err) {
//       console.log("err");
//     }
//   }
//   console.log(`check ${servers.length}, ok ${t.length}`);
//   config.set("servers", t);
// })();

// 多Works
parallel.call(
  servers,
  50,
  function(s, i, a, complete) {
    SsrNet.delayTest(s.server, s.server_port)
      .then(() => {
        console.log(
          `(${count++}) test route ${s.server}:${s.server_port}-----ok!`
        );
        t.push(s);
        complete();
      })
      .catch(() => {
        console.log(
          `(${count++}) test route ${s.server}:${s.server_port}-----err!`
        );
        complete();
      });
  },
  function() {
    console.log("**********************************");
    config.set("servers", t);
    console.log("over!");
  }
);
