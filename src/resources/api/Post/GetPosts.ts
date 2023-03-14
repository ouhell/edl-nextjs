import { useQuery } from "react-query";

import axios from "axios";
import { PostsRoute } from "../../utils/handlers/RoutesHandler";

import { TokenHandler } from "../../utils/handlers/TokenHandler";

export const GetPosts = () => {
  const { data, error, isSuccess, isError, isFetching, refetch } = useQuery(
    "GetPosts",
    async () => {
      return axios({
        url: PostsRoute,
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
