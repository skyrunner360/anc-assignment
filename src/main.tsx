import { ThemeProvider, createTheme } from "@mui/material";
import React from "react";
import ReactDOM from "react-dom/client";
import { Provider } from "react-redux";
import { store } from "../store/store.ts";
import App from "./App.tsx";
import "./index.css";

const customTheme = createTheme({
  palette: {
    primary: {
      main: "#240115",
      light: "#87f5fb",
      dark: "#2f131e",
      contrastText: "#cec3c1",
    },
  },
});

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <ThemeProvider theme={customTheme}>
      <Provider store={store}>
        <App />
      </Provider>
    </ThemeProvider>
  </React.StrictMode>
);
