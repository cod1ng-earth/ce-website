import * as fs from 'fs'
import { createHttpLink } from 'apollo-link-http'
import { ApolloClient } from 'apollo-client'
import { InMemoryCache } from 'apollo-cache-inmemory'
import fetch from 'cross-fetch'

import { get as getGroup } from './persistence/MeetupGroup'

const client = new ApolloClient({
  cache: new InMemoryCache(),
  link: createHttpLink({
    fetch,
    uri: process.env.GRAPHCMS_ENDPOINT,
    headers: {
      Authorization: `Bearer ${process.env.GRAPHCMS_TOKEN}`,
    },
  }),
})

function _fetch(url) {
  const data = fs.readFileSync('./fixtures/CODING-BERLIN.json')
  const content = data.toString()
  return content
}

export default async function importer(group) {
  try {
    const groupData = await getGroup(client, group)
    console.log(groupData)
  } catch (e) {
    console.error(e)
  }
}
