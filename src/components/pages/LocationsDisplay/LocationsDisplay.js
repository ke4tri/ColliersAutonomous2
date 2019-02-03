import React from 'react';
import locationProz from '../../../helpers/propz/locationShape';

import './LocationsDisplay.scss';

class LocationsDisplay extends React.Component {
  static propTypes = { location: locationProz.locationOptionalShape };

  render() {
    return (
        <div className="col">
          <div className="col">
            <div className="row">
            </div>
          </div>
        </div>
    );
  }
}

export default LocationsDisplay;
