/* eslint-disable eqeqeq*/
import Axios from "axios";

const fetchHouses = () => (dispatch) => {
  const url = "https://lihouses-api.herokuapp.com/api/v1/houses.json";
  Axios.get(url)
    .then((res) =>
      dispatch({
        type: "FETCH_HOUSES",
        payload: res.data,
      })
    )
    .catch((err) =>
      dispatch({
        type: "CREATE_ERROR",
        payload: err,
      })
    );
};

const authUser = (data) => (dispatch) => {
  const url = "https://lihouses-api.herokuapp.com/api/v1/auth/signin.json";
  const userData = {
    auth: data,
  };

  Axios.post(url, userData)
    .then((res) =>
      dispatch({
        type: "AUTH_USER",
        payload: res.data,
        username: userData.auth.username,
      })
    )
    .catch((err) =>
      dispatch({
        type: "CREATE_ERROR",
        payload: err,
      })
    );
};

const createUser = (data) => (dispatch) => {
  const url = "https://lihouses-api.herokuapp.com/api/v1/signup.json";
  const userData = {
    user: data,
  };
  Axios.post(url, userData)
    .then((res) =>
      dispatch({
        type: "CREATE_USER",
        payload: res.data,
      })
    )
    .catch((err) =>
      dispatch({
        type: "CREATE_ERROR",
        payload: err,
      })
    );
};

const fetchHouse = (id) => (dispatch) => {
  let token = localStorage.getItem("jwt");
  const authAxios = Axios.create({
    baseURL: `https://lihouses-api.herokuapp.com`,
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  authAxios
    .get(`/api/v1/houses/${id}.json`)
    .then((res) =>
      dispatch({
        type: "FETCH_HOUSE",
        payload: res.data,
      })
    )
    .catch((err) =>
      dispatch({
        type: "CREATE_ERROR",
        payload: err,
      })
    );
};

const dropHouse = (id) => (dispatch) => {
  let token = localStorage.getItem("jwt");
  const authAxios = Axios.create({
    baseURL: `https://lihouses-api.herokuapp.com`,
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  authAxios
    .delete(`/api/v1/houses/${id}.json`)
    .then((res) =>
      dispatch({
        type: "DROP_HOUSE",
        payload: res.data,
      })
    )
    .catch((err) =>
      dispatch({
        type: "CREATE_ERROR",
        payload: err,
      })
    );
};

const createHouse = (data) => (dispatch) => {
  let token = localStorage.getItem("jwt");
  const authAxios = Axios.create({
    baseURL: `https://lihouses-api.herokuapp.com`,
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  const hseData = {
    house: data,
  };
  authAxios
    .post(`/api/v1/houses.json`, hseData)
    .then((res) =>
      dispatch({
        type: "FETCH_HOUSE",
        payload: res.data,
      })
    )
    .catch((err) =>
      dispatch({
        type: "CREATE_ERROR",
        payload: err,
      })
    );
};

const updateHouse = (data, id) => (dispatch) => {
  let token = localStorage.getItem("jwt");
  const authAxios = Axios.create({
    baseURL: `https://lihouses-api.herokuapp.com`,
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  const hseData = {
    house: data,
  };
  authAxios
    .patch(`/api/v1/houses/${id}.json`, hseData)
    .then((res) =>
      dispatch({
        type: "UPDATE_HOUSE",
        payload: res.data,
      })
    )
    .catch((err) =>
      dispatch({
        type: "CREATE_ERROR",
        payload: err,
      })
    );
};

const fetchUser = (username) => (dispatch) => {
  let token = localStorage.getItem("jwt");
  const userAxios = Axios.create({
    baseURL: `https://lihouses-api.herokuapp.com`,
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  username = username.trim();
  userAxios
    .get(`/api/v1/dashboard/${username}.json`)
    .then((res) =>
      dispatch({
        type: "FETCH_USER",
        payload: res.data,
      })
    )
    .catch((err) =>
      dispatch({
        type: "CREATE_ERROR",
        payload: err,
      })
    );
};
const logCurrentUserOut = () => (dispatch) => {
  dispatch({
    type: "LOG_OUT",
    payload: "logout",
  });
};

const addToFav = (data) => (dispatch) => {
  let token = localStorage.getItem("jwt");
  const authAxios = Axios.create({
    baseURL: `https://lihouses-api.herokuapp.com`,
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
  });
  const hseData = {
    favorite: data,
  };

  authAxios
    .post(`/api/v1/favorites.json`, hseData)
    .then((res) => console.log(res))
    .catch((err) =>
      dispatch({
        type: "CREATE_ERROR",
        payload: err,
      })
    );
};

const removeFromFav = (house_id, favs) => (dispatch) => {
  const fav = favs.filter((favv) => favv.house_id == house_id.toString());

  let token = localStorage.getItem("jwt");
  const authAxios = Axios.create({
    baseURL: `https://lihouses-api.herokuapp.com`,
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
  });
  const { id } = fav[0];
  authAxios
    .delete(`/api/v1/favorites/${id}.json`)
    .then((res) =>
      dispatch({
        type: "UPDATE_FAV",
        payload: res,
      })
    )
    .catch((err) =>
      dispatch({
        type: "CREATE_ERROR",
        payload: err,
      })
    );
};

export {
  fetchHouses,
  authUser,
  fetchHouse,
  createUser,
  fetchUser,
  logCurrentUserOut,
  createHouse,
  dropHouse,
  updateHouse,
  addToFav,
  removeFromFav,
};
