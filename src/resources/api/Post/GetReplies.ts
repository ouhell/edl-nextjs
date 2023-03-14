import { useMutation } from "react-query";

import axios from "axios";
import { RepliesRoute } from "../../utils/handlers/RoutesHandler";

import { TokenHandler } from "../../utils/handlers/TokenHandler";

export const GetReplies = () => {
  return useMutation("GetReplies", async (Comment: string) => {
    return axios({
      url: RepliesRoute + Comment,
      method: "GET",
      headers: {
        Authorization: "Bearer " + TokenHandler.GetToken(),
      },
    });
  });
};
