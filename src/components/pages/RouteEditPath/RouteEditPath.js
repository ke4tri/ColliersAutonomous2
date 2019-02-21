import React from 'react';
import PropTypes from 'prop-types';
import authRequests from '../../../helpers/data/authRequest';
import routesRequest from '../../../helpers/data/routesRequest';
import './RouteEditPath.scss';

const defaultRoute = {
  uid: '',
  flightName: '',
  latLong: '',
  orientation: '',
  cmd: '',
  locationId: '',
};

class RouteEditPath extends React.Component {
  state = {
    newRoute: defaultRoute,
    currentCommand: [],
    isEditing: false,
    editId: '-1',
  };

  static propTypes = {
    device: PropTypes.string,
  };

  componentDidMount() {
    const editId = this.props.match.params.routeId;
    this.setState({ isEditing: true, editId });
    routesRequest.getSingleRoute(editId)
      .then((route) => {
        this.setState({ newRoute: route.data });
      })
      .catch(err => console.error('error with getSingleEvent', err));
  }

  formFieldStringState = (name, e) => {
    e.preventDefault();
    const tempRoute = { ...this.state.newRoute };
    tempRoute[name] = e.target.value;
    this.setState({ newRoute: tempRoute });
  };

  formFieldRouteState = (name, route) => {
    const tempRoute = { ...this.state.newRoute };
    tempRoute[name] = route;
    this.setState({ newRoute: tempRoute });
  }

  flightNameChange = e => this.formFieldStringState('flightName', e);

  cmdChange2 = array => this.formFieldRouteState('cmd', array);

  latLongChange = e => this.formFieldStringState('latLong', e);

  orientationChange = e => this.formFieldStringState('orientation', e);

  cmdChange = (e) => {
    e.preventDefault();
    const currentCommand2 = this.state.currentCommand;
    console.log(currentCommand2);
    currentCommand2.push(e.target.value);
    this.setState({ currentCommand: currentCommand2 });
  }

  formSubmitEvent = (newRoute, newRouteId) => {
    routesRequest.updateRoute(newRoute, newRouteId)
      .then(() => {
        this.props.history.push(`/locations/${this.props.match.params.locationId}`);
      })
      .catch(err => console.error('error with devices post', err));
  }

  formSubmit = (e) => {
    e.preventDefault();
    const myRoute = { ...this.state.newRoute };
    const newRouteId = this.state.editId;
    myRoute.uid = authRequests.getCurrentUid();
    myRoute.locationId = this.props.match.params.locationId;
    myRoute.cmd = this.state.currentCommand.join(',');
    this.formSubmitEvent(newRouteId, myRoute);
  }

  render() {
    const { newRoute, currentCommand } = this.state;
    return (
      <div className="everythingIn mx-auto">
        <div className='Home mx-auto'>
        <h2>Edit Route</h2>
          <form onClick={this.cmdChange}>
          <div className="wrapButton">
            <div className="btn-group d-flex justify-content-center">
              <button type="button" className="taco btn btn-outline-light m-2 p-3" value="command,battery?,takeoff">TAKE OFF</button>
              <button type="button" className="taco btn btn-outline-light m-2 p-3" value="up 20">UP</button>
              <button type="button" className="taco btn btn-outline-light m-2 p-3" value="land">LAND</button>
            </div>
            <div className="btn-group d-flex justify-content-center">
              <button type="button" className="btn btn-outline-light m-2 p-3" value="cw 90">90CW</button>
              <button type="button" className="btn btn-outline-light m-2 p-3" value="photo">PHOTO</button>
              <button type="button" className="btn btn-outline-light m-2 p-3" value="ccw 90">90CCW</button>
            </div>
            <div className="btn-group d-flex justify-content-center">
              <button type="button" className="taco2 btn btn-outline-light m-2 p-3" value="forward 20">FORWARD</button>
              <button type="button" className="taco2 btn btn-outline-light m-2 p-3" value="down 20">DOWN</button>
              <button type="button" className="taco2 btn btn-outline-light m-2 p-3" value="back 20">BACK</button>
            </div>
          </div>
          </form>
      </div>
      <div className="event-form col">
      <form onSubmit={this.formSubmit}>
          <div className="input-group">
            <label htmlFor="event"></label>
            <input
              type="text"
              className="form-control"
              id="flightName"
              aria-describedby="eventHelp"
              placeholder="Route Name"
              value={newRoute.flightName}
              onChange={this.flightNameChange}
            />
          </div>
          <div>{currentCommand.join(',')}</div>
          <div className="input-group m-1">
            <label htmlFor="event"></label>
            <input
              type="text"
              className="form-control"
              id="latLong"
              aria-describedby="eventHelp"
              placeholder="99.99.9999, -99.999999"
              value={newRoute.cmd}
              onChange={currentCommand.join(',')}
            />
          </div>
          <div className="input-group m-1">
            <label htmlFor="event"></label>
            <input
              type="text"
              className="form-control"
              id="latLong"
              aria-describedby="eventHelp"
              placeholder="99.99.9999, -99.999999"
              value={newRoute.latLong}
              onChange={this.latLongChange}
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
              value={newRoute.orientation}
              onChange={this.orientationChange}
            />
          </div>
          <button className="btn btn-danger btn-lg">Save</button>
        </form>
      </div>
     </div>
    );
  }
}

export default RouteEditPath;
