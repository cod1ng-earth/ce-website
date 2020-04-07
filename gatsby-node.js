const path = require('path')

exports.createPages = async ({ graphql, actions }) => {
  const { createPage } = actions
  const result = await graphql(`
    query {
      allMdx {
        edges {
          node {
            fileAbsolutePath
            frontmatter {
              title
              slug
            }
          }
        }
      }
    }
  `)

  result.data.allMdx.edges.forEach(({ node }) => {
    if (node.frontmatter.slug == null) return
    createPage({
      path: `/${node.frontmatter.slug}`,
      component: path.resolve('./src/templates/article.js'),
      context: {
        slug: node.frontmatter.slug,
      },
    })
  })
}
