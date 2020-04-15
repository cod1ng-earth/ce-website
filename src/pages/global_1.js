import { Heading } from 'grommet'
import { ScheduleNew } from 'grommet-icons'
import React from 'react'
import Layout from '../components/layout'
import SEO from '../components/seo'
import { FullWidth } from '../components/TwoCols'
import UpcomingMeetups from '../components/UpcomingMeetups'

const GlobalOnePage = () => (
  <Layout>
    <SEO
      title="coding earth :: Apr 21st: global meetup #1"
      description="Apr 21st: global meetup #1"
      seoImage="https://coding.earth/img/ce_global_1.jpeg"
    />

    <FullWidth background="very-dark">
      <Heading level={2} color="turqoise">
        <ScheduleNew
          size="large"
          color="turqoise"
          style={{ verticalAlign: 'sub' }}
        />{' '}
        upcoming meetups
      </Heading>
      <UpcomingMeetups />
    </FullWidth>
  </Layout>
)

export default GlobalOnePage
