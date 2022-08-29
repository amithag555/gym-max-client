import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import {
  getCurrentMemberWorkoutGoalService,
  updateCurrentTrainingNumberByWorkoutGoalIdService,
  createWorkoutGoalService,
  editCurrentWorkoutGoalService,
  deleteWorkoutGoalByIdService,
  getMemberWorkoutGoalsByYearService,
} from "../../services/workout-goal.service";

export const getCurrentMemberWorkoutGoalSlice = createAsyncThunk("workoutGoal/getCurrentMemberWorkoutGoal", async () => {
  try {
    const response = await getCurrentMemberWorkoutGoalService();
    return response;
  } catch (err) {
    console.log(err.response.data.message);
    return err;
  }
});

export const getMemberWorkoutGoalsByYearSlice = createAsyncThunk(
  "workoutGoal/getMemberWorkoutGoalsByYear",
  async (_year, { rejectWithValue }) => {
    try {
      const response = await getMemberWorkoutGoalsByYearService(_year);
      return response;
    } catch (err) {
      console.log(err.response.data.message);
      return rejectWithValue(err);
    }
  }
);

export const updateCurrentTrainingNumberByWorkoutGoalIdSlice = createAsyncThunk(
  "workoutGoal/updateCurrentTrainingNumberByWorkoutGoalId",
  async (_workoutGoalId, { rejectWithValue }) => {
    try {
      const response = await updateCurrentTrainingNumberByWorkoutGoalIdService(_workoutGoalId);
      return response;
    } catch (err) {
      console.log(err.response.data.message);
      return rejectWithValue(err);
    }
  }
);

export const createWorkoutGoalSlice = createAsyncThunk(
  "workoutGoal/createWorkoutGoa",
  async (_newWorkoutGoal, { rejectWithValue }) => {
    try {
      const response = await createWorkoutGoalService(_newWorkoutGoal);
      return response;
    } catch (err) {
      console.log(err.response.data.message);
      return rejectWithValue(err);
    }
  }
);

export const editCurrentWorkoutGoalSlice = createAsyncThunk(
  "workoutGoal/editCurrentWorkoutGoal",
  async (_payload, { rejectWithValue }) => {
    try {
      const response = await editCurrentWorkoutGoalService(_payload);
      return response;
    } catch (err) {
      console.log(err.response.data.message);
      return rejectWithValue(err);
    }
  }
);

export const deleteWorkoutGoalByIdSlice = createAsyncThunk(
  "workoutGoal/deleteWorkoutGoalById",
  async (_workoutGoalId, { rejectWithValue }) => {
    try {
      const response = await deleteWorkoutGoalByIdService(_workoutGoalId);
      return response;
    } catch (err) {
      console.log(err.response.data.message);
      return rejectWithValue(err);
    }
  }
);

export const workoutGoalSlice = createSlice({
  name: "workoutGoal",

  initialState: {
    currentWorkoutGoal: {},
    memberWorkoutGoals: [],
    errors: {},
  },

  extraReducers: (builder) => {
    builder
      .addCase(getCurrentMemberWorkoutGoalSlice.fulfilled, (state, action) => {
        if (action.payload.id) {
          state.currentWorkoutGoal = action.payload;
        }
      })
      .addCase(getCurrentMemberWorkoutGoalSlice.rejected, (state, action) => {
        state.errors = action.payload;
      })
      .addCase(updateCurrentTrainingNumberByWorkoutGoalIdSlice.fulfilled, (state, action) => {
        if (action.payload.id) {
          state.currentWorkoutGoal = action.payload;

          state.memberWorkoutGoals = state.memberWorkoutGoals.map((item) =>
            item.id === action.payload.id ? action.payload : item
          );
        }
      })
      .addCase(updateCurrentTrainingNumberByWorkoutGoalIdSlice.rejected, (state, action) => {
        state.errors = action.payload;
      })
      .addCase(createWorkoutGoalSlice.fulfilled, (state, action) => {
        if (action.payload.id) {
          state.currentWorkoutGoal = action.payload;

          if (state.memberWorkoutGoals.length > 0) {
            state.memberWorkoutGoals.push(action.payload);
          }
        }
      })
      .addCase(createWorkoutGoalSlice.rejected, (state, action) => {
        state.errors = action.payload;
      })
      .addCase(editCurrentWorkoutGoalSlice.fulfilled, (state, action) => {
        if (action.payload.id) {
          state.currentWorkoutGoal = action.payload;

          state.memberWorkoutGoals = state.memberWorkoutGoals.map((item) =>
            item.id === action.payload.id ? action.payload : item
          );
        }
      })
      .addCase(editCurrentWorkoutGoalSlice.rejected, (state, action) => {
        state.errors = action.payload;
      })
      .addCase(deleteWorkoutGoalByIdSlice.fulfilled, (state, action) => {
        if (action.payload.id) {
          state.currentWorkoutGoal = {};

          state.memberWorkoutGoals = state.memberWorkoutGoals.filter((item) => item.id !== action.payload.id);
        }
      })
      .addCase(deleteWorkoutGoalByIdSlice.rejected, (state, action) => {
        state.errors = action.payload;
      })
      .addCase(getMemberWorkoutGoalsByYearSlice.fulfilled, (state, action) => {
        if (action.payload) {
          state.memberWorkoutGoals = [...action.payload];
        }
      })
      .addCase(getMemberWorkoutGoalsByYearSlice.rejected, (state, action) => {
        state.errors = action.payload;
      });
  },
});

export const selectCurrentWorkoutGoal = (state) => {
  return state.workoutGoal.currentWorkoutGoal;
};

export const selectMemberWorkoutGoals = (state) => {
  return state.workoutGoal.memberWorkoutGoals;
};

export default workoutGoalSlice.reducer;
