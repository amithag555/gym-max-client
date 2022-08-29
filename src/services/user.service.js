import gymMaxApi from "../gymMaxApi";
import { TOKEN_KEY } from "../config";

export const getUserByTokenUsernameService = async (_token) => {
  return await (
    await gymMaxApi.get(`/users/byToken`, {
      headers: {
        Authorization: `Bearer ${localStorage[TOKEN_KEY]}`,
      },
    })
  ).data;
};

export const getUsersByPageNumberAndPerPageService = async (_payload) => {
  return await (
    await gymMaxApi.get(`/users/byPage?page=${_payload.pageNumber}&perPage=${_payload.perPage}`, {
      headers: {
        Authorization: `Bearer ${localStorage[TOKEN_KEY]}`,
      },
    })
  ).data;
};

export const getUsersByUsernameService = async (_payload) => {
  return await (
    await gymMaxApi.get(`/users/search/?q=${_payload.q}&page=${_payload.pageNumber}&perPage=${_payload.perPage}`, {
      headers: {
        Authorization: `Bearer ${localStorage[TOKEN_KEY]}`,
      },
    })
  ).data;
};

export const getUsersCountService = async () => {
  return await (
    await gymMaxApi.get(`/users/usersCount`, {
      headers: {
        Authorization: `Bearer ${localStorage[TOKEN_KEY]}`,
      },
    })
  ).data;
};

export const getSearchUsersCountService = async (_searchText) => {
  return await (
    await gymMaxApi.get(`/users/searchUsersCount?q=${_searchText}`, {
      headers: {
        Authorization: `Bearer ${localStorage[TOKEN_KEY]}`,
      },
    })
  ).data;
};

export const createUserService = async (_newUser) => {
  return await (
    await gymMaxApi.post(`/users`, _newUser, {
      headers: {
        Authorization: `Bearer ${localStorage[TOKEN_KEY]}`,
      },
    })
  ).data;
};

export const editUserByIdService = async (_payload) => {
  return await (
    await gymMaxApi.put(`/users/${_payload.userId}`, _payload.userToEdit, {
      headers: {
        Authorization: `Bearer ${localStorage[TOKEN_KEY]}`,
      },
    })
  ).data;
};

export const updatePasswordService = async (_payload) => {
  return await (
    await gymMaxApi.put(`/users/password/${_payload.userId}`, _payload.newPassword, {
      headers: {
        Authorization: `Bearer ${localStorage[TOKEN_KEY]}`,
      },
    })
  ).data;
};

export const deleteUserByIdService = async (_userId) => {
  return await (
    await gymMaxApi.delete(`/users/${_userId}`, {
      headers: {
        Authorization: `Bearer ${localStorage[TOKEN_KEY]}`,
      },
    })
  ).data;
};
