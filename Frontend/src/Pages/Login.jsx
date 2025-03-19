import React from "react";
import Layout from "../Layout/Layout";
import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import axios from "axios";
import { toast } from "react-toastify";
import { useAuthContext } from "../Apis/authContext";

const Login = () => {
  const { register, handleSubmit } = useForm();
  const navigate = useNavigate();
  const [auth, setAuth] = useAuthContext();
  const onSubmit = async (data) => {
    try {
      let response = await axios.post(
        "https://backend.omnishoesbd.com/api/v1/auth/login",
        data
      );
      if (response.data.message === "Logged in successfully") {
        toast.success("Successfully logged in");
        localStorage.setItem("auth", JSON.stringify(response?.data));
        navigate("/");
      }
      setAuth({
        user: response?.data?.allInfo,
        token: response?.data?.token,
      });
    } catch (error) {
      console.error(error);
      toast.error(error?.response?.data?.message);
    }
  };
  return (
    <Layout classname="bg-footer flex justify-center items-center min-h-[90vh!important]">
      <div className="flex min-h-full bg-[#FDF6F0] w-5/12 flex-col justify-center px-32  py-16 lg:px-8">
        <div className="sm:mx-auto sm:w-full sm:max-w-sm">
          <h1
            className="font-['Roboto'] font-medium text-2xl text-center"
            to={"/"}
          >
            Welcome to Omni!
          </h1>
        </div>
        <div className="">

        </div>
        <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
          <form
            action="#"
            onSubmit={handleSubmit(onSubmit)}
            method="POST"
            className="space-y-6"
          >
            <div>
              <div className="mt-2 flex">
              <Link
              to="/login"
                type="submit"
                className="flex w-full justify-center bg-[#D80032] px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-red-600 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 basis-1/2"
              >
                Sign In
              </Link>
              <Link
              to="/register"
                type="submit"
                className="flex w-full justify-center px-3 py-1.5 text-sm font-semibold leading-6 text-black shadow-sm hover:bg-slate-100 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 basis-1/2 border-2"
              >
                Sign Up
              </Link>
              </div>
            </div>
            <div>
              <div className="mt-2">
                <input
                  id="email"
                  name="email"
                  type="email"
                  required
                  {...register("email")}
                  autoComplete="email"
                  className="block w-full border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 px-2"
                />
              </div>
            </div>
            <div>
              <div className="mt-2">
                <input
                  {...register("password")}
                  id="password"
                  name="password"
                  type="password"
                  required
                  autoComplete="current-password"
                  className="block w-full border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 px-2"
                />
              </div>
              <div className="flex items-center justify-between mt-2">
                <div className="text-sm">
                  <a
                    href="#"
                    className="text-black transition-colors hover:text-indigo-500"
                  >
                    Forgot password?
                  </a>
                </div>
              </div>
            </div>

            <div>
              <button
                type="submit"
                className="flex w-full justify-center bg-[#D80032] px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-red-600 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
              >
                Sign In
              </button>
            </div>
          </form>
        </div>
      </div>
    </Layout>
  );
};

export default Login;
