/* eslint-disable eqeqeq */
/* eslint-disable camelcase */
import Axios from "axios";

const unLoad = (states) => (dispatch) => {
  dispatch({
    type: "CLEAR_STATE",
    payload: states,
  });
};
const fetchHouses = () => (dispatch) => {
  const url = " https://lihouses-api.herokuapp.com/api/v1/houses.json";
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

const fetchHouse = (id) => (dispatch) => {
  const token = localStorage.getItem("jwt");
  const authAxios = Axios.create({
    baseURL: " https://lihouses-api.herokuapp.com",
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
  const token = localStorage.getItem("jwt");

  const authAxios = Axios.create({
    baseURL: " https://lihouses-api.herokuapp.com",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  const payload = {
    message: "You have successfully deleted a house.",
    type: "delete_house",
  };
  authAxios
    .delete(`/api/v1/houses/${id}.json`)
    .then((res) => {
      dispatch({
        type: "SUCC_MSG",
        payload: payload,
      });

      dispatch({
        type: "DROP_HOUSE",
        payload: res.data,
      });
    })
    .catch((err) =>
      dispatch({
        type: "CREATE_ERROR",
        payload: err,
      })
    );
};

const createHouse = (data) => (dispatch) => {
  const token = localStorage.getItem("jwt");
  const authAxios = Axios.create({
    baseURL: " https://lihouses-api.herokuapp.com",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  const hseData = {
    house: data,
  };
  const payload = {
    message: "House SuccessFully created",
    type: "create_house",
  };
  authAxios
    .post("/api/v1/houses.json", hseData)
    .then((res) => {
      dispatch({
        type: "SUCC_MSG",
        payload: payload,
      });
      dispatch({
        type: "FETCH_HOUSE",
        payload: res.data,
      });
    })
    .catch((err) =>
      dispatch({
        type: "CREATE_ERROR",
        payload: err,
      })
    );
};

const updateHouse = (data, id) => (dispatch) => {
  const token = localStorage.getItem("jwt");
  const authAxios = Axios.create({
    baseURL: " https://lihouses-api.herokuapp.com",
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

const addToFav = (data, user) => (dispatch) => {
  const token = localStorage.getItem("jwt");
  const authAxios = Axios.create({
    baseURL: " https://lihouses-api.herokuapp.com",
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
  });

  const hseData = {
    favorite: data,
  };
  const payload = {
    message:  "House was successfully added to Favorites!",
    type: 'add_fav'
  }

  authAxios
    .post("/api/v1/favorites.json", hseData)
    .then((res) => {
      const newUserFav = [...user.favorites, res.data];
      const curRes = { ...user, favorites: newUserFav };
      dispatch({
        type: "UPDATE_FAV",
        payload: curRes,
      });

      dispatch({
        type: "SUCC_MSG",
        payload: payload,
      });

      dispatch({
        type: "FETCH_USER",
        payload: curRes,
      });
    })
    .catch((err) =>
      dispatch({
        type: "CREATE_ERROR",
        payload: err,
      })
    );
};

const removeFromFav = (house_id, user) => (dispatch) => {
  const fav = user.favorites.filter(
    (favv) => favv.house_id == house_id.toString()
  );

  const token = localStorage.getItem("jwt");
  const authAxios = Axios.create({
    baseURL: " https://lihouses-api.herokuapp.com",
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
  });

  const { id } = fav[0];
  const payload = {
    message:  "House was successfully removed from Favorites!",
    type: 'remove_fav'
  }
  authAxios
    .delete(`/api/v1/favorites/${id}.json`)
    .then(() => {
      const newUserFav = user.favorites.filter((userfav) => userfav.id != id);
      const newUser = { ...user, favorites: [...newUserFav] };

      dispatch({
        type: "REMOVE_FAV",
      });

      dispatch({
        type: "SUCC_MSG",
        payload: payload
      });

      dispatch({
        type: "FETCH_USER",
        payload: newUser,
      });
    })
    .catch((err) =>
      dispatch({
        type: "CREATE_ERROR",
        payload: err,
      })
    );
};

const uploadImage = (image) => (dispatch) => {
  const token = localStorage.getItem("jwt");
  const userAxios = Axios.create({
    baseURL: " https://lihouses-api.herokuapp.com",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  userAxios
    .post("/api/v1/image_uploaders.json", image)
    .then((res) =>
      dispatch({
        type: "ADD_IMAGE",
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

const clearImg = () => (dispatch) => {
  dispatch({
    type: "CLEAR_IMG",
  });
};

const isFav = () => (dispatch) => {
  dispatch({
    type: "UPDATE_FAV",
  });
};

export {
  fetchHouses,
  fetchHouse,
  createHouse,
  dropHouse,
  updateHouse,
  addToFav,
  removeFromFav,
  unLoad,
  uploadImage,
  clearImg,
  isFav,
};
