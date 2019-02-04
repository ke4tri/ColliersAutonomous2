import React from 'react';
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

  listingSelectLocation = (id) => {
    this.setState({
      selectedLocationId: id,
    });
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

  deleteSingleLocation2 = (locationId) => {
    locationsRequest.deleteLocations(locationId)
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

  changeView = (locationId) => {
    this.props.history.push(`/locations/${locationId}`);
    this.setState({ selectedLocationId: locationId });
  }

  render() {
    const {
      locationsArray,
      isEditing,
      editId,
    } = this.state;
    const locationsItemComponents = locationsArray.map(location => (
      <LocationsList
        location={location}
        key={location.id}
        name={location.name}
        deleteSingleLocation={this.deleteSingleLocation2}
        onListingSelection={this.listingSelectLocation}

        changeView={this.changeView}
      />
    ));
    return (
      <div className="text-center col">
      <h1><u>Your Locations</u></h1>
      <div className="row shadow-lg">
        <div className="row mr-1">
          <ul>{ locationsItemComponents }</ul>
        </div>
        <div className="col align-middle pr-5 container2 shadow-lg locationForm">
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
