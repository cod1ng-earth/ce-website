import React from "react"
import { graphql } from "gatsby"

import { Box, Image } from "grommet"

import "react-responsive-carousel/lib/styles/carousel.min.css"
import { Carousel } from "react-responsive-carousel"

import Layout from "../components/layout"
import SEO from "../components/seo"
import EventHeader from "../components/event/header"
import Mdx from "../components/Mdx"
import StyledParagraph from "../components/StyledParagraph"
import ResponsiveGrid from "../components/ResponsiveGrid"
import RSVPButton from "../components/ui/RSVPButton"

export default ({ data }) => (
  <Layout>
    <SEO title={data.meetupEvent.name} />
    <EventHeader meetup={data.meetupEvent} group={data.meetupGroup} />

    <ResponsiveGrid>
      {data.mdx === null ? (
        <StyledParagraph
          fill
          dangerouslySetInnerHTML={{ __html: data.meetupEvent.description }}
        />
      ) : (
        <Mdx mdx={data.mdx} />
      )}
      <Box justify="center">
        {data.meetupEvent.status === `upcoming` && (
          <RSVPButton meetup={data.meetupEvent} />
        )}
      </Box>
    </ResponsiveGrid>

    <Box pad="medium">
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
          <Box key={img.node.id} height="large" pad="medium">
            <Image src={img.node.maxeco_image.secure_url} fit="contain" />
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
      status
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

    mdx(frontmatter: { meetupId: { eq: $eventId } }) {
      id
      body
      frontmatter {
        title
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
