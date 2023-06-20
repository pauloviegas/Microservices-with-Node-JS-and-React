// Base
import { useState, useEffect } from "react";
import Router from "next/router";
import axios from "axios";

// MUI
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";

// Project
import useRequest from "../../hooks/UseRequest";
import CustomAlert from "../../components/CustomAlert";

const SignIn = ({ currentUser }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  useEffect(() => {
    if (JSON.parse(localStorage.getItem("currentUser"))) {
      Router.push("/");
    }
  }, []);

  const { doRequest, errors } = useRequest({
    url: "/api/users/signin",
    method: "post",
    body: {
      email,
      password,
    },
  });

  const handleSubmit = async (event) => {
    event.preventDefault();
    await doRequest();
    const request = await axios.get("/api/users/currentuser");
    localStorage.setItem(
      "currentUser",
      JSON.stringify(request.data.currentUser)
    );
    Router.reload(window.location.pathname);
  };

  const goToSignUp = () => {
    Router.push({
      pathname: "/auth/signup",
    });
  };

  return (
    <Container component="main" maxWidth="xs">
      <Box
        sx={{
          marginTop: 8,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <Typography component="h1" variant="h5">
          Sign In
        </Typography>
        {errors && <CustomAlert messages={errors} />}
        <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
          <TextField
            margin="normal"
            required
            fullWidth
            id="email"
            label="Email Address"
            name="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <TextField
            margin="normal"
            required
            fullWidth
            id="password"
            label="Password"
            name="password"
            type="password"
            onChange={(e) => setPassword(e.target.value)}
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 1 }}
          >
            Sign In
          </Button>
          <Button
            onClick={goToSignUp}
            type="link"
            fullWidth
            variant="contained"
            sx={{ mt: 1 }}
          >
            Sign Up
          </Button>
        </Box>
      </Box>
    </Container>
  );
};

export default SignIn;
