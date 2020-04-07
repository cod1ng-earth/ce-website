//import ky from 'ky-universal'
const fs = require('fs')
const createHttpLink = require('apollo-link-http').createHttpLink
const ApolloClient = require('apollo-client').ApolloClient
const InMemoryCache = require('apollo-cache-inmemory').InMemoryCache

const gql = require('graphql-tag')
const fetch = require('node-fetch')

const GRAPHCMS_URL = ''
const GRAPHCMS_TOKEN = ''

const QUERY_GROUP = gql`
  query MyQuery {
    meetupGroups {
      id
    }
  }
`

const client = new ApolloClient({
  cache: new InMemoryCache(),
  link: createHttpLink({
    fetch,
    uri: GRAPHCMS_URL,
    headers: {
      Authorization: `Bearer ${GRAPHCMS_TOKEN}`,
    },
  }),
})

function _fetch(url) {
  const data = fs.readFileSync('./fixtures/CODING-BERLIN.json')
  const content = JSON.parse(data)
  return content
}

async function updateGroup(group) {}

async function getData(group) {
  const result = await client.query({
    query: QUERY_GROUP,
    variables: {},
  })
  return result
}

module.exports = async function importer(group) {
  const url = 'https://api.meetup.com'

  const groupData = await getData('test')
  console.log(groupData)

  //const groupData = fetch(url)
  //console.log(groupData)
}
