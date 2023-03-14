import { useMutation } from "react-query";

import axios from "axios";
import { RepliesRoute } from "../../utils/handlers/RoutesHandler";

import { TokenHandler } from "../../utils/handlers/TokenHandler";

export const AddReply = () => {
  return useMutation("AddReply", async (Data: object) => {
    return axios({
      url: RepliesRoute,
      method: "POST",
      headers: {
        Authorization: "Bearer " + TokenHandler.GetToken(),
      },
      data: Data,
    });
  });
};
