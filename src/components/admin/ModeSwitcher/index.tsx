import React, { useState } from "react";
import LightModeIcon from "@mui/icons-material/LightMode";
import ModeNightIcon from "@mui/icons-material/ModeNight";
import { motion } from "framer-motion";
import C from "@/styles/admin/components/ModeSwitcher.module.scss";
import {
  useAppDispatch,
  useAppSelector,
} from "@/resources/utils/hooks/appReduxHooks";
import { ComponentActions } from "@/resources/redux/slices/ComponentSlice";

const ModeSwitcher = () => {
  const { mode } = useAppSelector((state) => state.component);
  const dispatch = useAppDispatch();
  const switchMod = () => {
    if (mode === "dark") dispatch(ComponentActions.setMod("light"));
    else dispatch(ComponentActions.setMod("dark"));
  };
  return (
    <div className={C.ModeSwitch} onClick={switchMod}>
      <LightModeIcon className={C.Icon} />
      <ModeNightIcon className={C.Icon} />
      <motion.div
        layoutId="modeball"
        theme-mode={mode}
        className={C.Ball}
      ></motion.div>
    </div>
  );
};

export default ModeSwitcher;
