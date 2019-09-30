[![Netlify Status](https://api.netlify.com/api/v1/badges/91bcced6-44a4-4266-89b3-1bf16b9192b7/deploy-status)](https://app.netlify.com/sites/codingearth/deploys)

# Coding Earth website

This is a static site built with Gatsby.

## Content Sources

- local (see `/data` folder): mdx, (md), json
- meetup.com (using the public api)
- Cloudinary (using the authenticated api)

## Building

you're not allowed to access our content (cloudinary) resources. We currently cannot work around that, but for the time being it might help to get your own (free) cloudinary account to connect to.

## Plugins

We're currently using forked versions of the respective content plugins with attached PRs. They're currently unlikely to be accepted but if you'd like to invest some work in them, just go ahead:

- https://github.com/Chuloo/gatsby-source-cloudinary/pull/7 (adds support for named Cloudinary transforms)
- https://github.com/phacks/gatsby-source-meetup/pull/6 (adds the original meetup id to the meetup content source)

