import React from 'react';
import smashRequest from '../../../helpers/data/smashRequest';
// import deviceRequest from '../../../helpers/data/deviceRequest';
import authRequests from '../../../helpers/data/authRequest';
import LaunchDisplay from '../LaunchDisplay/LaunchDisplay';
import './Launch.scss';

class Launch extends React.Component {
  state = {
    usersArray: [],
    newUid: '',
    currentDeviceUid: '',
    currentLocationId: '',
    currentRouteId: '',
    myCurrentDevice: [],
    myCurrentLocation: [],
    myCurrentRoute: [],
  }

  // need to setState for all currents below
  getSomeUser = () => {
    const newUid = authRequests.getCurrentUid();
    this.setState({ newUid });
    smashRequest.getUid(newUid)
      .then((usersArray) => {
        const currentDeviceUid = usersArray[0];
        const currentLocationId = usersArray[1];
        const currentRouteId = usersArray[2];
        this.setState({ currentDeviceUid });
        this.setState({ currentLocationId });
        this.setState({ currentRouteId });
        this.setState({ usersArray });
        this.device();
        this.location();
        this.route();
      })
      .catch(err => console.error('error with getLocations', err));
  }

  device = () => {
    const currentD = this.state.currentDeviceUid;
    smashRequest.getSingleDevice(currentD)
      .then((currentDevice) => {
        const myCurrentDevice = currentDevice.data;
        this.setState({ myCurrentDevice });
        console.log(currentDevice.data);
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
    // this.getcurrent();
  }

  render() {
    return (
      <div className='Home mx-auto'>
        <h2>Launch</h2>
        <LaunchDisplay
          activeDevice={this.state.currentDeviceUid}
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
