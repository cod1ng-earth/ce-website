import React from "react"

import { MDXProvider } from "@mdx-js/react"
import { MDXRenderer } from "gatsby-plugin-mdx"

import { Heading } from "grommet"

import Twitter from "../ui/Twitter"
import Agenda from "../ui/Agenda"

import StyledParagraph from "../StyledParagraph"
import ResponsiveGrid from "../ResponsiveGrid"

const shortcodes = { Twitter, Agenda }

export default ({ mdx }) => (
  <MDXProvider
    components={{
      ...shortcodes,
      p: props => <StyledParagraph fill>{props.children}</StyledParagraph>,
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
