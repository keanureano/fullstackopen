import React from "react";
import ReactDOM from "react-dom/client";
import { QueryClient, QueryClientProvider } from "react-query";
import { NotifContextProvider } from "./contexts/NotifContext";

import App from "./App";

const client = new QueryClient();

ReactDOM.createRoot(document.getElementById("root")).render(
  <QueryClientProvider client={client}>
    <NotifContextProvider>
      <App />
    </NotifContextProvider>
  </QueryClientProvider>
);
