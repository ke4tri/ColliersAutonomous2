import React from 'react';
import PropTypes from 'prop-types';
import deviceShape from '../../../helpers/propz/deviceShape';
import authRequests from '../../../helpers/data/authRequest';
// import deviceRequest from '../../../helpers/data/deviceRequest';
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

  render() {
    const { device } = this.props;
    const uid = authRequests.getCurrentUid();

    const makeButtons = () => {
      if (device.uid === uid) {
        return (
          <div className="d-flex row" role="alert">
            <button className="btn btn-outline-light" onClick={this.editDevice}>
              <i className="fas fa-pencil-alt"></i>
            </button>
            <button className="btn btn-outline-light" onClick={this.deleteDevice}>
              <i className="fas fa-trash-alt"></i>
            </button>
            <button className="btn btn-outline-light" >
              SELECT
            </button>
          </div>
        );
      }
      return <div className="col-2"></div>;
    };
    return (
      <li className="event-item text-center" onClick={this.listingClick}>
        <div className="col-1">
          <h4> {device.name}</h4>
          <p> {device.type}</p>
        </div>
        <div className="row">
        </div>
        { makeButtons() }
      </li>
    );
  }
}

export default DevicesList;
