import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { apolloClient } from "../pages/_app";
import { GetPoolDataById } from "../queries/graphQueries";

const initialState = {
  tokenData: [],
  menuIndex: 0,
  walletStatus: 0,
  accumulationPoolData: null,
  usdtBalance: 0,
};

export const getPoolDataById = createAsyncThunk(
  "getPoolDataById",
  async (contractAddress) => {
    console.log(contractAddress);
    const { loading, data, error } = await apolloClient.query({
      query: GetPoolDataById,
      variables: { address: contractAddress },
    });
    if (!loading && !error) {
      return data;
    }
  }
);

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
    setWalletStatus(state, action) {
      state.walletStatus = action.payload;
    },
    setUsdtBalanceOfUser(state, action) {
      state.usdtBalance = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(getPoolDataById.fulfilled, (state, action) => {
      const response = action.payload;
      console.log(response);
      if (response && response.pool) {
        state.accumulationPoolData = response.pool;
      }
    });
  },
});

const { actions } = UiReducer;

export const {
  setMenuIndex,
  setTokenData,
  setWalletStatus,
  setUsdtBalanceOfUser,
} = actions;

export default UiReducer;
