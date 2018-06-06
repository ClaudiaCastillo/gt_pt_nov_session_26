import axios from 'axios';

export function getUserFavorites() {
  return axios.get(`/api/favorites?email=${localStorage.getItem('user_email')}`);
}

export function deleteFavorite(gif_id) {
  return axios.delete(`/api/gif/?gif_id=${gif_id}&email=${localStorage.getItem('user_email')}`);
}