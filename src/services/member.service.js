import gymMaxApi from "../gymMaxApi";
import { TOKEN_KEY } from "../config";

export const getAllMembers = async () => {
  return await (
    await gymMaxApi.get(`/members`, {
      headers: {
        Authorization: `Bearer ${localStorage[TOKEN_KEY]}`,
      },
    })
  ).data;
};

export const getMemberByIdService = async (_memberId) => {
  return await (
    await gymMaxApi.get(`/members/${_memberId}`, {
      headers: {
        Authorization: `Bearer ${localStorage[TOKEN_KEY]}`,
      },
    })
  ).data;
};

export const getMemberByTokenEmailService = async (_token) => {
  return await (
    await gymMaxApi.get(`/members/byToken`, {
      headers: {
        Authorization: `Bearer ${_token}`,
      },
    })
  ).data;
};

export const getMembersByPageNumberAndPerPageService = async (_payload) => {
  return await (
    await gymMaxApi.get(`/members/byPage?page=${_payload.pageNumber}&perPage=${_payload.perPage}`, {
      headers: {
        Authorization: `Bearer ${localStorage[TOKEN_KEY]}`,
      },
    })
  ).data;
};

export const getMembersByNameOrPhoneNumberService = async (_payload) => {
  return await (
    await gymMaxApi.get(`/members/search/?q=${_payload.q}&page=${_payload.pageNumber}&perPage=${_payload.perPage}`, {
      headers: {
        Authorization: `Bearer ${localStorage[TOKEN_KEY]}`,
      },
    })
  ).data;
};

export const getMembersCountService = async () => {
  return await (
    await gymMaxApi.get(`/members/membersCount`, {
      headers: {
        Authorization: `Bearer ${localStorage[TOKEN_KEY]}`,
      },
    })
  ).data;
};

export const getSearchMembersCountService = async (_searchText) => {
  return await (
    await gymMaxApi.get(`/members/searchMembersCount?q=${_searchText}`, {
      headers: {
        Authorization: `Bearer ${localStorage[TOKEN_KEY]}`,
      },
    })
  ).data;
};

export const createMemberService = async (_newMember) => {
  return await (
    await gymMaxApi.post(`/members`, _newMember, {
      headers: {
        Authorization: `Bearer ${localStorage[TOKEN_KEY]}`,
      },
    })
  ).data;
};

export const editMemberByIdService = async (_payload) => {
  return await (
    await gymMaxApi.put(`/members/${_payload.memberId}`, _payload.memberToEdit, {
      headers: {
        Authorization: `Bearer ${localStorage[TOKEN_KEY]}`,
      },
    })
  ).data;
};

export const updateImgUrlService = async (_payload) => {
  return await (
    await gymMaxApi.put(`/members/imgUrl/${_payload.memberId}`, _payload.newImgUrl, {
      headers: {
        Authorization: `Bearer ${localStorage[TOKEN_KEY]}`,
      },
    })
  ).data;
};

export const updatePasswordService = async (_newPassword) => {
  console.log(_newPassword);
  return await (
    await gymMaxApi.put(`/members/password`, _newPassword, {
      headers: {
        Authorization: `Bearer ${localStorage[TOKEN_KEY]}`,
      },
    })
  ).data;
};

export const changeIsEntryService = async () => {
  return await (
    await gymMaxApi.put(
      `/members/isEntry`,
      {},
      {
        headers: {
          Authorization: `Bearer ${localStorage[TOKEN_KEY]}`,
        },
      }
    )
  ).data;
};

export const deleteMemberByIdService = async (_memberId) => {
  return await (
    await gymMaxApi.put(
      `/members/delete/${_memberId}`,
      {},
      {
        headers: {
          Authorization: `Bearer ${localStorage[TOKEN_KEY]}`,
        },
      }
    )
  ).data;
};
