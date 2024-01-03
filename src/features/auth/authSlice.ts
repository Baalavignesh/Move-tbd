import { createSlice } from "@reduxjs/toolkit";


interface AuthState {
  web5: any;
  userDid: string;
}


const web5Info: AuthState = {
  web5: {},
  userDid: "",
};

const authSlice = createSlice({
  name: "auth",
  initialState: web5Info,
  reducers: {
    setWeb5: (state, action) => {
      state.web5 = action.payload.web5;
      state.userDid = action.payload.userDid;
    }
  },
});

export const { setWeb5 } = authSlice.actions;

export default authSlice.reducer;