import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import NextLink from "next/link";

import C from "../../../styles/Shared/Navigation/NavBar.module.scss";

import { motion, AnimatePresence } from "framer-motion";

import UseResize from "../../../resources/utils/hooks/useResize";

import { SvgHandler } from "../../../resources/utils/handlers/SvgHandler";

export default function NavBar(props: {
  IsNavBarOpen: boolean;
  setIsNavBarOpen: any;
}) {
  const { IsNavBarOpen, setIsNavBarOpen } = props;

  const router = useRouter();
  const [SelectedLink, setSelectedLink] = useState<string>("Home");
  const [Theme, setTheme] = useState(false);

  const { windowWidth, windowHeight } = UseResize();

  const NavBar = {
    hidden: { opacity: 0, x: "-100%" },
    show:
      windowWidth && windowWidth > 500
        ? {
            x: 0,
            opacity: 1,
            transition: {
              type: "spring",
              stiffness: "800",
              damping: 55,
            },
          }
        : IsNavBarOpen
        ? {
            x: 0,
            opacity: 1,
            transition: {
              type: "spring",
              stiffness: "900",
              damping: 55,
            },
          }
        : {
            opacity: 0,
            x: "-100%",
            transition: { type: "spring", stiffness: "900", damping: 55 },
          },

    exit: { opacity: 0, x: "-100%", transition: { delay: 0.6 } },
  };

  const Content = {
    hidden: { opacity: 0 },
    show:
      windowWidth && windowWidth > 500
        ? {
            opacity: 1,
            transition: {
              staggerChildren: 0.2,
            },
          }
        : IsNavBarOpen
        ? {
            opacity: 1,
            transition: {
              staggerChildren: 0.2,
            },
          }
        : { opacity: 0 },

    exit: { opacity: 0, x: "-100%", transition: { delay: 0.6 } },
  };

  const Item = {
    hidden: { x: -20, opacity: 0, transition: { delay: 1 } },
    show:
      windowWidth && windowWidth > 500
        ? {
            x: 0,
            opacity: 1,
          }
        : IsNavBarOpen
        ? { x: 0, opacity: 1 }
        : { x: -20, opacity: 0 },
  };

  const ThemeButton = {
    hidden: { opacity: 0, y: -20 },
    show:
      windowWidth && windowWidth > 500
        ? {
            opacity: 1,
            y: 0,
          }
        : IsNavBarOpen
        ? {
            opacity: 1,
            y: 0,
          }
        : { opacity: 0, y: 20 },

    exit: { opacity: 0, y: -20, transition: { delay: 0.6 } },
  };

  const Links: any[] = [
    { Url: "", Img: SvgHandler.Home(), Link: "Home" },
    { Url: "archive", Img: SvgHandler.BookMark(), Link: "Archive" },
    { Url: "results", Img: SvgHandler.Results(), Link: "Results" },
  ];

  useEffect(() => {
    Links.forEach((E: any) => {
      if ("/dashboard/" + E.Url == router.pathname) {
        setSelectedLink(E.Link);
      }
    });
  }, []);

  return (
    <>
      <motion.div
        variants={NavBar}
        initial={"hidden"}
        animate={"show"}
        exit={"exit"}
        className={C.NavBar}
      >
        <div className={C.Logo}>{SvgHandler.Logo(0.4)}</div>

        <motion.div
          variants={Content}
          initial={"hidden"}
          animate={"show"}
          exit={"exit"}
          className={C.Content}
          style={{
            height: (windowHeight && windowHeight - 55) + "px",
          }}
        >
          <motion.div className={C.Links}>
            {Links.map((E) => {
              return (
                <NextLink href={`/${"student/" + E.Url}`} key={E.Link} passHref>
                  <motion.div
                    className={`${C.Link} ${
                      E.Link == SelectedLink && C.Selected
                    }`}
                    onClick={() => {
                      setSelectedLink(E.Link);
                    }}
                    variants={Item}
                  >
                    <div className={C.Image}>{E.Img}</div>

                    {E.Link === SelectedLink && (
                      <motion.div
                        className={C.Indicator}
                        layoutId="underline"
                        transition={{
                          type: "spring",
                          stiffness: 500,
                          damping: 25,
                        }}
                      />
                    )}
                  </motion.div>
                </NextLink>
              );
            })}
          </motion.div>

          <div className={C.Bottom}>
            <motion.div
              variants={ThemeButton}
              initial={"hidden"}
              animate={"show"}
              exit={"exit"}
              onClick={() => {
                setTheme(!Theme);
              }}
              className={C.ThemeButton}
            >
              <motion.div
                initial={{ bottom: "3px" }}
                animate={Theme ? { top: "3px" } : ""}
                transition={{ type: "spring", stiffness: 600, damping: 30 }}
                className={C.Indicator}
              ></motion.div>
            </motion.div>
          </div>
        </motion.div>
      </motion.div>

      <AnimatePresence>
        {IsNavBarOpen && (
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
              setIsNavBarOpen(!IsNavBarOpen);
            }}
          ></motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
