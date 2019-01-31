import React from 'react';
import PropTypes from 'prop-types';
import routeShape from '../../../helpers/propz/routeShape';
import './RouteItem.scss';

class RouteItem extends React.Component {
  // TODO:  add proptype for route and make routeShape
  static propTypes = {
    locationId: PropTypes.string,
    getSomeData2: PropTypes.func,
    route: routeShape,
    onListingSelection: PropTypes.func,
  };

  listingClick = (e) => {
    e.stopPropagation();
    const { route, onListingSelection } = this.props;
    onListingSelection(route.id);
  }

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
      <div className="d-flex" role="alert">
          <button className="btn btn-outline-lightl m-5 px-5" onClick={this.deleteDevice}>
            <i className="fas fa-trash-alt"></i>
          </button>
        </div>
      </li>
    );
  }
}

export default RouteItem;
