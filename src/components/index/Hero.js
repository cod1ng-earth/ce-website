import React from 'react'
import { Box, Image, Heading, Paragraph, ResponsiveContext } from 'grommet'
import TwoCols from '../TwoCols'
import FullWidth from '../FullWidth'
import logo from '../../images/ce-logo.svg'
import styled from 'styled-components'
import Typist from 'react-typist'
import { useContext } from 'react'

const HeroHeader = styled(Heading)`
  line-height: 0.95;
  max-width: 490px;
  min-width: 480px;
  margin-block-start: 0;
  margin-block-end: 0;
  span {
    display: inline-block;
  }
`
const MobileHeader = () => (
  <Heading size="5em" textAlign="center" style={{ lineHeight: 0.95 }}>
    Hello, <br />
    World!
  </Heading>
)

const DesktopHeader = () => (
  <HeroHeader color="grey-100" size="6em">
    <span>Hello,</span>
    <br />
    <span style={{ marginLeft: '80px' }}>
      <Typist
        avgTypingDelay={350}
        startDelay={1000}
        cursor={{ hideWhenDone: true }}
      >
        <Typist.Delay ms={500} />
        World!
        <Typist.Backspace count={6} delay={800} />
        earth!
        <Typist.Backspace count={6} delay={800} />
        coders!
      </Typist>
    </span>
  </HeroHeader>
)

const Hero = () => {
  const size = useContext(ResponsiveContext)
  const logoStyles =
    size === 'small'
      ? {
          position: 'relative',
          top: '50px',
        }
      : {
          position: 'absolute',
          left: '98px',
          top: '140px',
        }

  return (
    <FullWidth height="large">
      <TwoCols>
        <Box basis="1/2">
          <Image src={logo} style={{ ...logoStyles }} />
        </Box>
        <Box basis="1/2">
          {size === 'small' ? MobileHeader() : DesktopHeader()}
          <Paragraph
            fill
            size="large"
            margin={{ top: 'large' }}
            color="white"
            textAlign="center"
          >
            Welcome to the <strong>meetup home for developers</strong> of all
            skill-levels.
          </Paragraph>
        </Box>
      </TwoCols>
    </FullWidth>
  )
}

export default Hero
