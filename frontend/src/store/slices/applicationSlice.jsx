/* eslint-disable no-unused-vars */
/* eslint-disable no-self-assign */
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { api } from '../../main';

export const postApplication = createAsyncThunk(
  "application/post",
  async ({ jobId, formData }, { rejectWithValue }) => {
    try {
      const response = await api.post(`/application/post/${jobId}`, formData, {
        withCredentials: true,
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${document.cookie.split('token=')[1]?.split(';')[0]}`
        }
      });
      return response.data;
    } catch (error) {
      if (!error.response) {
        return rejectWithValue('Network error - Cannot connect to server');
      }
      if (error.response.status === 401) {
        return rejectWithValue('Please login first');
      }
      return rejectWithValue(error.response?.data?.message || 'Failed to post application');
    }
  }
);

const applicationSlice = createSlice({
  name: "application",
  initialState: {
    loading: false,
    error: null,
    message: null,
    applications: [],
    myApplications: []
  },
  reducers: {
      clearAllApplicationErrors
: (state) => {
      state.error = null;
    },
     resetApplicationSlice
: (state) => {
      state.error = null;
      state.message = null;
      state.loading = false;
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(postApplication.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(postApplication.fulfilled, (state, action) => {
        state.loading = false;
        state.message = action.payload.message;
      })
      .addCase(postApplication.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  }
});

export const {   clearAllApplicationErrors
,  resetApplicationSlice, deleteApplication
 } = applicationSlice.actions;
export default applicationSlice.reducer;
