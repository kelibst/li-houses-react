const successWithMessage = (message, type = 'default') => dispatch => {
  const payload = {
    message,
    type,
  };

  dispatch({
    type: 'SUCC_MSG',
    payload,
  });
};
export default successWithMessage;
