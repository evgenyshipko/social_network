import React from "react";
import { BrowserRouter } from "react-router-dom";
import { stores, StoresContext } from "@store";
import { RoutesList } from "./routesList";
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
          <BrowserRouter>
            <RoutesList />
          </BrowserRouter>
        </LocalizationProvider>
      </ThemeProvider>
    </StoresContext.Provider>
  );
};
