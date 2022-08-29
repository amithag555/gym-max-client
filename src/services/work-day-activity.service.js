import gymMaxApi from "../gymMaxApi";
import { TOKEN_KEY } from "../config";

export const getWorkDayActivityByDateService = async (_date) => {
  console.log(_date);
  return await (
    await gymMaxApi.get(`/workDayActivity/byDate?q=${_date}`, {
      headers: {
        Authorization: `Bearer ${localStorage[TOKEN_KEY]}`,
      },
    })
  ).data;
};
