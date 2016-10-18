const runtime = require('offline-plugin/runtime');

import React from 'react';
import ReactDOM from 'react-dom';
import MobileDetect from 'mobile-detect';
import App from './App';

// TODO: Remove this global when seperate components for mobile are created
window.__md = new MobileDetect(window.navigator.userAgent);

ReactDOM.render(
  <App />,
  document.getElementById('root')
);

runtime.install({
  onUpdateReady: () => {
    // Tells to new SW to take control immediately
    runtime.applyUpdate();
  },
  onUpdated: () => {
    // Reload the webpage to load into the new version
    window.location.reload();
  },
});
