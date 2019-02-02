import React from 'react';
import PropTypes from 'prop-types';
import routesRequest from '../../../helpers/data/routesRequest';
import './RouteEditPath.scss';

const defaultRoute = {
  uid: '',
  flightName: '',
  latLong: '',
  orientation: '',
  cmd: '',
  locationId: '',
};

class RouteEditPath extends React.Component {
  state = {
    newRoute: defaultRoute,
    currentCommand: [],
    isEditing: false,
    editId: '-1',
  };

  static propTypes = {
    device: PropTypes.string,
  };

  // routesRequest.updateRoute(editId, newRoute)
  // .then(() => {
  //   this.setState({ isEditing: false, editId: '-1' });
  //   // this.getSomeData();
  // })
  // .catch(err => console.error('error with devices post', err));

  // passEventToEdit = routeId => this.setState({ isEditing: true, editId: routeId });

  // editDevice() {
  //   const path = this.props.match.params.routeId;
  //   console.log(path);
  //   this.setState({ isEditing: true, editId: path });
  // }

  componentDidMount() {
    // this.editDevice();
    const editId = this.props.match.params.routeId;
    console.log(editId);
    this.setState({ isEditing: true, editId });
    // const { editId } = this.state;
    routesRequest.getSingleRoute(editId)
      .then((route) => {
        console.log(route.data);
        // const locationId = this.props.match.params.id;
        // const newRoute = {
        //   uid: route.data.uid,
        //   name: route.data.flightName,
        //   faaSerial: route.data.faaSerial,
        //   manufacture: route.data.manufacture,
        //   type: route.data.type,
        //   locationId: route.data.locationId,
        // };
        this.setState({ newRoute: route.data });
      })
      .catch(err => console.error('error with getSingleEvent', err));
  }

  // componentDidUpda() {
  //   // const { editId } = this.state;
  //   // routesRequest.getSingleRoute(editId)
  //   //   .then((route) => {
  //   //     console.log(route);
  //   //     // const locationId = this.props.match.params.id;
  //   //     const newRoute = {
  //   //       uid: route.data.uid,
  //   //       name: route.data.flightName,
  //   //       faaSerial: route.data.faaSerial,
  //   //       manufacture: route.data.manufacture,
  //   //       type: route.data.type,
  //   //       locationId: route.data.locationId,
  //   //     };
  //   //     this.setState({ newRoute });
  //   //   })
  //   //   .catch(err => console.error('error with getSingleEvent', err));
  // }


  render() {
    const { newRoute, currentCommand } = this.state;
    return (
      <div className="everythingIn mx-auto">
        <div className='Home mx-auto'>
        <h2>Edit Route</h2>
          <form onClick={this.cmdChange}>
          <div className="wrapButton">
            <div className="btn-group d-flex justify-content-center">
              <button type="button" className="taco btn btn-outline-light m-2 p-3" value="takeoff">TAKE OFF</button>
              <button type="button" className="taco btn btn-outline-light m-2 p-3" value="up20">UP</button>
              <button type="button" className="taco btn btn-outline-light m-2 p-3" value="land">LAND</button>
            </div>
            <div className="btn-group d-flex justify-content-center">
              <button type="button" className="btn btn-outline-light m-2 p-3" value="90cw">90CW</button>
              <button type="button" className="btn btn-outline-light m-2 p-3" value="photo">PHOTO</button>
              <button type="button" className="btn btn-outline-light m-2 p-3" value="90ccw">90CCW</button>
            </div>
            <div className="btn-group d-flex justify-content-center">
              <button type="button" className="taco2 btn btn-outline-light m-2 p-3" value="forward20">FORWARD</button>
              <button type="button" className="taco2 btn btn-outline-light m-2 p-3" value="down20">DOWN</button>
              <button type="button" className="taco2 btn btn-outline-light m-2 p-3" value="back20">BACK</button>
            </div>
          </div>
          </form>
      </div>
      <div className="event-form col">
      <form onSubmit={this.formSubmit}>
          <div className="input-group">
            <label htmlFor="event"></label>
            <input
              type="text"
              className="form-control"
              id="flightName"
              aria-describedby="eventHelp"
              placeholder="Route Name"
              value={newRoute.flightName}
              onChange={this.flightNameChange}
            />
          </div>
          {/* <div>{currentCommand.join(',')}</div> */}
          <div className="input-group m-1">
            <label htmlFor="event"></label>
            <input
              type="text"
              className="form-control"
              id="latLong"
              aria-describedby="eventHelp"
              placeholder="99.99.9999, -99.999999"
              value={newRoute.cmd}
              onChange={this.cmd}
            />
          </div>
          <div className="input-group m-1">
            <label htmlFor="event"></label>
            <input
              type="text"
              className="form-control"
              id="latLong"
              aria-describedby="eventHelp"
              placeholder="99.99.9999, -99.999999"
              value={newRoute.latLong}
              onChange={this.latLongChange}
            />
          </div>
          <div className="input-group m-1">
            <label htmlFor="event"></label>
            <input
              type="text"
              className="form-control"
              id="orientation"
              aria-describedby="eventHelp"
              placeholder="Orientation 0-259"
              value={newRoute.orientation}
              onChange={this.orientationChange}
            />
          </div>
          <button className="btn btn-danger">Save</button>
        </form>
      </div>
     </div>
    );
  }
}

export default RouteEditPath;
