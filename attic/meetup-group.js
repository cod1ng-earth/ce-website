import React from 'react'
import { graphql } from 'gatsby'
import { Box, Image, Heading } from 'grommet'
import excerpt from 'excerpt-html'

import Layout from '../src/components/layout'
import SEO from '../src/components/seo'
import ResponsiveGrid from '../src/components/ResponsiveGrid'

import MeetupPreview from '../src/components/MeetupPreview'
import Fade from 'react-reveal/Fade'

export default ({ data }) => (
  <Layout>
    <SEO
      title={data.meetupGroup.name}
      description={excerpt(data.meetupGroup.description)}
    />

    <ResponsiveGrid>
      <Image
        alt={`${data.meetupGroup.name} logo`}
        alignSelf="center"
        fit="contain"
        width={200}
        style={{ minHeight: 200 }}
        src={data.meetupGroup.group_photo.photo_link}
      />
      <Heading level={1}>{data.meetupGroup.name}</Heading>
      <Fade left ssrFadeout distance="20px" duration={1000}>
        {data.meetupGroup.events.map(event => (
          <MeetupPreview meetup={event} key={event.meetupId} />
        ))}
      </Fade>
    </ResponsiveGrid>
  </Layout>
)

export const query = graphql`
  query($urlname: String) {
    meetupGroup(urlname: { eq: $urlname }) {
      id
      name
      description
      urlname
      group_photo {
        photo_link
      }
      key_photo {
        photo_link
      }
      events {
        meetupId
        name
        status
        time
        local_date
        local_time
        link
        description
        venue {
          name
        }
        group {
          urlname
          timezone
          urlname
        }
      }
    }
  }
`
