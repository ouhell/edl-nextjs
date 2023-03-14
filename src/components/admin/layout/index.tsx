import React, { ReactNode } from "react";
import C from "@/styles/admin/layout/layout.module.scss";
const AdminLayout = ({ children }: { children: ReactNode }) => {
  return <div className={C.Layout}>{children}</div>;
};
AdminLayout.key = "admin";
export default AdminLayout;
