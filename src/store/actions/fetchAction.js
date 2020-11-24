import Axios from 'axios';


const fetchHouses = () => dispatch => {
  const url = '';
  Axios.get(url)
    .then(res => dispatch({
      type: 'FETCH_HOUSES',
      payload: res.data.results,
      act: res,
    })).catch(err => dispatch({
      type: 'CREATE_ERROR',
      payload: err,
    }));
};


export {
  fetchHouses
};
