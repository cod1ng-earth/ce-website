import React from "react"
import { graphql, Link } from "gatsby"
import { Anchor, Box, Heading, Image, Paragraph } from "grommet"

import Layout from "../components/layout"
import SEO from "../components/seo"

import ResponsiveGrid from "../components/ResponsiveGrid"

import "react-responsive-carousel/lib/styles/carousel.min.css"

const MeetupEvent = ({ group, meetup }) => (
  <div>
    <Heading level={2}>{meetup.name}</Heading>
    <Paragraph>
      {meetup.local_date} {meetup.local_time}
      <Anchor as={Link} to={`/${group.urlname}/${meetup.meetupId}`}>
        Lets go
      </Anchor>
    </Paragraph>
  </div>
)

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
          src={data.meetupGroup.group_photo.highres_link}
        />

        {data.meetupGroup.events.map(event => (
          <MeetupEvent group={data.meetupGroup} meetup={event} />
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
        highres_link
      }
      events {
        meetupId
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
