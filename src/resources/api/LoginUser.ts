import { useMutation } from "react-query";

import axios from "axios";
import { LoginRoute } from "../utils/handlers/RoutesHandler";

export default function LoginUser() {
  return useMutation("LoginUser", async (Data: object) => {
    return axios({
      url: LoginRoute,
      method: "POST",
      data: Data,
    });
  });
}
