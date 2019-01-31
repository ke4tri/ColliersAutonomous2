import React from 'react';
import routeShape from '../../../helpers/propz/routeShape';
import './RouteEditDisplay.scss';

class RouteEditDisplay extends React.Component {
  static propTypes = {
    route: routeShape.routeShape,
  };

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
      <div className="col">
        <div className="col">
          <div className="col-2">
            {/* <img className="rover-image" src="http://pluspng.com/img-png/space-rover-png-automobile-dune-buggy-lunar-rover-moon-buggy-moon-car-nasa-512.png" alt="Rover" width="200" height="200" /> */}
          </div>
          <div className="col">
            <div className="col">
              Command: {route.cmd}
            </div>
            <div className="col">
              lat, long: {route.latLong}
              </div>
            <div className="col">
              Orientation: {route.orientation}
            </div>
          </div>
          <button className="btn btn-outline-light" onClick={this.changeView2}>EDIT</button>
        </div>
      </div>
    );
  }
}

export default RouteEditDisplay;
