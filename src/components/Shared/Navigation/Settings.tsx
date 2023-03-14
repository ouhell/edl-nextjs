import React from "react";

import C from "../../../styles/Shared/Navigation/Settings.module.scss";

import { motion, AnimatePresence } from "framer-motion";

import UseResize from "@/resources/utils/hooks/useResize";

export default function Settings(props: {
  IsSettingOpen: boolean;
  setIsSettingOpen: any;
}) {
  const { IsSettingOpen, setIsSettingOpen } = props;

  const { windowHeight } = UseResize();

  return (
    <AnimatePresence>
      {IsSettingOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ type: "spring", stiffness: 800, damping: 40 }}
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              height: (windowHeight && windowHeight - 55) + "px",
            }}
            className={C.Settings}
          >
            <motion.p
              initial={{ y: -5, opacity: 0 }}
              animate={{ y: 5, opacity: 1 }}
              exit={{ y: -5, opacity: 0 }}
            >
              SETTINGS
            </motion.p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ type: "spring", stiffness: 800, damping: 40 }}
            className={C.BackDrop}
            style={{
              height: (windowHeight && windowHeight - 55) + "px",
            }}
            onClick={() => {
              setIsSettingOpen(!IsSettingOpen);
            }}
          ></motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
