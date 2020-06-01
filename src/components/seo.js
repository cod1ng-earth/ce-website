/**
 * SEO component that queries for data with
 *  Gatsby's useStaticQuery React hook
 *
 * See: https://www.gatsbyjs.org/docs/use-static-query/
 */

import React from 'react'
import PropTypes from 'prop-types'
import Helmet from 'react-helmet'
import { useStaticQuery, graphql } from 'gatsby'
import { useLocation } from '@reach/router'

function SEO({ description, lang, meta, title, seoImage }) {
  const { site } = useStaticQuery(
    graphql`
      query {
        site {
          siteMetadata {
            title
            description
            author
            googleSiteVerification
          }
        }
      }
    `
  )

  const metaDescription = description || site.siteMetadata.description
  const location = useLocation()
  return (
    <Helmet
      htmlAttributes={{
        lang,
      }}
      title={title}
      titleTemplate={`%s | ${site.siteMetadata.title}`}
      meta={[
        {
          name: 'description',
          content: metaDescription,
        },
        {
          property: 'og:title',
          content: title,
        },
        {
          property: 'og:description',
          content: metaDescription,
        },
        {
          property: 'og:type',
          content: 'website',
        },
        {
          property: 'og:url',
          content: location ? location.href : 'https://coding.earth',
        },
        {
          property: 'og:image',
          content: seoImage || 'https://coding.earth/img/coding_earth_og.png',
        },
        {
          name: 'twitter:card',
          content: 'summary_large_image',
        },
        {
          name: 'twitter:image',
          content: seoImage || 'https://coding.earth/img/coding_earth_og.png',
        },
        {
          name: 'twitter:creator',
          content: site.siteMetadata.author,
        },
        {
          name: 'twitter:site',
          content: '@coding_earth',
        },
        {
          name: 'twitter:title',
          content: title,
        },
        {
          name: 'twitter:description',
          content: metaDescription,
        },
        {
          name: 'google-site-verification',
          content: site.siteMetadata.googleSiteVerification,
        },
      ].concat(meta)}
    >
      <link
        href="https://fonts.googleapis.com/css?family=Manrope&display=swap"
        rel="stylesheet"
      />
      <style type="text/css">{`
        /* latin-ext */
        @font-face {
          font-family: 'OCR-A';
          font-display: auto;
          src: local('OCR-A'), url(/font/OCRA.ttf) format("truetype");
        }

        body {
            margin:0;
        }

    `}</style>
    </Helmet>
  )
}

SEO.defaultProps = {
  lang: 'en',
  meta: [],
  description: '',
  title: '',
  seoImage: '',
}

SEO.propTypes = {
  description: PropTypes.string,
  lang: PropTypes.string,
  meta: PropTypes.arrayOf(PropTypes.object),
  title: PropTypes.string.isRequired,
  seoImage: PropTypes.string,
}

export default SEO
