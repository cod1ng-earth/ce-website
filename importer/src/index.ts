#!/usr/bin/env node
import { config } from 'dotenv'
config()

import * as yargs from 'yargs'
import importGroup from './importGroup'

yargs
  .command({
    command: 'group <group>',
    describe: 'import a group',
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
    describe: 'imports meetups for a group',
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
