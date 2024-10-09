import { useEffect, useState } from "react";
import { useAuthContext } from "../Apis/authContext";
import axios from "axios";
import { Outlet } from "react-router-dom";
import Loader from "../Components/Loader";

const AdminRoute = () => {
  try {
    const [ok, setOk] = useState(false);
    const [auth] = useAuthContext();
    useEffect(() => {
      const authCheck = async (token) => {
        const res = await axios.get(
          "http://localhost:8000/api/v1/auth/admin-auth",
          {
            headers: {
              Authorization: token,
            },
          }
        );
        console.log(res);
        if (res.data.ok) {
          setOk(true);
        } else {
          setOk(false);
        }
      };
      if (auth.token) {
        authCheck(auth.token);
      }
    }, [auth.token]);

    return ok ? <Outlet /> : <Loader />;
  } catch (error) {
    console.error(error);
  }
};

export default AdminRoute;
