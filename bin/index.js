#!/usr/bin/env node

const program = require('commander')
const pkgInfo = require('../package.json')

program
  .version('v' + pkgInfo.version)
  .usage('[options] {command} ...')
  .command('welcome', 'show Welcome Message', {isDefault: true})
  .command('config [path]', 'set ssr python client\'s location')
  .command('add [uri]', 'add a SSR URI')
  .command('connect', 'set the default host and connect it')
  .command('ls', 'list all hosts by group and you can view their config')
  .command('edit', 'list all hosts by group and you can edit their config')
  .command('rm', 'remove a host by list')
  .command('start', 'start ssr local client and connect default host')
  .command('stop', 'stop ssr local client')
  .command('restart', 'restart ssr local client')
  .command('status', 'show the ssr local client status')
  .command('startup', 'set autostart ssr client when you login system(Linux)')
  .command('unstartup', 'unset autostart setting')
  .option('--verbose', 'output verbose messages on internal operations')
  .parse(process.argv)
