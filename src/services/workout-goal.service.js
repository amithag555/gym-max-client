import gymMaxApi from "../gymMaxApi";
import { TOKEN_KEY } from "../config";

export const getCurrentMemberWorkoutGoalService = async () => {
  return await (
    await gymMaxApi.get(`/workoutGoal`, {
      headers: {
        Authorization: `Bearer ${localStorage[TOKEN_KEY]}`,
      },
    })
  ).data;
};

export const getMemberWorkoutGoalsByYearService = async (_year) => {
  return await (
    await gymMaxApi.get(`/workoutGoal/byYear/${_year}`, {
      headers: {
        Authorization: `Bearer ${localStorage[TOKEN_KEY]}`,
      },
    })
  ).data;
};

export const updateCurrentTrainingNumberByWorkoutGoalIdService = async (_workoutGoalId) => {
  return await (
    await gymMaxApi.put(
      `/workoutGoal/update/${_workoutGoalId}`,
      {},
      {
        headers: {
          Authorization: `Bearer ${localStorage[TOKEN_KEY]}`,
        },
      }
    )
  ).data;
};

export const editCurrentWorkoutGoalService = async (_payload) => {
  return await (
    await gymMaxApi.put(`/workoutGoal/${_payload.workoutGoalId}`, _payload.workoutGoalToEdit, {
      headers: {
        Authorization: `Bearer ${localStorage[TOKEN_KEY]}`,
      },
    })
  ).data;
};

export const createWorkoutGoalService = async (_newWorkoutGoal) => {
  return await (
    await gymMaxApi.post(`/workoutGoal`, _newWorkoutGoal, {
      headers: {
        Authorization: `Bearer ${localStorage[TOKEN_KEY]}`,
      },
    })
  ).data;
};

export const deleteWorkoutGoalByIdService = async (_workoutGoalId) => {
  return await (
    await gymMaxApi.delete(`/workoutGoal/${_workoutGoalId}`, {
      headers: {
        Authorization: `Bearer ${localStorage[TOKEN_KEY]}`,
      },
    })
  ).data;
};
