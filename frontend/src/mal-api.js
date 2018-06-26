import axios from 'axios';

const isProd = false;
let baseAddress = '';

if (isProd) {
  baseAddress = 'http://172.104.162.144/api/';
} else {
  baseAddress = 'http://127.0.0.1/api/';
}

export function get_user_ratings(username) {
  return new Promise((resolve, reject) => {
    axios.get(baseAddress + 'user-ratings/' + username)
    .then(function (response) {
      resolve(response.data);
    })
    .catch(function (error) {
      reject(error);
    });
  });
}

export function get_anime_genre_data() {
  return new Promise((resolve, reject) => {
    axios.get(baseAddress + 'genre-data')
    .then(function (response) {
      resolve(response.data);
    })
    .catch(function (error) {
      reject(error);
    });
  });
}
