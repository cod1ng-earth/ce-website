import React from 'react'

import { Heading, Paragraph, Anchor } from 'grommet'

const components = {
  //...shortcodes,

  p: props => <Paragraph fill>{props.children}</Paragraph>,
  paragraph: Paragraph,
  a: props => <Anchor href={props.href}>{props.children}</Anchor>,
  h1: props => <Heading level={1}>{props.children}</Heading>,
  h2: props => <Heading level={2}>{props.children}</Heading>,
  h3: props => <Heading level={3}>{props.children}</Heading>,
}
export default components
