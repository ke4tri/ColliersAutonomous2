import React from 'react';
import PropTypes from 'prop-types';
import locationShape from '../../../helpers/propz/locationShape';
import authRequests from '../../../helpers/data/authRequest';

import './LocationsList.scss';

class LocationsList extends React.Component {
  static propTypes = {
    authed: PropTypes.bool,
    location: locationShape.locationShape,
    deleteSingleLocation: PropTypes.func,
    onListingSelection: PropTypes.func,
  };

  deleteDevice = (e) => {
    e.preventDefault();
    const { deleteSingleLocation, location } = this.props;
    deleteSingleLocation(location.id);
  }

  listingClick = (e) => {
    e.stopPropagation();
    const { location, onListingSelection } = this.props;
    onListingSelection(location.id);
  }

  render() {
    const { location } = this.props;
    const uid = authRequests.getCurrentUid();

    const makeButtons = () => {
      if (location.uid === uid) {
        return (
          <div className="d-flex row" role="alert">
            <button className="btn btn-default" onClick={this.deleteDevice}>
              <i className="fas fa-trash-alt"></i>
            </button>
            <button className="btn btn-default" >
              SELECT
            </button>
          </div>
        );
      }
    }
    return (
      <li className="event-item text-center" onClick={this.listingClick}>
      <div className="col-1">
        <h4> {location.name}</h4>
      </div>
      <div className="row">
      </div>
      { makeButtons() }
    </li>
    );
  }
}

export default LocationsList;
