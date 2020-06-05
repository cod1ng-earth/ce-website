import { graphql } from 'gatsby'
import { Box, Heading, Image } from 'grommet'

import React, { useState } from 'react'
import { Carousel } from 'react-responsive-carousel'
import Meetup from '../components/event/Meetup'
import MeetupSidebar from '../components/event/Sidebar'
import MeetupHeader from '../components/event/Header'
import FullWidth from '../components/FullWidth'
import Layout from '../components/layout'

import SEO from '../components/seo'
import YoutubeEmbed from '../components/event/YoutubeEmbed'

export default ({ data: { graphcms, allCloudinaryMedia } }) => {
  const { meetup } = graphcms

  const [attending, setAttending] = useState(false)

  const [timeZone, setTimeZone] = useState(
    Intl.DateTimeFormat().resolvedOptions().timeZone
  )
  const meetupUTCTime = new Date(meetup.time)
  const upcoming = meetupUTCTime.getTime() > new Date().getTime()

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
        <Heading level={1} color="white" size="small">
          {meetup.name}
        </Heading>
      </FullWidth>
      <FullWidth background="grey-800">
        <MeetupHeader meetup={meetup} timeZone={timeZone} />
      </FullWidth>
      <FullWidth background="grey-900">
        <Box direction="row-responsive" gap="medium">
          <Box basis="2/3">
            <Meetup
              meetup={meetup}
              timeZone={timeZone}
              meetupUTCTime={meetupUTCTime}
            />
          </Box>
          <Box
            basis="1/3"
            background="grey-800"
            pad="medium"
            fill="horizontal"
            height={{ max: 'medium' }}
          >
            <MeetupSidebar
              meetup={meetup}
              attending={attending}
              setAttending={setAttending}
              setTimeZone={setTimeZone}
            />
          </Box>
        </Box>
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
        <Box>
          {!upcoming && meetup.recording && (
            <YoutubeEmbed url={meetup.recording} />
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
