/* eslint-disable max-len */
import React from 'react';
import authRequests from '../../../helpers/data/authRequest';
import './Auth.scss';


class Auth extends React.Component {
  authenticateUser = (e) => {
    e.preventDefault();
    authRequests.authenticate().then(() => {
      this.props.history.push('/devices');
    }).catch(err => console.error('error in auth', err));
  }

  render() {
    return (
      <div className='Auth mx-auto styleDiv'>
       <div className="hero-logo-cicles">
            <img className="hero-logo-circle" src="https://github.com/ke4tri/personal-bi-site2/blob/master/src/img/5.png?raw=true" alt="Index portal red semi" />
            <img className="hero-logo-circle" src="https://github.com/ke4tri/personal-bi-site2/blob/master/src/img/colAuto2.png?raw=true" alt="Index portal green"/>
            <img className="hero-logo-circle" src="https://github.com/ke4tri/personal-bi-site2/blob/master/src/img/colAuto3.png?raw=true" alt="Index portal blue"/>
            <img className="hero-logo-circle" src="https://github.com/ke4tri/personal-bi-site2/blob/master/src/img/index-portal-green-semi-3b8dd40b983c2aa9e344f01f61114d87.png?raw=true" alt="Index portal yellow semi"/>
            <img className="hero-logo-circle" src="https://github.com/ke4tri/personal-bi-site2/blob/master/src/img/index-portal-orange-c0d3d6641b744a92b63f2ba243f0e470.png?raw=true" alt="Index portal blue"/>
            <img className="hero-logo-circle" src="https://github.com/ke4tri/personal-bi-site2/blob/master/src/img/prop1.png?raw=true" alt="Index portal blue"/>
            <img className="hero-logo-circle" src="https://github.com/ke4tri/personal-bi-site2/blob/master/src/img/prop2.png?raw=true" alt="Index portal blue"/>
            <img className="hero-logo-circle" src="https://github.com/ke4tri/personal-bi-site2/blob/master/src/img/slogon6.png?raw=true" alt="Index portal blue"/>
        </div>
      </div>
    );
  }
}

export default Auth;
