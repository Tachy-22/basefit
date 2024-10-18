import { createSlice, PayloadAction } from "@reduxjs/toolkit";



interface WalletState {
  wallet: TWalletData | null;
}

const initialState: WalletState = {
  wallet: null,
};

export const walletSlice = createSlice({
  name: "wallet",
  initialState,
  reducers: {
    setWallet: (state, action: PayloadAction<TWalletData>) => {
      state.wallet = action.payload;
    },
    clearWallet: (state) => {
      state.wallet = null;
    },
  },
});

export const { setWallet, clearWallet } = walletSlice.actions;

export default walletSlice.reducer;
