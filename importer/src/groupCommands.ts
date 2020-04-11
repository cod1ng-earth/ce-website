import * as fs from 'fs'
import {
  get as getMeetupGroup,
  createMeetupGroup,
} from './persistence/MeetupGroup'
import { MeetupGroup } from './types/MeetupGroup'

function _fetch(groupUrlName): MeetupGroup {
  if (fs.existsSync(groupUrlName)) {
    const data = fs.readFileSync(groupUrlName)
    return JSON.parse(data.toString())
  } else {
    //const meetupApiUrl = `https://api.meetup.com/${groupUrlName}`
    throw new Error('not impl')
  }
}

export async function getGroup(
  groupUrlName: string
): Promise<MeetupGroup | null> {
  try {
    return await getMeetupGroup(groupUrlName)
  } catch (error) {
    return null
  }
}

export async function importGroup(
  groupUrl: string
): Promise<MeetupGroup | null> {
  const group = _fetch(groupUrl)

  const existingGroup = await getGroup(group.urlname)

  if (existingGroup) {
    return existingGroup
  } else {
    return await createMeetupGroup(group)
  }
}
