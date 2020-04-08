import gql from 'graphql-tag'
import ApolloClient from 'apollo-client'

const GQL_CREATE_MEETUP_GROUP = gql`
  mutation(
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

const QUERY_GROUP = gql`
  query($urlname: String) {
    meetupGroups(where: { urlname: $urlname }) {
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

export async function get(client: ApolloClient<any>, group: string) {
  const result = await client.query({
    query: QUERY_GROUP,
    variables: { urlname: group },
  })
  return result
}
