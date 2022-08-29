import gymMaxApi from "../gymMaxApi";
import { TOKEN_KEY } from "../config";

export const getTrainingPlanById = async (_trainingPlanId) => {
  return await (
    await gymMaxApi.get(`/trainingPlan/${_trainingPlanId}`, {
      headers: {
        Authorization: `Bearer ${localStorage[TOKEN_KEY]}`,
      },
    })
  ).data;
};

// export const getAllTrainingPlans = async () => {
//   return await (
//     await gymMaxApi.get("/trainingPlan", {
//       headers: {
//         Authorization: `Bearer ${localStorage[TOKEN_KEY]}`,
//       },
//     })
//   ).data;
// };

export const getTrainingPlansByPageNumberAndPerPage = async (_payload) => {
  console.log(_payload);
  return await (
    await gymMaxApi.get(`/trainingPlan?page=${_payload.pageNumber}&perPage=${_payload.perPage}`, {
      headers: {
        Authorization: `Bearer ${localStorage[TOKEN_KEY]}`,
      },
    })
  ).data;
};

export const getTrainingPlansCountService = async () => {
  return await (
    await gymMaxApi.get(`/trainingPlan/trainingPlansCount`, {
      headers: {
        Authorization: `Bearer ${localStorage[TOKEN_KEY]}`,
      },
    })
  ).data;
};

export const getTrainingPlansByMemberIdPageNumberAndPerPage = async (_payload) => {
  console.log(_payload);
  return await (
    await gymMaxApi.get(
      `/trainingPlan/member/byPage/${_payload.memberId}?page=${_payload.pageNumber}&perPage=${_payload.perPage}`,
      {
        headers: {
          Authorization: `Bearer ${localStorage[TOKEN_KEY]}`,
        },
      }
    )
  ).data;
};

export const getMemberTrainingPlansCountService = async (_memberId) => {
  console.log(_memberId);
  return await (
    await gymMaxApi.get(`/trainingPlan/memberTrainingPlansCount/${_memberId}`, {
      headers: {
        Authorization: `Bearer ${localStorage[TOKEN_KEY]}`,
      },
    })
  ).data;
};

export const getOnlyAllTrainingPlanObjects = async () => {
  return await (
    await gymMaxApi.get("/trainingPlan/onlyTrainingPlans", {
      headers: {
        Authorization: `Bearer ${localStorage[TOKEN_KEY]}`,
      },
    })
  ).data;
};

export const getAllTrainingPlansByMemberId = async (_memberId) => {
  return await (
    await gymMaxApi.get(`/trainingPlan/member/${_memberId}`, {
      headers: {
        Authorization: `Bearer ${localStorage[TOKEN_KEY]}`,
      },
    })
  ).data;
};

export const editTrainingPlan = async (_payload) => {
  return await (
    await gymMaxApi.put(`/trainingPlan/${_payload.id}`, _payload.trainingPlanToUpdate, {
      headers: {
        Authorization: `Bearer ${localStorage[TOKEN_KEY]}`,
      },
    })
  ).data;
};

export const editPlanItem = async (_payload) => {
  return await (
    await gymMaxApi.put(`/trainingPlan/planItem/${_payload.id}`, _payload.planItemToUpdate, {
      headers: {
        Authorization: `Bearer ${localStorage[TOKEN_KEY]}`,
      },
    })
  ).data;
};

export const editPlanItemExercise = async (_payload) => {
  return await (
    await gymMaxApi.put(`/trainingPlan/exercise/${_payload.id}`, _payload.exerciseToUpdate, {
      headers: {
        Authorization: `Bearer ${localStorage[TOKEN_KEY]}`,
      },
    })
  ).data;
};

export const deletePlanItemExercise = async (_exerciseId) => {
  return await (
    await gymMaxApi.delete(`/trainingPlan/exercise/${_exerciseId}`, {
      headers: {
        Authorization: `Bearer ${localStorage[TOKEN_KEY]}`,
      },
    })
  ).data;
};

export const deletePlanItem = async (_planItemId) => {
  return await (
    await gymMaxApi.delete(`/trainingPlan/planItem/${_planItemId}`, {
      headers: {
        Authorization: `Bearer ${localStorage[TOKEN_KEY]}`,
      },
    })
  ).data;
};

export const deleteTrainingPlan = async (_trainingPlanId) => {
  return await (
    await gymMaxApi.delete(`/trainingPlan/${_trainingPlanId}`, {
      headers: {
        Authorization: `Bearer ${localStorage[TOKEN_KEY]}`,
      },
    })
  ).data;
};

export const createTrainingPlan = async (_newTrainingPlan) => {
  return await (
    await gymMaxApi.post(`/trainingPlan`, _newTrainingPlan, {
      headers: {
        Authorization: `Bearer ${localStorage[TOKEN_KEY]}`,
      },
    })
  ).data;
};

export const createPlanItem = async (_newPlanItem) => {
  return await (
    await gymMaxApi.post(`/trainingPlan/planItem`, _newPlanItem, {
      headers: {
        Authorization: `Bearer ${localStorage[TOKEN_KEY]}`,
      },
    })
  ).data;
};

export const createExercise = async (_newExercise) => {
  console.log(_newExercise);
  return await (
    await gymMaxApi.post(`/trainingPlan/exercise`, _newExercise, {
      headers: {
        Authorization: `Bearer ${localStorage[TOKEN_KEY]}`,
      },
    })
  ).data;
};
