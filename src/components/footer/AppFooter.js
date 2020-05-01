import { Link } from 'gatsby'
import { Anchor, Box, Heading, Image, Text } from 'grommet'
import React from 'react'
import logo_ce from '../../images/ce-logo.svg'
import ContactForm from './ContactForm'
import SocialButtons from './SocialButtons'

export default () => (
  <Box
    tag="footer"
    fill
    background={{
      color: 'grey-800',
      dark: true,
    }}
    align="center"
  >
    <Box
      width="xlarge"
      pad={{ vertical: 'large' }}
      justify="start"
      direction="row-responsive"
    >
      <Box align="center" basis="1/3" direction="column">
        <Heading level="4" textAlign="center">
          follow us and get in touch with us
        </Heading>

        <SocialButtons />

        <Box margin={{ bottom: 'small', top: 'medium' }} direction="row">
          <Text size="xsmall">
            <Anchor
              as={Link}
              to="/imprint"
              ariaLabel="information about our contact"
            >
              Imprint
            </Anchor>
            &nbsp;&nbsp;|&nbsp;&nbsp;
            <Anchor
              as={Link}
              to="/code-of-conduct"
              ariaLabel="our code of conduct"
            >
              Code of Conduct
            </Anchor>
            &nbsp;&nbsp;|&nbsp;&nbsp;
            <Anchor
              as={Link}
              to="/team"
              ariaLabel="see who's behind coding earth"
            >
              Team
            </Anchor>
          </Text>
        </Box>
        <Text size="xsmall">&copy; 2019-2020 coding earth</Text>
      </Box>
      <Box align="center" basis="1/3">
        <Image src={logo_ce} fit="contain" alt="coding earth logo" />
        <Text margin={{ top: 'medium' }}>1 line of code.</Text>
      </Box>
      <Box basis="1/3">
        <Heading level="4" textAlign="center">
          contact us
        </Heading>
        <ContactForm></ContactForm>
      </Box>
    </Box>
  </Box>
)
