import React from 'react';
import { forwardRef } from 'react';
import LoaderLogo from './LoaderLogo'

import './Loader.css'

const Loader = forwardRef((props, ref) => {
  return (
    <div className="loader-container" ref={ref}>
      <LoaderLogo />
    </div>
  );
});

Loader.displayName = 'Loader';

export default Loader;