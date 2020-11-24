const initialState = {
  loading: true,
  houses: [],
  house: [],
};
const fetchReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'FETCH_HOUSES':
      return {
        ...state,
        loading: false,
        houses: action.payload,
      };
    case 'FETCH_HOUSE':
      return {
        ...state,
        loading: false,
        house: action.payload,
      };
    default:
      return state;
  }
};

export default fetchReducer;
