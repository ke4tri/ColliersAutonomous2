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
}

  static propTypes = {
    locationId: PropTypes.string,
  };

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

  componentWillMount() {
    this.getSomeData(this.props.match.params.id);
  }

  render() {
    const { locationRouteArray } = this.state;
    const locationRoutes = locationRouteArray.map(route => (
      <RouteItem
        route={route}
        key={route.id}
        locationId={this.props.match.params.id}
        getSomeData2={this.getSomeData}
        />
    ));

    return (
      <div className='Home mx-auto'>
        <h2>RouteEdit</h2>
        <ul>{ locationRoutes }</ul>
        {/* <RouteEditList
        locationId={this.props.match.params.id}
        getSomeData2={this.getSomeData}
        locationRoutesArray={this.props.locationRouteArray}
        /> */}
        <h2><RouteEditDisplay /></h2>
        <button className="btn btn-primary" onClick={this.changeView2}>Button</button>
      </div>
    );
  }
}

export default RouteEdit;
