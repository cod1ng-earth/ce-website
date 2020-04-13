#!/usr/bin/env node
import { config } from 'dotenv'
config()

import * as yargs from 'yargs'
import { getGroup, importGroup } from './groupCommands'
import { getMeetups, importMeetups } from './meetupCommands'

yargs
  .command({
    command: 'group <group>',
    describe: 'import a group',
    builder: yargs =>
      yargs
        .option('count', {
          alias: 'c',
          default: 10,
        })
        .option('import', {
          alias: 'i',
          type: 'boolean',
          default: false,
        }),
    handler: async argv => {
      let group
      if (argv.import) {
        group = importGroup(argv.group as string)
      } else {
        group = getGroup(argv.group as string)
      }
      console.log(await group)
    },
  })
  .command({
    command: 'meetups <group>',
    describe: 'meetups for a group',
    builder: yargs =>
      yargs.option('file', {
        alias: 'f',
        type: 'string',
        default: null,
      }),
    handler: async argv => {
      let meetups
      try {
        if (argv.import) {
          console.info(`importing meetups for ${argv.group} by: ${argv.file}`)
          meetups = await importMeetups(
            argv.group as string,
            argv.file as string
          )
          console.log(meetups)
        } else {
          meetups = await getMeetups(argv.group as string)
          console.log(meetups)
        }
      } catch (e) {
        console.error(e)
      }
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
