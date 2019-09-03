import React from "react"
import { graphql } from "gatsby"

const MeetupEvent = ({meetup}) => (
  <div>
    <h2>{meetup.name}</h2>
    <div dangerouslySetInnerHTML={{__html: meetup.description}} />
  </div>
)

export default ({ data }) => {

  return <section>
    {data.meetupGroup.name}
    {data.meetupGroup.events.map(event => (<MeetupEvent meetup={event} />))}
  </section>
}

export const query = graphql`
query($urlname: String) {
  meetupGroup(urlname: {eq:$urlname}) {
    id
    name
    events {
      name
      status
      local_date
      local_time
      link
      description
    }
  }
}		
`