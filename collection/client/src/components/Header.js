// Base
import Router from "next/router";

// MUI
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";

// Project
import useRequest from "../hooks/UseRequest";
import * as Messages from "../constants/Messages";

const Header = ({ currentUser }) => {
  const { doRequest, errors } = useRequest({
    url: "/api/users/signout",
    method: "post",
    body: {},
    onSuccess: () => {
      localStorage.removeItem("currentUser");
      Router.push({
        pathname: "/auth/signin",
        query: { message: Messages.AUTH_LOGGED_OUT },
      });
    },
  });

  const handleSignOut = async () => {
    await doRequest();
  };

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            Card Collection
          </Typography>
          {/* <Box sx={{ flexGrow: 1, display: { xs: "none", md: "flex" } }}>
            <Button sx={{ my: 2, color: "white", display: "block" }}>
              Test
            </Button>
          </Box> */}
          {currentUser ? (
            <Button onClick={handleSignOut} color="inherit">
              Logout
            </Button>
          ) : (
            <Button href="/auth/signin" color="inherit">
              Login
            </Button>
          )}
        </Toolbar>
      </AppBar>
    </Box>
  );
};

export default Header;
