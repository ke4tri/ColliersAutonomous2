import React from 'react';
import PropTypes from 'prop-types';
import authRequests from '../../../helpers/data/authRequest';
import deviceRequests from '../../../helpers/data/deviceRequest';

const defaultDevice = {
  uid: '',
  name: '',
  faaSerial: '',
  manufacture: '',
  type: '',
};

class DeviceForm extends React.Component {
  static propTypes = {
    onSubmit: PropTypes.func,
    isEditing: PropTypes.bool,
    editId: PropTypes.string,
  }

  state = {
    newDevice: defaultDevice,
  }

  formFieldStringState = (name, e) => {
    e.preventDefault();
    const tempDevice = { ...this.state.newDevice };
    tempDevice[name] = e.target.value;
    this.setState({ newDevice: tempDevice });
  }

  nameChange = e => this.formFieldStringState('name', e);

  faaSerialChange = e => this.formFieldStringState('faaSerial', e);

  manufactureChange = e => this.formFieldStringState('manufacture', e);

  typeChange = e => this.formFieldStringState('type', e);
  
  formSubmit = (e) => {
    e.preventDefault();
    const { onSubmit } = this.props;
    const myDevice = { ...this.state.newDevice };
    myDevice.uid = authRequests.getCurrentUid();
    onSubmit(myDevice);
    this.setState({ newEvent: defaultDevice });
  }

  componentDidUpdate(prevProps) {
    const { isEditing, editId } = this.props;
    if (prevProps !== this.props && isEditing) {
      deviceRequests.getSingleDevice(editId)
        .then((device) => {
          const newDevice = {
            uid: device.data.uid,
            name: device.data.name,
            faaSerial: device.data.faaSerial,
            manufacture: device.data.manufacture,
            type: device.data.type,
          };
          this.setState({ newDevice });
        })
        .catch(err => console.error('error with getSingleEvent', err));
    }
  }

  render() {
    const { newDevice } = this.state;
    const { isEditing } = this.props;
    const title = () => {
      if (isEditing) {
        return <h2>Edit Device:</h2>;
      }
      return <h2>Add Device:</h2>;
    };
    return (
      <div className="event-form col container3">
        {title()}
        <form onSubmit={this.formSubmit}>
          <div className="">
            <label htmlFor="event"></label>
            <input
              type="text"
              className=""
              id="name"
              aria-describedby="eventHelp"
              placeholder="Device Name"
              value={newDevice.name}
              onChange={this.nameChange}
            />
          </div>
          <div className="">
            <label htmlFor="location"></label>
            <input
              type="text"
              className=""
              id="faaSerial"
              aria-describedby="locationHelp"
              placeholder="FAA Serial Number"
              value={newDevice.faaSerial}
              onChange={this.faaSerialChange}
            />
          </div>
          <div className="">
            <label htmlFor="manufacture"></label>
            <input
              type="text"
              className=""
              id="manufacture"
              aria-describedby="locationHelp"
              placeholder="Manufacture Name"
              value={newDevice.manufacture}
              onChange={this.manufactureChange}
            />
          </div>
          <div className="">
            <label htmlFor="type"></label>
            <input
              type="text"
              className=""
              id="type"
              aria-describedby="locationHelp"
              placeholder="Device Type"
              value={newDevice.type}
              onChange={this.typeChange}
            />
          </div>
          <button className="btn btn-outline-light btn-lg mt-2 mb-2">Save</button>
        </form>
      </div>
    );
  }
}

export default DeviceForm;
