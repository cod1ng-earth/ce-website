import React from "react"

import { Box, Button, Heading, TextInput } from "grommet"
import { Ad as AdIcon, Notification } from "grommet-icons"

export default ({ appName, onToggleSidebar, children }) => (
  <Box
    tag="header"
    direction="row"
    background="dark-1"
    align="center"
    justify="between"
    responsive={false}
    pad={{ vertical: `small`, horizontal: `medium` }}
  >
    <Button>
      <Box
        flex={false}
        direction="row"
        align="center"
        margin={{ left: `small` }}
      >
        <AdIcon size="large" color="dark-4" />
        <Heading
          level="4"
          margin={{ left: `small`, vertical: `none` }}
          color="dark-4"
        >
          {appName}
        </Heading>
      </Box>
    </Button>

    <Button>Features</Button>
    <Button>Enterprise</Button>
    <Button>Support</Button>
    <Button color="primary" variant="outlined">
      Login
    </Button>

    <Box direction="row" align="center">
      <Box
        margin={{ left: `medium` }}
        round="xsmall"
        background={{ color: `white`, opacity: `weak` }}
        direction="row"
        align="center"
        pad={{ horizontal: `small` }}
      >
        {/*<FormSearch color="white" />*/}
        <TextInput plain placeholder="Search" type="search" />
      </Box>
    </Box>
    <Button icon={<Notification />} onClick={onToggleSidebar} />
  </Box>
)
