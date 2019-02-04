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
        <div className='Home mx-auto'>
          <h2>LaunchDisplay</h2>
          <div>{currentDevice.name}</div>
          <div>{currentLocation.name}</div>
          <div>{currentRoute.cmd}</div>
        </div>
        <div>
          <button className="btn btn-outline-success" onClick={this.launchThis}>LAUNCH</button>
        </div>
      </div>
  );
}
}

export default LaunchDisplay;
