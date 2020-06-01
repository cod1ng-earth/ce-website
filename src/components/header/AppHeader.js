import { Link } from 'gatsby'
import { Box, Button, Image, ResponsiveContext } from 'grommet'
import { Menu as MenuIcon } from 'grommet-icons'
import React, { useContext } from 'react'
import logo from '../../images/ce-logo.svg'
import Navigation from './Navigation'

export default ({ isHero = false, onSetShowSidebar }) => {
  const size = useContext(ResponsiveContext)

  return (
    <Box
      tag="header"
      direction="row"
      margin={{ top: '20px' }}
      pad={{ horizontal: 'medium' }}
      fill="horizontal"
      height="80px"
      background={isHero ? 'transparent' : 'grey-800'}
      justify={isHero ? 'end' : 'between'}
      style={{ position: isHero ? 'absolute' : 'relative' }}
    >
      {!isHero && (
        <Link to="/">
          <Image
            src={logo}
            alt="coding earth logo"
            style={{
              width: '100px',
              top: '-16px',
              position: 'absolute',
              display: 'block',
            }}
          />
        </Link>
      )}

      {size == 'small' ? (
        <Button>
          <MenuIcon size="medium" color="white" onClick={onSetShowSidebar} />
        </Button>
      ) : (
        <Box direction="row" align="center">
          <Navigation />
        </Box>
      )}
    </Box>
  )
}
