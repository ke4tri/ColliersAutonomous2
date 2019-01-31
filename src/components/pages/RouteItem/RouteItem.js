import React from 'react';
import PropTypes from 'prop-types';
// import authRequests from '../../../helpers/data/authRequest';
import locationShape from '../../../helpers/propz/locationShape';
import './RouteItem.scss';

class RouteItem extends React.Component {
  // TODO:  add proptype for route and make routeShape
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

  componentWillMount() {
    this.getLocationRoutes();
  }

  render() {
    const { route } = this.props;
    return (
      <li className="event-item text-center" onClick={this.listingClick}>
      <div className="col-1">
        <h4> {route.flightName}</h4>
      </div>
      <div className="row">
      </div>
      <div className="d-flex row" role="alert">
          <button className="btn btn-default" onClick={this.editDevice}>
            <i className="fas fa-pencil-alt"></i>
          </button>
          <button className="btn btn-default" onClick={this.deleteDevice}>
            <i className="fas fa-trash-alt"></i>
          </button>
          <button className="btn btn-default" >
            SELECT
          </button>
        </div>
      </li>
    );
  }
}

export default RouteItem;
