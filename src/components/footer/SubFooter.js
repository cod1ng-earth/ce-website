import React from 'react'

import { Anchor, Image, Text, Box } from 'grommet'
import { Github } from 'grommet-icons'
import gatsby_icon from '../../images/gatsby-icon.png'
import grommet_icon from '../../images/grommet.png'
import FullWidth from '../FullWidth'

export default () => (
  <FullWidth
    tag="footer"
    direction="row"
    background="gatsby-light"
    pad={{ vertical: 'large' }}
  >
    <Text textAlign="center" size="xmedium" weight="600">
      built with
      <Anchor href="https://www.gatsbyjs.org" target="_blank" rel="noopener">
        <Image
          title="Gatsby"
          alt="Gatsby static site generator logo"
          src={gatsby_icon}
          fit="contain"
          width="30px"
          margin={{ left: 'small' }}
          style={{ verticalAlign: '-8px' }}
        />
      </Anchor>{' '}
      and
      <Anchor href="https://grommet.io" target="_blank" rel="noopener">
        <Image
          title="grommet v2"
          alt="Grommet frontend library logo"
          src={grommet_icon}
          fit="contain"
          width="40px"
          style={{ verticalAlign: '-10px' }}
        />
      </Anchor>
      on
      <Anchor
        href="https://app.netlify.com/sites/codingearth/deploys"
        target="_blank"
        rel=" noopener"
      >
        <Image
          alt="Netlify deploy status"
          fit="contain"
          margin={{ left: 'small' }}
          style={{ verticalAlign: 'middle' }}
          src="https://api.netlify.com/api/v1/badges/91bcced6-44a4-4266-89b3-1bf16b9192b7/deploy-status"
        />
      </Anchor>
    </Text>
    <Box
      direction="row"
      margin={{ top: 'small' }}
      alignSelf="center"
      gap="xsmall"
      align="center"
    >
      <Text size="small" alignSelf="center">
        Found an issue?{' '}
      </Text>
      <Anchor
        href="https://github.com/cod1ng-earth/ce-website"
        target="_blank"
        rel="noopener"
        size="small"
        reverse
        icon={<Github color="brand" size="small" />}
        label="Fork us and fix it"
      ></Anchor>
    </Box>
  </FullWidth>
)
