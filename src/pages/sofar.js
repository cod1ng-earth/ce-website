import { graphql, useStaticQuery } from 'gatsby'
import { Box, Heading, Text } from 'grommet'
import React from 'react'
import FullWidth from '../components/FullWidth'
import Layout from '../components/layout'
import PastMeetups from '../components/PastMeetups'
import SEO from '../components/seo'

export default () => {
  const data = useStaticQuery(graphql`
    query {
      graphcms {
        pastMeetups: meetups(orderBy: time_DESC, first: 24, stage: PUBLISHED) {
          id
          name
          time

          keyImage {
            url
          }
          highlightImage {
            url
          }
        }
      }
    }
  `)

  const pastMeetups = data.graphcms.pastMeetups

  return (
    <Layout>
      <SEO
        title="previously on coding earth"
        description="what happened so far at coding earth"
      />

      <FullWidth>
        <Box direction="row" align="baseline">
          <Heading level={1} color="white">
            Previously.
          </Heading>
          <Text color="grey-400" size="small" margin={{ left: 'small' }}>
            On coding.earth
          </Text>
        </Box>
      </FullWidth>

      <FullWidth background="grey-900" pad={{ vertical: 'medium' }}>
        <PastMeetups meetups={pastMeetups} />
      </FullWidth>
    </Layout>
  )
}

// export const query = graphql`
//   query($today: GraphCMS_DateTime) {
//     graphcms {
//       meetups(orderBy: time_DESC, where: { time_lt: $today }) {
//         id
//         name
//         time
//         meetupGroup {
//           name
//         }
//       }
//     }
//   }
// `
