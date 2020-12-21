const initialState = {
  message: '',
  type: '',
};
const successReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'SUCC_MSG':

      return {
        ...state,
        message: action.payload,
        type: action.payload.type,
      };
    default:
      return state;
  }
};

export default successReducer;
