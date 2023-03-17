import { useState, useEffect } from "react";

type WindowDimentions = {
  windowHeight: number;
  windowWidth: number;
};

export default function UseResize() {
  const [dimentions, setDimentions] = useState<WindowDimentions>({
    windowHeight: window.innerHeight,
    windowWidth: window.innerWidth,
  });
  const setWindowDimensions = () => {
    setDimentions({
      windowHeight: window.innerHeight,
      windowWidth: window.innerWidth,
    });
  };

  useEffect(() => {
    window.addEventListener("resize", setWindowDimensions);

    return () => {
      window.removeEventListener("resize", setWindowDimensions);
    };
  }, []);

  return dimentions;
}
