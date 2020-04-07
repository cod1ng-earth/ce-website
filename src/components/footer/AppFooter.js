import { Link } from 'gatsby'
import { Anchor, Box, Heading, Image, Text } from 'grommet'
import React from 'react'
//import earth from "../../images/earth_v.jpg"
import logo_ce from '../../images/coding_earth_x_120.png'
import ContactForm from './ContactForm'
import SocialButtons from './SocialButtons'

export default () => (
  <Box
    tag="footer"
    fill
    background={{
      color: 'dark-4',
      dark: true,
      opacity: true,
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
        <Text>follow us and get in touch with us</Text>

        <SocialButtons />

        <Box margin={{ vertical: 'medium' }} direction="row">
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
        <Text>&copy; 2019-2020 coding earth</Text>
      </Box>
      <Box align="center" basis="1/3">
        <Image src={logo_ce} fit="contain" alt="coding earth logo" />
        <Heading level={6} margin={{ top: 'medium' }}>
          1 line of code.
        </Heading>
      </Box>
      <Box basis="1/3">
        <Text>Contact us</Text>
        <ContactForm></ContactForm>
      </Box>
    </Box>
  </Box>
)
