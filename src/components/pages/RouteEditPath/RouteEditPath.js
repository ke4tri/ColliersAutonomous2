import React from 'react';
import './RouteEditPath.scss';

class RouteEditPath extends React.Component {
  changeView2 = () => {
    this.props.history.push('/route/:id/edit/');
    // this.setState({ selectedLocationId: locationId });
  }

  render() {
    return (
      <div className="everythingIn mx-auto">
        <div className='Home mx-auto'>
          <h2>RouteEditPath</h2>
          <div className="wrapButton d-flex justify-content-center">
            {/* <button class="btn btn-primary" onClick={this.changeView2}>Button</button> */}
            <div className="btn-group d-flex justify-content-center">
              <button type="button" className="taco btn btn-outline-light m-2 p-3">TAKE OFF</button>
              <button type="button" className="taco btn btn-outline-light m-2 p-3">UP</button>
              <button type="button" className="taco btn btn-outline-light m-2 p-3">LAND</button>
            </div>
            <div className="btn-group d-flex justify-content-center">
              <button type="button" className="btn btn-outline-light m-2 p-3">90CW</button>
              <button type="button" className="btn btn-outline-light m-2 p-3">PHOTO</button>
              <button type="button" className="btn btn-outline-light m-2 p-3">90CC</button>
            </div>
            <div className="btn-group d-flex justify-content-center">
              <button type="button" className="taco2 btn btn-outline-light m-2 p-3">FORWARD</button>
              <button type="button" className="taco2 btn btn-outline-light m-2 p-3">DOWN</button>
              <button type="button" className="taco2 btn btn-outline-light m-2 p-3">BACK</button>
            </div>
          </div>
      </div>
      <div className="event-form col">
      <form onSubmit={this.formSubmit}>
          <div className="input-group">
            <label htmlFor="event"></label>
            <input
              type="text"
              className="form-control"
              id="routeName"
              aria-describedby="eventHelp"
              placeholder="Route Name"
              // value={route.name}
              onChange={this.routeNameChange}
            />
          </div>
          <div className="input-group m-1">
            <label htmlFor="event"></label>
            <input
              type="text"
              className="form-control"
              id="cmd"
              aria-describedby="eventHelp"
              placeholder="Commands"
              // value={route.cmd}
              onChange={this.cmdChange}
            />
          </div>
          <div className="input-group m-1">
            <label htmlFor="event"></label>
            <input
              type="text"
              className="form-control"
              id="latLog"
              aria-describedby="eventHelp"
              placeholder="35.92.1399, -86.860575"
              // value={newLocation.name}
              onChange={this.latLogChange}
            />
          </div>
          <div className="input-group m-1">
            <label htmlFor="event"></label>
            <input
              type="text"
              className="form-control"
              id="orientation"
              aria-describedby="eventHelp"
              placeholder="Orientation 0-259"
              // value={newLocation.name}
              onChange={this.orientationChange}
            />
          </div>
          <button className="btn btn-danger">Save</button>
        </form>
      </div>
     </div>
    );
  }
}

export default RouteEditPath;