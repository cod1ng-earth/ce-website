import React from 'react'
import { graphql, Link } from 'gatsby'
import Layout from '../components/layout'
import SEO from '../components/seo'

import { Carousel } from 'react-responsive-carousel'
import { FullWidth } from '../components/TwoCols'
import { Anchor, Box, Image } from 'grommet'
import { FormPrevious } from 'grommet-icons'

import Meetup from '../components/event/Meetup'

export default ({ data: { graphcms, allCloudinaryMedia } }) => {
  const { meetup } = graphcms
  return (
    <Layout>
      <SEO
        title={meetup.name}
        description={meetup.name}
        seoImage={
          meetup.highlightImage?.url ||
          'https://coding.earth/img/coding_earth_og.png'
        }
      />
      <FullWidth>
        <Anchor
          as={Link}
          icon={<FormPrevious />}
          to="/sofar"
          label="all meetups"
        />
        <Meetup meetup={meetup} />

        <Box pad="medium">
          {allCloudinaryMedia.edges.length > 0 && (
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
              {allCloudinaryMedia.edges.map(({ node }) => (
                <Box key={node.id} height="large" pad="medium">
                  <Image src={node.maxeco_image.secure_url} fit="contain" />
                </Box>
              ))}
            </Carousel>
          )}
        </Box>
      </FullWidth>
    </Layout>
  )
}

export const query = graphql`
  query($id: ID!, $cloudinaryTag: String) {
    graphcms {
      meetup(where: { id: $id }) {
        id
        name
        time
        duration
        description
        onlineUrl
        recording
        keyImage {
          url
        }
        highlightImage {
          url
        }
        talks {
          id
          title
          description
          slides
          recording
          time
          speaker {
            name
            location
            company
            companyUrl
            twitter
            github
            linkedin
            avatar {
              url
            }
          }
        }
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
