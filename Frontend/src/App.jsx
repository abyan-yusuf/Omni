import React, { useEffect } from "react";
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
import ShowroomDetails from "./Pages/ShowroomDetails";
import AdminColors from "./Pages/AdminColors";
import AdminSizes from "./Pages/AdminSizes";
import AdminProducts from "./Pages/AdminProducts";
import AdminProductDetails from "./Pages/AdminProductDetails";
import { getDivisions } from "./data";
import ProductDetails from "./Pages/ProductDetails";
import CategoriesProducts from "./Pages/CategoriesProducts";
import SubCategoryProducts from "./Pages/SubCategoryProducts";
import AdminDirectors from "./Pages/AdminDirectors";

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
          <Route path="colors" element={<AdminColors />} />
          <Route path="sizes" element={<AdminSizes />} />
          <Route path="products" element={<AdminProducts />} />
          <Route
            path="products/details/:id"
            element={<AdminProductDetails />}
          />{" "}
          <Route path="directors" element={<AdminDirectors />} />
        </Route>

        <Route path="/showrooms" element={<Showrooms />} />
        <Route path="/showrooms/details/:id" element={<ShowroomDetails />} />
        <Route path="/products/details/:id" element={<ProductDetails />} />
        <Route path="/category/:cid" element={<CategoriesProducts />} />
        <Route path="/sub-category/:sid" element={<SubCategoryProducts />} />
      </Routes>
    </>
  );
};

export default App;
