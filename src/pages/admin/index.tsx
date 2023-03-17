import React from "react";
import C from "@/styles/admin/pages/index.module.scss";
import AdminLayout from "@/components/admin/layout";

const Admin = () => {
  return (
    <div className={C.Accounts}>
      <section className={C.AccountsHolder}></section>
    </div>
  );
};

Admin.layout = AdminLayout;

export default Admin;
