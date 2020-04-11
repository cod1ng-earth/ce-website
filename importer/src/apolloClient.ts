import { createHttpLink } from 'apollo-link-http'
import { ApolloClient } from 'apollo-client'
import { InMemoryCache } from 'apollo-cache-inmemory'
import fetch from 'cross-fetch'

export default new ApolloClient({
  cache: new InMemoryCache(),
  link: createHttpLink({
    fetch,
    uri: process.env.GRAPHCMS_ENDPOINT,
    headers: {
      Authorization: `Bearer ${process.env.GRAPHCMS_TOKEN}`,
    },
  }),
})
