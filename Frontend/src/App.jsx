import React from "react";
import { Route, Routes } from "react-router-dom";
import Home from "./Pages/Home";
import Login from "./Pages/Login";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer } from "react-toastify";
import Register from "./Pages/Register";
import NotFound from "./Pages/NotFound";
import AdminRoute from "./Routes/AdminRoute";
import AdminDashboard from "./Pages/AdminDashboard";
import Categories from "./Pages/Categories";
import Slides from "./Pages/Slides";
import SubCategories from "./Pages/SubCategories";
import AdminStores from "./Pages/AdminStores";
import Showrooms from "./Pages/Showrooms";

const App = () => {
  return (
    <>
      <ToastContainer position="bottom-left" />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="*" element={<NotFound />} />
        <Route path="/dashboard" element={<AdminRoute />}>
          <Route path="" element={<AdminDashboard />} />
          <Route path="manage-category" element={<Categories />} />
          <Route path="manage-sub-category" element={<SubCategories />} />
          <Route path="slides" element={<Slides />} />
          <Route path="stores" element={<AdminStores />} />
        </Route>
        <Route path="/showrooms" element={<Showrooms/>} />
      </Routes>
    </>
  );
};

export default App;
