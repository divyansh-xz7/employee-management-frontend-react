// src/features/auth/authSlice.js
import { createSlice } from '@reduxjs/toolkit';
import authApi from '../services/authApi';

const initialState = {
  token: localStorage.getItem('token') || null,
  username: localStorage.getItem('username') || null,
  status: 'idle', // 'idle' | 'loading' | 'succeeded' | 'failed'
  error: null,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setCredentials: (state, action) => {
      const { token, username } = action.payload;
      state.token = token;
      state.username = username;
      console.log(token)
      console.log(username)

      localStorage.setItem('token', token);
      localStorage.setItem('username', username);

    },
    logout: (state) => {
      state.token = null;
      state.username = null;

      localStorage.removeItem('token');
      localStorage.removeItem('username');
      localStorage.clear()
    }
  },
  extraReducers: (builder) => {
    builder
      .addMatcher(
        authApi.endpoints.login.matchPending,
        (state) => {
          state.status = 'loading';
        }
      )
      .addMatcher(
        authApi.endpoints.login.matchFulfilled,
        (state, action) => {
          state.status = 'succeeded';
          state.token = action.payload.token;
          state.username = action.payload.username;
          localStorage.setItem('token', action.payload.token);
          localStorage.setItem('username', action.payload.username);
        }
      )
      .addMatcher(
        authApi.endpoints.login.matchRejected,
        (state, action) => {
          state.status = 'failed';
          state.error = action.error.message;
          state.token = null;
          localStorage.removeItem('token');
        }
      );
  },
});

export const { setCredentials, logout } = authSlice.actions;

export default authSlice.reducer;