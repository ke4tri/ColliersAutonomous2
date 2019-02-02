import React from 'react';
// import PropTypes from 'prop-types';
// import routeShape from '../../../helpers/propz/routeShape';
import routesRequest from '../../../helpers/data/routesRequest';
import './RouteItem.scss';

class RouteItem extends React.Component {
  // TODO:  add proptype for route and make routeShape
  // static propTypes = {
  //   locationId: PropTypes.string,
  //   getSomeData2: PropTypes.func,
  //   route: routeShape,
  //   onListingSelection: PropTypes.func,
  //   deleteSingleRoute: PropTypes.func,
  // };

  listingClick = (e) => {
    e.stopPropagation();
    const { route, onListingSelection } = this.props;
    onListingSelection(route.id);
  }

  // deleteDevice = (e) => {
  //   e.preventDefault();
  //   const { deleteSingleRoute, route } = this.props;
  //   console.log(deleteSingleRoute);
  //   console.log(route);
  //   deleteSingleRoute(route.id);
  // }

  deleteSingleRoute = (e) => {
    e.preventDefault();
    const { route } = this.props;
    routesRequest.deleteRoutes(route.id)
      .then(() => {
        this.getLocationRoutes();
      })
      .catch(err => console.error('error with delete single', err));
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
          <button className="btn btn-outline-lightl m-5 px-5" onClick={this.deleteSingleRoute}>
            <i className="fas fa-trash-alt"></i>
          </button>
        </div>
        <div className="d-flex" role="alert">
          <button className="btn btn-outline-lightl m-5 px-5" id={route.id} onClick={this.deleteDevice}>
            SET
          </button>
        </div>
      </li>
    );
  }
}

export default RouteItem;
