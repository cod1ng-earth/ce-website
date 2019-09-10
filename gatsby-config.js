require(`dotenv`).config()

module.exports = {
  siteMetadata: {
    title: `coding.earth`,
    description: ``,
    author: `@stadolf`,
  },
  plugins: [
    `gatsby-plugin-react-helmet`,
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `images`,
        path: `${__dirname}/src/images`,
      },
    },
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `data`,
        path: `${__dirname}/data/`,
      },
    },
    `gatsby-transformer-remark`,
    `gatsby-transformer-sharp`,
    `gatsby-plugin-sharp`,
    {
      resolve: `gatsby-plugin-manifest`,
      options: {
        name: `gatsby-starter-default`,
        short_name: `starter`,
        start_url: `/`,
        background_color: `#663399`,
        theme_color: `#663399`,
        display: `minimal-ui`,
        icon: `src/images/gatsby-icon.png`, // This path is relative to the root of the site.
      },
    },
    {
      resolve: `gatsby-source-cloudinary`,
      options: {
        cloudName: process.env.CLOUDINARY_CLOUDNAME,
        apiKey: process.env.CLOUDINARY_API_KEY,
        apiSecret: process.env.CLOUDINARY_API_SECRET,
        resourceType: `image`,
        tags: true,
        maxResults: 500,
        transformations: [`txb_preview`, `maxeco`],
      },
    },

    {
      resolve: `gatsby-source-meetup`,
      options: {
        groupUrlName: `CODING-BERLIN`,
        status: `upcoming,past`,
        desc: `true`,
        page: 20,
      },
    },
    {
      resolve: `gatsby-source-meetup`,
      options: {
        groupUrlName: `coding-leipzig`,
        status: `upcoming,past`,
        desc: `true`,
        page: 20,
      },
    },
    {
      resolve: `gatsby-source-meetup`,
      options: {
        groupUrlName: `coding-stuttgart`,
        status: `upcoming,past`,
        desc: `true`,
        page: 20,
      },
    },
    {
      resolve: `gatsby-source-meetup`,
      options: {
        groupUrlName: `CODING-PORTUGAL`,
        status: `upcoming,past`,
        desc: `true`,
        page: 20,
      },
    },

    // this (optional) plugin enables Progressive Web App + Offline functionality
    // To learn more, visit: https://gatsby.dev/offline
    // `gatsby-plugin-offline`,
  ],
}
