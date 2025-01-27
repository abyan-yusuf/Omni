import { useEffect, useState } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { useAuthContext } from "../Apis/authContext";
import { toast } from "react-toastify";
import useCategories from "../Hooks/useCategories";
import { useCartContext } from "../Apis/cartContext";

const Navbar = () => {
  const [auth, setAuth] = useAuthContext();
  const navigate = useNavigate();
  const [navbar, setNavbar] = useState(false);
  const categories = useCategories();

  const handleLogout = () => {
    localStorage.removeItem("auth");
    setAuth({
      ...auth,
      user: null,
      token: "",
    });
    navigate("/login");
    toast.success("Successfully logged out");
  };

  const changeNavbar = () => {
    if (window.scrollY >= 100) {
      setNavbar(true);
    } else {
      setNavbar(false);
    }
  };

  useEffect(() => {
    window.addEventListener("scroll", changeNavbar);
    return () => {
      window.removeEventListener("scroll", changeNavbar);
    };
  }, []);

  const [cartData] = useCartContext();

const getSubTotal = (total, item) => {
  const price = item?.product?.discountPrice || 0; // Default to 0 if undefined
  const quantity = item?.quantity || 0; // Default to 0 if undefined
  return total + price * quantity;
};


  return (
    <nav
      className={
        navbar
          ? "p-2 bg-base-100 shadow-sm z-[100] animate-fade-in fixed top-0 max-w-[100vw]"
          : "p-2 shadow-sm z-[100] bg-base-100 max-w-[100vw]"
      }
    >
      <div className="navbar bg-base-100">
        <div className="navbar-start">
          <a className="text-black flex text-lg ">
            <img src="/location.svg" className="h-8 me-2" />
            Find a location
          </a>
        </div>
        <div className="navbar-center">
          <Link
            className="font-['Roboto'] font-extrabold italic text-5xl text-red-600"
            to={"/"}
          >
            Omni
          </Link>
        </div>
        <div className="navbar-end gap-2 z-50">
          <div className="form-control shadow-rb flex flex-row items-center px-2">
            <input
              type="search"
              placeholder="Search"
              className="input focus:outline-none focus:border-transparent w-20 md:w-auto"
            />
            <img src="/Search.svg" className="h-6" />
          </div>
          {auth?.token ? (
            <>
              <div className="dropdown dropdown-end">
                <div
                  tabIndex={0}
                  role="button"
                  className="btn btn-ghost btn-circle avatar"
                >
                  <div className="w-10 rounded-full">
                    <img src="/account.svg" />
                  </div>
                </div>
                <ul
                  tabIndex={0}
                  className="menu menu-sm dropdown-content bg-base-100 rounded-box z-[1] mt-3 w-52 p-2 shadow font"
                >
                  <li>
                    <NavLink
                      className="justify-between"
                      to={auth?.user?.admin ? "/dashboard" : "/profile"}
                    >
                      {auth?.user?.admin ? "Dashboard" : "Profile"}
                    </NavLink>
                  </li>
                  <li>
                    <a>Orders</a>
                  </li>
                  <li>
                    <a onClick={handleLogout}>Logout</a>
                  </li>
                </ul>
              </div>
              <div
                className={
                  navbar
                    ? "dropdown dropdown-end pe-5"
                    : "dropdown dropdown-end"
                }
              >
                <div
                  tabIndex={0}
                  role="button"
                  className="btn btn-ghost btn-circle"
                >
                  <div className="indicator">
                    <img src="/Shopping bag.svg" className="h-10" />
                    <span className="badge badge-lg indicator-item">
                      {cartData.length}
                    </span>
                  </div>
                </div>
                <div
                  tabIndex={0}
                  className="card card-compact dropdown-content bg-base-100 z-[1] mt-3 w-52 shadow"
                >
                  <div className="card-body">
                    <span className="text-lg font-bold">
                      {cartData.length} Items
                    </span>
                    <span className="text-info">
                      Subtotal:{" "}
                      {cartData.length > 0
                        ? cartData.reduce(getSubTotal, 0)
                        : 0}{" "}
                    </span>
                    <div className="card-actions">
                      <button className="btn btn-primary btn-block">
                        View cart
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </>
          ) : (
            <div
              className={
                navbar ? "dropdown dropdown-end" : "dropdown dropdown-end"
              }
            >
              <div
                tabIndex={0}
                role="button"
                className="btn btn-ghost btn-circle avatar"
              >
                <div
                  className="w-10 rounded-full"
                  onClick={() => {
                    navigate("/login");
                  }}
                >
                  <img src="/account.svg" />
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
      <div className="px-72 mt-5 font-['forum'] font-semibold tracking-widest z-50 ">
        <ul className="flex justify-center space-x-20 font-[forum]">
          <li>
            <Link to={"/omni"}>OMNI</Link>
          </li>
          {categories?.map((category) => (
            <li key={category._id}>
              <Link to={`/category/${category._id}`}>{category.name}</Link>
            </li>
          ))}
          <li>
            <Link to={"/showrooms"}>SHOWROOMS</Link>
          </li>
          <li>
            <Link to={"/bod"}>BOD</Link>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
