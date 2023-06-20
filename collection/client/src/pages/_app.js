// Base
import { useState, useEffect } from "react";
import { StrictMode } from "react";

// MUI
import CssBaseline from "@mui/material/CssBaseline";

// Project
import Header from "../components/Header";

const App = ({ Component, pageProps }) => {
  const [currentUser, setCurrentUser] = useState(null);

  useEffect(() => {
    setCurrentUser(JSON.parse(localStorage.getItem("currentUser")));
  }, []);

  return (
    <StrictMode>
      <div>
        <CssBaseline />
        <Header currentUser={currentUser} />
        <Component {...pageProps} currentUser={currentUser} />
      </div>
    </StrictMode>
  );
};

export default App;
