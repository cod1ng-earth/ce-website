import gql from 'graphql-tag'
import apolloClient from '../apolloClient'
import { MeetupGroup } from '../types/MeetupGroup'

export const CREATE_MEETUP_GROUP = gql`
  mutation CreateMeetupGroup(
    $id: String
    $name: String!
    $description: String
    $urlname: String
    $who: String
    $timezone: String
  ) {
    createMeetupGroup(
      data: {
        name: $name
        groupStatus: active
        meetupComId: $id
        description: $description
        urlname: $urlname
        who: $who
        timezone: $timezone
      }
    ) {
      id
    }
  }
`

export const QUERY_GROUP = gql`
  query MeetupGroupByURL($urlname: String) {
    meetupGroups(where: { urlname: $urlname }) {
      id
      meetupComId
      urlname
      name
    }
  }
`

export const QUERY_ONE_GROUP = gql`
  query MeetupGroup($id: ID!) {
    meetupGroup(where: { id: $id }) {
      id
      meetupComId
      urlname
      name
    }
  }
`

/*
{
    "id": 20370223,
    "name": "coding berlin",
    "urlname": "CODING-BERLIN",
    "description": "",
  	"who": "Coders",
    "timezone": "Europe/Berlin",
}
*/

export async function createMeetupGroup(meetupGroup) {}
export async function update(group) {}

export async function get(group: string) {
  const result = await apolloClient.query({
    query: QUERY_GROUP,
    variables: { urlname: group },
  })
  return result
}

export async function add(group: MeetupGroup) {
  await apolloClient.mutate({
    mutation: CREATE_MEETUP_GROUP,
    variables: {},
  })
}
