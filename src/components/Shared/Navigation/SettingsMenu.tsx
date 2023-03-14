import * as React from "react";
import { useState, useEffect } from "react";
import Link from "next/link";

import C from "../../../styles/Shared/Navigation/SettingsMenu.module.scss";

import { motion, AnimatePresence } from "framer-motion";

import { TokenHandler } from "../../../resources/utils/handlers/TokenHandler";
import { SettingsMenuContent } from "@/resources/utils/handlers/ContentHandler";
import UseResize from "../../../resources/utils/hooks/useResize";

interface Props {
  IsOpen: boolean;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

export const SettingsMenu: React.FC<Props> = ({ IsOpen, setIsOpen }) => {
  const { windowWidth } = UseResize();

  return (
    <AnimatePresence>
      {IsOpen && (
        <motion.div
          initial={{ width: 0, height: 0, opacity: 0 }}
          animate={
            windowWidth && windowWidth <= 450
              ? { width: `${windowWidth - 32}px`, height: "auto", opacity: 1 }
              : { width: "280px", height: "auto", opacity: 1 }
          }
          transition={{ type: "spring", stiffness: 600, damping: 40 }}
          exit={{ width: 0, height: 0, opacity: 0 }}
          className={C.SettingsMenu}
        >
          {SettingsMenuContent().map((E) => (
            <Link href={E.Url} passHref key={E.Url}>
              <div
                className={C.Button}
                onClick={() => {
                  setIsOpen(false);
                  if (E.Url == "/login") {
                    TokenHandler.ClearToken();
                  }
                }}
                style={E.IsMarginBottom ? { marginBottom: "1.2rem" } : {}}
              >
                <div className={C.SvgHolder}>{E.Image}</div>

                <p>{E.Title}</p>
              </div>
            </Link>
          ))}
        </motion.div>
      )}
    </AnimatePresence>
  );
};
