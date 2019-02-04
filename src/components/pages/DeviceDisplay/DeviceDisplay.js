import React from 'react';
import './DeviceDisplay.scss';

class DeviceDisplay extends React.Component {
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
    if (device.type === 'Drone') {
      return (
        <div className="col">
          <div className="col">
            <div className="col-2">
              <img className="drone-image" src="https://pngimage.net/wp-content/uploads/2018/05/drone-vector-png-6.png" alt="Drone" width="200" height="200" />
            </div>
            <div className="row">
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
        </div>
      );
    }
    return (
      <div className="col">
        <div className="col">
          <div className="col-2">
            <img className="rover-image" src="http://pluspng.com/img-png/space-rover-png-automobile-dune-buggy-lunar-rover-moon-buggy-moon-car-nasa-512.png" alt="Rover" width="200" height="200" />
          </div>
          <div className="row">
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
      </div>
    );
  }
}

export default DeviceDisplay;

