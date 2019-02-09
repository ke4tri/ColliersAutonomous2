import axios from 'axios';
import apiKeys from '../apiKeys';

const firebaseUrl = apiKeys.firebaseConfig.databaseURL;

const getUser = uid => new Promise((resolve, reject) => {
  axios.get(`${firebaseUrl}/users.json?orderBy="uid"&equalTo="${uid}"`)
    .then((result) => {
      const usersObject = result.data;
      const usersArray = [];
      if (usersObject != null) {
        Object.keys(usersObject).forEach((usersId) => {
          usersObject[usersId].id = usersId;
          usersArray.push(usersObject[usersId]);
        });
      }
      resolve(usersArray[0]);
    })
    .catch((error) => {
      reject(error);
    });
});

const deleteUsersItemId = usersId => axios.delete(`${firebaseUrl}/users/${usersId}.json`);

const postRequest = user => axios.post(`${firebaseUrl}/users.json`, user);

const getSingleUsersItemId = userId => axios.get(`${firebaseUrl}/user/${userId}.json`);

const patchRequest = (usersId, currentDeviceId) => axios.patch(`${firebaseUrl}/users/${usersId}.json`, { currentDeviceId });

const putRequest = (usersId, user) => axios.put(`${firebaseUrl}/users/${usersId}.json`, user);

const updateUsersItem = (usersId, user) => axios.put(`${firebaseUrl}/users/${usersId}.json`, user);

const patchRequestLoc = (usersId, currentLocationId) => axios.patch(`${firebaseUrl}/users/${usersId}.json`, { currentLocationId });

const patchRequestRoute = (usersId, currentRouteId) => axios.patch(`${firebaseUrl}/users/${usersId}.json`, { currentRouteId });

export default {
  getUser,
  deleteUsersItemId,
  postRequest,
  getSingleUsersItemId,
  putRequest,
  updateUsersItem,
  patchRequest,
  patchRequestLoc,
  patchRequestRoute,
};
