import React from 'react'
import { graphql, Link } from 'gatsby'
import Layout from '../components/layout'
import SEO from '../components/seo'
//import { Box, Heading, Paragraph } from 'grommet'

import { Carousel } from 'react-responsive-carousel'
import { FullWidth } from '../components/TwoCols'
import { Heading, Anchor, Box, Image, Text } from 'grommet'
import { FormPrevious } from 'grommet-icons'

import Time from '../components/Time'
import { YoutubeEmbed } from '../components/event/YoutubeEmbed'
import ReactMarkdown from '../components/event/ReactMarkdown'

export default () => {
  //const { meetup } = graphcms

  const meetup = {
    id: 1,
    meetupComId: 1,
    name: 'sample meetup',
    time: '2010-10-12',
    description: 'a foo description',
    onlineUrl: 'http://foo.bar',
    recording: 'http://foo.bar',
    meetupGroup: {
      name: 'coding x',
    },
    highlightImage: {
      fileName: 'somaname.jpg',
      url: 'https://picsum.photos/800/400',
    },
  }

  const allCloudinaryMedia = { edges: [] }

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
        <Text>{Time({ timeString: meetup.time })} </Text>
        <Heading level={1} color="turqoise">
          {meetup.name}
        </Heading>
        {meetup.recording && <YoutubeEmbed url={meetup.recording} />}
        <ReactMarkdown>{meetup.description}</ReactMarkdown>
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

// export const query = graphql`
//   query($id: ID!, $cloudinaryTag: String) {
//     graphcms {
//       meetup(where: { id: $id }) {
//         id
//         meetupComId
//         name
//         time
//         description
//         onlineUrl
//         recording
//         meetupGroup {
//           name
//         }
//         highlightImage {
//           fileName
//           handle
//           url
//         }
//       }
//     }

//     allCloudinaryMedia(
//       filter: { tags: { in: [$cloudinaryTag] } }
//       sort: { fields: created_at, order: ASC }
//     ) {
//       edges {
//         node {
//           id
//           maxeco_image {
//             secure_url
//           }
//         }
//       }
//     }
//   }
// `
