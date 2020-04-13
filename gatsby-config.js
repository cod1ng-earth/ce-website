require('dotenv').config()

module.exports = {
  siteMetadata: {
    title: 'coding.earth',
    description:
      'coding earth is a non profit association, based in Berlin. We want to improve the life of coders. We support you with community, knowledge, meetups, hackathons.',
    author: '@coding_earth',
    googleSiteVerification: 'talc7NDTVj5vV1Z5Y0lSeWyuE67cCpajQVMSQmK5xMw',
  },
  plugins: [
    'gatsby-plugin-react-helmet',
    'gatsby-plugin-netlify-cache',
    {
      resolve: 'gatsby-source-filesystem',
      options: {
        name: 'images',
        path: `${__dirname}/src/images`,
      },
    },
    {
      resolve: 'gatsby-source-filesystem',
      options: {
        name: 'data',
        path: `${__dirname}/data/`,
      },
    },
    'gatsby-plugin-styled-components',
    {
      resolve: 'gatsby-plugin-mdx',
      options: {
        mediaTypes: ['text/markdown', 'text/x-markdown'],
      },
    },
    {
      resolve: 'gatsby-plugin-global-context',
      options: {
        context: {
          today: new Date(),
        },
      },
    },
    'gatsby-transformer-json',
    'gatsby-transformer-sharp',
    'gatsby-plugin-sharp',
    {
      resolve: 'gatsby-plugin-manifest',
      options: {
        name: 'coding earth',
        short_name: 'coding earth',
        start_url: '/',
        background_color: '#333333',
        theme_color: '#FF9900',
        display: 'minimal-ui',
        icon: 'src/images/coding_earth_icon.png',
      },
    },
    {
      resolve: 'gatsby-source-graphql',
      options: {
        typeName: 'GraphCMS',
        fieldName: 'graphcms',
        refetchInterval: 480,
        url: process.env.GRAPHCMS_ENDPOINT,
        headers: {
          Authorization: `Bearer ${process.env.GRAPHCMS_TOKEN}`,
        },
      },
    },
    {
      resolve: 'gatsby-source-cloudinary',
      options: {
        cloudName: process.env.CLOUDINARY_CLOUDNAME,
        apiKey: process.env.CLOUDINARY_API_KEY,
        apiSecret: process.env.CLOUDINARY_API_SECRET,
        resourceType: 'image',
        tags: true,
        maxResults: 500,
        //type: `upload`,
        //prefix: `coding-earth/coding-berlin`,
        transformations: ['txb_preview', 'maxeco'],
      },
    },
  ],
}
