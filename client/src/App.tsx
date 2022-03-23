import React from "react";
import { Router } from "react-router-dom";
import { history, stores, StoresContext } from "@store";
import { Routes } from "./routes";

export const App = (): JSX.Element => {
  return (
    <StoresContext.Provider value={stores}>
      <Router history={history}>
        <Routes />
      </Router>
    </StoresContext.Provider>
  );
};
