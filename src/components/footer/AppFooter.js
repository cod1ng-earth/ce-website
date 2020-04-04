import React from 'react'
import { Link } from 'gatsby'
import { Github } from 'grommet-icons'

import {
  Anchor,
  Box,
  Grid,
  Heading,
  Image,
  ResponsiveContext,
  Text,
} from 'grommet'

//import earth from "../../images/earth_v.jpg"
import logo_ce from '../../images/coding_earth_logo.png'
import meetup_button from '../../images/meetup_button.png'
import twitter_button from '../../images/twitter_button.png'
import slack_button from '../../images/slack_button.png'

import ResponsiveGrid from '../ResponsiveGrid'
import ContactForm from './ContactForm'

export default () => (
  <ResponsiveContext.Consumer>
    {size => (
      <Box
        tag="footer"
        direction="row"
        background={{
          color: 'dark-4',
          dark: true,
          opacity: true,
        }}
        align="center"
        justify="between"
        responsive={false}
        pad={{ vertical: 'large' }}
      >
        <ResponsiveGrid>
          <Grid
            gap="medium"
            columns={size == 'small' ? ['auto'] : ['1/3', '1/3', '1/3']}
          >
            <Box alignSelf="start" align="center" flex={true}>
              <Image
                src={logo_ce}
                fit="contain"
                width="250px"
                alt="coding earth logo"
              />
              <Heading level={6} margin={{ top: 'medium' }}>
                1 line of code.
              </Heading>
            </Box>
            <Box align="center">
              <Text>follow us and get in touch with us</Text>
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

              <Box direction="row" margin={{ vertical: 'medium' }}>
                <Anchor
                  as={Link}
                  to="/imprint"
                  ariaLabel="information about our contact"
                >
                  Imprint
                </Anchor>
                &nbsp;|&nbsp;
                <Anchor
                  as={Link}
                  to="/code-of-conduct"
                  ariaLabel="our code of conduct"
                >
                  Code of Conduct
                </Anchor>
                &nbsp;|&nbsp;
                <Anchor
                  as={Link}
                  to="/team"
                  ariaLabel="see who's behind coding earth"
                >
                  Team
                </Anchor>
              </Box>
              <Text>&copy; 2019 coding earth</Text>
            </Box>

            <Box>
              <Text>Contact us</Text>
              <ContactForm></ContactForm>
            </Box>
          </Grid>
        </ResponsiveGrid>
      </Box>
    )}
  </ResponsiveContext.Consumer>
)
