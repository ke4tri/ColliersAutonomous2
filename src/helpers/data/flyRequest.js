import axios from 'axios';

const launch = launchCmd => new Promise((resolve, reject) => {
  axios.post('http://localhost:5000/launch', JSON.stringify({ command: launchCmd }))
    .then((result) => {
      resolve(result);
    })
    .catch((error) => {
      reject(error);
    });
});

export default {
  launch,
};
