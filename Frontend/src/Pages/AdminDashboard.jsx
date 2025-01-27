import React from "react";
import Layout from "../Layout/Layout";
import AdminMenu from "../Components/AdminMenu";

const AdminDashboard = () => {
  return (
    <Layout>
      <div className="flex">
        <div className="basis-1/4">
          <AdminMenu />
        </div>
        <div className="basis-3/4">Content</div>
      </div>
    </Layout>
  );
};

export default AdminDashboard;
