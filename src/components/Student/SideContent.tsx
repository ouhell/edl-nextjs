import React from "react";

import C from "./../../styles/Student/Home/SideContent.module.scss";

import { motion } from "framer-motion";

import UseResize from "@/resources/utils/hooks/useResize";

export default function SideContent() {
  const { windowHeight } = UseResize();

  return (
    <motion.div
      initial={{ x: -20, opacity: 0 }}
      animate={{ x: 0, opacity: 1, transition: { delay: 0.4 } }}
      exit={{ opacity: 0, x: -20 }}
      className={`${C.SideContent} ${"NoScroll"}`}
      style={{ height: (windowHeight && windowHeight - 55) + "px" }}
    >
      <div className={C.ArchiveSection}>
        <div className={C.Content}></div>

        <div className={C.MoreButton}>
          <p>View More</p>
        </div>
      </div>

      <div className={`${C.PlanningSection}`}>
        <p className={C.Title}>Exam Dates</p>

        <Plan />

        <Plan />

        <Plan />
      </div>
    </motion.div>
  );
}

const Plan = () => {
  return (
    <div className={C.Plan}>
      <div className={C.Date}>
        <p className={C.Day}>28</p>

        <p className={C.Month}>JUN</p>
      </div>

      <div className={C.Info}>
        <div className={C.Module}>Chemie Analytique</div>

        <p className={C.Time}>
          <span>At</span> <span className={C.TheTime}>14:30 PM</span>
        </p>
      </div>
    </div>
  );
};
