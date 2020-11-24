const errorReducer = (state = { err: '' }, action) => {
  switch (action.type) {
    case 'CREATE_ERROR':
      return {
        ...state,
        err: action.payload.message,
      };
    default:
      return state;
  }
};

export default errorReducer;
