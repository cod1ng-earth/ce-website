import React from 'react'
import { Box, Anchor, Image } from 'grommet'
import { Github } from 'grommet-icons'

import meetup_button from '../../images/meetup_button.png'
import twitter_button from '../../images/twitter_button.png'
import slack_button from '../../images/slack_button.png'

const SocialButtons = () => (
  <Box gap="medium" direction="row" margin={{ vertical: 'small' }}>
    <Box>
      <Anchor
        href="https://twitter.com/coding_earth"
        ariaLabel="follow us on Twitter"
      >
        <Image
          src={twitter_button}
          fit="contain"
          width="45px"
          alt="twitter logo button"
        />
      </Anchor>
    </Box>
    <Box>
      <Anchor
        href="https://www.meetup.com/CODING-BERLIN/"
        ariaLabel="visit our meetup.com page"
      >
        <Image
          src={meetup_button}
          fit="contain"
          width="50px"
          alt="meetup logo button"
        />
      </Anchor>
    </Box>
    <Box>
      <Anchor
        href="https://coding-earth.slack.com"
        ariaLabel="connect to us on Slack"
      >
        <Image
          src={slack_button}
          fit="contain"
          width="45px"
          alt="slack logo button"
        />
      </Anchor>
    </Box>
    <Box>
      <Anchor
        href="http://github.com/cod1ng-earth/"
        ariaLabel="collaborate on Github"
      >
        <Github size="large" />
      </Anchor>
    </Box>
  </Box>
)

export default SocialButtons
