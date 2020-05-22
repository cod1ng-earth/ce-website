import React from 'react'
import { Box, Image, Heading, Paragraph } from 'grommet'
import TwoCols from '../TwoCols'
import FullWidth from '../FullWidth'
import logo from '../../images/ce-logo.svg'
import styled from 'styled-components'

const StyledLogo = styled(Image)`
  position: absolute;
  left: 98px;
  top: 140px;
`

const HeroHeader = styled(Heading)`
  font-size: 7rem;
  line-height: 0.95;
  max-width: 450px;
  margin-block-start: 0;
  margin-block-end: 0;

  span {
    display: inline-block;
  }
`

const Hero = () => (
  <FullWidth pad={{ vertical: 'xlarge' }} style={{ height: '50vh' }}>
    {/* Hero Section */}

    <TwoCols>
      <Box basis="1/2">
        <StyledLogo src={logo} />
      </Box>

      <Box basis="1/2">
        <HeroHeader color="grey-100">
          <span>Hello,</span>
          <span style={{ marginLeft: '90px' }}>world.</span>
        </HeroHeader>
        <Paragraph fill margin={{ top: 'large' }} color="white">
          Welcome to the <strong>meetup home for developers</strong> of all
          skill-levels.
        </Paragraph>
      </Box>
    </TwoCols>
  </FullWidth>
)

export default Hero
