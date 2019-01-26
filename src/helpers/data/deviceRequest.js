import axios from 'axios';
import apiKeys from '../apiKeys';

const firebaseUrl = apiKeys.firebaseConfig.databaseURL;

const getDevices = () => new Promise((resolve, reject) => {
  axios
    .get(`${firebaseUrl}/devices.json`)
    .then((res) => {
      const devices = [];
      if (res.data !== null) {
        Object.keys(res.data).forEach((key) => {
          res.data[key].id = key;
          devices.push(res.data[key]);
        });
      }
      resolve(devices);
    })
    .catch(err => reject(err));
});

const deleteDevice = deviceId => axios.delete(`${firebaseUrl}/listings/${deviceId}.json`);

const postRequest = device => axios.post(`${firebaseUrl}/listings.json`, device);

const getSingleDevice = deviceId => axios.get(`${firebaseUrl}/listings/${deviceId}.json`);

const putRequest = (deviceId, device) => axios.put(`${firebaseUrl}/listings/${deviceId}.json`, device);

export default {
  getDevices,
  deleteDevice,
  postRequest,
  getSingleDevice,
  putRequest,
};
