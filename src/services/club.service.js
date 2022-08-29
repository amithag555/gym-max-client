import gymMaxApi from "../gymMaxApi";
import { TOKEN_KEY } from "../config";

export const getClubByIdService = async (_clubId) => {
  return await (
    await gymMaxApi.get(`/clubs/${_clubId}`, {
      headers: {
        Authorization: `Bearer ${localStorage[TOKEN_KEY]}`,
      },
    })
  ).data;
};

export const incrementClubCountByIdService = async (_clubId) => {
  return await (
    await gymMaxApi.put(
      `/clubs/increment/${_clubId}`,
      {},
      {
        headers: {
          Authorization: `Bearer ${localStorage[TOKEN_KEY]}`,
        },
      }
    )
  ).data;
};

export const decrementClubCountByIdService = async (_clubId) => {
  return await (
    await gymMaxApi.put(
      `/clubs/decrement/${_clubId}`,
      {},
      {
        headers: {
          Authorization: `Bearer ${localStorage[TOKEN_KEY]}`,
        },
      }
    )
  ).data;
};
