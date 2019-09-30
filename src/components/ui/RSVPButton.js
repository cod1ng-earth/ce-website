import React from "react"
import { Link } from "gatsby"
import { Box, Button, Image } from "grommet"
import meetup_button from "../../images/meetup_button.png"
import styled from "styled-components"

import { theme } from "../theme"
const colors = theme.global.colors

const MeetupButton = styled(Button)`
  border-radius: 0px;

  border: none;
  text-align: center;
  font-weight: bold;
  transition: all 500ms;
  :hover {
    background-color: ${colors[`meetup-red`]};
    box-shadow: 0px 0px 0px 4px ${colors[`meetup-red`]};
  }
`

export default ({ meetup }) => (
  <MeetupButton
    href={meetup.link}
    rel="noopener"
    color="brand"
    margin="small"
    target="_blank"
    icon={<Image alt="meetup.com logo" src={meetup_button} height="30px" />}
    label="RSVP"
  ></MeetupButton>
)
