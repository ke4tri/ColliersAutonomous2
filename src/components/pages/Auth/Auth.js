import React from 'react';
import authRequests from '../../../helpers/data/authRequest';

import googleButton from './Images/google_PNG19626.png';


class Auth extends React.Component {
  authenticateUser = (e) => {
    e.preventDefault();
    authRequests.authenticate().then(() => {
      this.props.history.push('/home');
    }).catch(err => console.error('error in auth', err));
  }

  render() {
    return (
      <div className='Auth mx-auto'>
      <span>LOGIN WITH</span>
        <button className='btn' onClick={this.authenticateUser}>
          <img src={googleButton} width="500" height="300" alt="google login button"/>
        </button>
      </div>
    );
  }
}

export default Auth;
