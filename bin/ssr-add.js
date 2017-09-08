const parseSSRURI = require('../lib/parse')
const program = require('commander')

program.parse(process.argv)

let uri = program.args[0].split('://')
if (uri.length !== 2) throw new Error('Parse Error!Please Check Argument!')
if (uri[0] === 'ssr') parseSSRURI(uri[1])
else throw new Error('Parse Error!Please Check Argument!')
