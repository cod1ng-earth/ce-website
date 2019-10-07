import React from "react"
import { graphql } from "gatsby"

import { Box, Image } from "grommet"
import excerpt from "excerpt-html"

import "react-responsive-carousel/lib/styles/carousel.min.css"
import { Carousel } from "react-responsive-carousel"

import Layout from "../components/layout"
import SEO from "../components/seo"
import EventHeader from "../components/event/header"
import Mdx from "../components/Mdx"
import StyledParagraph from "../components/StyledParagraph"
import ResponsiveGrid from "../components/ResponsiveGrid"
import RSVPButton from "../components/ui/RSVPButton"

export default ({ data }) => {
  const featuredPhoto = data.meetupEvent.featured_photo
    ? data.meetupEvent.featured_photo.photo_link
    : data.meetupGroup.group_photo.thumb_link

  return (
    <Layout>
      <SEO
        meta={[
          {
            property: `og:image`,
            content: featuredPhoto,
          },
          {
            property: `twitter:image`,
            content: featuredPhoto,
          },
        ]}
        title={data.meetupEvent.name}
        description={excerpt(data.meetupEvent.description)}
      />
      <EventHeader meetup={data.meetupEvent} group={data.meetupGroup} />

      <ResponsiveGrid>
        {data.meetupEvent.featured_photo && (
          <Image
            gridArea="logo"
            fit="contain"
            src={data.meetupEvent.featured_photo.photo_link}
            justify="center"
            alignSelf="center"
            justifySelf="center"
            alt={`${data.meetupEvent.name} featured photo`}
          />
        )}
        {data.mdx === null ? (
          <StyledParagraph fill>
            <div
              dangerouslySetInnerHTML={{ __html: data.meetupEvent.description }}
            />
          </StyledParagraph>
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
        {data.allCloudinaryMedia.edges.length > 0 && (
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
            {data.allCloudinaryMedia.edges.map(({ node }) => (
              <Box key={node.id} height="large" pad="medium">
                <Image src={node.maxeco_image.secure_url} fit="contain" />
              </Box>
            ))}
          </Carousel>
        )}
      </Box>
    </Layout>
  )
}

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
      featured_photo {
        highres_link
        photo_link
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
