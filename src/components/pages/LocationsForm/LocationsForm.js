import React from 'react';
import PropTypes from 'prop-types';
import authRequests from '../../../helpers/data/authRequest';
import locationsRequests from '../../../helpers/data/locationsRequests';
import './LocationsForm.scss';


const defaultLocation = {
  uid: '',
  name: '',
};

class LocationsForm extends React.Component {
  static propTypes = {
    onSubmit: PropTypes.func,
    isEditing: PropTypes.bool,
    editId: PropTypes.string,
  }

  state = {
    newLocation: defaultLocation,
  }

  formFieldStringState = (name, e) => {
    e.preventDefault();
    const tempLocation = { ...this.state.newDevice };
    tempLocation[name] = e.target.value;
    this.setState({ newLocation: tempLocation });
  }

  nameChange = e => this.formFieldStringState('name', e);

  formSubmit = (e) => {
    e.preventDefault();
    const { onSubmit } = this.props;
    const myLocation = { ...this.state.newLocation };
    myLocation.uid = authRequests.getCurrentUid();
    onSubmit(myLocation);
    this.setState({ newEvent: defaultLocation });
  }

  componentDidUpdate(prevProps) {
    const { isEditing, editId } = this.props;
    if (prevProps !== this.props && isEditing) {
      locationsRequests.getSingleLocation(editId)
        .then((device) => {
          const newLocation = {
            uid: device.data.uid,
            name: device.data.name,
          };
          this.setState({ newLocation });
        })
        .catch(err => console.error('error with getSingleLoction', err));
    }
  }

  render() {
    const { newLocation } = this.state;
    // const { isEditing } = this.props;
    return (
      <div className="event-form col">
      <form onSubmit={this.formSubmit}>
          <div className="form-group ">
            <label htmlFor="event"></label>
            <input
              type="text"
              className="form-control"
              id="name"
              aria-describedby="eventHelp"
              placeholder="Location Name"
              value={newLocation.name}
              onChange={this.nameChange}
            />
          </div>
          <button className="btn btn-outline-light">Save</button>
        </form>
      </div>
    );
  }
}

export default LocationsForm;
