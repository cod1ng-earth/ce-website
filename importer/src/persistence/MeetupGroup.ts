import gql from 'graphql-tag'
import apolloClient from '../apolloClient'
import { MeetupGroup } from '../types/MeetupGroup'

export const MEETUP_GROUP_FRAGMENTS = {
  common: gql`
    fragment MeetupGroupCommon on MeetupGroup {
      id
      meetupComId
      urlname
      name
      groupStatus
      description
      created
      who
      timezone
    }
  `,
}

export const CREATE_MEETUP_GROUP = gql`
  mutation CreateMeetupGroup(
    $name: String!
    $meetupComId: String
    $description: String
    $urlname: String!
    $who: String
    $timezone: String
  ) {
    createMeetupGroup(
      data: {
        groupStatus: active
        name: $name
        meetupComId: $meetupComId
        description: $description
        urlname: $urlname
        who: $who
        timezone: $timezone
      }
    ) {
      ...MeetupGroupCommon
    }
  }
  ${MEETUP_GROUP_FRAGMENTS.common}
`

export const QUERY_GROUP = gql`
  query MeetupGroupByURL($urlname: String) {
    meetupGroups(where: { urlname: $urlname }) {
      ...MeetupGroupCommon
    }
  }
  ${MEETUP_GROUP_FRAGMENTS.common}
`

export const QUERY_ONE_GROUP = gql`
  query MeetupGroup($id: ID!) {
    meetupGroup(where: { id: $id }) {
      ...MeetupGroupCommon
    }
  }
  ${MEETUP_GROUP_FRAGMENTS.common}
`

export async function createMeetupGroup(
  meetupGroup: MeetupGroup
): Promise<MeetupGroup> {
  const result = await apolloClient.mutate({
    mutation: CREATE_MEETUP_GROUP,
    variables: meetupGroup,
  })
  return result.data.createMeetupGroup
}
export async function update(meetupGroup) {}

export async function get(group: string): Promise<MeetupGroup | null> {
  const result = await apolloClient.query({
    query: QUERY_GROUP,
    variables: { urlname: group },
  })
  return result.data.meetupGroups.length
    ? (result.data.meetupGroups[0] as MeetupGroup)
    : null
}

export async function add(group: MeetupGroup) {
  await apolloClient.mutate({
    mutation: CREATE_MEETUP_GROUP,
    variables: {},
  })
}
