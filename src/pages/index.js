import React from "react"
import { Link, graphql, useStaticQuery } from "gatsby"
import { Fade } from "react-reveal"

import { Box, Heading, Image, Paragraph } from "grommet"
import { Code, Globe, Grow, ForwardTen, ScheduleNew } from "grommet-icons"

import styled from "styled-components"

import SEO from "../components/seo"
import Layout from "../components/layout"
import { theme } from "../components/theme"
import ResponsiveGrid from "../components/ResponsiveGrid"
import ResponsiveTwoCols from "../components/ResponsiveTwoCols"
import MeetupPreview from "../components/MeetupPreview"

const StyledRules = styled.ul`
  list-style-type: none;
  padding: 0;
  margin: 0;

  li {
    background-color: ${theme.global.colors[`very-dark`]};
    border-bottom: 3px solid ${theme.global.colors[`brand`]};
    padding: 30px 30px 40px;
    font-size: 1.5em;
    margin-bottom: 2em;
    line-height: 1.6em;
  }
`
const IndexPage = () => {
  const upcomingMeetups = useStaticQuery(graphql`
    {
      allMeetupEvent(
        filter: { status: { eq: "upcoming" } }
        sort: { fields: local_date, order: ASC }
      ) {
        edges {
          node {
            name
            id
            venue {
              name
            }
            link
            meetupId
            time
            status
            description
            group {
              urlname
              timezone
              urlname
            }
          }
        }
      }
    }
  `)

  return (
    <Layout>
      <SEO title="Home" />

      <Box margin="large">
        <ResponsiveGrid>
          <ResponsiveTwoCols>
            <Box>
              <Fade left ssrFadeout distance="20px" duration={1000}>
                <Heading level={2} color="turqoise">
                  <Globe
                    size="large"
                    color="turqoise"
                    style={{ verticalAlign: `sub` }}
                  />
                  {` `}
                  hello, world.
                </Heading>
                <Paragraph fill>
                  Coding Earth is a home for developers of all skill levels.
                  Everybody's welcome, everyone's invited, everyone will take
                  something home from our meetups. Our meetups are not your
                  usual "experts talk, audience listens" kind of experience but
                  a community driven meetup that embraces a knowledge exchange
                  culture as well as a strict "nice to have you here"-attitude.
                </Paragraph>
              </Fade>
            </Box>

            <Box height="medium" overflow="hidden">
              <Image
                fit="cover"
                src="//res.cloudinary.com/turbinekreuzberg/image/upload/t_maxeco/v1568491378/coding-earth/coding-berlin/sep_2018/IMG_3844.jpg"
              />
            </Box>
          </ResponsiveTwoCols>
        </ResponsiveGrid>
      </Box>

      <Box full={true} flex={false} background="dark-1">
        <ResponsiveGrid>
          <Box align="start">
            <Heading
              level={2}
              color="brand"
              style={{ transform: `rotate3d(0,0,2,180deg)` }}
            >
              <Code
                size="large"
                color="brand"
                style={{ verticalAlign: `sub` }}
              />
              {` `}1 line of code.
            </Heading>
            <ResponsiveTwoCols>
              <Fade left ssrFadeout distance="20px" duration={1000}>
                <Paragraph fill>
                  Isn’t it amazing how many technologies you have to learn to
                  follow the path of modern software development? Be it
                  blockchains for storing transactions, machines taking
                  decisions based upon digital learning sets, virtual clusters
                  providing computing power for scaled applications and command
                  line tools that improve your workflow: it's nearly impossible
                  to keep an eye on everything.
                </Paragraph>
              </Fade>
              <Fade right ssrFadeout distance="20px" duration={1000}>
                <Paragraph fill>
                  That's where we jump in: Instead of specialising on a
                  dedicated topic, coding earth was established to become a
                  space for Earth’s coder community: every software development
                  related topic is welcome here, every developer with whatever
                  skill level will take away something new on every session,
                  every question may be asked and everyone should have a good
                  time. There's only one golden rule:
                </Paragraph>
              </Fade>
            </ResponsiveTwoCols>
            <Paragraph
              fill
              style={{ fontWeight: `bold` }}
              margin={{ horizontal: `large` }}
            >
              talks have to be hands on, they must contain at least 1 line of
              code and in the best case they're massively supported by demos.
            </Paragraph>
          </Box>
        </ResponsiveGrid>
      </Box>

      <Box background="very-dark">
        <ResponsiveGrid>
          <Heading level={2} color="turqoise">
            <ScheduleNew
              size="large"
              color="turqoise"
              style={{ verticalAlign: `sub` }}
            />
            {` `}
            upcoming meetups
          </Heading>

          {upcomingMeetups.allMeetupEvent.edges.map(({ node }) => (
            <MeetupPreview meetup={node} />
          ))}
        </ResponsiveGrid>
      </Box>
      <Box flex={true} background="dark">
        <ResponsiveGrid>
          <Fade left ssrFadeout distance="20px" duration={1000}>
            <Heading level={2} color="turqoise">
              <Grow
                size="large"
                color="turqoise"
                style={{ verticalAlign: `sub` }}
              />
              contribute!
            </Heading>
            <Paragraph fill color="light-5">
              We are looking forward to your ideas for upcoming meetups. If you
              want to share any of your knowledge with a highly motivated
              community, this is the right place. If you want to demonstrate a
              software stack that you’re using in your startup, this is the
              place to present. If you seek for an opportunity to spread the
              evangelism of the next big programming language: give a talk at
              coding berlin. We’re embracing developers and we’re just waiting
              for you.
            </Paragraph>
          </Fade>
        </ResponsiveGrid>
      </Box>

      <Box full={true} flex={false} background="dark-1">
        <ResponsiveGrid>
          <Heading level={2} color="brand">
            <ForwardTen
              size="large"
              color="brand"
              style={{ verticalAlign: `sub` }}
            />
            {` `}
            Our rules
          </Heading>
          <Fade left ssrFadeout distance="20px" duration={1000} cascade>
            <StyledRules>
              <li>
                we neither care about your gender, your skin tone, your
                religious views, the language your mother taught you nor your
                heritage or favorite science fiction series, we only care about
                you as a developer.
              </li>
              <li>
                no marketing, no recruiting, only tech and if possible:{` `}
                <b>code</b> (lets consider yaml valid, and of course you may
                announce that your company is hiring)
              </li>
              <li>
                don't bash one technology in favor of another without giving a
                concrete reason (Ruby is sh*t, Rust is much better, you know the
                game)
              </li>
              <li>
                one demo gets you rid of 10 slides so don't be shy and type
                live, we're all developers so we'll only laugh at obvious typos
              </li>
              <li>
                as soon as 1 person is around who doesn't understand the local
                language we <b>switch to English</b> (exceptions must be
                announced and if she doesn't understand English as well we ran
                out of options).
              </li>
              <li>food is not always free, but maybe you get a t-shirt</li>
              <li>
                everyone can become a developer. everyone can become a better
                developer. being a bad developer doesn't make you a bad person.
                there are no bad developers
              </li>
              <li>you do talk about coding earth</li>
            </StyledRules>
            {` `}
          </Fade>
        </ResponsiveGrid>
      </Box>
    </Layout>
  )
}

export default IndexPage
