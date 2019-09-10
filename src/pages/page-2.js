import React from "react"
import { Link } from "gatsby"
import { Anchor } from "grommet"
import Layout from "../components/layout"
import SEO from "../components/seo"

const SecondPage = () => (
  <Layout>
    <SEO title="Page two" />
    <h1>Hi from the second page</h1>
    <p>Welcome to page 2</p>
    <Anchor as={Link} to="//">
      Go to index
    </Anchor>
  </Layout>
)

export default SecondPage
