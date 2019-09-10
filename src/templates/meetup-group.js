import React from "react"
import { graphql } from "gatsby"
import { Box, Heading, Image, Paragraph, Text, Anchor } from "grommet"

import Layout from "../components/layout"
import SEO from "../components/seo"

import ResponsiveGrid from "../components/ResponsiveGrid"

const MeetupEvent = ({ meetup }) => (
  <div>
    <Heading level={2}>{meetup.name}</Heading>
    <Paragraph fill dangerouslySetInnerHTML={{ __html: meetup.description }} />
  </div>
)

export default ({ data }) => (
  <Layout>
    <SEO title={data.meetupGroup.name} />
    {data.urlname}
    <Box full={true} flex={false}>
      <ResponsiveGrid>
        <Image
          alignSelf="center"
          fit="contain"
          width={200}
          src={data.meetupGroup.group_photo.highres_link}
        />

        {data.meetupGroup.events.map(event => (
          <MeetupEvent meetup={event} />
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
      group_photo {
        highres_link
      }
      events {
        name
        status
        local_date
        local_time
        link
        description
      }
    }
  }
`
