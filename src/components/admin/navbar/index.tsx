import React, { useState } from "react";
import C from "@/styles/admin/components/navbar.module.scss";
import BarChartIcon from "@mui/icons-material/BarChart";
import PersonIcon from "@mui/icons-material/Person";
import GroupIcon from "@mui/icons-material/Group";
import KeyboardArrowLeftIcon from "@mui/icons-material/KeyboardArrowLeft";
import { OverridableComponent } from "@mui/material/OverridableComponent";
import { SvgIconTypeMap } from "@mui/material/SvgIcon";
import { motion } from "framer-motion";
import { IconButton, Tooltip } from "@mui/material";
import classNames from "classnames";
import { useRouter } from "next/router";
import Link from "next/link";
import {
  useAppDispatch,
  useAppSelector,
} from "@/resources/utils/hooks/appReduxHooks";
import { Variants } from "framer-motion";
import UseResize from "@/resources/utils/hooks/useResize";
import { ComponentActions } from "@/resources/redux/slices/ComponentSlice";
import { width } from "@mui/system";
/* type Functionality = {
  name: string;
  to: string;
  icon: OverridableComponent<SvgIconTypeMap> & { muiName: string };
}; */

type NavigationGroup = {
  name: string;
  icon: OverridableComponent<SvgIconTypeMap> & { muiName: string };
  to: string;
};

const NavigationGroups: NavigationGroup[] = [
  {
    name: "Accounts",
    icon: GroupIcon,
    to: "/admin/accounts",
  },
];

const navigationAnimations: Variants = {
  open: {
    x: 0,
    opacity: 1,
    transition: {
      stiffness: 900,
      damping: 40,
    },
  },
  mobileOpen: {
    x: 0,
    opacity: 1,
    position: "fixed",
    transition: {
      stiffness: 900,
      damping: 40,
    },
  },
  minimized: {
    minWidth: "4rem",
    x: 0,
    opacity: 1,
    transition: {
      stiffness: 900,
      damping: 40,
    },
  },
  "closed&minimized": {
    position: "fixed",
    x: "-100%",
    minWidth: "4rem",
    transition: {
      stiffness: 900,
      damping: 40,
    },
  },
  closed: {
    position: "fixed",
    x: "-100%",
    transition: {
      stiffness: 900,
      damping: 40,
    },
  },
};

const NavBar = ({}) => {
  const [isMinimized, setIsMinimized] = useState<boolean>(false);
  const { windowWidth } = UseResize();
  const isOpen = useAppSelector((state) => state.component.isNavOpen);
  const router = useRouter();

  const dispatch = useAppDispatch();

  const isClosed = windowWidth <= 700 && !isOpen;
  const showMini =
    (isMinimized && windowWidth > 700) ||
    (windowWidth > 700 && windowWidth < 1000);
  const isMobileOpen = isOpen && windowWidth < 700;

  const animation = isClosed
    ? "closed"
    : showMini
    ? "minimized"
    : isMobileOpen
    ? "mobileOpen"
    : "open";

  return (
    <motion.nav
      variants={navigationAnimations}
      initial={{
        minWidth: "16rem",
        x: "-100%",
        opacity: 0,
      }}
      animate={animation}
      className={classNames({
        [C.NavBar]: true,
        [C.Mini]: showMini,
      })}
    >
      <Link href={"/admin"}>
        <header className={C.Header}>
          <Tooltip
            title={showMini ? "Dashboard" : undefined}
            placement="right-start"
          >
            <BarChartIcon className={C.Icon} />
          </Tooltip>

          <motion.div
            animate={
              showMini
                ? {
                    opacity: 0,
                    width: 0,
                  }
                : {
                    opacity: 1,
                    width: "auto",
                  }
            }
            className={C.Title}
          >
            Dashboard
          </motion.div>
        </header>
      </Link>

      <div className={C.Separator} />
      <main className={C.Main}>
        <ul className={C.NavigationGroups}>
          {NavigationGroups.map((group) => {
            return (
              <li key={group.name}>
                <div className={C.NavigationGroup}>
                  <Link href={group.to}>
                    <motion.div
                      whileHover={{
                        backgroundColor: "rgba(255,255,255,.08)",
                      }}
                      className={classNames({
                        [C.ToggleTag]: true,
                        [C.active]: router.pathname === group.to,
                      })}
                    >
                      <div className={C.GroupIdentidier}>
                        {
                          <Tooltip
                            title={showMini ? group.name : undefined}
                            placement="right-start"
                          >
                            <group.icon className={C.Icon} />
                          </Tooltip>
                        }
                        <motion.div
                          animate={
                            showMini
                              ? {
                                  opacity: 0,
                                  width: 0,
                                }
                              : {
                                  opacity: 1,
                                  width: "auto",
                                }
                          }
                          className={C.GroupTitle}
                        >
                          {group.name}
                        </motion.div>
                      </div>
                    </motion.div>
                  </Link>
                </div>
              </li>
            );
          })}
        </ul>
      </main>
      <footer
        onClick={() => {
          if (windowWidth <= 700) {
            dispatch(ComponentActions.closeNav());
          } else {
            setIsMinimized((value) => !value);
          }
        }}
        className={C.Footer}
      >
        <KeyboardArrowLeftIcon
          style={{
            rotate: showMini ? "-180deg" : "0deg",
          }}
          className={C.Icon}
        />
      </footer>
    </motion.nav>
  );
};

export default NavBar;
