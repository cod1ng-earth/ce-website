import React from 'react'
import { Box, Image, Heading, Paragraph, ResponsiveContext } from 'grommet'
import TwoCols from '../TwoCols'
import FullWidth from '../FullWidth'
import logo from '../../images/ce-logo.svg'
import styled from 'styled-components'

const HeroHeader = styled(Heading)`
  font-size: 6em;
  line-height: 0.95;
  max-width: 450px;
  margin-block-start: 0;
  margin-block-end: 0;
  span {
    display: inline-block;
  }
`

const Hero = () => (
  <ResponsiveContext>
    {size => {
      const logoStyles =
        size === 'small'
          ? {}
          : {
              position: 'absolute',
              left: '98px',
              top: '140px',
            }
      return (
        <FullWidth height="large">
          <Image src={logo} style={{ ...logoStyles }} />
          <TwoCols>
            <Box basis="1/2"></Box>

            <Box basis="1/2" align="center">
              <HeroHeader color="grey-100">
                <span>Hello,</span>
                <span style={{ marginLeft: '90px' }}>world.</span>
              </HeroHeader>
              <Paragraph
                fill
                margin={{ top: 'large' }}
                color="white"
                textAlign="center"
              >
                Welcome to the <strong>meetup home for developers</strong> of
                all skill-levels.
              </Paragraph>
            </Box>
          </TwoCols>
        </FullWidth>
      )
    }}
  </ResponsiveContext>
)

export default Hero
