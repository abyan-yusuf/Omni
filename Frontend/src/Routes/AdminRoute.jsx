import { useEffect, useState } from "react";
import { useAuthContext } from "../Apis/authContext";
import axios from "axios";
import { Outlet } from "react-router-dom";
import Loader from "../Components/Loader";

const AdminRoute = () => {
  try {
    const [ok, setOk] = useState(false);
    const [je, setJe] = useState(false);
    const [auth, setAuth] = useAuthContext();
    useEffect(() => {
      const authCheck = async (token) => {
        const res = await axios.get(
          "https://omni-yxd5.onrender.com/api/v1/auth/admin-auth",
          {
            headers: {
              Authorization: token,
            },
          }
        );
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
    console.log(error);
  }
};

export default AdminRoute;
