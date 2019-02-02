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
      resolve(usersArray);
    })
    .catch((error) => {
      reject(error);
    });
});

const deleteUsersItemId = usersId => axios.delete(`${firebaseUrl}/users/${usersId}.json`);

const postRequest = user => axios.post(`${firebaseUrl}/users.json`, user);

const getSingleUsersItemId = userId => axios.get(`${firebaseUrl}/user/${userId}.json`);

const putRequest = (usersId, user) => axios.put(`${firebaseUrl}/users/${usersId}.json`, user);

const updateUsersItem = (usersId, user) => axios.put(`${firebaseUrl}/users/${usersId}.json`, user);


export default {
  getUser,
  deleteUsersItemId,
  postRequest,
  getSingleUsersItemId,
  putRequest,
  updateUsersItem,
};