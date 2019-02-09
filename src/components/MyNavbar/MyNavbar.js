import React from 'react';
import PropTypes from 'prop-types';
import { NavLink as RRNavLink } from 'react-router-dom';
import {
  Collapse,
  Navbar,
  NavbarToggler,
  NavbarBrand,
  Nav,
  NavItem,
  NavLink,
} from 'reactstrap';
import authRequests from '../../helpers/data/authRequest';

import './MyNavbar.scss';
import userRequest from '../../helpers/data/userRequest';

class MyNavbar extends React.Component {
  static propTypes = {
    isAuthed: PropTypes.bool,
    logoutClickEvent: PropTypes.func,
  }

  state = {
    isOpen: false,
  };

  authenticateUser = (e) => {
    e.preventDefault();
    authRequests.authenticate().then((res) => {
      const { uid } = res.user;
      userRequest.getUser(uid).then((userRes) => {
        if (!userRes) {
          const newUser = {
            uid,
            currentDeviceId: '',
            currentLocationId: '',
            currentRouteId: '',
          };
          userRequest.postRequest(newUser);
        }
      });
    }).catch(err => console.error('error in auth', err));
  }


  toggle() {
    this.setState({
      isOpen: !this.state.isOpen,
    });
  }

  render() {
    const { isAuthed, logoutClickEvent } = this.props;
    const buildNavbar = () => {
      if (isAuthed) {
        return (
          <Nav className='ml-auto' navbar>
          <NavItem>
            <NavLink tag={RRNavLink} to='/locations'><i className="fas fa-map-marked fa-2x"></i></NavLink>
          </NavItem>
          <NavItem>
            <NavLink tag={RRNavLink} to='/devices'><i className="fas fa-plane fa-2x"></i></NavLink>
          </NavItem>
          <NavItem>
            <NavLink tag={RRNavLink} to='/launch'><i className="fas fa-plane-departure fa-2x"></i></NavLink>
          </NavItem>
          <NavItem>
            <NavLink tag={RRNavLink} to='/about2'><i className="fas fa-question fa-2x"></i></NavLink>
          </NavItem>
          <NavItem>
            <NavLink tag={RRNavLink} to='/:id'></NavLink>
          </NavItem>
          <NavItem>
            <NavLink onClick={logoutClickEvent}>Logout</NavLink>
          </NavItem>
        </Nav>
        );
      }
      return <Nav className='ml-auto' navbar >
      <NavItem>
        <NavLink onClick={this.authenticateUser}><i className="fas fa-sign-in-alt fa-3x"></i></NavLink>
      </NavItem>
      <NavItem>
          <NavLink tag={RRNavLink} to='/about'><i className="fas fa-question fa-3x"></i></NavLink>
      </NavItem>
      </Nav>;
    };

    return (
      <div className="myNavbar">
      <Navbar color="dark" dark expand="md">
          <NavbarBrand href="/"><img src="https://github.com/ke4tri/personal-bi-site2/blob/master/src/img/logo2.png?raw=true" width={600} height={50} alt="propellers"></img></NavbarBrand>
          <NavbarToggler onClick={e => this.toggle(e)} />
          <Collapse isOpen={this.state.isOpen} navbar>
            {buildNavbar()}
          </Collapse>
        </Navbar>
      </div>
    );
  }
}

export default MyNavbar;
