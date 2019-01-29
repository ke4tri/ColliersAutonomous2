import axios from 'axios';
import apiKeys from '../apiKeys';

const firebaseUrl = apiKeys.firebaseConfig.databaseURL;

const getLocations = uid => new Promise((resolve, reject) => {
  axios.get(`${firebaseUrl}/locations.json?orderBy="uid"&equalTo="${uid}"`)
    .then((result) => {
      const locationsObject = result.data;
      const locationsArray = [];
      if (locationsObject != null) {
        Object.keys(locationsObject).forEach((locationsId) => {
          locationsObject[locationsId].id = locationsId;
          locationsArray.push(locationsObject[locationsId]);
        });
      }
      resolve(locationsArray);
    })
    .catch((error) => {
      reject(error);
    });
});

const deleteLocations = locationId => axios.delete(`${firebaseUrl}/locations/${locationId}.json`);

const postRequest = location => axios.post(`${firebaseUrl}/locations.json`, location);

const getSingleLocation = locationId => axios.get(`${firebaseUrl}/locations/${locationId}.json`);

const putRequest = (locationId, location) => axios.put(`${firebaseUrl}/locations/${locationId}.json`, location);

const updateLocation = (locationId, location) => axios.put(`${firebaseUrl}/locations/${locationId}.json`, location);


export default {
  getLocations,
  deleteLocations,
  postRequest,
  getSingleLocation,
  putRequest,
  updateLocation,
};
