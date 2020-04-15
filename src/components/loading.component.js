import React from 'react';

import '../../public/style.css';

class Loader extends React.Component {
  render() {
    return (
      <div id="background">
        <div class="d-flex justify-content-center">
          <div class="spinner-border" id="spinner" role="status">
            <span class="sr-only">Loading...</span>
          </div>
        </div>
        <h5>Loading</h5>
      </div>
    );
  }
}

export default Loader;