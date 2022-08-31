import gymMaxApi from "../gymMaxApi";
import { TOKEN_KEY } from "../config";

export const getAllGymClassesService = async () => {
  return await (
    await gymMaxApi.get(`/gymClasses`, {
      headers: {
        Authorization: `Bearer ${localStorage[TOKEN_KEY]}`,
      },
    })
  ).data;
};

export const getGymClassesByDayService = async (_gymClassDay) => {
  return await (
    await gymMaxApi.get(`/gymClasses/${_gymClassDay}`, {
      headers: {
        Authorization: `Bearer ${localStorage[TOKEN_KEY]}`,
      },
    })
  ).data;
};

export const editGymClassService = async (_gymClassToEdit, _id) => {
  return await (
    await gymMaxApi.put(`/gymClasses/edit/${_id}`, _gymClassToEdit, {
      headers: {
        Authorization: `Bearer ${localStorage[TOKEN_KEY]}`,
      },
    })
  ).data;
};

export const deleteGymClassService = async (_gymClassId) => {
  return await (
    await gymMaxApi.delete(`/gymClasses/${_gymClassId}`, {
      headers: {
        Authorization: `Bearer ${localStorage[TOKEN_KEY]}`,
      },
    })
  ).data;
};

export const createGymClassService = async (_newGymClass) => {
  return await (
    await gymMaxApi.post(`/gymClasses`, _newGymClass, {
      headers: {
        Authorization: `Bearer ${localStorage[TOKEN_KEY]}`,
      },
    })
  ).data;
};

export const addMemberToGymClassService = async (_gymClassId, _memberId) => {
  return await (
    await gymMaxApi.put(
      `/gymClasses/addMember/${_gymClassId}/${_memberId}`,
      {},
      {
        headers: {
          Authorization: `Bearer ${localStorage[TOKEN_KEY]}`,
        },
      }
    )
  ).data;
};

export const removeMemberFromGymClassService = async (_gymClassId, _memberId) => {
  return await (
    await gymMaxApi.put(
      `/gymClasses/removeMember/${_gymClassId}/${_memberId}`,
      {},
      {
        headers: {
          Authorization: `Bearer ${localStorage[TOKEN_KEY]}`,
        },
      }
    )
  ).data;
};
