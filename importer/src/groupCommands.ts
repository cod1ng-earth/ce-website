import * as fs from 'fs'
import {
  get as getMeetupGroup,
  createMeetupGroup,
} from './persistence/MeetupGroup'
import fetch from 'cross-fetch'
import { MeetupGroup } from './types/MeetupGroup'

async function _fetch(groupUrlName): Promise<MeetupGroup> {
  if (fs.existsSync(groupUrlName)) {
    const data = fs.readFileSync(groupUrlName)
    return JSON.parse(data.toString())
  } else {
    const meetupData = await fetch(`https://api.meetup.com/${groupUrlName}`)
    const jsonData = await meetupData.json()
    if (jsonData.errors) {
      throw new Error(jsonData.errors[0].message)
    }
    return jsonData
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
  const group = await _fetch(groupUrl)

  const existingGroup = await getGroup(group.urlname)

  if (existingGroup) {
    return existingGroup
  } else {
    return await createMeetupGroup(group)
  }
}
