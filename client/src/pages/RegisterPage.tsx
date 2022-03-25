import * as React from "react";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { MenuItem, Select } from "@mui/material";
import { RegistrationData, Sex } from "@src/types";
import { Path } from "@src/routes";
import { useHistory } from "react-router-dom";
import { useStores } from "@store";
import DesktopDatePicker from "@mui/lab/DesktopDatePicker";
import { observer } from "mobx-react-lite";
import { FormEventHandler } from "react";

export const RegistrationPage = observer(() => {
  const history = useHistory();

  const {
    AuthStore: { register, setRegistrationData, registrationData },
  } = useStores();

  const handleRegister: FormEventHandler = (event) => {
    event.preventDefault();
    register();
  };

  const handleChangeTextField = (
    event: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>
  ) =>
    setRegistrationData(
      event.target.id as keyof RegistrationData,
      event.target.value
    );

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
          Registration
        </Typography>
        <Box
          component="form"
          noValidate
          onSubmit={handleRegister}
          sx={{ mt: 3 }}
        >
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
              <TextField
                required
                fullWidth
                id="firstName"
                label="First Name"
                autoFocus
                onChange={handleChangeTextField}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                required
                fullWidth
                id="lastName"
                label="Last Name"
                onChange={handleChangeTextField}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <DesktopDatePicker
                label="Birthday"
                inputFormat="MM/dd/yyyy"
                value={registrationData.birthday}
                onChange={(date) => setRegistrationData("birthday", date)}
                renderInput={(params) => <TextField {...params} />}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <Select
                id="sex"
                required
                fullWidth
                label="Sex"
                value={registrationData.sex}
                onChange={(event) =>
                  setRegistrationData("sex", event.target.value as Sex)
                }
                inputProps={{ "aria-label": "Without label" }}
              >
                <MenuItem value={Sex.MALE}>{Sex.MALE}</MenuItem>
                <MenuItem value={Sex.FEMALE}>{Sex.FEMALE}</MenuItem>
              </Select>
            </Grid>
            <Grid item xs={12}>
              <TextField
                required
                fullWidth
                id="city"
                label="City"
                onChange={handleChangeTextField}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                id="about"
                label="About"
                onChange={handleChangeTextField}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                required
                fullWidth
                id="email"
                label="Email Address"
                onChange={handleChangeTextField}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                required
                fullWidth
                label="Password"
                type="password"
                id="password"
                onChange={handleChangeTextField}
              />
            </Grid>
          </Grid>
          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
          >
            Register
          </Button>
          <Grid container justifyContent="flex-end">
            <Grid item onClick={() => history.push(Path.LOGIN)}>
              Already have an account? Log in
            </Grid>
          </Grid>
        </Box>
      </Box>
    </Container>
  );
});
