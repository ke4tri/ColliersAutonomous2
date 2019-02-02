import React from 'react';
// import PropTypes from 'prop-types';
// import routeShape from '../../../helpers/propz/routeShape';
import './RouteEditDisplay.scss';

class RouteEditDisplay extends React.Component {
  // static propTypes = {
  //   changeView: PropTypes.func,
  // }

  // changeView2 = () => {
  //   const { route } = this.props;
  //   this.props.history.push(`/locations/${this.props.match.params.id}/routes/:routeId/edit`);
  // }

  // bind = () => {
  //   this.changeView2();
  // }

  // editDevice = (e) => {
  //   e.preventDefault();
  //   const { passEventToEdit, device } = this.props;
  //   passEventToEdit(device.id);
  // }

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
          <button className="btn btn-outline-light" onClick={this.props.changeView}>EDIT</button>
        </div>
      </div>
    );
  }
}

export default RouteEditDisplay;
