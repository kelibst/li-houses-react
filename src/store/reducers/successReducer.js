const successReducer = (state = { message: '' }, action) => {
    switch (action.type) {
        case 'SUCC_MSG':
        return {
            ...state,
            message: action.payload,
        };
        default:
        return state;
    }
};
  
export default successReducer;