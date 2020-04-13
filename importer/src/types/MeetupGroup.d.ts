export interface MeetupGroup {
  id: string
  meetupComId: string | null
  urlname: string
  name: string
  groupStatus: string
  description: string
  created: string | null
  who: string | null
  timezone: string | null
  meetups: Meetup
}

export interface Meetup {
  id: string
  name: string
  duration: number
  meetupComId: string | null
  description: string | null
  onlineUrl: string | null
  time: Date
  meetupGroup: MeetupGroup
}
