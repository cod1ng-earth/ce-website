import React from "react"
import { graphql } from "gatsby"
import { Box, Heading, Image, Paragraph, Text, Anchor } from "grommet"

import Layout from "../components/layout"
import SEO from "../components/seo"

import ResponsiveGrid from "../components/ResponsiveGrid"
import styled from "styled-components"
import { theme } from "../components/theme"

import "react-responsive-carousel/lib/styles/carousel.min.css"
import { Carousel } from "react-responsive-carousel"

const StyledParagraph = styled(Paragraph)`
  a {
    color: ${theme.global.colors.brand};
    :hover {
      color: ${theme.global.colors.turqoise};
    }
  }
`

const MeetupEvent = ({ meetup }) => (
  <div>
    <Heading level={2}>{meetup.name}</Heading>
    <StyledParagraph
      fill
      dangerouslySetInnerHTML={{ __html: meetup.description }}
    />
    <Carousel
      showThumbs={false}
      showArrows={false}
      emulateTouch={true}
    ></Carousel>
  </div>
)

export default ({ data }) => (
  <Layout>
    <SEO title={data.meetupEvent.name} />
    <Box full={true} flex={false}>
      <ResponsiveGrid>
        <MeetupEvent meetup={data.meetupEvent} />
      </ResponsiveGrid>
    </Box>
  </Layout>
)

export const query = graphql`
  query($eventId: String) {
    meetupEvent(meetupId: { eq: $eventId }) {
      meetupId
      name
      description
      link
      local_date
      local_time

      venue {
        name
        address_1
        address_2
        city
      }
    }
  }
`
