import Axios from 'axios';

const fetchHouses = () => dispatch => {
  const url = 'https://lihouses-api.herokuapp.com/api/v1/houses.json';
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
  const url = 'https://lihouses-api.herokuapp.com/api/v1/signin.json';
  const userData = {
    auth: data
  }
  Axios.post(url, userData)
  .then(res => dispatch({
    type: 'AUTH_USER',
    payload: res.data
  })).catch(err => dispatch({
    type: 'CREATE_ERROR',
    payload: err,
  }))
}

export {
  fetchHouses, authUser
};
