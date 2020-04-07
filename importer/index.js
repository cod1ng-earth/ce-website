#!/usr/bin/env node
const yargs = require('yargs')
const importGroup = require('./importGroup.js')

yargs // eslint-disable-line
  .command({
    command: 'group <group>',
    desc: 'import a group',
    builder: yargs =>
      yargs.option('count', {
        alias: 'c',
        default: 10,
      }),
    handler: argv => {
      importGroup(argv.group)
    },
  })
  .command({
    command: 'meetups <group>',
    desc: 'imports meetups for a group',
    handler: argv => {
      console.info(`importing meetups: ${argv.group}`)
    },
  })
  .demandCommand(1, 'You need at least one command before moving on')
  .help().argv

/*.option('verbose', {
    alias: 'v',
    type: 'boolean',
    description: 'Run with verbose logging',
  })
  */
