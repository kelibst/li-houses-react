const errorReducer = (state = { err: '' }, action) => {
  switch (action.type) {
    case 'CREATE_ERROR':
      return {
        ...state,
        err: action.payload,
      };
    case 'UNLOAD_ERROR':
      return {
        ...state,
        err: action.payload,
      };
    default:
      return state;
  }
};

export default errorReducer;
