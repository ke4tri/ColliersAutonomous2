import React from 'react';
import firebase from 'firebase/app';
import 'firebase/auth';
import {
  BrowserRouter, Route, Redirect, Switch,
} from 'react-router-dom';

import MyNavbar from '../components/MyNavbar/MyNavbar';
import Auth from '../components/pages/Auth/Auth';
import Devices from '../components/pages/Devices/Devices';
import Launch from '../components/pages/Launch/Launch';
import Locations from '../components/pages/Locations/Locations';
// import RoutePath from '../components/pages/RoutePath/RoutePath';
import RouteAdd from '../components/pages/RouteAdd/RouteAdd';
import LocationDetails from '../components/pages/LocationDetails/LocationDetails';
import RouteEditPath from '../components/pages/RouteEditPath/RouteEditPath';
import About from '../components/pages/About/About';
import connection from '../helpers/data/connection';
import authRequests from '../helpers/data/authRequest';
import './App.scss';
// import deviceRequest from '../helpers/data/deviceRequest';


const PublicRoute = ({ component: Component, authed, ...rest }) => {
  const routeChecker = props => (authed === false
    ? (<Component {...props} />)
    : (<Redirect to={{ pathname: '/devices', state: { from: props.location } }} />));
  return <Route {...rest} render={props => routeChecker(props)} />;
};

const PrivateRoute = ({ component: Component, authed, ...rest }) => {
  const routeChecker = props => (authed === true
    ? (<Component {...props} />)
    : (<Redirect to={{ pathname: '/auth', state: { from: props.location } }} />));
  return <Route {...rest} render={props => routeChecker(props)} />;
};


class App extends React.Component {
  state = {
    authed: false,
    pendingUser: true,
  }

  componentDidMount() {
    connection();
    this.removeListener = firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        this.setState({
          authed: true,
          pendingUser: false,
        });
      } else {
        this.setState({
          authed: false,
          pendingUser: false,
        });
      }
    });
  }

  componentWillMount() {
  }

  componentWillUnmount() {
    this.removeListener();
  }

  render() {
    const { authed, pendingUser } = this.state;
    const logoutClickEvent = () => {
      authRequests.logoutUser();
      authRequests.getCurrentUid();
      this.setState({ authed: false });
    };

    if (pendingUser) {
      return null;
    }
    return (
      <div className="App">
      <BrowserRouter>
          <React.Fragment>
            <MyNavbar isAuthed={authed} logoutClickEvent={logoutClickEvent} />
            <div className='container'>
            <div className='row'>
                <Switch>
                  <PublicRoute path='/auth' component={Auth} authed={this.state.authed} />
                  {/* <PublicRoute path='/' exact component={Auth} authed={this.state.authed} /> */}
                  <PrivateRoute path='/' exact component={Devices} authed={this.state.authed} />
                  <PrivateRoute path='/devices' component={Devices} authed={this.state.authed} />
                  <PrivateRoute path='/locations/:locationId/route/:routeId/edit'component={RouteEditPath} authed={this.state.authed} />
                  <PrivateRoute path='/locations/:locationId/route/add' component={RouteAdd} authed={this.state.authed} />
                  <PrivateRoute path='/locations/:locationId' component={LocationDetails} authed={this.state.authed} />
                  <PrivateRoute path='/locations' component={Locations} authed={this.state.authed} />
                  <PrivateRoute path='/launch' component={Launch} authed={this.state.authed} />
                  <PublicRoute path='/about' exact component={About} authed={this.state.authed} />
                  <PrivateRoute path='/about2' exact component={About} authed={this.state.authed} />
                </Switch>
              </div>
            </div>
          </React.Fragment>
        </BrowserRouter>
      </div>
    );
  }
}

export default App;
