import React from 'react';

const LoaderLogo = (props) => (
  <svg id="logo" xmlns="http://www.w3.org/2000/svg" role="img" viewBox="0 0 288 153">

    <title>Logo</title>
    <g transform="translate(9.000000, 9.000000)">
      <g>
        <text x="63" y="93" fontFamily="bogart-semibold" fontSize="72px" fontStretch="semi-expanded" fill={props.fill}>GSB</text>
        <polygon
          id="Shape"
          stroke={props.stroke}
          fill="transparent"
          strokeWidth="9"
          strokeLinecap="round"
          strokeLinejoin="round"
          points="0 0 135 0 135 30 135 0 270 0 270 67.5 261 67.5 270 67.5 270 135 135 135 135 105 135 135 0 135 0 67.5 9 67.5 0 67.5 0 0 30 0 30 135 240 135 240 0"
        />

      </g>
    </g>

  </svg>
);

export default LoaderLogo