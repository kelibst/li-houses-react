const searchError = message => dispatch => {
  dispatch({
    type: 'SEARCH_ERR',
    payload: message,
  });
};

const unloadError = () => dispatch => {
  dispatch({
    type: 'UNLOAD_ERROR',
    payload: '',
  });
};
export { searchError, unloadError };
