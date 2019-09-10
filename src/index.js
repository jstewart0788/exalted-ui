import React from "react";
import ReactDOM from "react-dom";
import CssBaseline from "@material-ui/core/CssBaseline";
import { CharmProvider } from "./shared/CharmContext";
import { ThemeProvider } from "@material-ui/styles";
import App from "./App";
import theme from "./theme";
import "./index.css";
import * as serviceWorker from "./serviceWorker";

ReactDOM.render(
  <>
    <CssBaseline />
    <ThemeProvider theme={theme}>
      <CharmProvider>
        <App />
      </CharmProvider>
    </ThemeProvider>
  </>,
  document.getElementById("root")
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
