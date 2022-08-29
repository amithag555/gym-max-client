import { configureStore } from "@reduxjs/toolkit";
import trainingPlanReducer from "./reducers/trainingPlanSlice";
import memberReducer from "./reducers/memberSlice";
import authReducer from "./reducers/authSlice";
import workoutGoalReducer from "./reducers/workoutGoalSlice";
import generalReducer from "./reducers/generalSlice";

export default configureStore({
  reducer: {
    trainingPlan: trainingPlanReducer,
    member: memberReducer,
    auth: authReducer,
    workoutGoal: workoutGoalReducer,
    general: generalReducer,
  },
});
