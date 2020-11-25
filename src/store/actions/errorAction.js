const searchError = message => dispatch => {
  dispatch({
    type: 'SEARCH_ERR',
    payload: message,
  });
};

export default searchError;
