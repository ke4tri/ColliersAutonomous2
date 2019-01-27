import React from 'react';
import PropTypes from 'prop-types';
import authRequests from '../../../helpers/data/authRequest';
import deviceRequests from '../../../helpers/data/deviceRequest';

const defaultDevice = {
  uid: '',
  name: '',
  faaSerial: '',
  manufacture: '',
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

  formSubmit = (e) => {
    e.preventDefault();
    const { onSubmit } = this.props;
    const myDevice = { ...this.state.newDevice };
    // myEvent.startDate = Date.parse(`${this.state.eventDate}T00:00:00`);
    myDevice.uid = authRequests.getCurrentUid();
    onSubmit(myDevice);
    this.setState({ newEvent: defaultDevice });
  }

  componentDidUpdate(prevProps) {
    const { isEditing, editId } = this.props;
    if (prevProps !== this.props && isEditing) {
      deviceRequests.getSingleEvent(editId)
        .then((device) => {
          // const eventDate = moment(event.data.startDate).format('YYYY-MM-DD');
          const newDevice = {
            uid: device.data.uid,
            name: device.data.name,
            faaSerial: device.data.faaSerial,
            manufacture: device.data.manufacture,
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
      <div className="event-form col">
        {title()}
        <form onSubmit={this.formSubmit}>
          <div className="form-group">
            <label htmlFor="event"></label>
            <input
              type="text"
              className="form-control"
              id="name"
              aria-describedby="eventHelp"
              placeholder="Device Name"
              value={newDevice.name}
              onChange={this.nameChange}
            />
          </div>
          <div className="form-group">
            <label htmlFor="location"></label>
            <input
              type="text"
              className="form-control"
              id="faaSerial"
              aria-describedby="locationHelp"
              placeholder="FAA Serial Number"
              value={newDevice.faaSerial}
              onChange={this.faaSerialChange}
            />
          </div>
          <div className="form-group">
            <label htmlFor="manufacture"></label>
            <input
              type="text"
              className="form-control"
              id="manufacture"
              aria-describedby="locationHelp"
              placeholder="Manufacture Name"
              value={newDevice.manufacture}
              onChange={this.manufactureChange}
            />
          </div>
          <button className="btn btn-danger">Save Event</button>
        </form>
      </div>
    );
  }
}

export default DeviceForm;
