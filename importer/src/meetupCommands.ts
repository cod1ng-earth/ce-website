import * as fs from 'fs'
import {
  get as getMeetupsByGroupUrlName,
  createMeetup,
} from './persistence/Meetup'
import fetch from 'cross-fetch'
import { Meetup } from './types/MeetupGroup'
import { getGroup } from './groupCommands'

async function _fetch(groupUrlName): Promise<Meetup[]> {
  if (fs.existsSync(groupUrlName)) {
    const data = fs.readFileSync(groupUrlName)
    return JSON.parse(data.toString())
  } else {
    const meetupData = await fetch(
      `https://api.meetup.com/${groupUrlName}/events?status=upcoming,past`
    )
    const jsonData = await meetupData.json()
    if (jsonData.errors) {
      throw new Error(jsonData.errors[0].message)
    }
    return jsonData
  }
}

export async function getMeetups(groupUrlName: string): Promise<Meetup[]> {
  const meetups = await getMeetupsByGroupUrlName(groupUrlName)
  return meetups
}

export async function importMeetups(
  groupUrlName: string,
  file: string | null
): Promise<Meetup[]> {
  const existingGroup = await getGroup(groupUrlName)
  if (!existingGroup) {
    throw new Error(`you must create the group ${groupUrlName} first`)
  }
  if (file && !fs.existsSync(file)) {
    throw new Error(`file ${file} not found`)
  }
  const data = fs.readFileSync(file)
  const meetupContent = JSON.parse(data.toString())
  const results = []
  const meetups = meetupContent.map(meetup => {
    return createMeetup(existingGroup, {
      ...meetup,
      id: null,
      meetupComId: meetup.id,
      time: new Date(meetup.time),
      meetupGroup: existingGroup,
    })
  })

  for await (const meetup of meetups) {
    results.push(meetup)
  }

  return results
}
