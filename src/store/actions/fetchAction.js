import Axios from 'axios';

const fetchHouses = () => dispatch => {
  const url = 'http://127.0.0.1:4000/api/v1/houses.json';
  Axios.get(url)
    .then(res => dispatch({
      type: 'FETCH_HOUSES',
      payload: res.data,
    })).catch(err => dispatch({
      type: 'CREATE_ERROR',
      payload: err,
    }));
};

const authUser = (data) => dispatch => {
  const url = 'http://127.0.0.1:4000/api/v1/auth/signin.json';
  const userData = {
    auth: data
  }
  
  Axios.post(url, userData)
  .then(res => dispatch({
    type: 'AUTH_USER',
    payload: res.data,
    username: userData.auth.username
  })).catch(err => dispatch({
    type: 'CREATE_ERROR',
    payload: err,
  }))
}

const createUser = (data) => dispatch => {
  const url = 'http://127.0.0.1:4000/api/v1/signup.json';
  const userData = {
    user: data
  }
  Axios.post(url, userData)
  .then(res => dispatch({
    type: 'CREATE_USER',
    payload: res.data
  })).catch(err => dispatch({
    type: 'CREATE_ERROR',
    payload: err,
  }))
}

const fetchHouse = (id) => dispatch => {
  let token = localStorage.getItem('jwt');
  const authAxios = Axios.create({
    baseURL: `http://127.0.0.1:4000`,
    header: {
      Authorization: `Bearer ${token}`
    },
  })
  authAxios.get(`/api/v1/houses/${id}.json`)
  .then(res => dispatch({
    type: 'FETCH_HOUSE',
    payload: res.data
  })).catch(err => dispatch({
    type: 'CREATE_ERROR',
    payload: err,
  }))
}

const fetchUser = username => dispatch => {
  let token = localStorage.getItem('jwt');
  console.log(token)
  const userAxios = Axios.create({
    baseURL: `http://127.0.0.1:4000`,
    headers: {
      Authorization: `Bearer ${token}`
    },
  })
  userAxios.get(`/api/v1/dashboard/${username}.json`)
  .then(res => dispatch({
    type: 'FETCH_USER',
    payload: res.data
  })).catch(err => dispatch({
    type: 'CREATE_ERROR',
    payload: err,
  }))
}
const logCurrentUserOut = () => dispatch => {
  dispatch({
    type: 'LOG_OUT',
    payload: 'logout'
  })
}

export {
  fetchHouses, authUser, fetchHouse, createUser, fetchUser, logCurrentUserOut
};
