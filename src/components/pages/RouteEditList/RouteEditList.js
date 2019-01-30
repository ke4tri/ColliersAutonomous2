import React from 'react';
import PropTypes from 'prop-types';
import './RouteEditList.scss';

class RouteEditList extends React.Component {
  static propTypes = {
    locationId: PropTypes.string,
    getSomeData2: PropTypes.func,
  };

  //  consoleThis = () => {
  //    console.log(this.props.locationId);
  //  }

  getLocationRoutes = () => {
    this.props.getSomeData2(this.props.locationId);
  }

  render() {
    return (
      <div className='Home mx-auto'>
        <h2>RouteEditList</h2>
        <button className="btn btn-primary" onClick={this.getLocationRoutes}>Button</button>
      </div>
    );
  }
}

export default RouteEditList;
