import * as React from "react";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { Path } from "@src/routesList";
import { useStores } from "@store";
import { flowResult } from "mobx";
import { useNavigate } from "react-router-dom";

export const LoginPage = () => {
  const {
    AuthStore: { logIn },
  } = useStores();

  const navigate = useNavigate();

  const handleLogin = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);

    await flowResult(
      logIn({
        email: data.get("email") as string,
        password: data.get("password") as string,
      })
    );

    navigate(Path.MAIN);
  };

  const handleClickRegistration = () => navigate(Path.REGISTRATION);

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <Box
        sx={{
          marginTop: 8,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <Typography component="h1" variant="h5">
          Social Network
        </Typography>
        <Typography component="h1" variant="h5">
          Login
        </Typography>
        <Box component="form" onSubmit={handleLogin} noValidate sx={{ mt: 1 }}>
          <TextField
            margin="normal"
            required
            fullWidth
            id="email"
            label="Email Address"
            name="email"
            autoComplete="email"
            autoFocus
          />
          <TextField
            margin="normal"
            required
            fullWidth
            name="password"
            label="Password"
            type="password"
            id="password"
            autoComplete="current-password"
          />

          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
          >
            Log in
          </Button>

          <Button
            type="submit"
            fullWidth
            sx={{ mt: 3, mb: 2 }}
            onClick={handleClickRegistration}
          >
            Registration
          </Button>
        </Box>
      </Box>
    </Container>
  );
};
