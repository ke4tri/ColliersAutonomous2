/* eslint-disable max-len */
import React from 'react';
import authRequests from '../../../helpers/data/authRequest';
import './Auth.scss';


class Auth extends React.Component {
  authenticateUser = (e) => {
    e.preventDefault();
    authRequests.authenticate().then(() => {
      // this is going to need to change to page with button to take to launch
      this.props.history.push('/devices');
    }).catch(err => console.error('error in auth', err));
  }

  render() {
    return (
      <div className='Auth mx-auto styleDiv'>
       <div className="hero-logo-cicles">
            <img className="hero-logo-circle" src="https://github-atom-io-herokuapp-com.freetls.fastly.net/assets/index-portal-red-semi-da1f1ae5bee20b0d72fd8852c2de4dad.svg" alt="Index portal red semi" />
            <img className="hero-logo-circle" src="https://github-atom-io-herokuapp-com.freetls.fastly.net/assets/index-portal-green-dc0a6ac12f7199644119b28708bd3730.svg" alt="Index portal green"/>
            <img className="hero-logo-circle" src="https://github-atom-io-herokuapp-com.freetls.fastly.net/assets/index-portal-orange-c0d3d6641b744a92b63f2ba243f0e470.svg" alt="Index portal blue"/>
            <img className="hero-logo-circle" src="https://github-atom-io-herokuapp-com.freetls.fastly.net/assets/index-portal-yellow-semi-0f75649305b8323148a06cdc4edc7f76.svg" alt="Index portal yellow semi"/>
            <img className="hero-logo-circle" src="https://github-atom-io-herokuapp-com.freetls.fastly.net/assets/index-portal-blue-7ae3dab5c6f591256b6351f85f5d867c.svg" alt="Index portal blue"/>
        </div>
      </div>
    );
  }
}

export default Auth;
