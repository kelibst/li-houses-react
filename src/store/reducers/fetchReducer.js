const initialState = {
  loading: true,
  houses: [],
  house: [],
};
const fetchReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'FETCH_HOUSES':
      console.log(action)
      return {
        ...state,
        houses: action.payload,
      };
    case 'FETCH_HOUSE':
      return {
        ...state,
        house: action.payload,
      };
    default:
      return state;
  }
};

export default fetchReducer;
