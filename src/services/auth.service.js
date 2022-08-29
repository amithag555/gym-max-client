import gymMaxApi from "../gymMaxApi";

export const userLoginService = async (_userDetails) => {
  console.log(_userDetails);
  return await (
    await gymMaxApi.post(`/auth/userLogin`, _userDetails)
  ).data;
};

export const memberLoginService = async (_memberDetails) => {
  console.log(_memberDetails);
  return await (
    await gymMaxApi.post(`/auth/memberLogin`, _memberDetails)
  ).data;
};
