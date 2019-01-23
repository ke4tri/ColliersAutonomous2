import React, { Component } from 'react';
import firebase from 'firebase/app';
import {
  BrowserRouter, Route, Redirect, Switch,
} from 'react-router-dom';
import MyNavbar from '../components/MyNavbar/MyNavbar';
import Auth from '../components/pages/Auth/Auth';
import Devices from '../components/pages/Devices/Devices';
import Launch from '../components/pages/Launch/Launch';
import Locations from '../components/pages/Locations/Locations';
import RoutePath from '../components/pages/RoutePath/RoutePath';
import RouteAdd from '../components/pages/RouteAdd/RouteAdd';
import RouteEdit from '../components/pages/RouteEdit/RouteEdit';
import About from '../components/pages/About/About';
import connection from '../helpers/data/connection';
// import { Button } from 'reactstrap';
import './App.scss';
import authRequests from '../helpers/data/authRequest';

const PublicRoute = ({ component: Component, authed, ...rest }) => {
  const routeChecker = props => (authed === false
    ? (<Component {...props} />)
    : (<Redirect to={{ pathname: '/home', state: { from: props.location } }} />));
  return <Route {...rest} render={props => routeChecker(props)} />;
};

const PrivateRoute = ({ component: Component, authed, ...rest }) => {
  const routeChecker = props => (authed === true
    ? (<Component {...props} />)
    : (<Redirect to={{ pathname: '/auth', state: { from: props.location } }} />));
  return <Route {...rest} render={props => routeChecker(props)} />;
};

class App extends Component {
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

  componentWillUnmount() {
    this.removeListener();
  }

  render() {
    const { authed, pendingUser } = this.state;
    const logoutClickEvent = ()  => {
      authRequests.logoutUser();
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
                  <PrivateRoute path='/devices' exact component={Devices} authed={this.state.authed} />
                  <PrivateRoute path='/location' exact component={Locations} authed={this.state.authed} />
                  <PrivateRoute path='/location/:id' exact component={RoutePath} authed={this.state.authed} />
                  <PrivateRoute path='/route/add' exact component={RouteAdd} authed={this.state.authed} />
                  <PrivateRoute path='/route/:id/edit'exact component={RouteEdit} authed={this.state.authed} />
                  <PrivateRoute path='/launch' exact component={Launch} authed={this.state.authed} />
                  <PublicRoute path='/about' exact component={About} authed={this.state.authed} />
                  <PublicRoute path='/auth' exact component={Auth} authed={this.state.authed} />
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
