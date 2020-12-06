/* eslint-disable eqeqeq */
/* eslint-disable camelcase */
/* eslint-disable no-console */
import Axios from 'axios';

const unLoad = states => dispatch => {
  dispatch({
    type: 'CLEAR_STATE',
    payload: states,
  });
};
const fetchHouses = () => dispatch => {
  const url = 'https://lihouses-api.herokuapp.com/api/v1/houses.json';
  Axios.get(url)
    .then(res => dispatch({
      type: 'FETCH_HOUSES',
      payload: res.data,
    }))
    .catch(err => dispatch({
      type: 'CREATE_ERROR',
      payload: err,
    }));
};

const authUser = data => dispatch => {
  const url = 'https://lihouses-api.herokuapp.com/api/v1/auth/signin.json';
  const userData = {
    auth: data,
  };

  Axios.post(url, userData)
    .then(res => dispatch({
      type: 'AUTH_USER',
      payload: res.data,
      username: userData.auth.username,
    }))
    .catch(err => dispatch({
      type: 'CREATE_ERROR',
      payload: err,
    }));
};

const createUser = data => dispatch => {
  const url = 'https://lihouses-api.herokuapp.com/api/v1/create/signup.json';
  const userData = {
    user: data,
  };
  Axios.post(url, userData)
    .then(res => dispatch({
      type: 'CREATE_USER',
      payload: res.data,
    }))
    .catch(err => dispatch({
      type: 'CREATE_ERROR',
      payload: err,
    }));
};

const fetchHouse = id => dispatch => {
  const token = localStorage.getItem('jwt');
  const authAxios = Axios.create({
    baseURL: 'https://lihouses-api.herokuapp.com',
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  authAxios
    .get(`/api/v1/houses/${id}.json`)
    .then(res => dispatch({
      type: 'FETCH_HOUSE',
      payload: res.data,
    }))
    .catch(err => dispatch({
      type: 'CREATE_ERROR',
      payload: err,
    }));
};

const dropHouse = id => dispatch => {
  const token = localStorage.getItem('jwt');
  const authAxios = Axios.create({
    baseURL: 'https://lihouses-api.herokuapp.com',
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  authAxios
    .delete(`/api/v1/houses/${id}.json`)
    .then(res => dispatch({
      type: 'DROP_HOUSE',
      payload: res.data,
    }))
    .catch(err => dispatch({
      type: 'CREATE_ERROR',
      payload: err,
    }));
};

const createHouse = data => dispatch => {
  const token = localStorage.getItem('jwt');
  const authAxios = Axios.create({
    baseURL: 'https://lihouses-api.herokuapp.com',
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  const hseData = {
    house: data,
  };
  authAxios
    .post('/api/v1/houses.json', hseData)
    .then(res => dispatch({
      type: 'FETCH_HOUSE',
      payload: res.data,
    }))
    .catch(err => dispatch({
      type: 'CREATE_ERROR',
      payload: err,
    }));
};

const updateHouse = (data, id) => dispatch => {
  const token = localStorage.getItem('jwt');
  const authAxios = Axios.create({
    baseURL: 'https://lihouses-api.herokuapp.com',
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  const hseData = {
    house: data,
  };

  authAxios
    .patch(`/api/v1/houses/${id}.json`, hseData)
    .then(res => dispatch({
      type: 'UPDATE_HOUSE',
      payload: res.data,
    }))
    .catch(err => dispatch({
      type: 'CREATE_ERROR',
      payload: err,
    }));
};

const fetchUser = username => dispatch => {
  const token = localStorage.getItem('jwt');
  const userAxios = Axios.create({
    baseURL: 'https://lihouses-api.herokuapp.com',
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  userAxios
    .get(`/api/v1/dashboard/${username}.json`)
    .then(res => dispatch({
      type: 'FETCH_USER',
      payload: res.data,
    }))
    .catch(err => dispatch({
      type: 'CREATE_ERROR',
      payload: err,
    }));
};

const logCurrentUserOut = () => dispatch => {
  dispatch({
    type: 'LOG_OUT',
    payload: 'logout',
  });
};

const addToFav = data => dispatch => {
  const token = localStorage.getItem('jwt');
  const authAxios = Axios.create({
    baseURL: 'https://lihouses-api.herokuapp.com',
    headers: {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json',
    },
  });
  const hseData = {
    favorite: data,
  };

  authAxios
    .post('/api/v1/favorites.json', hseData)
    .then(res => console.log(res))
    .catch(err => dispatch({
      type: 'CREATE_ERROR',
      payload: err,
    }));
};

const removeFromFav = (house_id, favs) => dispatch => {
  const fav = favs.filter(favv => favv.house_id == house_id.toString());

  const token = localStorage.getItem('jwt');
  const authAxios = Axios.create({
    baseURL: 'https://lihouses-api.herokuapp.com',
    headers: {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json',
    },
  });
  const { id } = fav[0];
  authAxios
    .delete(`/api/v1/favorites/${id}.json`)
    .then(res => dispatch({
      type: 'UPDATE_FAV',
      payload: res,
    }))
    .catch(err => dispatch({
      type: 'CREATE_ERROR',
      payload: err,
    }));
};

const uploadImage = image => dispatch => {
  const token = localStorage.getItem('jwt');
  const userAxios = Axios.create({
    baseURL: 'https://lihouses-api.herokuapp.com',
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  userAxios
    .post('/api/v1/image_uploaders.json', image)
    .then(res => dispatch({
      type: 'ADD_IMAGE',
      payload: res.data,
    }))
    .catch(err => dispatch({
      type: 'CREATE_ERROR',
      payload: err,
    }));
};

const clearImg = () => dispatch => {
  dispatch({
    type: 'CLEAR_IMG',
  });
};

export {
  fetchHouses,
  authUser,
  fetchHouse,
  createUser,
  fetchUser,
  logCurrentUserOut,
  createHouse,
  dropHouse,
  updateHouse,
  addToFav,
  removeFromFav,
  unLoad,
  uploadImage,
  clearImg,
};
