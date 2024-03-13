import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

import getNotificationsSetting from '__services/backend/getNotificationsSetting'
import updateNotificationsSetting from '__services/backend/updateNotificationsSetting'

const initialState = {
  settings: {}, isLoading: false, isError: false, error: null,
};

export const fetchSettings = createAsyncThunk(
  'settings/fetch',
  async () => {
    const response = await getNotificationsSetting()
      .catch((error) => {
        return Promise.reject(new Error(error.message))
      });

    return response;
  },
);

export const updateSettings = createAsyncThunk(
  'settings/update',
  async (params) => {
    await updateNotificationsSetting(params)
      .catch((error) => {
        return Promise.reject(new Error(error.message))
      });

    return params;
  },
);

const settingsSlice = createSlice({
  name: 'settings',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchSettings.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(fetchSettings.fulfilled, (state, action) => {
        state.isLoading = false;
        state.settings = action.payload;
      })
      .addCase(fetchSettings.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.error = action.error.message;
      })
      .addCase(updateSettings.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(updateSettings.fulfilled, (state, action) => {
        state.isLoading = false;
        state.settings = { ...state.settings, ...action.payload };
      })
      .addCase(updateSettings.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.error = action.error.message;
      });
  },
});

export default settingsSlice.reducer;
