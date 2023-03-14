import React from "react";

import C from "../../../styles/Shared/Navigation/Notifications.module.scss";

import { motion, AnimatePresence } from "framer-motion";

import UseResize from "@/resources/utils/hooks/useResize";

export default function Notifications(props: {
  IsNotificationOpen: boolean;
  setIsNotificationOpen: any;
}) {
  const { IsNotificationOpen, setIsNotificationOpen } = props;

  const { windowHeight } = UseResize();

  return (
    <AnimatePresence>
      {IsNotificationOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ type: "spring", stiffness: 600, damping: 40 }}
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              height: (windowHeight && windowHeight - 55) + "px",
            }}
            className={C.Notifications}
          >
            <motion.p
              initial={{ y: -5, opacity: 0 }}
              animate={{ y: 5, opacity: 1 }}
              exit={{ y: -5, opacity: 0 }}
            >
              NOTIFICATIONS
            </motion.p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ type: "spring", stiffness: 600, damping: 40 }}
            className={C.BackDrop}
            style={{
              height: (windowHeight && windowHeight - 55) + "px",
            }}
            onClick={() => {
              setIsNotificationOpen(!IsNotificationOpen);
            }}
          ></motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
