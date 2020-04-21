import React from 'react'

export const YoutubeEmbed = ({ url }) => (
  <iframe
    width="100%"
    height="600"
    src={url}
    frameBorder="0"
    allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
    allowFullScreen
  ></iframe>
)
