import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { GoogleOAuthProvider } from "@react-oauth/google";
const queryClient = new QueryClient();

ReactDOM.createRoot(document.getElementById("root")).render(
  <GoogleOAuthProvider clientId="392352858260-6udvl512uc4clbmt6bs54gga24o99ci1.apps.googleusercontent.com">
    <QueryClientProvider client={queryClient}>
      <App />
    </QueryClientProvider>
  </GoogleOAuthProvider>
);
