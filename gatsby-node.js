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
      graphcms {
        meetups(orderBy: time_DESC) {
          id
          meetupComId
        }
      }
    }
  `)

  /*result.data.allMdx.edges.forEach(({ node }) => {
    if (node.frontmatter.slug == null) return
    createPage({
      path: `/${node.frontmatter.slug}`,
      component: path.resolve('./src/templates/article.js'),
      context: {
        slug: node.frontmatter.slug,
      },
    })
  })
  result.data.graphcms.meetups.forEach(({ id, meetupComId }) => {
    createPage({
      path: `/meetup/${id}`,
      component: path.resolve('./src/templates/meetup.js'),
      context: {
        id,
        cloudinaryTag: `meetup:${meetupComId}`,
      },
    })
  })*/

  ;[1, 2, 3].forEach(id => {
    createPage({
      path: `/meetup/foo${id}`,
      component: path.resolve('./src/templates/meetup.js'),
      context: {
        id,
        cloudinaryTag: `meetup:${id}`,
      },
    })
  })
}

//render graphcms descriptions to HTML
//

// exports.createResolvers = ({
//   actions,
//   createResolvers,
//   createContentDigest,
//   createNodeId,
// }) => {
//   const { createNode } = actions

//   createResolvers({
//     GraphCMS_Meetup: {
//       mdxDescription: {
//         type: 'String',
//         resolve(source) {
//           return createNode({
//             id: createNodeId(source.description),
//             parent: source.id,
//             children: [],

//             internal: {
//               type: 'GraphCMSMdxField',
//               contentDigest: createContentDigest(source.description),
//               //mediaType: 'text/x-markdown',
//               content: source.description,
//             },
//           })
//         },
//       },
//     },
//   })
// }

// exports.createResolvers = ({
//   actions,
//   createResolvers,
//   createContentDigest,
//   createNodeId,
// }) => {
//   const { createNode } = actions

//   createResolvers({
//     GraphCMS_Meetup: {
//       description: {
//         type: 'String',
//         resolve(source) {
//           return mdx(source.description)
//         },
//       },
//     },
//   })
// }
