import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import { App } from "./components/App";
import { AuthenticationWrapper } from "./components/AuthenticationWrapper";
import { BrowserRouter } from "react-router-dom";
import { Preload } from "./Preload";
import { ThemeProvider, createTheme } from "@mui/material";

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement,
);

const theme = createTheme({
  palette: {
    primary: {
      main: "#fff9c4",
    },
    secondary: {
      main: "#c5e1a5",
    },
  },
});

root.render(
  <ThemeProvider theme={theme}>
    <AuthenticationWrapper>
      <BrowserRouter>
        <Preload />
        <App />
      </BrowserRouter>
    </AuthenticationWrapper>
  </ThemeProvider>,
);
