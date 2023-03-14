import { useState, useEffect } from "react";
import { WithAuth } from "../../resources/lib/WithAuth";
import router from "next/router";

import UseResize from "../../resources/utils/hooks/useResize";
import ActionBar from "../Shared/Navigation/ActionBar";

import NavBar from "../Shared/Navigation/NavBar";

const StudentLayout = (props: { children: any }) => {
  const { children } = props;

  const [IsNavBarOpen, setIsNavBarOpen] = useState<boolean>(false);

  const { windowHeight } = UseResize();

  return (
    <div
      style={{
        display: "flex",
        height: windowHeight + "px",
        overflow: "hidden",
      }}
    >
      <NavBar IsNavBarOpen={IsNavBarOpen} setIsNavBarOpen={setIsNavBarOpen} />

      <div
        style={{
          width: "100%",
        }}
      >
        <ActionBar
          IsNavBarOpen={IsNavBarOpen}
          setIsNavBarOpen={setIsNavBarOpen}
        />
        {children}
      </div>
    </div>
  );
};

export default WithAuth(StudentLayout, router);
