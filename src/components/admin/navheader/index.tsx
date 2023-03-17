import React from "react";
import C from "@/styles/admin/components/navheader.module.scss";
import MenuIcon from "@mui/icons-material/Menu";
import NotificationsIcon from "@mui/icons-material/Notifications";
import PersonIcon from "@mui/icons-material/Person";

import Avatar from "@mui/material/Avatar";
import IconButton from "@mui/material/IconButton";
import ModeSwitcher from "../ModeSwitcher";
import { useAppDispatch } from "@/resources/utils/hooks/appReduxHooks";
import { ComponentActions } from "@/resources/redux/slices/ComponentSlice";

const NavHeader = () => {
  const dispatch = useAppDispatch();
  return (
    <header className={C.Header}>
      <div className={C.Starter}>
        <IconButton
          color="info"
          onClick={() => {
            dispatch(ComponentActions.openNav());
          }}
        >
          <MenuIcon className={C.Icon} />
        </IconButton>
      </div>
      <div className={C.Ender}>
        <ModeSwitcher />

        <IconButton>
          <NotificationsIcon className={C.Icon} />
        </IconButton>

        <Avatar
          sizes=""
          sx={{
            height: 36,
            width: 36,
          }}
          /*  src="https://vietnam.postsen.com/content/uploads/2022/12/29/2e16062d62.jpg" */
        >
          <PersonIcon />
        </Avatar>
      </div>
    </header>
  );
};
export default NavHeader;
