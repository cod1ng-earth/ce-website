import { Box, Heading, Image, Paragraph, Text } from 'grommet'
import React from 'react'
import { Fade } from 'react-reveal'
import Layout from '../components/layout'
import { MailchimpSignup } from '../components/MailchimpSignup'
import PastMeetups from '../components/PastMeetups'

import SEO from '../components/seo'
import TwoCols from '../components/TwoCols'
import FullWidth from '../components/FullWidth'
import { Next } from 'grommet-icons'
import codeImage from '../images/ce-code.svg'
import { Divider } from '../components/Divider'
import { SectionButton } from '../components/SectionButton'
import Hero from '../components/index/Hero'
import RulesOfCodingEarth from '../components/index/RulesOfCodingEarth'
import { useStaticQuery, graphql } from 'gatsby'
import UpcomingMeetup from '../components/UpcomingMeetup'

import 'react-typist/dist/standalone/Typist.min.css'
import { Carousel } from 'react-responsive-carousel'

const IndexPage = () => {
  const data = useStaticQuery(graphql`
    query {
      allCloudinaryMedia(
        filter: { tags: { in: ["index"] } }
        sort: { fields: created_at, order: ASC }
      ) {
        edges {
          node {
            id
            secure_url
            context {
              custom {
                alt
                caption
              }
            }

            maxeco {
              secure_url
            }
          }
        }
      }

      graphcms {
        allMeetups: meetups(orderBy: time_DESC, first: 7, stage: PUBLISHED) {
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
    }
  `)

  const now = new Date()
  const pastMeetups = data.graphcms.allMeetups.filter(
    m => new Date(m.time).getTime() < now.getTime()
  )
  const upcomingMeetups = data.graphcms.allMeetups.filter(
    m => new Date(m.time).getTime() > now.getTime()
  )

  return (
    <Layout isHero>
      <SEO
        title="coding earth :: home"
        description="coding earth is a meetup community for developers"
        seoImage="https://coding.earth/img/coding_earth_og.png"
      />

      <Hero />
      <FullWidth
        background="grey-800"
        pad={{ vertical: 'medium', horizontal: 'large' }}
      >
        <Box pad={{ vertical: 'large', horizontal: 'xlarge' }} justify="center">
          <Fade left ssrFadeout distance="20px" duration={1000}>
            <Divider />
            <Paragraph
              fill
              size="large"
              textAlign="center"
              margin={{ top: 'large' }}
              color="grey-100"
            >
              Everybody's welcome, everyone's invited, everyone will take
              something home from our meetups. Our meetups are not your usual
              "experts talk, audience listens" kind of experience but a
              community driven meetup that embraces a knowledge exchange culture
              as well as a strict "nice to have you here"-attitude.
            </Paragraph>
          </Fade>
        </Box>
      </FullWidth>

      {upcomingMeetups.length > 0 && (
        <FullWidth background="black" pad={{ vertical: 'large' }}>
          <Box direction="row" align="baseline">
            <Heading level={2}>Upcoming meetups.</Heading>
            <Text color="grey-400" size="small" margin={{ left: 'small' }}>
              Save the date.
            </Text>
          </Box>

          {upcomingMeetups.map(meetup => (
            <UpcomingMeetup key={`meetup-${meetup.id}`} meetup={meetup} />
          ))}
        </FullWidth>
      )}

      <FullWidth background="grey-900" pad={{ vertical: 'large' }}>
        <Box direction="row" align="baseline">
          <Heading level={2}>Previously.</Heading>
          <Text color="grey-400" size="small" margin={{ left: 'small' }}>
            On coding.earth
          </Text>
        </Box>

        <PastMeetups meetups={pastMeetups} />

        <Box margin={{ top: 'large' }}>
          <SectionButton
            to="/sofar"
            Icon={Next}
            label="See all previous events"
            size="medium"
          />
        </Box>
      </FullWidth>

      <FullWidth background="black" pad={{ vertical: 'large' }}>
        <Heading
          level={2}
          color="white"
          alignSelf="center"
          margin={{ top: 'medium', bottom: 'medium' }}
        >
          pre pandemic Impressions
        </Heading>

        <Carousel
          transitionTime={800}
          useKeyboardArrows
          autoPlay
          infiniteLoop
          centerMode
          showThumbs={true}
          showArrows={true}
          emulateTouch={true}
          showIndicators={false}
        >
          {data.allCloudinaryMedia.edges.map(({ node }) => (
            <Box key={node.id} pad="small">
              <Image src={node.maxeco.secure_url} fit="contain" />
              <Paragraph className="legend" fill>
                {node.context.custom.caption} | {node.context.custom.alt}
              </Paragraph>
            </Box>
          ))}
        </Carousel>
      </FullWidth>

      <FullWidth background="grey-800" pad={{ vertical: 'large' }}>
        <TwoCols gap="large">
          <Box
            basis="1/2"
            elevation="large"
            fill={false}
            height={{ max: 'large' }}
          >
            <Image
              src={codeImage}
              fit="cover"
              fill={true}
              style={{ objectPosition: 'left' }}
            />
          </Box>
          <Box basis="1/2">
            <Heading level="2" margin={{ top: 'none' }}>
              1 line of code.
            </Heading>
            <Paragraph fill size="medium">
              Isn't it amazing how many technologies, languages and tools to
              know in modern software development? Be it blockchains for storing
              transactions, machines taking decisions based on digital learning
              sets, virtual cloud instances providing computing power for scaled
              applications and command line tools that improve your workflow:
              it's nearly impossible to keep track of everything.
            </Paragraph>
            <Paragraph fill>
              Here we jump in: Instead of specialising on a dedicated topic,
              coding earth was established to become a space for earth's coder
              community: every development related topic is welcome here, every
              developer with any skill level will take away something new on
              every session, every question may be asked and everyone should
              have a good time. There's only one golden rule:
            </Paragraph>
          </Box>
        </TwoCols>
        <Box margin={{ top: 'large', horizontal: 'auto' }} width="large">
          <Paragraph textAlign="center" fill>
            <Text weight="bold" size="large">
              Talks have to be hands on, they must contain at least 1 line of
              code and in the best case they're supported by demos.
            </Text>
          </Paragraph>
        </Box>
      </FullWidth>

      <FullWidth background="purple-500" pad={{ vertical: 'large' }}>
        <Box margin={{ top: 'small', bottom: 'large' }}>
          <Divider />
        </Box>
        <TwoCols gap="large">
          <Box basis="1/2">
            <Fade left ssrFadeout distance="20px" duration={1000}>
              <Heading level={2}>Contribute!</Heading>
              <Paragraph fill>
                We are looking forward to your ideas for upcoming meetups. If
                you want to share any of your knowledge with a highly motivated
                community, this is the right place. If you want to demonstrate a
                software stack that you're using in your startup, this is the
                place to present. If you seek for an opportunity to spread the
                evangelism of the next big programming language: give a talk at
                coding earth. We're embracing every technology and personality
                and we're just waiting for you.
              </Paragraph>
            </Fade>
          </Box>
          <Box basis="1/2">
            <Heading level={2}>Stay tuned.</Heading>
            <MailchimpSignup />
          </Box>
        </TwoCols>
      </FullWidth>

      <FullWidth background="grey-600" pad={{ vertical: 'large' }}>
        <Heading
          level={2}
          color="white"
          alignSelf="center"
          margin={{ top: 'large', bottom: 'xlarge' }}
        >
          Our rules.
        </Heading>
        <Box width="large" alignSelf="center" pad={{ bottom: 'large' }}>
          <RulesOfCodingEarth />
        </Box>
      </FullWidth>
    </Layout>
  )
}

export default IndexPage
