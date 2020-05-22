import React from 'react'

import { Heading, Paragraph } from 'grommet'

const components = {
  //...shortcodes,

  p: props => <Paragraph fill>{props.children}</Paragraph>,
  paragraph: Paragraph,
  h1: props => (
    <Heading level={1} color="turqoise">
      {props.children}
    </Heading>
  ),
  h2: props => (
    <Heading level={2} color="brand">
      {props.children}
    </Heading>
  ),
  h3: props => (
    <Heading level={3} color="brand">
      {props.children}
    </Heading>
  ),
}
export default components
