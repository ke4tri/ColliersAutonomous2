import React from 'react';
import PropTypes from 'prop-types';
import authRequests from '../../../helpers/data/authRequest';
import routesRequest from '../../../helpers/data/routesRequest';
import RouteItem from '../RouteItem/RouteItem';
import RouteEditDisplay from '../RouteEditDisplay/RouteEditDisplay';
import './RouteEdit.scss';


class RouteEdit extends React.Component {
state = {
  newUid: '',
  locationRouteArray: [],
  selectedRouteId: -1,
  isEditing: false,
  editId: '-1',
}

  static propTypes = {
    locationId: PropTypes.string,
  };

  listingSelectRoute = (id) => {
    this.setState({
      selectedRouteId: id,
    });
  }

  changeView2 = () => {
    this.props.history.push('/route/:id/edit/');
    // this.setState({ selectedLocationId: locationId });
  }

  getSomeData = (location) => {
    const newUid = authRequests.getCurrentUid();
    this.setState({ newUid });
    routesRequest.getRoutes(location)
      .then((locationRouteArray) => {
        this.setState({ locationRouteArray });
      })
      .catch(err => console.error('error with getLocations', err));
  }

  // about resolves to the locationRouteArray and the below
  // resolveds to the same but should it?
  getSomeDataUid = () => {
    const newUid = authRequests.getCurrentUid();
    this.setState({ newUid });
    routesRequest.getRoutes()
      .then((locationRouteArray) => {
        this.setState({ locationRouteArray });
      })
      .catch(err => console.error('error with getLocations', err));
  }

  componentWillMount() {
    this.getSomeData(this.props.match.params.id);
  }

  deleteSingleRoute = (routeId) => {
    routesRequest.deleteRoutes(routeId)
      .then(() => {
        this.getSomeDataUid();
      })
      .catch(err => console.error('error with delete single', err));
  }

  render() {
    const {
      locationRouteArray,
      selectedRouteId,
      deleteSingleRoute,
    } = this.state;
    const selectedRoute = locationRouteArray.find(route => route.id === selectedRouteId) || { nope: 'nope' };
    const passRouteToEdit = routeId => this.setState({ isEditing: true, editId: routeId });
    const locationRoutes = locationRouteArray.map(route => (
      <RouteItem
        route={route}
        key={route.id}
        locationId={this.props.match.params.id}
        getSomeData2={this.getSomeData}
        deleteSingleDevice={deleteSingleRoute}
        onListingSelection={this.listingSelectRoute}
        />
    ));
    // const routeDetails = locationRouteArray.map(route => (
    //   <RouteEditDisplay
    //     route={route}
    //     key={route.id}
    //     locationId={this.props.match.params.id}
    //     getSomeData2={this.getSomeData}
    //     />
    // ));

    return (
      <div className='Home mx-auto'>
        <h2>RouteEdit</h2>
        <div className="row">
        <button className="btn btn-outline-light" onClick={this.changeView2}>Add Route</button>

        <div className="row mr-1">
          <ul>{ locationRoutes }</ul>
        </div>
        <div className="col mr-5">
          <h2>Route Details</h2>
          <ul>
            <RouteEditDisplay
              route={selectedRoute}
              passRouteToEdit={passRouteToEdit}
            />
          </ul>
          </div>
          <button className="btn btn-outline-light" onClick={this.changeView2}>Launch Console</button>
        </div>
      </div>
    );
  }
}

export default RouteEdit;
