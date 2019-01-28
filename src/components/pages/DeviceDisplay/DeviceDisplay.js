import React from 'react';
import deviceProz from '../../../helpers/propz/deviceShape';
// import PropTypes from 'prop-types';
// import listingShape from '../../helpers/propz/listingShape';

// import ListingItem from '../ListingItem/ListingItem';

import './DeviceDisplay.scss';

class DeviceDisplay extends React.Component {
  static propTypes = { device: deviceProz.deviceOptionalShape };


  render() {
    const { device } = this.props;
    if (device.nope) {
      return (
        <div className="building col">
        <h1 className="unknown-listing">
          <span className="glyphicon glyphicon-arrow-left" />No Device Selected!
        </h1>
      </div>
      );
    }
    return (
      <div className="col">
        <div className="row">
          <div className="col-6">
            {/* <img className="building-image" src={device.name} alt="Selected Building" /> */}
          </div>
          <div className="col-6">
            <h4>
              Device: {device.name}
            </h4>
            <h4>
              FAA Serial: {device.faaSerial}
            </h4>
            <h4>
              Manufacture: {device.manufacture}
            </h4>
          </div>
        </div>
        {/* <div className="row">
          <BuildingTile imageSrc="flame" altText="flame" pTagText={listing.heating} />
          <BuildingTile imageSrc="snow" altText="snowflake" pTagText={listing.cooling} />
        </div> */}
      </div>
    );
  }
}

export default DeviceDisplay;
