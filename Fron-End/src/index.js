import React from "react";
import ReactDOM from "react-dom";
import Routes from "./Routes";
import AuthProvider from "./contexts/AuthContext";
import { ThemeProvider } from "styled-components";
import theme from "./theme";
import "normalize.css";
import { createGlobalStyle } from "styled-components";

const GlobalStyle = createGlobalStyle`
  body {
    font-family: Helvetica, sans-serif;
  }
`;

ReactDOM.render(
  <React.StrictMode>
    <GlobalStyle />
    <ThemeProvider theme={theme}>
      <AuthProvider>
        <Routes />
      </AuthProvider>
    </ThemeProvider>
  </React.StrictMode>,
  document.getElementById("root")
);
