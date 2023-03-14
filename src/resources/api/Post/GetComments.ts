import { useMutation } from "react-query";

import axios from "axios";
import { CommentsRoute } from "../../utils/handlers/RoutesHandler";

import { TokenHandler } from "../../utils/handlers/TokenHandler";

export const GetComments = () => {
  return useMutation("GetComments", async (Post: string) => {
    return axios({
      url: CommentsRoute + Post,
      method: "GET",
      headers: {
        Authorization: "Bearer " + TokenHandler.GetToken(),
      },
    });
  });
};
