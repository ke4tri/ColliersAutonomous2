import axios from 'axios';
import apiKeys from '../apiKeys';

const firebaseUrl = apiKeys.firebaseConfig.databaseURL;

const getRoutes = locationId => new Promise((resolve, reject) => {
  axios.get(`${firebaseUrl}/routes.json?orderBy="locationId"&equalTo="${locationId}"`)
    .then((result) => {
      const routesObject = result.data;
      const routesArray = [];
      if (routesObject != null) {
        Object.keys(routesObject).forEach((routesId) => {
          routesObject[routesId].id = routesId;
          routesArray.push(routesObject[routesId]);
        });
      }
      resolve(routesArray);
    })
    .catch((error) => {
      reject(error);
    });
});

const getRoutesUid = uid => new Promise((resolve, reject) => {
  axios.get(`${firebaseUrl}/routes.json?orderBy="uid"&equalTo="${uid}"`)
    .then((result) => {
      const routesObject = result.data;
      const routesArray = [];
      if (routesObject != null) {
        Object.keys(routesObject).forEach((routesId) => {
          routesObject[routesId].id = routesId;
          routesArray.push(routesObject[routesId]);
        });
      }
      resolve(routesArray);
    })
    .catch((error) => {
      reject(error);
    });
});

const deleteRoutes = routeId => axios.delete(`${firebaseUrl}/routes/${routeId}.json`);

const postRequest = route => axios.post(`${firebaseUrl}/routes.json`, route);

const getSingleRoute = routeId => axios.get(`${firebaseUrl}/routes/${routeId}.json`);

const putRequest = (routeId, route) => axios.put(`${firebaseUrl}/routes/${routeId}.json`, route);

const updateRoute = (routeId, route) => axios.put(`${firebaseUrl}/routes/${routeId}.json`, route);


export default {
  getRoutes,
  getRoutesUid,
  deleteRoutes,
  postRequest,
  getSingleRoute,
  putRequest,
  updateRoute,
};