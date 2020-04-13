import React from 'react'
import { graphql } from 'gatsby'

import ReactMarkdown from 'react-markdown/with-html'
import Layout from '../components/layout'
import SEO from '../components/seo'
//import { Box, Heading, Paragraph } from 'grommet'
import Mdx from '../components/Mdx'

import { Carousel } from 'react-responsive-carousel'
import { FullWidth } from '../components/TwoCols'
import { Paragraph, Heading, Anchor, Box, Image, Text } from 'grommet'
import Time from '../components/Time'

const renderers = {
  paragraph: props => <Paragraph fill>{props.children}</Paragraph>,
  heading: ({ level, children }) => (
    <Heading level={level} color={level == 1 ? 'turqoise' : 'brand'}>
      {children}
    </Heading>
  ),
  link: ({ href, children }) => <Anchor to={href}>{children}</Anchor>,
}
export default ({ data: { graphcms, allCloudinaryMedia } }) => {
  const { meetup } = graphcms
  return (
    <Layout>
      <SEO title={meetup.name} />
      <FullWidth>
        <Text>{Time({ timeString: meetup.time })} </Text>
        <Heading level={1} color="turqoise">
          {meetup.name}
        </Heading>
        <ReactMarkdown escapeHtml={false} renderers={renderers}>
          {meetup.description}
        </ReactMarkdown>
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
        meetupComId
        name
        time
        description
        onlineUrl
        meetupGroup {
          name
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
