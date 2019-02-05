import React from 'react';
import routesRequest from '../../../helpers/data/routesRequest';
import authRequests from '../../../helpers/data/authRequest';
import userRequest from '../../../helpers/data/userRequest';
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

  changeView = () => {
    this.prop.changeView();
  };

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

  userRouteId = (e) => {
    e.preventDefault();
    const routeId = e.target.id;
    const newUid = authRequests.getCurrentUid();
    userRequest.patchRequestRoute(newUid, routeId);
    this.props.changeView();
  };

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
          <button className="btn btn-outline-lightl px-2" onClick={this.deleteSingleRoute}>
            <i className="fas fa-trash-alt"></i>
          </button>
        </div>
        <div className="d-flex" role="alert">
          <button className="btn btn-outline-lightl px-2" id={route.id} onClick={this.userRouteId}>
            SET
          </button>
        </div>
      </li>
    );
  }
}

export default RouteItem;
