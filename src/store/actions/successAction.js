const successWithMessage = (message) => dispatch => {
    dispatch({
      type: 'SUCC_MSG',
      payload: message,
    });
  };
  export default successWithMessage