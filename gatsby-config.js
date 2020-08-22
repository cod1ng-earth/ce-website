require('dotenv').config()
const { createProxyMiddleware } = require('http-proxy-middleware') //v1.x.x

module.exports = {
  developMiddleware: app => {
    app.use(
      '/.netlify/functions/',
      createProxyMiddleware({
        target: 'http://localhost:9000',
        pathRewrite: {
          '/.netlify/functions/': '',
        },
      })
    )
  },
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
        icon: 'src/images/coding_earth_x_120.png',
      },
    },
    {
      resolve: 'gatsby-source-graphql',
      options: {
        typeName: 'GraphCMS',
        fieldName: 'graphcms',
        refetchInterval: 960,
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
        context: true,
        //type: `upload`,
        //prefix: `coding-earth/coding-berlin`,
        transformations: {
          maxeco: 'maxeco',
        },
      },
    },
    {
      resolve: 'gatsby-plugin-react-svg',
      options: {
        rule: {
          include: `${__dirname}/src/images/icons`,
        },
      },
    },
  ],
}
