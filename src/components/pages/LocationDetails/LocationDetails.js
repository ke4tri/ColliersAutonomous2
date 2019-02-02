import React from 'react';
import PropTypes from 'prop-types';
import routesRequest from '../../../helpers/data/routesRequest';
import RouteItem from '../RouteItem/RouteItem';
import RouteEditDisplay from '../RouteEditDisplay/RouteEditDisplay';
import './LocationDetails.scss';


class LocationDetails extends React.Component {
state = {
  locationRouteArray: [],
  locationId: '',
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
    const { locationId } = this.props.match.params;
    this.setState({
      locationId,
    });
    this.props.history.push(`/locations/${locationId}/routes/add`);
  }

  changeView1 = () => {
    const { locationId } = this.props.match.params;
    const { selectedRouteId } = this.state;
    this.props.history.push(`/locations/${locationId}/routes/${selectedRouteId}/edit`);
  }

  changeView3 = () => {
    // const { locationId } = this.props.match.params;
    // const { selectedRouteId } = this.state;
    this.props.history.push('/launch');
  }

  changeViewLaunch = () => {
    this.props.history.push('/launch');
  }

  getSomeData = () => {
    const { locationId } = this.props.match.params;
    routesRequest.getRoutes(locationId)
      .then((locationRouteArray) => {
        this.setState({ locationRouteArray });
      })
      .catch(err => console.error('error with getLocations', err));
  }

  getSomeDataUid = () => {
    routesRequest.getRoutes()
      .then((locationRouteArray) => {
        this.setState({ locationRouteArray });
      })
      .catch(err => console.error('error with getLocations', err));
  }

  componentWillMount() {
    this.getSomeData();
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
        deleteSingleRoute={deleteSingleRoute}
        onListingSelection={this.listingSelectRoute}
        changeView={this.changeView3}
        />
    ));

    return (
      <div className='LocationDetails mx-auto'>
        <h2>Location Details</h2>
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
              changeView={this.changeView1}
            />
          </ul>
          </div>
          <button className="btn btn-outline-light" onClick={this.changeViewLaunch}>Launch Console</button>
        </div>
      </div>
    );
  }
}

export default LocationDetails;
