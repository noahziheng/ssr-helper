#!/usr/bin/env node

const program = require('commander')
const pkgInfo = require('../package.json')
const Conf = require('conf')
const config = new Conf()
const localConfig = new Conf({ configName: 'local' })

if (!config.has('servers')) config.set('servers', []) // Fix servers undefined problem
if (!config.has('default')) config.set('default', []) // Default set
if (localConfig.size === 0) {
  localConfig.store = {
    local_address: '127.0.0.1',
    local_port: 1080,
    timeout: 300,
    workers: 1
  }
} // Local Config Default set

program
  .version('v' + pkgInfo.version)
  .usage('[options] {command} ...')
  .command('welcome', 'show Welcome Message', { isDefault: true })
  .command('config [path]', 'set ssr python client\'s location')
  .command('add', 'add a host mannually')
  .command('add [uri]', 'add a SSR URI')
  .command('connect', 'set the default host and connect it')
  .command('ls', 'list all hosts by group and you can view their config')
  .command('delay', 'test routes delay')
  .command('edit', 'list all hosts by group and you can edit their config')
  .command('local', 'edit SSR\'s local config, need reconnect after config')
  .command('rm', 'remove a host by list')
  .command('clear', 'clear hosts by group')
  .command('start', 'start ssr local client and connect default host')
  .command('stop', 'stop ssr local client')
  .command('restart', 'restart ssr local client')
  .command('status', 'show the ssr local client status')
  .command('startup', 'set autostart ssr client when you login system(Linux)')
  .command('unstartup', 'unset autostart setting')
  .option('--verbose', 'output verbose messages on internal operations')
  .parse(process.argv)
