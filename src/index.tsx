import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { ThemeProvider } from "@mui/material";
import theme from "./styles/theme";
import { RTL } from "./styles/rtl";
import { AuthProvider } from "./context/AuthProvider";
import { BrowserRouter } from "react-router-dom";
import { SWRConfig } from "swr";
import { fetcherGet } from "./api/axios";

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);
root.render(
  <React.StrictMode>
    <RTL>
      <ThemeProvider theme={theme}>
        <SWRConfig
          value={{
            revalidateOnFocus: false,
            fetcher: fetcherGet,
            onErrorRetry({ retryCount }) {
              if (retryCount > 4) return;
            },
          }}
        >
          <BrowserRouter>
            <AuthProvider>
              <App />
            </AuthProvider>
          </BrowserRouter>
        </SWRConfig>
      </ThemeProvider>
    </RTL>
  </React.StrictMode>
);

reportWebVitals();
