#!/usr/bin/env node

const program = require('commander')
const readPkgUp = require('read-pkg-up')

program
    .version('v' + readPkgUp.sync().pkg.version)
    .usage('[options] {command} ...')
    .command('welcome', 'show Welcome Message', {isDefault: true})
    .command('config [path]', 'set ssr python client\'s location')
    .command('add [uri]', 'add a SSR URI or SSR Subscribe URL')
    .command('ls [group]', 'list all host of the group.It will show root list if group\'s value is empty.')
    .command('rm [label]', 'remove a host or group by label')
    .command('connect [path]', 'set the default host and connect it')
    .command('start', 'start ssr local client and connect default host')
    .command('stop', 'stop ssr local client')
    .command('restart', 'restart ssr local client')
    .command('status', 'show the ssr local client status')
    .option('--verbose', 'output verbose messages on internal operations')
    .parse(process.argv)
