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
import Talk from '../components/Talk'

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
        <Text>{Time({ timeString: meetup.time })} </Text>
        <Heading level={1} color="turqoise">
          {meetup.name}
        </Heading>
        {meetup.recording && (
          <Box margin={{ vertical: 'large' }}>
            {' '}
            <YoutubeEmbed url={meetup.recording} />
          </Box>
        )}
        <ReactMarkdown>{meetup.description}</ReactMarkdown>

        {meetup.talks.length > 0 && (
          <Box background="dark-1" pad="medium" margin={{ vertical: 'large' }}>
            {meetup.talks.map(talk => {
              const speaker = talk.speaker[0]

              return (
                <Talk
                  key={talk.id}
                  name={talk.name}
                  company={{
                    url: speaker.companyUrl,
                    name: speaker.company,
                  }}
                  link={speaker.twitter}
                  image={speaker.avatar && speaker.avatar.url}
                  origin={speaker.location}
                  title={talk.title}
                >
                  {talk.description}
                </Talk>
              )
            })}
          </Box>
        )}

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
