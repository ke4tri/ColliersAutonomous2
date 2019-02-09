import React from 'react';
import smashRequest from '../../../helpers/data/smashRequest';
import authRequests from '../../../helpers/data/authRequest';
import LaunchDisplay from '../LaunchDisplay/LaunchDisplay';
import './Launch.scss';
import userRequest from '../../../helpers/data/userRequest';

class Launch extends React.Component {
  state = {
    currentDeviceId: '',
    currentLocationId: '',
    currentRouteId: '',
    myCurrentDevice: [],
    myCurrentLocation: [],
    myCurrentRoute: [],
  }

  getSomeUser = () => {
    const uid = authRequests.getCurrentUid();
    userRequest.getUser(uid)
      .then((usrResponse) => {
        const { currentDeviceId, currentLocationId, currentRouteId } = usrResponse;
        this.setState({ currentDeviceId, currentLocationId, currentRouteId });
        this.device();
        this.location();
        this.route();
      })
      .catch(err => console.error('error with getLocations', err));
  }

  device = () => {
    const currentD = this.state.currentDeviceId;
    smashRequest.getSingleDevice(currentD)
      .then((currentDevice) => {
        const myCurrentDevice = currentDevice.data;
        this.setState({ myCurrentDevice });
      })
      .catch(err => console.error('error with getLocations', err));
  }

  location = () => {
    const currentL = this.state.currentLocationId;
    smashRequest.getSingleLocation(currentL)
      .then((currentLocation) => {
        const myCurrentLocation = currentLocation.data;
        this.setState({ myCurrentLocation });
      })
      .catch(err => console.error('error with getLocations', err));
  }

  route = () => {
    const currentR = this.state.currentRouteId;
    smashRequest.getSingleRoute(currentR)
      .then((currentRoute) => {
        const myCurrentRoute = currentRoute.data;
        this.setState({ myCurrentRoute });
      })
      .catch(err => console.error('error with getLocations', err));
  }

  getcurrent = () => {
    const newUid = authRequests.getCurrentUid();
    this.setState({ newUid });
    smashRequest.getCurrentDevice(newUid)
      .then((usersObject) => {
        this.setState({ usersObject });
      })
      .catch(err => console.error('error with getLocations', err));
  }

  componentDidMount() {
    this.getSomeUser();
  }

  render() {
    return (
      <div className='Home mx-auto mt-4'>
        <h1><u>Launch Console</u></h1>
        <LaunchDisplay
          activeDevice={this.state.currentDeviceId}
          activeLocation={this.state.currentLocationId}
          activeRoute={this.state.currentRouteId}
          uid={this.state.newUid}
          currentDevice={this.state.myCurrentDevice}
          currentLocation={this.state.myCurrentLocation}
          currentRoute={this.state.myCurrentRoute}
        />
      </div>
    );
  }
}

export default Launch;
