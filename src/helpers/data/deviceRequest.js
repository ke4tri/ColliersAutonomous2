import axios from 'axios';
import apiKeys from '../apiKeys';

const firebaseUrl = apiKeys.firebaseConfig.databaseURL;

const getDevices = uid => new Promise((resolve, reject) => {
  axios.get(`${firebaseUrl}/devices.json?orderBy="uid"&equalTo="${uid}"`)
    .then((result) => {
      const devicesObject = result.data;
      const devicesArray = [];
      if (devicesObject != null) {
        Object.keys(devicesObject).forEach((devicesId) => {
          devicesObject[devicesId].id = devicesId;
          devicesArray.push(devicesObject[devicesId]);
        });
      }
      resolve(devicesArray);
    })
    .catch((error) => {
      reject(error);
    });
});

const deleteDevice = deviceId => axios.delete(`${firebaseUrl}/devices/${deviceId}.json`);

const postRequest = device => axios.post(`${firebaseUrl}/devices.json`, device);

const getSingleDevice = deviceId => axios.get(`${firebaseUrl}/devices/${deviceId}.json`);

const putRequest = (deviceId, device) => axios.put(`${firebaseUrl}/devices/${deviceId}.json`, device);

const updateDevice = (deviceId, device) => axios.put(`${firebaseUrl}/devices/${deviceId}.json`, device);


export default {
  getDevices,
  deleteDevice,
  postRequest,
  getSingleDevice,
  putRequest,
  updateDevice,
};
