import axios from 'axios';

const isProd = false;
let baseAddress = '';

if (isProd) {
  baseAddress = 'http://172.104.162.144/api/user-ratings/';
} else {
  baseAddress = 'http://127.0.0.1/api/user-ratings/';
}

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