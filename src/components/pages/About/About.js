import React from 'react';
import './About.scss';

class About extends React.Component {
  render() {
    return (
      <div className="mx-auto">
      <div className='Home'>
        <h2>Colliers Autonomous</h2>
        <div className="djiImage mt-3">
        <img src={"https://developer.ibm.com/site-content/uploads/2018/11/contest_drone.png"} width="200px" height="auto"></img>
        </div>
        <div className="telloLine mb-5 mt-1">
        <h4>IBM TELLO DJI</h4>
        </div>
        <div className="mx-auto">
        <p>
          Colliers Autonomous is an on going effort to bride the gap between the power of IOT (Internet Of Things) to
          an easy to use platform. Currently we are exclusivly working with the IBM Tello Drone platform.
        </p>
        <p>
          The Tello was introduced in late 2018 when IBM gave these drones away to top developers in there fields, to
          challenge them to just see what they could do with them in their own way.
        </p>
        </div>
      </div>
      </div>
    );
  }
}

export default About;
