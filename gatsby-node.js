const path = require(`path`)

exports.createPages = async ({ graphql, actions }) => {
  const { createPage } = actions
  const result = await graphql(`
    query {
      allMeetupGroup {
        edges {
          node {
            name
            urlname
          }
        }
      }
    }
  `)

  result.data.allMeetupGroup.edges.forEach(({ node }) => {
    createPage({
      path: `/${node.urlname}`,
      component: path.resolve(`./src/templates/meetup-group.js`),
      context: {
        urlname: node.urlname,
      },
    })
  })
}
