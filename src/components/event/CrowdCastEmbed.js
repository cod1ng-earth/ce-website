import React from 'react'
import { Anchor } from 'grommet'

const CrowdcastEmbed = ({ url }) => (
  <>
    <iframe
      width="100%"
      height="800"
      frameBorder="0"
      marginHeight="0"
      marginWidth="0"
      allowtransparency="true"
      src={url}
      style={{ border: '1px solid #EEE', borderRadius: '3px' }}
      allowFullScreen="true"
      webkitallowfullscreen="true"
      mozallowfullscreen="true"
      allow="microphone; camera;"
    ></iframe>
    <a
      ng-href="https://www.crowdcast.io/?utm_source=embed&utm_medium=website&utm_campaign=embed"
      style={{
        color: '#aaa',
        fontFamily: '\'Helvetica\', \'Arial\', sans-serif',
        textDecoration: 'none',
        display: 'block',
        textAlign: 'center',
        fontSize: '13px',
        padding: '5px 0',
      }}
    >
      powered by <Anchor href={url}>Crowdcast</Anchor>
    </a>
  </>
)

export default CrowdcastEmbed
