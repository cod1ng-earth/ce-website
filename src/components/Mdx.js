import React from "react"

import { MDXProvider } from "@mdx-js/react"
import { MDXRenderer } from "gatsby-plugin-mdx"

import { Box, Heading } from "grommet"

import Twitter from "./ui/Twitter"
import Agenda from "./ui/Agenda"

import StyledParagraph from "./StyledParagraph"
import ResponsiveGrid from "./ResponsiveGrid"

const shortcodes = { Twitter, Agenda }

export default ({ mdx }) => (
  <MDXProvider
    components={{
      ...shortcodes,
      p: props => <StyledParagraph fill>{props.children}</StyledParagraph>,
      h1: props => (
        <Box>
          <Heading level={1} color="turqoise">
            {props.children}
          </Heading>
        </Box>
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
    }}
  >
    <ResponsiveGrid>
      <MDXRenderer>{mdx.body}</MDXRenderer>
    </ResponsiveGrid>
  </MDXProvider>
)
