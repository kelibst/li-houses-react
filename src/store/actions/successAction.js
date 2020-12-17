const successWithMessage = (message, type="default") => dispatch => {
  const payload = {
    message: message,
    type: type
  }
  
    dispatch({
      type: 'SUCC_MSG',
      payload: payload,
    });
  };
  export default successWithMessage