import { Box, Heading, Image, Paragraph, Text } from 'grommet'
import { ForwardTen } from 'grommet-icons'
import React from 'react'
import { Fade } from 'react-reveal'
import styled from 'styled-components'
import Layout from '../components/layout'
import { MailchimpSignup } from '../components/MailchimpSignup'
import UpcomingMeetups from '../components/UpcomingMeetups'
import PastMeetups from '../components/PastMeetups'
import SEO from '../components/seo'
import { theme } from '../components/theme'
import { FullWidth, TwoCols } from '../components/TwoCols'
import heroPattern from '../images/hero-pattern.svg'
import logo from '../images/ce-logo.svg'
import codeImage from '../images/ce-code.svg'
import { Divider } from '../components/Divider'
import { SectionButton } from '../components/SectionButton'

const StyledRules = styled.ol`
  list-style-type: none;
  padding: 0;
  margin: 0;

  li {
    padding: 30px 30px 40px;
    font-size: 14px;
    margin-bottom: 2em;
    line-height: 1.6em;
  }
`

const StyledH1 = styled(Heading)`
  font-size: 110px;
  line-height: 0.85;
  max-width: 450px;
  margin-block-start: 0;
  margin-block-end: 0;

  span {
    display: inline-block;
  }
`

const StyledH2 = styled(Heading)`
  font-size: 30px;
  line-height: 0.85;
`

const StyledHero = styled(FullWidth)`
  height: 693px;
`

const StyledLogo = styled(Image)`
  position: absolute;
  left: 98px;
  top: 140px;
`

const StyledCodeImage = styled(Image)`
  box-shadow: 0 14px 28px rgba(0, 0, 0, 0.25), 0 10px 10px rgba(0, 0, 0, 0.22);
`

const IndexPage = ({ location }) => (
  <Layout currentPath={location.pathname}>
    <SEO
      title="coding earth :: home"
      description="coding earth is a meetup community for developers"
      seoImage="https://coding.earth/img/coding_earth_og.png"
    />

    <StyledHero pad={{ vertical: 'xlarge' }}>
      {/* Hero Section */}

      <TwoCols>
        <Box basis="1/2">
          <StyledLogo src={logo} />
        </Box>

        <Box basis="1/2">
          <StyledH1 level={1} color="grey-100">
            <span>Hello,</span>
            <span style={{ marginLeft: '90px' }}>World.</span>
          </StyledH1>
          <Paragraph fill margin={{ top: 'large' }}>
            Welcome to a <strong>meetup-home for developers</strong> of all
            skill-levels.
          </Paragraph>
        </Box>
      </TwoCols>
    </StyledHero>

    <FullWidth
      background="grey-800"
      pad={{ vertical: 'medium', horizontal: 'large' }}
    >
      <Box pad={{ vertical: 'large', horizontal: 'xlarge' }} justify="center">
        <Fade left ssrFadeout distance="20px" duration={1000}>
          <Divider />
          <Paragraph
            fill
            textAlign="center"
            margin={{ top: 'large' }}
            color="grey-100"
          >
            Everybody's welcome, everyone's invited, everyone will take
            something home from our meetups. Our meetups are not your usual
            "experts talk, audience listens" kind of experience but a community
            driven meetup that embraces a knowledge exchange culture as well as
            a strict "nice to have you here"-attitude.
          </Paragraph>
        </Fade>
      </Box>
    </FullWidth>

    <FullWidth background="grey-900" pad={{ vertical: 'large' }}>
      <Box direction="row" align="baseline" margin={{ top: 'small' }}>
        <StyledH2 level={2} color="white" margin={{ right: 'small' }}>
          Previously.
        </StyledH2>
        <Text color="grey-400" size="small">
          On coding.earth
        </Text>
      </Box>
      <PastMeetups />
      <Box margin={{ bottom: 'large' }}>
        <SectionButton to="/sofar" label="See all previous events" />
      </Box>
    </FullWidth>

    <FullWidth background="grey-800" pad={{ vertical: 'large' }}>
      <Box pad={{ vertical: 'large', horizontal: 'none' }} justify="center">
        <Fade left ssrFadeout distance="20px" duration={1000}>
          <TwoCols>
            <Box basis="1/2">
              <StyledCodeImage src={codeImage} fill="horizontal" />
            </Box>
            <Box basis="1/2" pad={{ left: 'xlarge', right: 'small' }}>
              <Heading color="white" level="2" margin={{ top: 'none' }}>
                1 line of code.
              </Heading>
              <Paragraph fill color="white" size="small">
                Isn't it amazing how many technologies you have to learn to
                follow the path of modern software development? Be it
                blockchains for storing transactions, machines taking decisions
                based upon digital learning sets, virtual clusters providing
                computing power for scaled applications and command line tools
                that improve your workflow: it's nearly impossible to keep track
                of everything.
              </Paragraph>
              <Paragraph fill color="white" size="small">
                That's where we jump in: Instead of specialising on a dedicated
                topic, coding earth was established to become a space for
                earth's coder community: every software development related
                topic is welcome here, every developer with whatever skill level
                will take away something new on every session, every question
                may be asked and everyone should have a good time. There's only
                one golden rule:
              </Paragraph>
            </Box>
          </TwoCols>
          <Box margin={{ top: 'large', horizontal: 'auto' }} width="large">
            <Paragraph textAlign="center" size="large" weight="bold" fill>
              <strong>
                Talks have to be hands on, they must contain at least 1 line of
                code and in the best case they're supported by demos.
              </strong>
            </Paragraph>
          </Box>
        </Fade>
      </Box>
    </FullWidth>

    <FullWidth background="purple-500" pad={{ vertical: 'large' }}>
      <Box margin={{ top: 'small', bottom: 'large' }}>
        <Divider />
      </Box>
      <TwoCols>
        <Box basis="1/2" pad={{ right: 'small' }}>
          <Fade left ssrFadeout distance="20px" duration={1000}>
            <StyledH2 level={2} color="white">
              Contribute!
            </StyledH2>
            <Paragraph fill color="light-5" size="small">
              We are looking forward to your ideas for upcoming meetups. If you
              want to share any of your knowledge with a highly motivated
              community, this is the right place. If you want to demonstrate a
              software stack that you're using in your startup, this is the
              place to present. If you seek for an opportunity to spread the
              evangelism of the next big programming language: give a talk at
              coding earth. We're embracing every technology and personality and
              we're just waiting for you.
            </Paragraph>
          </Fade>
        </Box>
        <Box basis="1/2">
          <StyledH2 level={2} color="white">
            Stay tuned.
          </StyledH2>
          <Box>
            <MailchimpSignup />
          </Box>
        </Box>
      </TwoCols>
    </FullWidth>

    <FullWidth
      background="grey-600"
      pad={{ vertical: 'large', horizontal: 'xlarge' }}
    >
      <StyledH2
        level={2}
        color="white"
        alignSelf="center"
        margin={{ top: 'large', bottom: 'xlarge' }}
      >
        Our rules.
      </StyledH2>
      <Fade left ssrFadeout distance="20px" duration={1000} cascade>
        <Box width="large" alignSelf="center">
          <StyledRules>
            <li>
              we neither care about your gender, your skin tone, your religious
              views, the language your mother taught you nor your heritage or
              favorite science fiction series, we only care about you as a
              developer.
            </li>
            <li>
              no marketing, no recruiting, only tech and if possible:{' '}
              <b>code</b> (lets consider yaml valid, and of course you may
              announce that your company is hiring)
            </li>
            <li>
              don't bash one technology in favor of another without giving a
              concrete reason (Ruby is sh*t, Rust is much better, you know the
              game)
            </li>
            <li>
              one demo gets you rid of 10 slides so don't be shy and type live,
              we're all developers so we'll only laugh at obvious typos
            </li>
            <li>
              as soon as 1 person is around who doesn't understand the local
              language we <b>switch to English</b> (exceptions must be announced
              and if she doesn't understand English as well we ran out of
              options).
            </li>
            <li>food is not always free, but maybe you get a t-shirt</li>
            <li>
              everyone can become a developer. everyone can become a better
              developer. being a bad developer doesn't make you a bad person.
              there are no bad developers
            </li>
            <li>you do talk about coding earth</li>
          </StyledRules>
        </Box>
      </Fade>
    </FullWidth>
  </Layout>
)

export default IndexPage
