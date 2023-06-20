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
import * as Messages from "../../constants/Messages";

const SignUp = () => {
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [password2, setPassword2] = useState("");

  useEffect(() => {
    if (JSON.parse(localStorage.getItem("currentUser"))) {
      Router.push("/");
    }
  }, []);

  const { doRequest, errors } = useRequest({
    url: "/api/users/signup",
    method: "post",
    body: {
      email,
      username,
      password,
      password2,
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
    Router.push("/");
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
          Sign Up
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
            id="username"
            label="Username"
            name="username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
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
          <TextField
            margin="normal"
            required
            fullWidth
            id="password2"
            label="Confirm Password"
            name="password2"
            type="password"
            onChange={(e) => setPassword2(e.target.value)}
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
          >
            Sign Up
          </Button>
        </Box>
      </Box>
    </Container>
  );
};

export default SignUp;
