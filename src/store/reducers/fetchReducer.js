const initialState = {
  loading: true,
  houses: [],
  jwt: '',
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
      case 'AUTH_USER':
        const { jwt } =  action.payload
        localStorage.setItem('jwt', jwt)
      return {
        ...state,
        loading: false,
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
