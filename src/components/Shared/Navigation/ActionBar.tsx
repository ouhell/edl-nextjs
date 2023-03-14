import React, { useState, useEffect } from "react";
import C from "../../../styles/Shared/Navigation/ActionBar.module.scss";

import { motion } from "framer-motion";

import { SettingsMenu } from "./SettingsMenu";
import Notifications from "./Notifications";

import { SvgHandler } from "../../../resources/utils/handlers/SvgHandler";

import { GetUser } from "@/resources/api/GetUser";
import Settings from "./Settings";

export default function ActionBar(props: {
  IsNavBarOpen: boolean;
  setIsNavBarOpen: any;
}) {
  const { IsNavBarOpen, setIsNavBarOpen } = props;

  const [IsSettingOpen, setIsSettingOpen] = useState<boolean>(false);
  const [IsNotificationOpen, setIsNotificationOpen] = useState<boolean>(false);
  const [IsSettingsOpen, setIsSettingsOpen] = useState<boolean>(false);

  const [UserName, setUserName] = useState<string | null>(null);
  const [Email, setEmail] = useState<string | null>(null);

  const { data, isError, refetch } = GetUser();

  useEffect(() => {
    if (!UserName || !Email) {
      refetch();
    }
  }, []);

  useEffect(() => {
    if (data && (!UserName || !Email)) {
      setUserName(data.data.first_name + " " + data.data.last_name);
      setEmail(data.data.user_name);
    }

    if (isError) {
      refetch();
    }
  }, [data, isError]);

  return (
    <>
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{
          opacity: 1,
          y: 0,
        }}
        exit={{ opacity: 0, y: -20 }}
        transition={{ type: "spring", stiffness: 800, damping: 50, delay: 0.2 }}
        className={C.ActionBar}
      >
        <aside className={C.LeftSide}>
          <div
            className={C.MenuButton}
            onClick={() => {
              setIsSettingOpen(false);
              setIsNotificationOpen(false);
              setIsSettingsOpen(false);
              setIsNavBarOpen(!IsNavBarOpen);
            }}
          >
            {SvgHandler.Menu()}
          </div>
        </aside>

        <aside className={C.RightSide}>
          <div
            className={`${C.SvgHolder} ${IsNotificationOpen ? C.Active : ""}`}
            onClick={() => {
              setIsSettingsOpen(false);
              setIsSettingOpen(false);
              setIsNavBarOpen(false);
              setIsNotificationOpen(!IsNotificationOpen);
            }}
          >
            {SvgHandler.Bell()}

            <motion.div
              animate={
                IsNotificationOpen
                  ? {
                      opacity: 1,
                      y: "0",
                      x: "-50%",
                    }
                  : { opacity: 0, y: "20%", x: "-50%" }
              }
              transition={{ type: "spring", stiffness: 500, damping: 30 }}
              className={C.Pointer}
            >
              {SvgHandler.ArrowPointer()}
            </motion.div>
          </div>

          <div
            className={`${C.SvgHolder} ${IsSettingOpen ? C.Active : ""}`}
            onClick={() => {
              setIsSettingsOpen(false);
              setIsNotificationOpen(false);
              setIsNavBarOpen(false);
              setIsSettingOpen(!IsSettingOpen);
            }}
          >
            {SvgHandler.GeneralSettings()}

            <motion.div
              animate={
                IsSettingOpen
                  ? {
                      opacity: 1,
                      y: "0",
                      x: "-50%",
                    }
                  : { opacity: 0, y: "20%", x: "-50%" }
              }
              transition={{ type: "spring", stiffness: 500, damping: 30 }}
              className={C.Pointer}
            >
              {SvgHandler.ArrowPointer()}
            </motion.div>
          </div>

          <div className={C.Line}></div>

          <p className={C.UserName}>{Email}</p>

          <div
            className={C.Avatar}
            onClick={() => {
              setIsSettingsOpen(!IsSettingsOpen);
              setIsSettingOpen(false);
              setIsNotificationOpen(false);
              setIsNavBarOpen(false);
            }}
          ></div>
        </aside>
      </motion.div>

      <SettingsMenu IsOpen={IsSettingsOpen} setIsOpen={setIsSettingsOpen} />

      <Notifications
        IsNotificationOpen={IsNotificationOpen}
        setIsNotificationOpen={setIsNotificationOpen}
      />

      <Settings
        IsSettingOpen={IsSettingOpen}
        setIsSettingOpen={setIsSettingOpen}
      />
    </>
  );
}
