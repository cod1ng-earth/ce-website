import React from "react"
import { graphql } from "gatsby"
import { Box, Image } from "grommet"

import Layout from "../components/layout"
import SEO from "../components/seo"
import ResponsiveGrid from "../components/ResponsiveGrid"

import MeetupPreview from "../components/MeetupPreview"
import Fade from "react-reveal/Fade"

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
        <Fade left ssrFadeout distance="20px" duration={1000}>
          {data.meetupGroup.events.map(event => (
            <MeetupPreview meetup={event} key={event.meetupId} />
          ))}
        </Fade>
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
        group {
          urlname
          timezone
          urlname
        }
      }
    }
  }
`
