#!/usr/bin/env node

const program = require('commander')
const pkgInfo = require('../package.json')
program
  .version('v' + pkgInfo.version)
  .command('welcome', 'show Welcome Message', {isDefault: true})
  .usage('[options] {command} ...')
  .command('add [url]', 'add a SSR Subscribe URL')
  .command('ls', 'list all subscribe url')
  .command('rm [label]', 'remove a subscribe by label')
  .command('update', 'download latest config for URL')
  .option('--verbose', 'output verbose messages on internal operations')
  .parse(process.argv)
