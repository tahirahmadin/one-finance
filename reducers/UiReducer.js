import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { apolloClient } from "../pages/_app";
import { axiosInstance } from "../Axios";
import ethersServiceProvider from "../services/ethersServiceProvider";
import stakingService from "../services/stakingService";
import { GetTokenData } from "../queries/graphQueries";

const initialState = {
  tokenData: [],
  menuIndex: 0,
};

export const getTokensData = createAsyncThunk("getTokensData", async () => {
  const { loading, data, error } = await apolloClient.query({
    query: GetTokenData,
  });
  if (!loading && !error) {
    return data;
  }
});

const UiReducer = createSlice({
  name: "ui",
  initialState,
  reducers: {
    setMenuIndex(state, action) {
      state.menuIndex = action.payload;
    },
    setTokenData(state, action) {
      state.tokenData = [...action.payload];
    },
  },
});

const { actions } = UiReducer;

export const { changeUserProfile } = actions;

export default UiReducer;
