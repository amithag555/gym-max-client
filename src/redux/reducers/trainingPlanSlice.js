import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import {
  getTrainingPlanById,
  editTrainingPlan,
  editPlanItem,
  getAllTrainingPlansByMemberId,
  editPlanItemExercise,
  deletePlanItemExercise,
  deletePlanItem,
  deleteTrainingPlan,
  createTrainingPlan,
  createPlanItem,
  createExercise,
  getTrainingPlansByPageNumberAndPerPage,
  getTrainingPlansByMemberIdPageNumberAndPerPage,
} from "../../services/training-plan.service";

export const getTrainingPlanByIdSlice = createAsyncThunk("trainingPlan/getTrainingPlanById", async (_trainingPlanId) => {
  try {
    const response = await getTrainingPlanById(_trainingPlanId);
    return response;
  } catch (err) {
    console.log(err.response.data.message);
    return err;
  }
});

export const getTrainingPlansByPageNumberAndPerPageSlice = createAsyncThunk(
  "trainingPlan/getTrainingPlansByPageNumberAndPerPage",
  async (_payload) => {
    try {
      const response = await getTrainingPlansByPageNumberAndPerPage(_payload);
      return response;
    } catch (err) {
      console.log(err);
      return err;
    }
  }
);

export const getTrainingPlansByMemberIdPageNumberAndPerPageSlice = createAsyncThunk(
  "trainingPlan/getTrainingPlansByMemberIdPageNumberAndPerPage",
  async (_payload) => {
    try {
      const response = await getTrainingPlansByMemberIdPageNumberAndPerPage(_payload);
      return response;
    } catch (err) {
      console.log(err);
      return err;
    }
  }
);

export const getAllTrainingPlansByMemberIdSlice = createAsyncThunk(
  "trainingPlan/getAllTrainingPlansByMemberId",
  async (_memberId) => {
    try {
      const response = await getAllTrainingPlansByMemberId(_memberId);
      return response;
    } catch (err) {
      console.log(err.response.data.message);
      return err;
    }
  }
);

export const editTrainingPlanSlice = createAsyncThunk("trainingPlan/editTrainingPlan", async (_payload) => {
  try {
    const response = await editTrainingPlan(_payload);

    return response;
  } catch (err) {
    console.log(err.response.data.message);
    return err;
  }
});

export const editPlanItemSlice = createAsyncThunk("trainingPlan/editPlanItem", async (_payload) => {
  try {
    const response = await editPlanItem(_payload);
    return response;
  } catch (err) {
    console.log(err.response.data.message);
    return err;
  }
});

export const editPlanItemExerciseSlice = createAsyncThunk("trainingPlan/editPlanItemExercise", async (_payload) => {
  try {
    const response = await editPlanItemExercise(_payload);
    return response;
  } catch (err) {
    console.log(err.response.data.message);
    return err;
  }
});

export const deletePlanItemExerciseSlice = createAsyncThunk("trainingPlan/deletePlanItemExercise", async (_exerciseId) => {
  try {
    const response = await deletePlanItemExercise(_exerciseId);
    return response;
  } catch (err) {
    console.log(err.response.data.message);
    return err;
  }
});

export const deletePlanItemSlice = createAsyncThunk("trainingPlan/deletePlanItem", async (_planItemId) => {
  try {
    const response = await deletePlanItem(_planItemId);
    return response;
  } catch (err) {
    console.log(err.response.data.message);
    return err;
  }
});

export const deleteTrainingPlanSlice = createAsyncThunk("trainingPlan/deleteTrainingPlan", async (_trainingPlanId) => {
  try {
    const response = await deleteTrainingPlan(_trainingPlanId);
    return response;
  } catch (err) {
    console.log(err.response.data.message);
    return err;
  }
});

export const createTrainingPlanSlice = createAsyncThunk("trainingPlan/createTrainingPlan", async (_newTrainingPlan) => {
  try {
    const response = await createTrainingPlan(_newTrainingPlan);
    return response;
  } catch (err) {
    console.log(err.response.data.message);
    return err;
  }
});

export const createPlanItemSlice = createAsyncThunk("trainingPlan/createPlanItem", async (_newPlanItem) => {
  try {
    const response = await createPlanItem(_newPlanItem);
    return response;
  } catch (err) {
    console.log(err.response.data.message);
    return err;
  }
});

export const createExerciseSlice = createAsyncThunk("trainingPlan/createExercise", async (_payload) => {
  try {
    const response = await createExercise(_payload.newExercise);
    return response;
  } catch (err) {
    console.log(err.response.data.message);
    return err;
  }
});

export const trainingPlanSlice = createSlice({
  name: "trainingPlan",

  initialState: {
    trainingPlans: [],
    currentTrainingPlan: {},
    memberTrainingPlans: [],
    currentPlanItem: {},
    errors: {},
  },

  reducers: {
    createNewTrainingPlan: (state, action) => {
      state.currentTrainingPlan = action.payload.newTrainingPlan;
    },
    createNewPlanItem: (state, action) => {
      state.currentPlanItem = action.payload.newPlanItem;
    },
    createNewExercise: (state, action) => {
      state.currentPlanItem.exercises.push(action.payload.newExercise);
    },
    addPlanItemToTrainingPlan: (state, action) => {
      state.currentTrainingPlan.plainItems.push(state.currentPlanItem);
    },
    defineCurrentPlanItem: (state, action) => {
      state.currentPlanItem = state.currentTrainingPlan.plainItems.find((item) => item.id === action.payload);
    },
    deleteCurrentTrainingPlan: (state, action) => {
      state.currentTrainingPlan = {};
    },
  },

  extraReducers: (builder) => {
    builder
      .addCase(getAllTrainingPlansByMemberIdSlice.fulfilled, (state, action) => {
        state.memberTrainingPlans = [...action.payload];
      })
      .addCase(getAllTrainingPlansByMemberIdSlice.rejected, (state, action) => {
        state.errors = action.payload;
      })
      .addCase(getTrainingPlanByIdSlice.fulfilled, (state, action) => {
        state.currentTrainingPlan = action.payload;
      })
      .addCase(getTrainingPlanByIdSlice.rejected, (state, action) => {
        state.errors = action.payload;
      })
      .addCase(getTrainingPlansByPageNumberAndPerPageSlice.fulfilled, (state, action) => {
        state.trainingPlans = [...action.payload];
        console.log(state.trainingPlans);
      })
      .addCase(getTrainingPlansByPageNumberAndPerPageSlice.rejected, (state, action) => {
        state.errors = action.payload;
      })
      .addCase(getTrainingPlansByMemberIdPageNumberAndPerPageSlice.fulfilled, (state, action) => {
        state.memberTrainingPlans = [...action.payload];
        console.log(state.memberTrainingPlans);
      })
      .addCase(getTrainingPlansByMemberIdPageNumberAndPerPageSlice.rejected, (state, action) => {
        state.errors = action.payload;
      })
      .addCase(editTrainingPlanSlice.fulfilled, (state, action) => {
        if (action.payload.id) {
          state.currentTrainingPlan.title = action.payload.title;

          state.memberTrainingPlans = state.memberTrainingPlans.map((item) =>
            item.id === state.currentTrainingPlan.id ? state.currentTrainingPlan : item
          );

          state.trainingPlans = state.trainingPlans.map((item) =>
            item.id === state.currentTrainingPlan.id ? state.currentTrainingPlan : item
          );
        }
      })
      .addCase(editTrainingPlanSlice.rejected, (state, action) => {
        state.errors = action.payload;
      })
      .addCase(editPlanItemSlice.fulfilled, (state, action) => {
        if (action.payload.id) {
          const planItemIndex = state.currentTrainingPlan.plainItems.findIndex((item) => item.id === action.payload.id);
          state.currentTrainingPlan.plainItems[planItemIndex].muscleName = action.payload.muscleName;

          state.memberTrainingPlans = state.memberTrainingPlans.map((item) =>
            item.id === state.currentTrainingPlan.id ? state.currentTrainingPlan : item
          );

          state.trainingPlans = state.trainingPlans.map((item) =>
            item.id === state.currentTrainingPlan.id ? state.currentTrainingPlan : item
          );
        }
      })
      .addCase(editPlanItemSlice.rejected, (state, action) => {
        state.errors = action.payload;
      })
      .addCase(editPlanItemExerciseSlice.fulfilled, (state, action) => {
        if (action.payload.id) {
          const planItemIndex = state.currentTrainingPlan.plainItems.findIndex(
            (item) => item.id === action.payload.plainItemId
          );

          const planItem = state.currentTrainingPlan.plainItems.find((item) => item.id === action.payload.plainItemId);
          const exerciseIndex = planItem.exercises.findIndex((item) => item.id === action.payload.id);

          state.currentTrainingPlan.plainItems[planItemIndex].exercises[exerciseIndex] = action.payload;

          state.memberTrainingPlans = state.memberTrainingPlans.map((item) =>
            item.id === state.currentTrainingPlan.id ? state.currentTrainingPlan : item
          );

          state.trainingPlans = state.trainingPlans.map((item) =>
            item.id === state.currentTrainingPlan.id ? state.currentTrainingPlan : item
          );
        }
      })
      .addCase(editPlanItemExerciseSlice.rejected, (state, action) => {
        state.errors = action.payload;
      })
      .addCase(deletePlanItemExerciseSlice.fulfilled, (state, action) => {
        const planItemIndex = state.currentTrainingPlan.plainItems.findIndex(
          (item) => item.id === action.payload.plainItemId
        );

        state.currentTrainingPlan.plainItems[planItemIndex].exercises = state.currentTrainingPlan.plainItems[
          planItemIndex
        ].exercises.filter((item) => item.id !== action.payload.id);

        state.memberTrainingPlans = state.memberTrainingPlans.map((item) =>
          item.id === state.currentTrainingPlan.id ? state.currentTrainingPlan : item
        );

        state.trainingPlans = state.trainingPlans.map((item) =>
          item.id === state.currentTrainingPlan.id ? state.currentTrainingPlan : item
        );
      })
      .addCase(deletePlanItemExerciseSlice.rejected, (state, action) => {
        state.errors = action.payload;
      })
      .addCase(deletePlanItemSlice.fulfilled, (state, action) => {
        state.currentTrainingPlan.plainItems = state.currentTrainingPlan.plainItems.filter(
          (item) => item.id !== action.payload.id
        );

        state.memberTrainingPlans = state.memberTrainingPlans.map((item) =>
          item.id === state.currentTrainingPlan.id ? state.currentTrainingPlan : item
        );
        state.trainingPlans = state.trainingPlans.map((item) =>
          item.id === state.currentTrainingPlan.id ? state.currentTrainingPlan : item
        );
      })
      .addCase(deletePlanItemSlice.rejected, (state, action) => {
        state.errors = action.payload;
      })
      .addCase(deleteTrainingPlanSlice.fulfilled, (state, action) => {
        if (action.payload.id) {
          state.currentTrainingPlan = {};

          state.memberTrainingPlans = state.memberTrainingPlans.filter((item) => item.id !== action.payload.id);

          state.trainingPlans = state.trainingPlans.filter((item) => item.id !== action.payload.id);
        }
      })
      .addCase(deleteTrainingPlanSlice.rejected, (state, action) => {
        state.errors = action.payload;
      })
      .addCase(createTrainingPlanSlice.fulfilled, (state, action) => {
        if (action.payload.id) {
          const trainingPlanIndex1 = state.memberTrainingPlans.findIndex((item) => item.id === action.payload.id);
          const trainingPlanIndex2 = state.trainingPlans.findIndex((item) => item.id === action.payload.id);

          if (trainingPlanIndex1 === -1) {
            state.memberTrainingPlans.push(action.payload);
          }

          if (trainingPlanIndex2 === -1) {
            state.trainingPlans.push(action.payload);
          }
        }
      })
      .addCase(createTrainingPlanSlice.rejected, (state, action) => {
        state.errors = action.payload;
      })
      .addCase(createPlanItemSlice.fulfilled, (state, action) => {
        if (action.payload.id) {
          state.currentTrainingPlan.plainItems.push(action.payload);

          state.memberTrainingPlans = state.memberTrainingPlans.map((item) =>
            item.id === state.currentTrainingPlan.id ? state.currentTrainingPlan : item
          );

          state.trainingPlans = state.trainingPlans.map((item) =>
            item.id === state.currentTrainingPlan.id ? state.currentTrainingPlan : item
          );
        }
      })
      .addCase(createPlanItemSlice.rejected, (state, action) => {
        state.errors = action.payload;
      })
      .addCase(createExerciseSlice.fulfilled, (state, action) => {
        if (action.payload.id) {
          state.currentPlanItem.exercises.push(action.payload);

          state.currentTrainingPlan.plainItems = state.currentTrainingPlan.plainItems.map((item) =>
            item.id === state.currentPlanItem.id ? state.currentPlanItem : item
          );

          state.memberTrainingPlans = state.memberTrainingPlans.map((item) =>
            item.id === state.currentTrainingPlan.id ? state.currentTrainingPlan : item
          );

          state.trainingPlans = state.trainingPlans.map((item) =>
            item.id === state.currentTrainingPlan.id ? state.currentTrainingPlan : item
          );
        }
      })
      .addCase(createExerciseSlice.rejected, (state, action) => {
        state.errors = action.payload;
      });
  },
});

export const selectAllTrainingPlan = (state) => {
  return state.trainingPlan.trainingPlans;
};

export const selectAllMemberTrainingPlans = (state) => {
  return state.trainingPlan.memberTrainingPlans;
};

export const selectCurrentTrainingPlan = (state) => {
  return state.trainingPlan.currentTrainingPlan;
};

export const selectTrainingPlanErrors = (state) => {
  return state.trainingPlan.errors;
};

export const selectCurrentPlanItem = (state) => {
  return state.trainingPlan.currentPlanItem;
};

export const {
  createNewTrainingPlan,
  createNewPlanItem,
  createNewExercise,
  addPlanItemToTrainingPlan,
  defineCurrentPlanItem,
  defineMemberTrainingPlansByMemberId,
  deleteCurrentTrainingPlan,
} = trainingPlanSlice.actions;

export default trainingPlanSlice.reducer;
