import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import '@mantine/core/styles.css';
import { createTheme, MantineProvider, ColorSchemeScript } from "@mantine/core";

const theme = createTheme({
  fontFamily: 'sans-serif',
  primaryColor: 'blue',
});

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <ColorSchemeScript />
    <MantineProvider theme={theme} defaultColorScheme="dark">
      <App />
    </MantineProvider>
  </React.StrictMode>,
);
