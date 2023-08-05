import { createSlice } from '@reduxjs/toolkit';
// utils
import axios from '../../utils/axios';
//
import { dispatch } from '../store';

// import axios from 'axios';

// ----------------------------------------------------------------------

const initialState = {
  isLoading: false,
  error: null,
  userList: [],
};

const slice = createSlice({
  name: 'users',
  initialState,
  reducers: {
    // START LOADING
    startLoading(state) {
      state.isLoading = true;
    },

    // HAS ERROR
    hasError(state, action) {
      state.isLoading = false;
      state.error = action.payload;
    },

    // GET USERS
    getUsersSuccess(state, action) {
      state.isLoading = false;
      state.userList = action.payload;
    },
  },
});

// Reducer
export default slice.reducer;

// Actions
export const { openModal, closeModal, selectEvent } = slice.actions;

// ----------------------------------------------------------------------

export function getUsers() {
  return async () => {
    dispatch(slice.actions.startLoading());
    try {
      const response = await axios.get(
        '/billapi/users/get?sort=%7B%7D&query=%7B%7D&project=%7B%22username%22%3A1%2C%22roles%22%3A1%7D&page=0&size=10&options=%7B%22or_fields%22%3A%5B%5D%7D',
        { withCredentials: true }
      );
      const userList = userMap(response.data.details);
      dispatch(slice.actions.getUsersSuccess(userList));
    } catch (error) {
      dispatch(slice.actions.hasError(error));
    }
  };
}

export function createUser(data) {
  const form = new FormData();
  const dataParam = {
    username: data.email,
    roles: [data.roles],
    password: data.password,
    from: '2023-08-05',
  };

  form.append('update', JSON.stringify(dataParam));

  return axios.post('/billapi/users/create', form, { withCredentials: true });
}

// UTILS
const userMap = (userList) => {
  const newUserList = userList.map((item) => {
    return {
      id: item._id,
      avatarUrl: null,
      name: item.username,
      email: null,
      phoneNumber: null,
      address: null,
      country: null,
      state: null,
      city: null,
      zipCode: null,
      company: null,
      isVerified: null,
      status: null,
      role: null,
      roles: item.roles,
    };
  });

  return newUserList;
};
