const initialState = {
  loading: true,
  houses: [],
  loggedIn: false,
  currentUser: {},
  username: '',
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
        loggedIn: true,
        username: action.username
      };

      case 'CREATE_USER':
        
      return {
        ...state,
        loading: false,
        currentUser: action.payload
      };
    case 'FETCH_HOUSE':
      return {
        ...state,
        loading: false,
        house: action.payload,
      };

      case 'FETCH_USER':
        
      return {
        ...state,
        loading: false,
        currentUser: action.payload,
      };
    default:
      return state;
  }
};

export default fetchReducer;
