import axios from 'axios';

const baseAddress = 'http://127.0.0.1:8000/api/user-ratings/';

export function get_user_ratings(username) {
  return new Promise((resolve, reject) => {
    axios.get(baseAddress + username)
    .then(function (response) {
      resolve(response.data);
    })
    .catch(function (error) {
      reject(error);
    });
  });
}