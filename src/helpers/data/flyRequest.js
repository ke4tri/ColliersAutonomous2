import axios from 'axios';

const launch = launchCmd => new Promise((resolve, reject) => {
  const flyCommand = { command: launchCmd };
  axios.post('http://localhost:5000/launch', flyCommand)
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
