/* eslint-disable no-case-declarations */
const initialState = {
  loading: true,
  houses: [],
  fav: false,
  house: [],
  houseImgUrl: "",
};
const fetchReducer = (state = initialState, action) => {
  switch (action.type) {
    case "CLEAR_STATE":
      return {
        ...state,
        ...action.payload,
      };
    case "FETCH_HOUSES":
      return {
        ...state,
        loading: false,
        houses: action.payload,
      };

    case "FETCH_HOUSE":
      return {
        ...state,
        loading: false,
        house: action.payload,
      };

    case "UPDATE_HOUSE":
      return {
        ...state,
        loading: false,
        house: action.payload,
      };

    case "CREATE_HOUSE":
      return {
        ...state,
        loading: false,
        house: action.payload,
      };
    case "DROP_HOUSE":
      return {
        ...state,
        loading: false,
      };

    case "CLEAR_IMG":
      return {
        ...state,
        houseImgUrl: {},
      };

    case "ADD_IMAGE":
      return {
        ...state,
        houseImgUrl: action.payload,
      };

    case "UPDATE_FAV":
      return {
        ...state,
        fav: true,
      };

    case "REMOVE_FAV":
      return {
        ...state,
        fav: false,
      };
    default:
      return state;
  }
};

export default fetchReducer;
