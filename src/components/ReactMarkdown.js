import { Anchor, Heading, Paragraph } from 'grommet'
import React from 'react'
import { default as ReactMarkdownBase } from 'react-markdown/with-html'

const renderers = {
  paragraph: props => <Paragraph fill>{props.children}</Paragraph>,
  heading: ({ level, children }) => (
    <Heading level={level} color={level == 1 ? 'turqoise' : 'brand'}>
      {children}
    </Heading>
  ),
  link: ({ href, children }) => (
    <Anchor href={href} target="_blank">
      {children}
    </Anchor>
  ),
}

const ReactMarkdown = ({ children }) => (
  <ReactMarkdownBase escapeHtml={false} renderers={renderers}>
    {children}
  </ReactMarkdownBase>
)

export default ReactMarkdown
