import React from 'react';
import PropTypes from 'prop-types';

import './Devices.scss';

class Devices extends React.Component {
  static propTypes = {
    uid: PropTypes.string,
  }


  render() {
    return (
      <div className='Home'>
        <h2>Devices{this.props.uid}</h2>
        {/* <Devices
            listings={listings}
            deleteSingleListing={this.deleteOne}
            passListingToEdit={this.passListingToEdit}
            onListingSelection={this.listingSelectEvent}
          />
          <Device listing={selectedListing}/>
        </div>
        <div className="row">
          <DeviceForm onSubmit={this.formSubmitEvent} isEditing={isEditing} editId={editId}/>
        </div> */}
      </div>
    );
  }
}

export default Devices;
