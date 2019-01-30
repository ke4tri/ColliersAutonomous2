import React from 'react';
import './RouteEdit.scss';

class RouteEdit extends React.Component {
  changeView2 = () => {
    this.props.history.push('/route/:id/edit/');
    // this.setState({ selectedLocationId: locationId });
  }

  render() {
    return (
      <div className='Home mx-auto'>
        <h2>RouteEdit</h2>
        <button class="btn btn-primary" onClick={this.changeView2}>Button</button>
      </div>
    );
  }
}

export default RouteEdit;
