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

export {
    fetchUserFavs,
    createUser,
    fetchUser,
    logCurrentUserOut,
    authUser,
}