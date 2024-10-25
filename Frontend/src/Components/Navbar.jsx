import { useEffect, useState } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { useAuthContext } from "../Apis/authContext";

const Navbar = () => {
  const [auth, setAuth] = useAuthContext();
  const [cart, setCart] = useState(false); // Set default to false
  const navigate = useNavigate();
  const [navbar, setNavbar] = useState(false);

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

  // Handle scrolling to change navbar style
  const changeNavbar = () => {
    if (window.scrollY >= 100) {
      setNavbar(true);
    } else {
      setNavbar(false);
    }
  };

  // Check if user is authenticated to toggle cart visibility
  const changeCart = () => {
    if (auth?.token) {
      setCart(true); // Show cart if token exists
    } else {
      setCart(false); // Hide cart if no token
    }
  };

  useEffect(() => {
    // Add event listener for scroll
    window.addEventListener("scroll", changeNavbar);

    // Clean up scroll event listener on component unmount
    return () => {
      window.removeEventListener("scroll", changeNavbar);
    };
  }, []);

  useEffect(() => {
    if (auth?.token) {
      changeCart();
    }
  }, [auth?.token]);

  return (
    <nav
      className={
        navbar
          ? "p-2 bg-base-100 shadow-sm z-[100] animate-fade-in fixed"
          : "p-2 shadow-sm z-[100] bg-base-100"
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
              type="text"
              placeholder="Search"
              className="input focus:outline-none focus:border-transparent w-20 md:w-auto"
            />
            <img src="/Search.svg" className="h-6" />
          </div>
          {cart ? (
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
                  className="menu menu-sm dropdown-content bg-base-100 rounded-box z-[1] mt-3 w-52 p-2 shadow"
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
                    ? "dropdown dropdown-end pe-10"
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
                    <span className="badge badge-lg indicator-item">0</span>
                  </div>
                </div>
                <div
                  tabIndex={0}
                  className="card card-compact dropdown-content bg-base-100 z-[1] mt-3 w-52 shadow"
                >
                  <div className="card-body">
                    <span className="text-lg font-bold">0 Items</span>
                    <span className="text-info">Subtotal: $0</span>
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
                navbar ? "dropdown dropdown-end pe-10" : "dropdown dropdown-end"
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
        <ul className="flex space-x-20 font-[forum]">
          <li>
            <Link to={"/omni"}>OMNI</Link>
          </li>
          <li>
            <Link to={"/mens"}>MEN</Link>
          </li>
          <li>
            <Link to={"/womens"}>WOMEN</Link>
          </li>
          <li>
            <Link to={"/children"}>CHILDREN</Link>
          </li>
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
