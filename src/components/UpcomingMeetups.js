import React from 'react'
import { graphql, useStaticQuery } from 'gatsby'
import Meetup from './event/Meetup'
import { Heading } from 'grommet'

import { ScheduleNew } from 'grommet-icons'

const UpcomingMeetups = () => {
  const data = useStaticQuery(graphql`
    {
      graphcms {
        meetups(where: { time_gt: "now" }) {
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

  return (
    <>
      {data.graphcms.meetups.length > 0 && (
        <Heading level={2} color="turqoise">
          <ScheduleNew
            size="large"
            color="turqoise"
            style={{ verticalAlign: 'sub' }}
          />{' '}
          upcoming meetups
        </Heading>
      )}
      {data.graphcms.meetups.map(meetup => (
        <Meetup key={`meetup-${meetup.id}`} meetup={meetup} />
      ))}
    </>
  )
}
export default UpcomingMeetups
