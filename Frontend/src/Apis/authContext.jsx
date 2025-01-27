import { createContext, useContext, useEffect, useState } from "react";

const AuthContext = createContext();

const AuthDataProvider = ({ children }) => {
  const [auth, setAuth] = useState({
    user: null,
    token: "",
  });
  useEffect(() => {
    const isAvailable = JSON.parse(localStorage.getItem("auth"));
    if (isAvailable) {
      setAuth({
        ...auth,
        user: isAvailable.allInfo,
        token: isAvailable.token,
      });
    }
  }, []);
  return (
    <AuthContext.Provider value={[auth, setAuth]}>
      {children}
    </AuthContext.Provider>
  );
};

const useAuthContext = () => useContext(AuthContext);

export { useAuthContext, AuthDataProvider };