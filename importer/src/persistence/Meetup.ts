import gql from 'graphql-tag'
import apolloClient from '../apolloClient'
import { Meetup, MeetupGroup } from '../types/MeetupGroup'

export const MEETUP_FRAGMENTS = {
  common: gql`
    fragment MeetupCommon on Meetup {
      id
      meetupComId
      name
      description
      duration
      onlineUrl
      time
    }
  `,
}

export const CREATE_MEETUP = gql`
  mutation CreateMeetup(
    $name: String!
    $meetupComId: String
    $description: String
    $time: DateTime!
    $duration: Int
    $onlineUrl: String
    $meetupGroup: MeetupGroupCreateOneInlineInput
  ) {
    createMeetup(
      data: {
        name: $name
        meetupComId: $meetupComId
        description: $description
        time: $time
        duration: $duration
        onlineUrl: $onlineUrl
        meetupGroup: $meetupGroup
      }
    ) {
      ...MeetupCommon
    }
  }
  ${MEETUP_FRAGMENTS.common}
`

export const QUERY_BY_GROUP = gql`
  query MeetupsByGroup {
    meetupGroup(where: { urlname: "CODING-BERLIN" }) {
      id
      urlname
      meetups {
        ... on Meetup {
          ...MeetupCommon
        }
      }
    }
  }
  ${MEETUP_FRAGMENTS.common}
`

export const QUERY_ONE_MEETUP = gql`
  query MyQuery($id: ID!) {
    meetup(where: { id: $id }) {
      ...MeetupCommon
    }
  }

  ${MEETUP_FRAGMENTS.common}
`

export async function createMeetup(
  meetupGroup: MeetupGroup,
  meetup: Meetup
): Promise<Meetup> {
  const variables = {
    ...meetup,
    time: meetup.time.toUTCString(),
    meetupGroup: { connect: { urlname: meetupGroup.urlname } },
  }
  const result = await apolloClient.mutate({
    mutation: CREATE_MEETUP,
    variables,
  })
  meetup.id = result.data.createMeetup.id
  return meetup
}
export async function update(meetup) {}

export async function get(groupUrlName: string): Promise<Meetup[]> {
  const result = await apolloClient.query({
    query: QUERY_BY_GROUP,
    variables: { urlname: groupUrlName },
  })
  return result.data.meetupGroup.meetups
}

export async function getOne(id: string): Promise<Meetup> {
  const result = await apolloClient.query({
    query: QUERY_ONE_MEETUP,
    variables: { id },
  })

  return result.data.meetupGroup.meetups
}
