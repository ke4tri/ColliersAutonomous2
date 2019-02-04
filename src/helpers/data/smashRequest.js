import axios from 'axios';
import apiKeys from '../apiKeys';

const firebaseUrl = apiKeys.firebaseConfig.databaseURL;

// one function that look in the users ddata and if == currentdevice then call the se
// second function in line that makes the call to find that device name

const getUid = uid => new Promise((resolve, reject) => {
  axios.get(`${firebaseUrl}/users.json?orderBy="uid"&equalTo="${uid}"`)
    .then((result) => {
      const usersObject = result.data[uid];
      const usersArray = [];
      if (usersObject != null) {
        Object.values(usersObject).forEach((itemId) => {
          usersObject[itemId] = itemId;
          usersArray.push(usersObject[itemId]);
          console.log(itemId);
        });
      }
      resolve(usersArray);
    })
    .catch((error) => {
      reject(error);
    });
});

const getCurrentDevice = uid => new Promise((resolve, reject) => {
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

const getDevicesById =uid => new Promise((resolve, reject) => {
  axios.get(`${firebaseUrl}/devices.json?orderBy="uid"&equalTo="${uid}"`)
    .then((result) => {
      const currentDeviceObject = result.data;
      // const devicesArray = [];
      // if (devicesObject != null) {
      //   Object.keys(devicesObject).forEach((devicesId) => {
      //     devicesObject[devicesId].id = devicesId;
      //     devicesArray.push(devicesObject[devicesId]);
      //   });
      // }
      resolve(currentDeviceObject);
    })
    .catch((error) => {
      reject(error);
    });
});

const getSingleDevice = deviceId => axios.get(`${firebaseUrl}/devices/${deviceId}.json`);


export default {
  getUid,
  getCurrentDevice,
  getDevicesById,
  getSingleDevice,
};

// export default { getUid };
