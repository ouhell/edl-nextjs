import React, { ReactNode } from "react";
import C from "@/styles/admin/layout/layout.module.scss";
import NavBar from "@/components/admin/navbar";
import NavHeader from "../navheader";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import Head from "next/head";
import { useAppSelector } from "../../../resources/utils/hooks/appReduxHooks";
import dynamic from "next/dynamic";

export type Layout<P> = React.ComponentType<P> & {
  key: string;
};

type BasicProps = { children: ReactNode };

const AdminLayout: Layout<BasicProps> = ({ children }) => {
  const { mode } = useAppSelector((state) => state.component);
  const theme = createTheme({
    palette: {
      mode,
    },
  });

  return (
    <>
      <Head>
        <title>Admin</title>
      </Head>
      <div className={C.Layout} theme-mode={mode}>
        <ThemeProvider theme={theme}>
          <NavBar />
          <main className={C.Main}>
            <NavHeader />
            <div className={C.Content}> {children}</div>
          </main>
        </ThemeProvider>
      </div>
    </>
  );
};
AdminLayout.key = "admin";
const DynamicAdminLayout = dynamic(() => Promise.resolve(AdminLayout), {
  ssr: false,
});
export default DynamicAdminLayout;
