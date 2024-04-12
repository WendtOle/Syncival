import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import { App } from "./components/App";
import { AuthenticationWrapper } from "./components/AuthenticationWrapper";
import { BrowserRouter } from "react-router-dom";
import { ThemeProvider, createTheme } from "@mui/material";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { createSyncStoragePersister } from "@tanstack/query-sync-storage-persister";
import { persistQueryClient } from "@tanstack/react-query-persist-client";
import { SpotifyLogoWrapper } from "./components/SpotifyLogoWrapper";

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
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

const CACHE_STALE_TIME = 1000 * 60 * 60 * 24; // 24 hours

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      gcTime: CACHE_STALE_TIME,
      staleTime: CACHE_STALE_TIME,
    },
  },
});

const localStoragePersister = createSyncStoragePersister({
  storage: window.localStorage,
});

persistQueryClient({
  queryClient,
  persister: localStoragePersister,
});

root.render(
  <ThemeProvider theme={theme}>
    <BrowserRouter>
      <QueryClientProvider client={queryClient}>
        <AuthenticationWrapper>
          <SpotifyLogoWrapper>
            <App />
          </SpotifyLogoWrapper>
        </AuthenticationWrapper>
      </QueryClientProvider>
    </BrowserRouter>
  </ThemeProvider>
);
