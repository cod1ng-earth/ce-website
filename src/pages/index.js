import React from "react"
import { Link } from "gatsby"

import styled from "styled-components"
import { Box, Grid, Heading, Image, Paragraph } from "grommet"

import ResponsiveGrid from "../components/ResponsiveGrid"

import Layout from "../components/layout"
import SEO from "../components/seo"
import { Code, Globe, Grow, ForwardTen } from "grommet-icons"
import ResponsiveTwoCols from "../components/ResponsiveTwoCols"

const StyledRules = styled.ul`
  list-style-type: none;
  padding: 0;
  margin: 0;
  li {
    margin-bottom: 10px;
  }
`
const IndexPage = () => (
  <Layout>
    <SEO title="Home" />

    <Box margin="large">
      <ResponsiveGrid>
        <ResponsiveTwoCols>
          <Box>
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
              something home from our meetups. Our meetups are not your usual
              "experts talk, audience listens" kind of experience but a
              community driven meetup that embraces a knowledge exchange culture
              as well as a strict "nice to have you here"-attitude.
            </Paragraph>
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
        <Heading
          level={2}
          color="brand"
          style={{ transform: `rotate3d(1,0,4,180deg)` }}
        >
          <Code size="large" color="brand" style={{ verticalAlign: `sub` }} />
          {` `}1 line of code.
        </Heading>
        <Paragraph fill>
          Isn’t it amazing how many technologies you have to learn to follow the
          path of modern software development? Be it blockchains for storing
          transactions, machines taking decisions based upon digital learning
          sets, virtual clusters providing computing power for scaled
          applications and command line tools that improve your workflow: it’s
          nearly impossible to keep an eye on everything.
        </Paragraph>
        <Paragraph fill>
          That's where we jump in: Instead of specialising on a dedicated topic,
          coding earth was established to become a space for Earth’s coder
          community: every software development related topic is welcome here,
          every developer with whatever skill level will take away something new
          on every session, every question may be asked and everyone should have
          a good time. There’s only one golden rule: don’t bore us with bs,
          talks have to be hands on, the must contain at least 1 line of code
          and in the best case they’re massively supported by demos.
        </Paragraph>
      </ResponsiveGrid>
    </Box>

    <Box flex={true} background="dark" height={{ min: `large` }}>
      <ResponsiveGrid>
        <Heading level={2} color="turqoise">
          <Grow
            size="large"
            color="turqoise"
            style={{ verticalAlign: `sub` }}
          />
          contribute!
        </Heading>
        <Paragraph fill color="light-5">
          We are looking forward to your ideas for upcoming meetups. If you want
          to share any of your knowledge with a highly motivated community, this
          is the right place. If you want to demonstrate a software stack that
          you’re using in your startup, this is the place to present. If you
          seek for an opportunity to spread the evangelism of the next big
          programming language: give a talk at coding berlin. We’re embracing
          developers and we’re just waiting for you.
        </Paragraph>
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
          The golden rules
        </Heading>
        <Paragraph fill>
          <StyledRules>
            <li>
              we neither care about your gender, your skin tone, your religious
              views, the language your mother taught you nor your heritage or
              favorite science fiction series, we only care about you as a
              developer.
            </li>
            <li>
              no marketing, no recruiting, only tech and if possible: code (lets
              consider yaml valid, and of course you may announce that your
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
              as soon as 1 person is around who doesn't understand German we
              switch to English (exceptions must be announced and if she doesn't
              understand English as well we ran out of options).
            </li>
            <li>
              if your English is bad, talk more of it, it helps (for real!)
            </li>
            <li>food is not always free, but maybe you get a t-shirt</li>
            <li>everyone can become a developer</li>
            <li>everyone can become a better developer</li>
            <li>being a bad developer doesn't make you a bad person</li>
            <li>there are no bad developers</li>
            <li>you do talk about coding berlin</li>
          </StyledRules>
        </Paragraph>
      </ResponsiveGrid>
    </Box>
  </Layout>
)

export default IndexPage
