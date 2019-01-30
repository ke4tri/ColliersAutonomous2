import React from 'react';
import './RouteEdit.scss';

class RouteEdit extends React.Component {
  render() {
    return (
      <div className='Home mx-auto'>
        <h2>RouteEdit</h2>
        <button class="btn btn-primary" onClick={this.listingClick}>Button</button>
      </div>
    );
  }
}

export default RouteEdit;
