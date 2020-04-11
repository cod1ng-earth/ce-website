import * as fs from 'fs'

import { get as getGroup } from './persistence/MeetupGroup'

function _fetch(url) {
  const data = fs.readFileSync('./fixtures/CODING-BERLIN.json')
  const content = data.toString()
  return content
}

export default async function importer(group) {
  try {
    const groupData = await getGroup(group)
    console.log(groupData)
  } catch (e) {
    console.error(e)
  }
}
