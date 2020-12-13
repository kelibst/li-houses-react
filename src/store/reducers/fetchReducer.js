/* eslint-disable no-case-declarations */
const initialState = {
  loading: true,
  houses: [],
  loggedIn: false,
  currentUser: {},
  username: '',
  fav: false,
  house: [],
  houseImgUrl: '',
};
const fetchReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'CLEAR_STATE':
      return {
        ...state,
        ...action.payload,
      };
    case 'FETCH_HOUSES':
      return {
        ...state,
        loading: false,
        houses: action.payload,
      };
    case 'AUTH_USER':
      const { jwt } = action.payload;
      localStorage.setItem('jwt', jwt);
      localStorage.setItem('username', action.username);
      return {
        ...state,
        loading: false,
        loggedIn: true,
        username: action.username,
      };

    case 'CREATE_USER':
      return {
        ...state,
        loading: false,
        currentUser: action.payload,
      };
    case 'FETCH_HOUSE':
      return {
        ...state,
        loading: false,
        house: action.payload,
      };

    case 'UPDATE_HOUSE':
      return {
        ...state,
        loading: false,
        house: action.payload,
      };

    case 'CREATE_HOUSE':
      return {
        ...state,
        loading: false,
        house: action.payload,
      };
    case 'DROP_HOUSE':
      return {
        ...state,
        loading: false,
      };

    case 'FETCH_USER':
      return {
        ...state,
        loading: false,
        currentUser: action.payload,
      };

    case 'CLEAR_IMG':
      return {
        ...state,
        houseImgUrl: {},
      };

    case 'LOG_OUT':
      return {
        ...state,
        currentUser: {},
        username: '',
      };
    case 'ADD_IMAGE':
      return {
        ...state,
        houseImgUrl: action.payload,
      };

    case 'UPDATE_FAV':
      return {
        ...state,
        fav: true,
      };

    case 'REMOVE_FAV':
    return {
      ...state,
      fav: true,
    };
    default:
      return state;
  }
};

export default fetchReducer;
