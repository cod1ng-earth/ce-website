import { Link } from 'gatsby'
import { Anchor, Box, Heading, Image, Text } from 'grommet'
import React from 'react'
import logo_ce from '../../images/ce-logo.svg'
import ContactForm from './ContactForm'
import SocialButtons from './SocialButtons'
import styled from 'styled-components'

const StyledCodeText = styled(Text)`
  font-family: 'OCR-A', monospace;
`

export default () => (
  <Box
    tag="footer"
    fill
    background={{
      color: 'grey-800',
      dark: true,
    }}
  >
    <Box
      pad={{ vertical: 'xlarge' }}
      justify="evenly"
      direction="row-responsive"
    >
      <Box align="center" basis="1/3" direction="column">
        <Heading level="4" textAlign="center" margin={{ top: 'none' }}>
          follow us and get in touch with us
        </Heading>

        <SocialButtons />

        <Box margin={{ bottom: 'small', top: 'medium' }} direction="row">
          <Text size="small">
            <Anchor
              as={Link}
              to="/imprint"
              aria-label="information about our contact"
            >
              Imprint
            </Anchor>
            &nbsp;&nbsp;|&nbsp;&nbsp;
            <Anchor
              as={Link}
              to="/code-of-conduct"
              aria-label="our code of conduct"
            >
              Code of Conduct
            </Anchor>
            &nbsp;&nbsp;|&nbsp;&nbsp;
            <Anchor
              as={Link}
              to="/team"
              aria-label="see who's behind coding earth"
            >
              Team
            </Anchor>
          </Text>
        </Box>
        <Text size="xsmall">&copy; 2019-2020 coding earth</Text>
      </Box>
      <Box align="center" basis="1/3" direction="column" fill>
        <Image
          src={logo_ce}
          fit="contain"
          alt="coding earth logo"
          width="120"
          margin="medium"
        />
        <StyledCodeText size="medium" margin={{ bottom: 'large' }}>
          1 line of code.
        </StyledCodeText>
      </Box>
      <Box basis="1/3" direction="column" align="center">
        <Heading level="4" margin={{ top: 'none' }}>
          contact us
        </Heading>
        <Box fill pad={{ horizontal: 'medium' }}>
          <ContactForm></ContactForm>
        </Box>
      </Box>
    </Box>
  </Box>
)
