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
      })
      .catch(err => console.error('error with getLocations', err));
  }

  device = () => {
    const currentD = this.state.currentDeviceUid;
    smashRequest.getSingleDevice(currentD)
      .then((device) => {
        // this.setState({ devicesArray });
        console.log(device);
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
        />
      </div>
    );
  }
}

export default Launch;
