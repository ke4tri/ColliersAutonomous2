import React from 'react';
import PropTypes from 'prop-types';
import authRequests from '../../../helpers/data/authRequest';
import deviceRequest from '../../../helpers/data/deviceRequest';
import DevicesList from '../DevicesLists/DevicesList';
import deviceShape from '../../../helpers/propz/deviceShape';
import DeviceForm from '../DeviceForm/DeviceForm';
import DeviceDisplay from '../DeviceDisplay/DeviceDisplay';


import './Devices.scss';

class Devices extends React.Component {
  static propTypes = {
    authed: PropTypes.bool,
    device: deviceShape.deviceShape,
  };

  state = {
    newUid: '',
    devicesArray: [],
    isEditing: false,
    editId: '-1',
    selectedDeviceId: -1,
  }

  listingSelectDevice = (id) => {
    this.setState({
      selectedDeviceId: id,
    });
  }

  changeView = () => {
    this.props.history.push('/locations');
  }

  getSomeData = () => {
    const newUid = authRequests.getCurrentUid();
    this.setState({ newUid });
    deviceRequest.getDevices(newUid)
      .then((devicesArray) => {
        this.setState({ devicesArray });
      })
      .catch(err => console.error('error with getLocations', err));
  }

  // change this to componentDidMount()?
  componentWillMount() {
    this.getSomeData();
  }

  deleteSingleDevice = (deviceId) => {
    deviceRequest.deleteDevice(deviceId)
      .then(() => {
        this.getSomeData();
      })
      .catch(err => console.error('error with delete single', err));
  }

  formSubmitEvent = (newDevice) => {
    const { isEditing, editId } = this.state;
    if (isEditing) {
      deviceRequest.updateDevice(editId, newDevice)
        .then(() => {
          this.setState({ isEditing: false, editId: '-1' });
          this.getSomeData();
        })
        .catch(err => console.error('error with devices post', err));
    } else {
      deviceRequest.postRequest(newDevice)
        .then(() => {
          this.getSomeData();
        })
        .catch(err => console.error('error with devices post', err));
    }
  }

  // userDeviceId = (deviceId) => {
  //   deviceRequest.postRequest(deviceId);
  // };

  render() {
    const {
      devicesArray,
      isEditing,
      editId,
      selectedDeviceId,
    } = this.state;
    const selectedListing = devicesArray.find(device => device.id === selectedDeviceId) || { nope: 'nope' };
    const passEventToEdit = deviceId => this.setState({ isEditing: true, editId: deviceId });
    const devicesItemComponents = devicesArray.map(device => (
      <DevicesList
        device={device}
        key={device.id}
        name={device.name}
        faaSerial={device.faaSerial}
        manufacture={device.manufacture}
        deleteSingleDevice={this.deleteSingleDevice}
        passEventToEdit={passEventToEdit}
        onListingSelection={this.listingSelectDevice}
        changeView={this.changeView}
        // userDeviceId={this.userDeviceId}
      />
    ));

    return (
      <div className="text-center col">
        <h1>Your Devices</h1>
        <div className="row">
          <div className="row mr-1">
            <ul>{ devicesItemComponents }</ul>
          </div>
          <div className="col mr-5">
            <DeviceDisplay
            device={selectedListing}
            />
          </div>
          <div className="col">
            <DeviceForm
              onSubmit={this.formSubmitEvent}
              isEditing={isEditing}
              editId={editId}
            />
          </div>
        </div>
      </div>
    );
  }
}

export default Devices;
