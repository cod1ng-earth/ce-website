import React from 'react'

const YoutubeEmbed = ({ url }) => (
  <iframe
    width="100%"
    height="600"
    src={url}
    frameBorder="0"
    allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
    allowFullScreen
  ></iframe>
)

export default YoutubeEmbed
