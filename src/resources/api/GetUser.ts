import { useQuery } from "react-query";

import axios from "axios";
import { UserRoute } from "../utils/handlers/RoutesHandler";

import { TokenHandler } from "../utils/handlers/TokenHandler";

export const GetUser = () => {
  const { data, error, isSuccess, isError, isFetching, refetch } = useQuery(
    "GetUser",
    async () => {
      return axios({
        url: UserRoute,
        method: "GET",
        headers: {
          Authorization: "Bearer " + TokenHandler.GetToken(),
        },
      });
    },
    { enabled: false }
  );

  return { data, error, refetch, isSuccess, isFetching, isError };
};
