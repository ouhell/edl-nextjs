import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";

import { TokenHandler } from "../utils/handlers/TokenHandler";

import { GetUser } from "../api/GetUser";

import IsLoading from "../../components/Shared/Navigation/IsLoading";

export const WithAuth = (WrappedComponent: any, Router: any) => {
  const AuthComponent = (props: any) => {
    const [CanLoad, setCanLoad] = useState<boolean>(false);
    const [Token, setToken] = useState<string | null>("");

    const { refetch, isError, isSuccess, data } = GetUser();

    const LoadPage = () => {
      if (Token == null && Router.pathname.includes("login")) {
        setCanLoad(true);
      }

      if (Token) {
        if (Router.pathname.includes("/" + data?.data.role)) {
          setCanLoad(true);
        }
      }
    };

    const Load = () => {
      if (isError) {
        console.clear();

        TokenHandler.ClearToken();
        setToken(null);

        Router.push("/login");
      }

      if (isSuccess) {
        if (!Router.pathname.includes("/" + data?.data.role)) {
          console.clear();

          Router.push("/" + data?.data.role);
        }

        LoadPage();
      }
    };

    useEffect(() => {
      setToken(TokenHandler.GetToken());
    }, []);

    useEffect(() => {
      if (Token) {
        refetch();
      } else if (Token == null) {
        LoadPage();

        Router.push("/login");
      }

      if (TokenHandler.GetToken() == "") {
        TokenHandler.ClearToken();
        setToken(null);
      }
    }, [Token]);

    useEffect(() => {
      Load();
    }, [isSuccess, isError, data]);

    if (CanLoad) {
      return <WrappedComponent {...props} />;
    } else {
      return <IsLoading />;
    }
  };

  return AuthComponent;
};
