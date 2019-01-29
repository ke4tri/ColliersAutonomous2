import React from 'react';
// import LocationsDisplay from '../LocationsDisplay/LocationsDisplay';
import LocationsList from '../LocationsList/LocationsList';
import authRequests from '../../../helpers/data/authRequest';
import locationsRequest from '../../../helpers/data/locationsRequests';
import LocationsForm from '../LocationsForm/LocationsForm';
import './Locations.scss';

class Locations extends React.Component {
  state = {
    newUid: '',
    locationsArray: [],
    selectedLocationId: -1,
  }

  getSomeLocationsData = () => {
    const newUid = authRequests.getCurrentUid();
    this.setState({ newUid });
    locationsRequest.getLocations(newUid)
      .then((locationsArray) => {
        this.setState({ locationsArray });
      })
      .catch(err => console.error('error with getLocations', err));
  }

  componentWillMount() {
    this.getSomeLocationsData();
  }

  deleteSingleLocation = (locationId) => {
    locationsRequest.deleteDevice(locationId)
      .then(() => {
        this.getSomeLocationsData();
      })
      .catch(err => console.error('error with delete single', err));
  }

  formSubmitEvent = (newLocation) => {
    const { isEditing, editId } = this.state;
    if (isEditing) {
      locationsRequest.updateLocation(editId, newLocation)
        .then(() => {
          this.setState({ isEditing: false, editId: '-1' });
          this.getSomeLocationsData();
        })
        .catch(err => console.error('error with devices post', err));
    } else {
      locationsRequest.postRequest(newLocation)
        .then(() => {
          this.getSomeLocationsData();
        })
        .catch(err => console.error('error with devices post', err));
    }
  }

  render() {
    const {
      locationsArray,
      isEditing,
      editId,
    } = this.state;
    // const { locationsArray,selectedLocationId } = this.state;
    // const selectedLocation = locationsArray.find(location => location.id === selectedLocationId) || { nope: 'nope' };
    const locationsItemComponents = locationsArray.map(location => (
      <LocationsList
        location={location}
        key={location.id}
        name={location.name}
        // deleteSingleDevice={this.deleteSingleDevice}
        // passEventToEdit={passEventToEdit}
        // onListingSelection={this.listingSelectDevice}
      />
    ));
    return (
      <div className="text-center col">
      <h1>Your Locations</h1>
      <div className="row">
        <div className="row mr-1">
          <ul>{ locationsItemComponents }</ul>
        </div>
        {/* <div className="col mr-5">
          <LocationsDisplay
          location={selectedLocation}
          />
        </div> */}
        <div className="col">
          <LocationsForm
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

export default Locations;
