import React from 'react';
import './LaunchDisplay.scss';

class LaunchDisplay extends React.Component {
  componentDidMount() {
  }

launchThis = () => {
  const launchCmd = this.props.currentRoute.cmd;
  console.log(launchCmd);
}

render() {
  const {
    currentDevice,
    currentLocation,
    currentRoute,
  } = this.props;

  return (
      <div className="wrapperNumOne">
        <div className='Home mx-auto mt-4'>
          <div><h2>DEVICE: {currentDevice.name}</h2></div>
          <div><h2>LOCATION: {currentLocation.name}</h2></div>
          <div><h2>ROUTE: {currentRoute.cmd}</h2></div>
        </div>
        <div className="mb-4 mt-4">
          <button id="launch" className="btn btn-outline-success btn-lg" onClick={this.launchThis}>LAUNCH</button>
        </div>
      </div>
  );
}
}

export default LaunchDisplay;
