import { graphql, useStaticQuery } from 'gatsby'
import {
  Anchor,
  Box,
  Button,
  Heading,
  Paragraph,
  RadioButton,
  Text,
} from 'grommet'
import { Checkmark, Github } from 'grommet-icons'
import React, { useEffect, useState } from 'react'
import { useAuth0 } from './auth/react-auth0-spa'
import CrowdcastEmbed from './event/CrowdCastEmbed'
import ReactMarkdown from './event/ReactMarkdown'
import TimezonePicker from './event/TimezonePicker'
import { YoutubeEmbed } from './event/YoutubeEmbed'
import Talk from './Talk'
import AttendButton from './event/AttendButton'

export default function UpcomingMeetup({ meetup }) {
  const { isAuthenticated, loginWithRedirect, user } = useAuth0()
  const [attending, setAttending] = useState(false)
  const [embed, setEmbed] = useState('yt')
  const [timeZone, setTimeZone] = useState(
    Intl.DateTimeFormat().resolvedOptions().timeZone
  )
  const userLocale = Intl.DateTimeFormat().resolvedOptions().locale

  const data = useStaticQuery(graphql`
    {
      image: imageSharp(
        resize: { originalName: { eq: "coding_earth_meetup.png" } }
      ) {
        fluid(maxWidth: 800, maxHeight: 300) {
          ...GatsbyImageSharpFluid_withWebp
        }
      }
    }
  `)

  useEffect(() => {
    const attending = JSON.parse(
      localStorage.getItem(`attending[${meetup.id}]`) || '{}'
    )
    if (attending[meetup.id]) {
      setAttending(true)
    }
  }, [])

  return (
    <Box pad="none" margin="none">
      <Box pad={{ vertical: 'medium' }}>
        <Box direction="row-responsive" justify="between" align="center">
          <Heading level={3} color="brand">
            {meetup.name}
          </Heading>
          <TimezonePicker meetupUTCTime={meetup.time} tzUpdated={setTimeZone} />
        </Box>
        <Paragraph fill>
          <ReactMarkdown>{meetup.description}</ReactMarkdown>
          To become part of the meetup, ask questions, chat with us and be able
          to bookmark parts of the sessions, select{' '}
          <Anchor onClick={() => setEmbed('cc')}>CrowdCast</Anchor> as streaming
          option (and please signup for it). If you'd just want to watch the
          livestream stay on the{' '}
          <Anchor onClick={() => setEmbed('yt')}>Youtube channel</Anchor>
        </Paragraph>
        <Box>
          <Box direction="row" margin={{ vertical: 'medium' }} gap="medium">
            <Text>Stream: </Text>
            <RadioButton
              checked={embed === 'yt'}
              label="Youtube"
              onChange={() => setEmbed('yt')}
            />
            <RadioButton
              checked={embed === 'cc'}
              label="CrowdCast"
              onChange={() => setEmbed('cc')}
            />
          </Box>

          {embed === 'yt' ? (
            <YoutubeEmbed url={meetup.recoding} />
          ) : (
            <CrowdcastEmbed url={meetup.onlineUrl} />
          )}

          <Paragraph fill> The meetup will have three sessions:</Paragraph>

          <Box background="dark-1" pad="medium">
            <Talk
              name="Filipe Barroso"
              company={{
                url: 'https://www.gdglisbon.xyz/',
                name: 'GDG Lisbon',
              }}
              link="https://twitter.com/ABarroso"
              image="//pbs.twimg.com/profile_images/973591262686302209/luVnG3Bn_400x400.jpg"
              origin="Lisbon"
              title="What is Flutter and why should you care about it?"
              time={{ time: '2020-04-21T19:10+0200', userLocale, timeZone }}
            >
              The Flutter SDK by Google is the new Open Source UI SDK to create
              native applications with one codebase. At the end of the talk, you
              will understand the decisions behind Flutter, why it is so
              different from other mobile development tools and platforms, and
              why are so many developers already addicted to it.
            </Talk>

            <Talk
              name="Brooklyn Zelenka"
              company={{
                url: 'https://fission.codes/',
                name: 'fission.codes',
              }}
              link="https://twitter.com/expede"
              image="//pbs.twimg.com/profile_images/1176524572423639042/hT2G40Gd_400x400.jpg"
              origin="Vancouver"
              title="how you can authenticate users safely without a backend?"
              time={{ time: '2020-04-21T19:45+0200', userLocale, timeZone }}
            >
              Web apps are too complex - what if we got rid of the back end? It
              turns out that we can push most things into the browser. In this
              talk, Brooklyn will talk about doing secure auth without requiring
              an auth server, plus a bit about the broader project of making the
              browser all you need.
            </Talk>

            <Talk
              name="Jesse Martin"
              company={{
                url: 'https://graphcms.com/',
                name: 'GraphCMS',
              }}
              link="https://twitter.com/motleydev"
              image="//pbs.twimg.com/profile_images/1204366626738622466/ufPGhfrp_400x400.jpg"
              origin="Constance"
              title="All About Headless with the New GraphCMS"
              time={{ time: '2020-04-21T20:15+0200', userLocale, timeZone }}
            >
              join us for an entertaining talk about the benefits of a headless
              CMS, see a demo of the new GraphCMS and learn a few new features
              about GraphQL along the way!
            </Talk>
          </Box>

          <Paragraph fill>
            All contributions follow our golden "*1 line of code*" rule, so
            demos and live code will be abound. You don't have to register to
            get into our stream but if you do, we send you updates (and nothing
            else) like the final YouTube URL of the stream before the event.
          </Paragraph>
        </Box>
      </Box>
      {attending ? (
        <Button
          color="status-ok"
          alignSelf="center"
          primary
          active={false}
          icon={<Checkmark />}
          disabled={!isAuthenticated}
          label="you are registered for this meetup"
        />
      ) : user ? (
        <AttendButton user={user} setAttending={setAttending} />
      ) : (
        <Text alignSelf="center" color="light-6">
          If you were{' '}
          <Button
            label="authenticated"
            icon={<Github />}
            onClick={() => loginWithRedirect()}
            color="dark-1"
          />{' '}
          you could signup for this event
        </Text>
      )}
    </Box>
  )
}
