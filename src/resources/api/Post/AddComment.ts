import { useMutation } from "react-query";

import axios from "axios";
import { CommentsRoute } from "../../utils/handlers/RoutesHandler";

import { TokenHandler } from "../../utils/handlers/TokenHandler";

export const AddComment = () => {
  return useMutation("AddComment", async (Data: object) => {
    return axios({
      url: CommentsRoute,
      method: "POST",
      headers: {
        Authorization: "Bearer " + TokenHandler.GetToken(),
      },
      data: Data,
    });
  });
};
