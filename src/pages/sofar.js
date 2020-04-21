import { graphql, useStaticQuery, Link } from 'gatsby'
import React from 'react'
import Layout from '../components/layout'
import SEO from '../components/seo'
import { Anchor, Heading, Text, Box } from 'grommet'
import { FullWidth } from '../components/TwoCols'
import Time from '../components/Time'

export default ({ data }) => {
  const meetups = data.graphcms.meetups

  return (
    <Layout>
      <SEO
        title="previously on coding earth"
        description="what happened so far at coding earth"
      />

      <FullWidth>
        <Heading level={1} color="turqoise">
          previously, on coding earth.
        </Heading>

        {meetups.map(m => (
          <Box key={m.id} margin={{ bottom: 'medium' }}>
            <Text>{Time({ timeString: m.time })} </Text>
            {m.meetupGroup?.name && (
              <Text size="small">{m.meetupGroup.name}</Text>
            )}
            <Anchor as={Link} to={`meetup/${m.id}`} size="medium">
              {m.name}
            </Anchor>
          </Box>
        ))}
      </FullWidth>
    </Layout>
  )
}

export const query = graphql`
  query($today: GraphCMS_DateTime) {
    graphcms {
      meetups(orderBy: time_DESC, where: { time_lt: $today }) {
        id
        name
        time
        meetupGroup {
          name
        }
      }
    }
  }
`
