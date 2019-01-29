import React from 'react';
import locationProz from '../../../helpers/propz/locationShape';

import './LocationsDisplay.scss';

class LocationsDisplay extends React.Component {
  static propTypes = { location: locationProz.locationOptionalShape };

  render() {
    const { location } = this.props;
    // if (location.nope) {
    //   return (
    //     <div className="building col">
    //     <h1 className="unknown-listing">
    //       <span className="glyphicon glyphicon-arrow-left" />No Device Selected!
    //     </h1>
    //   </div>
    //   );
    // }
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
