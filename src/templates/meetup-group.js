import React from "react"
import { graphql } from "gatsby"
import { Box, Image } from "grommet"

import Layout from "../components/layout"
import SEO from "../components/seo"
import ResponsiveGrid from "../components/ResponsiveGrid"

import MeetupPreview from "../components/MeetupPreview"

export default ({ data }) => (
  <Layout>
    <SEO title={data.meetupGroup.name} />

    <Box full={true} flex={false}>
      <ResponsiveGrid>
        <Image
          alignSelf="center"
          fit="contain"
          width={200}
          style={{ minHeight: 200 }}
          src={data.meetupGroup.group_photo.photo_link}
        />

        {data.meetupGroup.events.map(event => (
          <MeetupPreview
            group={data.meetupGroup}
            meetup={event}
            key={event.meetupId}
          />
        ))}
      </ResponsiveGrid>
    </Box>
  </Layout>
)

export const query = graphql`
  query($urlname: String) {
    meetupGroup(urlname: { eq: $urlname }) {
      id
      name
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
      }
    }
  }
`
