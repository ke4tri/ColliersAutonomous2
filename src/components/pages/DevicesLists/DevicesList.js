import React from 'react';
import PropTypes from 'prop-types';
import deviceShape from '../../../helpers/propz/deviceShape';
import authRequests from '../../../helpers/data/authRequest';
import deviceRequest from '../../../helpers/data/deviceRequest';
import './DevicesList.scss';

class DevicesList extends React.Component {
  static propTypes = {
    authed: PropTypes.bool,
    passEventToEdit: PropTypes.func,
    deleteSingleDevice: PropTypes.func,
    device: deviceShape.deviceShape,
    onListingSelection: PropTypes.func,
  };

  state = {
    newUid: '',
    devicesArray: [],
  }

  selectDevice = (e) => {
    e.preventDefault();
  }

  editDevice = (e) => {
    e.preventDefault();
    const { passEventToEdit, device } = this.props;
    passEventToEdit(device.id);
  }

  deleteDevice = (e) => {
    e.preventDefault();
    const { deleteSingleDevice, device } = this.props;
    deleteSingleDevice(device.id);
  }

  listingClick = (e) => {
    e.stopPropagation();
    const { device, onListingSelection } = this.props;
    onListingSelection(device.id);
  }

  getSomeData = () => {
    const newUid = authRequests.getCurrentUid();
    this.setState({ newUid });
    console.log(this.state.newUid);
    deviceRequest.getDevices(newUid)
      .then((devicesArray) => {
        this.setState({ devicesArray });
        console.log('State at start', this.state.devicesArray);
      })
      .catch(err => console.error('error with getWeather', err));
  }

  componentWillMount() {
    this.getSomeData();
  }

  render() {
    const { device } = this.props;
    const uid = authRequests.getCurrentUid();

    const makeButtons = () => {
      if (device.uid === uid) {
        return (
          <div className="alert alert-secondary" role="alert">
            <button className="btn btn-default" onClick={this.editDevice}>
              <i className="fas fa-pencil-alt"></i>
            </button>
            <button className="btn btn-default" onClick={this.deleteDevice}>
              <i className="fas fa-trash-alt"></i>
            </button>
            <button className="btn btn-default" >
              SELECT
            </button>
          </div>
        );
      }
      return <div className="col-2"></div>;
    };
    return (
      <li className="event-item text-center" onClick={this.listingClick}>
        <div className="col-7">
          <h4> {device.name}</h4>
          <p> {device.type}</p>
        </div>
        <div className="col-3">
        </div>
        { makeButtons() }
      </li>
    );
  }
}

export default DevicesList;
