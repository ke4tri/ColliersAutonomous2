import React from 'react';
import routesRequest from '../../../helpers/data/routesRequest';
import authRequests from '../../../helpers/data/authRequest';
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
    newEvent: '',
    isEditing: false,
    editId: '-1',
    currentCommand: [],
  };

  changeView = () => {
    this.props.history.push(`/locations/${this.props.match.params.id}/routes`);
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

  locationIdChange = e => this.formFieldStringState('locationId', e);

  cmdChange = (e) => {
    e.preventDefault();
    const currentCommand2 = this.state.currentCommand.slice();
    currentCommand2.push(e.target.value);
    this.setState({ currentCommand: currentCommand2 });
    this.cmdChange2(this.state.currentCommand);
    console.log(this.state.currentCommand);
  }


  formSubmitEvent = (newRoute) => {
    const { isEditing, editId } = this.state;
    if (isEditing) {
      routesRequest.updateRoute(editId, newRoute)
        .then(() => {
          this.setState({ isEditing: false, editId: '-1' });
          // this.getSomeData();
        })
        .catch(err => console.error('error with devices post', err));
    } else {
      routesRequest.postRequest(newRoute)
        .then(() => {
          this.getSomeData();
        })
        .catch(err => console.error('error with devices post', err));
    }
    this.changeView();
  }

  formSubmit = (e) => {
    e.preventDefault();
    const myRoute = { ...this.state.newRoute };
    myRoute.uid = authRequests.getCurrentUid();
    // onSubmit(myDevice);
    this.formSubmitEvent(myRoute);
    this.setState({ newEvent: defaultRoute });
  }

  componentDidUpdate() {
    const { isEditing, editId } = this.state;
    if (isEditing) {
      routesRequest.getSingleRoute(editId)
        .then((route) => {
          // const locationId = this.props.match.params.id;
          const newDevice = {
            uid: route.data.uid,
            name: route.data.flightName,
            faaSerial: route.data.faaSerial,
            manufacture: route.data.manufacture,
            type: route.data.type,
            locationId: route.data.locationId,
          };
          this.setState({ newDevice });
        })
        .catch(err => console.error('error with getSingleEvent', err));
    }
  }

  render() {
    const { newRoute, isEditing } = this.state;
    const locationId = this.props.match.params.id;
    const title = () => {
      if (isEditing) {
        return <h2>Edit Route</h2>;
      }
      return <h2>Add Route</h2>;
    };
    return (

      <div className="everythingIn mx-auto">
        <div className='Home mx-auto'>
          {title()}
          <form onClick={this.cmdChange}>
          <div className="wrapButton">
            {/* <button class="btn btn-primary" onClick={this.changeView2}>Button</button> */}
            <div className="btn-group d-flex justify-content-center">
              <button type="button" className="taco btn btn-outline-light m-2 p-3" value="takeoff">TAKE OFF</button>
              <button type="button" className="taco btn btn-outline-light m-2 p-3" value="up20">UP</button>
              <button type="button" className="taco btn btn-outline-light m-2 p-3" value="land">LAND</button>
            </div>
            <div className="btn-group d-flex justify-content-center">
              <button type="button" className="btn btn-outline-light m-2 p-3" value="90cw">90CW</button>
              <button type="button" className="btn btn-outline-light m-2 p-3" value="photo">PHOTO</button>
              <button type="button" className="btn btn-outline-light m-2 p-3" value="90ccw">90CCW</button>
            </div>
            <div className="btn-group d-flex justify-content-center">
              <button type="button" className="taco2 btn btn-outline-light m-2 p-3" value="forward20">FORWARD</button>
              <button type="button" className="taco2 btn btn-outline-light m-2 p-3" value="down20">DOWN</button>
              <button type="button" className="taco2 btn btn-outline-light m-2 p-3" value="back20">BACK</button>
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
          <div className="input-group m-1">
            <label htmlFor="event"></label>
            <input
              type="text"
              className="form-control"
              id="cmd"
              aria-describedby="eventHelp"
              placeholder="Commands"
              value={newRoute.cmd}
              onChange={this.cmdChange}
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
          <div className="input-group m-1">
            <label htmlFor="event"></label>
            <input
              type="text"
              className="form-control"
              id="locationId"
              aria-describedby="eventHelp"
              placeholder="locationId"
              value={locationId}
              onClick={this.locationIdChange}
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
