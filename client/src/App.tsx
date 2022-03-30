import React from "react";
import { Router } from "react-router-dom";
import { history, stores, StoresContext } from "@store";
import { Routes } from "./routes";
import { Notice } from "@src/components/Notice/Notice";
import AdapterDateFns from "@mui/lab/AdapterDateFns";
import LocalizationProvider from "@mui/lab/LocalizationProvider";
import { ThemeProvider } from "@mui/material";
import { createTheme } from "@mui/material/styles";

const theme = createTheme();

export const App = (): JSX.Element => {
  return (
    <StoresContext.Provider value={stores}>
      <ThemeProvider theme={theme}>
        <LocalizationProvider dateAdapter={AdapterDateFns}>
          <Notice />
          <Router history={history}>
            <Routes />
          </Router>
        </LocalizationProvider>
      </ThemeProvider>
    </StoresContext.Provider>
  );
};
