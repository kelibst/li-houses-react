import Axios from 'axios';

const fetchUserFavs = (id) => dispatch => {
    const token = localStorage.getItem('jwt');
    const favAxios = Axios.create({
    baseURL: 'https://lihouses-api.herokuapp.com',
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
    favAxios.get(`/api/v1/user/${id}/favorites.json`)
      .then(res => dispatch({
        type: 'USER_FAVS',
        payload: res.data,
      }))
      .catch(err => dispatch({
        type: 'CREATE_ERROR',
        payload: err,
      }));
};

export {
    fetchUserFavs,
}