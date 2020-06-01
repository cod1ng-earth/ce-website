import React from 'react'

const YoutubeEmbed = ({ url }) => (
  <iframe
    width="100%"
    src={url}
    style={{ minHeight: '400px' }}
    frameBorder="0"
    allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
    allowFullScreen
  ></iframe>
)

export default YoutubeEmbed
