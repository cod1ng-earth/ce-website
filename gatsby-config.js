require(`dotenv`).config()

module.exports = {
  siteMetadata: {
    title: `coding.earth`,
    description: `coding earth is a non profit association, based in Berlin. We want to improve the life of coders. We support you with community, knowledge, meetups, hackathons.`,
    author: `@coding_earth`,
    googleSiteVerification: `talc7NDTVj5vV1Z5Y0lSeWyuE67cCpajQVMSQmK5xMw`,
  },
  plugins: [
    `gatsby-plugin-react-helmet`,
    `gatsby-plugin-netlify-cache`,
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
    `gatsby-plugin-styled-components`,
    `gatsby-plugin-mdx`,
    `gatsby-transformer-remark`,
    `gatsby-transformer-json`,
    `gatsby-transformer-sharp`,

    `gatsby-plugin-sharp`,
    {
      resolve: `gatsby-plugin-manifest`,
      options: {
        name: `coding earth`,
        short_name: `coding earth`,
        start_url: `/`,
        background_color: `#333333`,
        theme_color: `#FF9900`,
        display: `minimal-ui`,
        icon: `src/images/coding_earth_icon.png`,
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
        //type: `upload`,
        //prefix: `coding-earth/coding-berlin`,
        transformations: [`txb_preview`, `maxeco`],
      },
    },

    {
      resolve: `gatsby-source-meetup`,
      options: {
        groupUrlName: `CODING-BERLIN`,
        status: `upcoming,past`,
        fields: `featured_photo`,
        desc: `true`,
        page: 20,
      },
    },
    {
      resolve: `gatsby-source-meetup`,
      options: {
        groupUrlName: `coding-leipzig`,
        status: `upcoming,past`,
        fields: `featured_photo`,
        desc: `true`,
        page: 20,
      },
    },
    {
      resolve: `gatsby-source-meetup`,
      options: {
        groupUrlName: `coding-stuttgart`,
        status: `upcoming,past`,
        fields: `featured_photo`,
        desc: `true`,
        page: 20,
      },
    },
    {
      resolve: `gatsby-source-meetup`,
      options: {
        groupUrlName: `CODING-PORTUGAL`,
        status: `upcoming,past`,
        fields: `featured_photo`,
        desc: `true`,
        page: 20,
      },
    },

    // this (optional) plugin enables Progressive Web App + Offline functionality
    // To learn more, visit: https://gatsby.dev/offline
    // `gatsby-plugin-offline`,
  ],
}
