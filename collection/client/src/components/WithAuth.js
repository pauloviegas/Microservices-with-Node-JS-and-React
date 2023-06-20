// Base
import { useState, useEffect } from "react";

// Project
import SignIn from "../pages/auth/signin";

const withAuth = (WrappedComponent) => {
  const Wrapper = (props) => {
    const [currentUser, setCurrentUser] = useState(null);

    useEffect(() => {
      setCurrentUser(JSON.parse(localStorage.getItem("currentUser")));
    }, []);

    return currentUser ? (
      <WrappedComponent {...props} />
    ) : (
      <SignIn {...props} />
    );
  };

  return Wrapper;
};

export default withAuth;
