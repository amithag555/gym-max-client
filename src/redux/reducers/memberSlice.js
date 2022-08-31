import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import {
  getAllMembers,
  getMembersByPageNumberAndPerPageService,
  getMembersByNameOrPhoneNumberService,
  editMemberByIdService,
  deleteMemberByIdService,
  createMemberService,
  changeIsEntryService,
  getMemberByIdService,
  updateImgUrlService,
  changeIsFirstLoginService,
} from "../../services/member.service";

export const getAllMembersSlice = createAsyncThunk("members/getAllMembers", async () => {
  try {
    const response = await getAllMembers();
    return response;
  } catch (err) {
    console.log(err.response.data.message);
    return err.message;
  }
});

export const getMembersByPageNumberAndPerPageSlice = createAsyncThunk(
  "members/getMembersByPageNumberAndPerPage",
  async (_payload, { rejectWithValue }) => {
    try {
      const response = await getMembersByPageNumberAndPerPageService(_payload);
      return response;
    } catch (err) {
      console.log(err.response.data.message);
      return rejectWithValue(err.message);
    }
  }
);

export const getMembersByNameOrPhoneNumberSlice = createAsyncThunk(
  "members/getMembersByNameOrPhoneNumber",
  async (_payload, { rejectWithValue }) => {
    try {
      const response = await getMembersByNameOrPhoneNumberService(_payload);
      return response;
    } catch (err) {
      console.log(err);
      return rejectWithValue(err);
    }
  }
);

export const getMemberByIdSlice = createAsyncThunk("members/getMemberById", async (_memberId, { rejectWithValue }) => {
  try {
    const response = await getMemberByIdService(_memberId);
    return response;
  } catch (err) {
    console.log(err);
    return rejectWithValue(err);
  }
});

export const editMemberByIdSlice = createAsyncThunk("members/editMemberById", async (_payload, { rejectWithValue }) => {
  try {
    const response = await editMemberByIdService(_payload);
    return response;
  } catch (err) {
    console.log(err);
    return rejectWithValue(err.response.data);
  }
});

export const deleteMemberByIdSlice = createAsyncThunk("members/deleteMemberById", async (_memberId, { rejectWithValue }) => {
  try {
    const response = await deleteMemberByIdService(_memberId);
    return response;
  } catch (err) {
    console.log(err);
    return rejectWithValue(err.response);
  }
});

export const createMemberSlice = createAsyncThunk("members/createMember", async (_newMember, { rejectWithValue }) => {
  try {
    const response = await createMemberService(_newMember);
    return response;
  } catch (err) {
    console.log(err);
    return rejectWithValue(err.response.data);
  }
});

export const changeIsEntrySlice = createAsyncThunk("members/isEntry", async () => {
  try {
    const response = await changeIsEntryService();
    return response;
  } catch (err) {
    console.log(err);
    return err.response.data;
  }
});

export const changeIsFirstLoginSlice = createAsyncThunk("members/isFirstLogin", async () => {
  try {
    const response = await changeIsFirstLoginService();
    return response;
  } catch (err) {
    console.log(err);
    return err.response.data;
  }
});

export const updateImgUrlSlice = createAsyncThunk("members/updateImgUrl", async (_payload, { rejectWithValue }) => {
  try {
    const response = await updateImgUrlService(_payload);
    return response;
  } catch (err) {
    console.log(err);
    return rejectWithValue(err.response.data);
  }
});

export const memberSlice = createSlice({
  name: "member",

  initialState: {
    currentMember: {},
    members: [],
    errors: {},
  },

  reducers: {
    defineCurrentMemberById: (state, action) => {
      if (action.payload === -1) {
        state.currentMember = {};
      } else {
        state.currentMember = state.members.find((item) => item.id === action.payload);
      }
    },
    defineCurrentMember: (state, action) => {
      state.currentMember = action.payload;
    },
    removeCurrentMember: (state, action) => {
      state.currentMember = {};
    },
  },

  extraReducers: (builder) => {
    builder
      .addCase(getAllMembersSlice.fulfilled, (state, action) => {
        state.members = [...action.payload];
      })
      .addCase(getAllMembersSlice.rejected, (state, action) => {
        state.errors = action.payload;
      })
      .addCase(getMembersByPageNumberAndPerPageSlice.fulfilled, (state, action) => {
        if (action.payload) {
          state.members = [...action.payload];
          state.errors = {};
        }
      })
      .addCase(getMembersByPageNumberAndPerPageSlice.rejected, (state, action) => {
        state.errors = action.payload;
      })
      .addCase(getMembersByNameOrPhoneNumberSlice.fulfilled, (state, action) => {
        if (action.payload) {
          state.members = [...action.payload];
        }
      })
      .addCase(getMembersByNameOrPhoneNumberSlice.rejected, (state, action) => {
        state.errors = action.payload;
      })
      .addCase(editMemberByIdSlice.fulfilled, (state, action) => {
        if (action.payload.id) {
          state.members = state.members.map((item) => (item.id === action.payload.id ? action.payload : item));
          state.errors = {};
        }
      })
      .addCase(editMemberByIdSlice.rejected, (state, action) => {
        state.errors = action.payload;
      })
      .addCase(createMemberSlice.fulfilled, (state, action) => {
        if (action.payload.id) {
          state.errors = {};
        }
      })
      .addCase(createMemberSlice.rejected, (state, action) => {
        state.errors = action.payload;
      })
      .addCase(deleteMemberByIdSlice.fulfilled, (state, action) => {
        if (action.payload.id) {
          state.currentMember = {};
          state.errors = {};
        }
      })
      .addCase(deleteMemberByIdSlice.rejected, (state, action) => {
        state.errors = action.payload;
      })
      .addCase(changeIsEntrySlice.fulfilled, (state, action) => {
        if (action.payload.id) {
          state.currentMember = action.payload;
          state.errors = {};
        }
      })
      .addCase(changeIsEntrySlice.rejected, (state, action) => {
        state.errors = action.payload;
      })
      .addCase(getMemberByIdSlice.fulfilled, (state, action) => {
        if (action.payload.id) {
          state.currentMember = action.payload;
          state.errors = {};
        }
      })
      .addCase(getMemberByIdSlice.rejected, (state, action) => {
        state.errors = action.payload;
      })
      .addCase(updateImgUrlSlice.fulfilled, (state, action) => {
        if (action.payload.id) {
          state.currentMember = action.payload;
          state.errors = {};
        }
      })
      .addCase(updateImgUrlSlice.rejected, (state, action) => {
        state.errors = action.payload;
      })
      .addCase(changeIsFirstLoginSlice.fulfilled, (state, action) => {
        if (action.payload.id) {
          state.currentMember = action.payload;
          state.errors = {};
        }
      })
      .addCase(changeIsFirstLoginSlice.rejected, (state, action) => {
        state.errors = action.payload;
      });
  },
});

export const selectAllMembers = (state) => {
  return state.member.members;
};

export const selectCurrentMember = (state) => {
  return state.member.currentMember;
};

export const selectErrorState = (state) => {
  return state.member.errors;
};

export const { defineCurrentMemberById, removeCurrentMember, defineCurrentMember } = memberSlice.actions;

export default memberSlice.reducer;
