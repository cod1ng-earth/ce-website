import React from "react"
import { graphql } from "gatsby"
import { Box, Grid, Heading, Image, Paragraph, Text, Anchor } from "grommet"

import Layout from "../components/layout"
import SEO from "../components/seo"

import ResponsiveGrid from "../components/ResponsiveGrid"
import styled from "styled-components"
import { theme } from "../components/theme"
import { DateTime } from "luxon"

import "react-responsive-carousel/lib/styles/carousel.min.css"
import { Carousel } from "react-responsive-carousel"

const StyledParagraph = styled.div`
  a {
    color: ${theme.global.colors.brand};
    :hover {
      color: ${theme.global.colors.turqoise};
    }
  }
`

const Header = ({ meetup, group }) => {
  let date = DateTime.fromMillis(meetup.time)
  date = date.setZone(meetup.group.timezone)
  return (
    <Box background="light-3" height="small">
      <ResponsiveGrid>
        <Grid columns={[`auto`, `auto`]} justifyContent="start">
          <Image
            margin={{ right: `large` }}
            justify="center"
            alignSelf="center"
            fit="contain"
            src={group.group_photo.thumb_link}
          />
          <Box>
            <Heading level={2} margin={{ bottom: `xsmall` }}>
              {meetup.name}
            </Heading>
            <Text>
              {date.toFormat(`ccc`)},{` `}
              {date.toLocaleString(DateTime.DATETIME_MED)}
            </Text>

            <Text>{meetup.venue && meetup.venue.name}</Text>
          </Box>
        </Grid>
      </ResponsiveGrid>
    </Box>
  )
}

export default ({ data }) => (
  <Layout>
    <SEO title={data.meetupEvent.name} />
    <Header meetup={data.meetupEvent} group={data.meetupGroup}></Header>
    <Box full flex={false}>
      <ResponsiveGrid>
        <StyledParagraph
          dangerouslySetInnerHTML={{ __html: data.meetupEvent.description }}
        />
      </ResponsiveGrid>
    </Box>
    <Box full pad="medium" overflow="hidden">
      <Carousel
        transitionTime={800}
        useKeyboardArrows
        autoPlay
        infiniteLoop
        centerMode
        showThumbs={false}
        showArrows={true}
        emulateTouch={true}
        showIndicators={false}
      >
        {data.allCloudinaryMedia.edges.map(img => (
          <Box
            full
            key={img.node.id}
            height="75vh"
            overflow="hidden"
            pad="medium"
          >
            <img
              src={img.node.maxeco_image.secure_url}
              style={{ marginTop: `-20vh` }}
            />
          </Box>
        ))}
      </Carousel>
    </Box>
  </Layout>
)

export const query = graphql`
  query($eventId: String, $groupId: String, $cloudinaryTag: String) {
    meetupEvent(meetupId: { eq: $eventId }) {
      meetupId
      name
      description
      link
      time
      group {
        urlname
        timezone
      }

      venue {
        name
        address_1
        address_2
        city
      }
    }

    meetupGroup(id: { eq: $groupId }) {
      name
      group_photo {
        thumb_link
      }
    }

    allCloudinaryMedia(
      filter: { tags: { in: [$cloudinaryTag] } }
      sort: { fields: created_at, order: ASC }
    ) {
      edges {
        node {
          id
          maxeco_image {
            secure_url
          }
        }
      }
    }
  }
`
