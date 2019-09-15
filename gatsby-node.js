const path = require(`path`)

exports.createPages = async ({ graphql, actions }) => {
  const { createPage } = actions
  const result = await graphql(`
    query {
      allMeetupGroup {
        edges {
          node {
            id
            name
            urlname
            events {
              meetupId
            }
          }
        }
      }
      allMarkdownRemark {
        edges {
          node {
            id
            excerpt
            frontmatter {
              title
            }
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
    node.events.forEach(event => {
      createPage({
        path: `/${node.urlname}/${event.meetupId}`,
        component: path.resolve(`./src/templates/meetup-event.js`),
        context: {
          eventId: event.meetupId,
          groupId: node.id,
          cloudinaryTag: `meetup:${event.meetupId}`,
        },
      })
    })
  })

  result.data.allMarkdownRemark.edges.forEach(({ node }) => {
    if (node.slug === null) return
    createPage({
      path: `/markdown/${node.frontmatter.slug}`,
      component: path.resolve(`./src/templates/article.js`),
      context: {
        slug: node.frontmatter.slug,
      },
    })
  })
}
