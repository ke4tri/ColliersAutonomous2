import React from 'react';
import './RouteEditPath.scss';

class RouteEditPath extends React.Component {
  changeView2 = () => {
    this.props.history.push('/route/:id/edit/');
    // this.setState({ selectedLocationId: locationId });
  }

  render() {
    return (
      <div className='Home mx-auto'>
        <h2>RouteEditPath</h2>
        <div clasName="wrapButton d-flex justify-content-center">
          {/* <button class="btn btn-primary" onClick={this.changeView2}>Button</button> */}
          <div className="btn-group d-flex justify-content-center">
            <button type="button" className="taco btn btn-outline-light m-2 p-3">TAKE OFF</button>
            <button type="button" className="taco btn btn-outline-light m-2 p-3">UP</button>
            <button type="button" className="taco btn btn-outline-light m-2 p-3">LAND</button>
          </div>
          <div class="btn-group d-flex justify-content-center">
            <button type="button" className="btn btn-outline-light m-2 p-3">90CW</button>
            <button type="button" className="btn btn-outline-light m-2 p-3">PHOTO</button>
            <button type="button" className="btn btn-outline-light m-2 p-3">90CC</button>
          </div>
          <div class="btn-group d-flex justify-content-center">
            <button type="button" className="taco2 btn btn-outline-light m-2 p-3">FORWARD</button>
            <button type="button" className="taco2 btn btn-outline-light m-2 p-3">DOWN</button>
            <button type="button" className="taco2 btn btn-outline-light m-2 p-3">BACK</button>
          </div>
        </div>
     </div>
    );
  }
}

export default RouteEditPath;