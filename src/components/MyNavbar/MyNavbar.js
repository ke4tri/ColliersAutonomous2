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
import './MyNavbar.scss';

class MyNavbar extends React.Component {
  static propTypes = {
    isAuthed: PropTypes.bool,
    logoutClickEvent: PropTypes.func,
  }

  state = {
    isOpen: false,
  };

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
            <NavLink onClick={logoutClickEvent}>Logout</NavLink>
          </NavItem>
        </Nav>
        );
      }
      return <Nav className='ml-auto' navbar />;
    };

    return (
      <div className="myNavbar">
      <Navbar color="dark" dark expand="md">
          <NavbarBrand href="/">Colliers Autonomous</NavbarBrand>
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
