import { ChangeEvent, FormEvent, useEffect, useState } from "react";
import router, { useRouter } from "next/router";
import Head from "next/head";

import C from "../styles/Authentication/AuthPage.module.scss";

import { SvgHandler } from "@/resources/utils/handlers/SvgHandler";
import { Input, notification } from "antd";
import { motion } from "framer-motion";

import LoginUser from "../resources/api/LoginUser";
import { TokenHandler } from "../resources/utils/handlers/TokenHandler";

import { WithAuth } from "../resources/lib/WithAuth";

import UseResize from "../resources/utils/hooks/useResize";
import { AxiosRequestConfig, AxiosResponse } from "axios";

function Login() {
  const Router = useRouter();

  const { windowHeight } = UseResize();

  const [Values, setValues] = useState({
    email: "",
    password: "",
  });

  /*************** ALERT MODEL ***************/
  const [api, contextHolder] = notification.useNotification();

  const openNotification = (Config: void) => {
    Config;
  };
  /*************** ALERT MODEL ***************/

  /*************** SETS THE VALUES ***************/
  const handleChange = (E: ChangeEvent<HTMLInputElement>) => {
    setValues({ ...Values, [E.target.name]: E.target.value });
  };
  /*************** SETS THE VALUES ***************/

  /*************** VALIDATES THE FORM  VALUES ***************/
  const ValidationHandler = () => {
    const { email, password } = Values;

    if (isLoading) {
      return false;
    }

    if (email === "" || password === "") {
      openNotification(
        api.warning({
          description: "Make Sure To Fill Out All Fields.",
          duration: 1.5,
          placement: "topRight",
          message: "",
        })
      );

      return false;
    }

    return true;
  };
  /*************** VALIDATES THE FORM  VALUES ***************/

  /*************** HANDLES THE FORM SUBMITION ***************/
  const { isLoading, data: Data, error, mutate } = LoginUser();

  const SubmitHandler = async (E: FormEvent<HTMLFormElement>) => {
    E.preventDefault();

    if (ValidationHandler()) {
      mutate({
        user_name: Values.email,
        password: Values.password,
      });
    }
  };

  interface AxiosError<T = any> extends Error {
    config: AxiosRequestConfig;
    code?: string;
    request?: any;
    response?: AxiosResponse<T>;
    isAxiosError: boolean;
    toJSON: () => object;
  }

  useEffect(() => {
    if (!isLoading) {
      if (Data) {
        openNotification(
          api.success({
            description: "Logged In Successfully",
            duration: 0.5,
            placement: "topRight",
            message: "",
          })
        );

        TokenHandler.SetToken(Data.data.token);

        setTimeout(() => {
          if (Data.data.role == "student") {
            Router.push("/student");
          }

          if (Data.data.role == "teacher") {
            Router.push("/teacher");
          }

          if (Data.data.role == "dean") {
            Router.push("/dean");
          }

          if (Data.data.role == "president") {
            Router.push("/president");
          }
        }, 500);
      }

      if (error) {
        const axiosError = error as AxiosError;
        openNotification(
          api.error({
            description: axiosError.response?.data?.message,
            duration: 1.5,
            placement: "topRight",
            message: "",
          })
        );
      }
    }
  }, [error, Data]);
  /*************** HANDLES THE FORM SUBMITION ***************/

  /*************** ANIMATION VARIANTS ***************/
  const AnimateUp = {
    Hide: { y: 15, opacity: 0 },
    Show: { y: 0, opacity: 1 },
    Exit: { opacity: 0 },
  };
  /*************** ANIMATION VARIANTS ***************/

  return (
    <>
      <Head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />

        <title>AMS | LOGIN</title>
      </Head>

      {contextHolder}

      <div className={C.AuthPage} style={{ height: windowHeight + "px" }}>
        <div className={C.LogoHolder}>{SvgHandler.Logo(0.2)}</div>

        <form
          className={C.Form}
          onSubmit={(E) => {
            SubmitHandler(E);
          }}
        >
          <motion.label
            variants={AnimateUp}
            initial={"Hide"}
            animate={"Show"}
            exit={"Exit"}
            transition={{ delay: 0.35 }}
            htmlFor="email"
            className={C.Label}
          >
            Email <span>*</span>
          </motion.label>
          <motion.div
            variants={AnimateUp}
            initial={"Hide"}
            animate={"Show"}
            exit={"Exit"}
            transition={{ delay: 0.3 }}
          >
            <input
              name="email"
              type="text"
              className={C.Input}
              value={Values.email || ""}
              onChange={(E) => handleChange(E)}
            />
          </motion.div>

          <br />

          <motion.label
            variants={AnimateUp}
            initial={"Hide"}
            animate={"Show"}
            exit={"Exit"}
            htmlFor="password"
            className={C.Label}
            transition={{ delay: 0.25 }}
          >
            Password <span>*</span>
          </motion.label>
          <motion.div
            variants={AnimateUp}
            initial={"Hide"}
            animate={"Show"}
            exit={"Exit"}
            transition={{ delay: 0.2 }}
          >
            <Input.Password
              name="password"
              type="password"
              spellCheck={false}
              value={Values.password || ""}
              onChange={(E) => handleChange(E)}
            />
          </motion.div>

          <motion.button
            variants={AnimateUp}
            initial={"Hide"}
            animate={"Show"}
            exit={"Exit"}
            whileHover={{ y: -3 }}
            whileTap={{ y: 3 }}
          >
            {isLoading ? SvgHandler.LoadingRing() : "Login Now"}
          </motion.button>
        </form>
      </div>
    </>
  );
}

export default WithAuth(Login, router);
