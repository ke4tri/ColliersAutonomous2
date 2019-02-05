import React from 'react';
import './RouteEditDisplay.scss';

class RouteEditDisplay extends React.Component {
  render() {
    const { route } = this.props;
    if (route.nope) {
      return (
        <div className="building col">
        <h1 className="unknown-listing">
          <span className="glyphicon glyphicon-arrow-left" />You have no Routes!
        </h1>
      </div>
      );
    }
    return (
          <div className="col d-flex flex-column flex-wrap">
          <h2>Route Details</h2>
            <div className="col">
             <h6> Command:   {route.cmd}</h6>
            </div>
            <div className="col">
            <h6>lat, long: {route.latLong}</h6>
              </div>
            <div className="col">
            <h6> Orientation: {route.orientation}</h6>
            </div>
          <button className="btn btn-outline-light" onClick={this.props.changeView}>EDIT</button>
          </div>
    );
  }
}

export default RouteEditDisplay;
