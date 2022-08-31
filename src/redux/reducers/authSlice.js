import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { getMemberByTokenEmailService } from "../../services/member.service";
import { getUserByTokenUsernameService } from "../../services/user.service";
import { userLoginService, memberLoginService } from "../../services/auth.service";
import { TOKEN_KEY } from "../../config";

export const getUserByTokenUsernameSlice = createAsyncThunk(
  "users/getUserByTokenUsername",
  async (_token, { rejectWithValue }) => {
    try {
      const response = await getUserByTokenUsernameService(_token);
      return response;
    } catch (err) {
      console.log(err.response.data.message);
      return rejectWithValue(err.response.data);
    }
  }
);

export const userLoginSlice = createAsyncThunk("auth/userLogin", async (_userDetails, { rejectWithValue }) => {
  try {
    const response = await userLoginService(_userDetails);
    return response;
  } catch (err) {
    console.log(err.response.data.message);
    return rejectWithValue(err.response.data.message);
  }
});

export const getMemberByTokenEmailSlice = createAsyncThunk(
  "members/getMemberByTokenEmail",
  async (_token, { rejectWithValue }) => {
    try {
      const response = await getMemberByTokenEmailService(_token);
      return response;
    } catch (err) {
      console.log(err.response.data.message);
      return rejectWithValue(err.response.data.message);
    }
  }
);

export const memberLoginSlice = createAsyncThunk("auth/memberLogin", async (_memberDetails, { rejectWithValue }) => {
  try {
    const response = await memberLoginService(_memberDetails);
    return response;
  } catch (err) {
    console.log(err.response.data.message);
    return rejectWithValue(err.response.data.message);
  }
});

export const authSlice = createSlice({
  name: "auth",

  initialState: {
    currentUser: {},
    currentToken: "",
    errors: "",
  },

  reducers: {
    logout: (state, action) => {
      state.currentUser = {};
      state.currentToken = "";
      localStorage.removeItem(TOKEN_KEY);
    },
    updateCurrentUser: (state, action) => {
      state.currentUser = action.payload;
    },
  },

  extraReducers: (builder) => {
    builder
      .addCase(getUserByTokenUsernameSlice.fulfilled, (state, action) => {
        if (action.payload.id) {
          state.currentUser = action.payload;
          console.log(action.payload);
        }
      })
      .addCase(getUserByTokenUsernameSlice.rejected, (state, action) => {
        state.errors = action.payload;
      })
      .addCase(userLoginSlice.fulfilled, (state, action) => {
        if (action.payload.accessToken) {
          localStorage.setItem(TOKEN_KEY, action.payload.accessToken);
          state.currentToken = action.payload.accessToken;
          state.errors = "";
        }
      })
      .addCase(userLoginSlice.rejected, (state, action) => {
        state.errors = action.payload;
      })
      .addCase(getMemberByTokenEmailSlice.fulfilled, (state, action) => {
        if (action.payload.id) {
          state.currentUser = action.payload;
          console.log(state.currentUser);
        }
      })
      .addCase(getMemberByTokenEmailSlice.rejected, (state, action) => {
        state.errors = action.payload;
      })
      .addCase(memberLoginSlice.fulfilled, (state, action) => {
        if (action.payload.accessToken) {
          localStorage.setItem(TOKEN_KEY, action.payload.accessToken);
          state.currentToken = action.payload.accessToken;
          state.errors = "";
        }
      })
      .addCase(memberLoginSlice.rejected, (state, action) => {
        state.errors = action.payload;
      });
  },
});

export const selectCurrentUser = (state) => {
  return state.auth.currentUser;
};

export const selectCurrentToken = (state) => {
  return state.auth.currentToken;
};

export const selectErrorState = (state) => {
  return state.auth.errors;
};

export const { logout, updateCurrentUser } = authSlice.actions;

export default authSlice.reducer;
