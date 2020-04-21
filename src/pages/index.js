import { Link } from 'gatsby'
import { Box, Button, Heading, Image, Paragraph } from 'grommet'
import { Code, ForwardTen, Globe, Grow, Mail, Rewind } from 'grommet-icons'
import React from 'react'
import { Fade } from 'react-reveal'
import styled from 'styled-components'
import Layout from '../components/layout'
import { MailchimpSignup } from '../components/MailchimpSignup'
import PastMeetups from '../components/PastMeetups'
import SEO from '../components/seo'
import { theme } from '../components/theme'
import { FullWidth, TwoCols } from '../components/TwoCols'

const StyledRules = styled.ul`
  list-style-type: none;
  padding: 0;
  margin: 0;

  li {
    background-color: ${theme.global.colors['very-dark']};
    border-bottom: 3px solid ${theme.global.colors['brand']};
    padding: 30px 30px 40px;
    font-size: 1.5em;
    margin-bottom: 2em;
    line-height: 1.6em;
  }
`
const IndexPage = () => (
  <Layout>
    <SEO
      title="coding earth :: home"
      description="coding earth is a meetup community for developers"
      seoImage="https://coding.earth/img/coding_earth_og.png"
    />

    <FullWidth>
      <TwoCols>
        <Box basis="1/2">
          <Fade left ssrFadeout distance="20px" duration={1000}>
            <Heading level={2} color="turqoise">
              <Globe
                size="large"
                color="turqoise"
                style={{ verticalAlign: 'sub' }}
              />{' '}
              hello, world.
            </Heading>
            <Paragraph fill>
              Coding Earth is a <b>home for developers</b> of all skill levels.
              Everybody's welcome, everyone's invited, everyone will take
              something home from our meetups. Our meetups are not your usual
              "experts talk, audience listens" kind of experience but a
              community driven meetup that embraces a knowledge exchange culture
              as well as a strict "<b>nice to have you here</b>"-attitude.
            </Paragraph>
          </Fade>
        </Box>

        <Box basis="1/2" height="medium" overflow="hidden">
          <Image
            alt="coding stuttgart crowd in october 2019 waving at you"
            fit="cover"
            src="//res.cloudinary.com/turbinekreuzberg/image/upload/t_maxeco/v1582656870/birthday-hackathon/2020/DSC01981.jpg"
          />
        </Box>
      </TwoCols>
    </FullWidth>

    <FullWidth background="dark-1">
      <Box>
        <Heading
          level={2}
          color="brand"
          style={{ transform: 'rotateX(180deg)' }}
        >
          <Code size="large" color="brand" style={{ verticalAlign: 'sub' }} /> 1
          line of code.
        </Heading>
      </Box>
      <TwoCols>
        <Fade left ssrFadeout distance="20px" duration={1000}>
          <Paragraph fill>
            Isn't it amazing <b>how many technologies</b> you have to learn to
            follow the path of modern software development? Be it blockchains
            for storing transactions, machines taking decisions based upon
            digital learning sets, virtual clusters providing computing power
            for scaled applications and command line tools that improve your
            workflow: <b>it's nearly impossible to keep track of everything.</b>
          </Paragraph>
        </Fade>
        <Fade right ssrFadeout distance="20px" duration={1000}>
          <Paragraph fill>
            That's where we jump in: Instead of specialising on a dedicated
            topic, coding earth was established to become{' '}
            <b>a space for earth's coder community</b>: every software
            development related topic is welcome here, every developer with
            whatever skill level will take away something new on every session,
            every question may be asked and everyone should have a good time.
            There's only one golden rule:
          </Paragraph>
        </Fade>
      </TwoCols>
      <Paragraph
        fill
        size="large"
        style={{ fontWeight: 'bold' }}
        margin={{ horizontal: 'large' }}
      >
        talks have to be hands on, they must contain at least 1 line of code and
        in the best case they're supported by demos.
      </Paragraph>
    </FullWidth>

    <FullWidth background="very-dark">
      <Heading level={2} color="turqoise">
        <Rewind
          size="large"
          color="turqoise"
          style={{ verticalAlign: 'sub' }}
        />{' '}
        Previously, on coding earth
      </Heading>
      <PastMeetups />
      <Button
        as={Link}
        to="/sofar"
        color="status-ok"
        alignSelf="center"
        size="large"
        primary
        active={false}
        label="see all recent meetups"
      />
    </FullWidth>

    <FullWidth background="black">
      <TwoCols>
        <Box basis="1/2">
          <Fade left ssrFadeout distance="20px" duration={1000}>
            <Heading level={2} color="turqoise">
              <Grow
                size="large"
                color="turqoise"
                style={{ verticalAlign: 'sub' }}
              />
              contribute!
            </Heading>
            <Paragraph fill color="light-5">
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
          <Heading level={2} color="turqoise">
            <Mail
              size="large"
              color="turqoise"
              style={{ verticalAlign: 'sub', marginRight: '10px' }}
            />
            stay tuned
          </Heading>
          <Box>
            <MailchimpSignup />
          </Box>
        </Box>
      </TwoCols>
    </FullWidth>

    <FullWidth background="dark-1">
      <Heading level={2} color="brand">
        <ForwardTen
          size="large"
          color="brand"
          style={{ verticalAlign: 'sub' }}
        />{' '}
        Our rules
      </Heading>
      <Fade left ssrFadeout distance="20px" duration={1000} cascade>
        <StyledRules>
          <li>
            we neither care about your gender, your skin tone, your religious
            views, the language your mother taught you nor your heritage or
            favorite science fiction series, we only care about you as a
            developer.
          </li>
          <li>
            no marketing, no recruiting, only tech and if possible: <b>code</b>{' '}
            (lets consider yaml valid, and of course you may announce that your
            company is hiring)
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
        </StyledRules>{' '}
      </Fade>
    </FullWidth>
  </Layout>
)

export default IndexPage
