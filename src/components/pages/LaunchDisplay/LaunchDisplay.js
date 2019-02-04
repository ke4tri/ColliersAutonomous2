import React from 'react';
// import PropTypes from 'prop-types';
// import smashRequest from '../../../helpers/data/smashRequest';
import './LaunchDisplay.scss';

class LaunchDisplay extends React.Component {
  // static propTypes = {
  //   activeDevice: PropTypes.string,
  //   activeLocation: PropTypes.string,
  //   activeRoute: PropTypes.string,
  //   newUid: PropTypes.string,
  // };

  // device = () => {
  //   const currentD = this.props.activeDevice;
  //   smashRequest.getDevicesById(currentD)
  //     .then((device) => {
  //       // this.setState({ devicesArray });
  //       console.log(device);
  //     })
  //     .catch(err => console.error('error with getLocations', err));
  // }

  componentDidMount() {
    // this.device();
  }

  render() {
    return (
      <div className='Home mx-auto'>
        <h2>LaunchDisplay</h2>
      </div>
    );
  }
}

export default LaunchDisplay;
