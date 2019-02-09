import React from 'react';
import PropTypes from 'prop-types';
import userRequest from '../../../helpers/data/userRequest';
import locationShape from '../../../helpers/propz/locationShape';
import authRequests from '../../../helpers/data/authRequest';

import './LocationsList.scss';

class LocationsList extends React.Component {
  static propTypes = {
    authed: PropTypes.bool,
    location: locationShape.locationShape,
    deleteSingleLocation: PropTypes.func,
    onListingSelection: PropTypes.func,
    changeView: PropTypes.func,
  };

  deleteDevice = (e) => {
    e.preventDefault();
    const { deleteSingleLocation, location } = this.props;
    deleteSingleLocation(location.id);
  }

  listingClick = (e) => {
    const { location, changeView } = this.props;
    changeView(location.id);
  }

  userLocationId = (e) => {
    e.preventDefault();
    const locationId = e.target.id;
    const uid = authRequests.getCurrentUid();
    userRequest.getUser(uid).then((userRes) => {
      userRequest.patchRequestLoc(userRes.id, locationId).then(() => {
        this.listingClick();
      });
    });
  };

  render() {
    const { location } = this.props;
    const uid = authRequests.getCurrentUid();

    const makeButtons = () => {
      if (location.uid === uid) {
        return (
          <div className="d-flex row pl-5" role="alert">
            <button className="btn btn-outline-dark m-5" onClick={this.deleteDevice}>
              <i className="fas fa-trash-alt"></i>
            </button>
            <button className="btn btn-outline-dark m-5" id={location.id} onClick={this.userLocationId}>
              SET
            </button>
          </div>
        );
      }
      return '';
    };
    return (
      <div className="container">
      <li className="event-item text-center pr-5 shadow-lg">
      <div className="col-1">
        <h4> {location.name}</h4>
      </div>
      <div className="row">
      </div>
      { makeButtons() }
    </li>
    </div>
    );
  }
}

export default LocationsList;
