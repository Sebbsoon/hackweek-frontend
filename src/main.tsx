import { ClerkProvider } from "@clerk/clerk-react";
import { CssBaseline } from "@mui/material";
import { ThemeProvider } from "@mui/material/styles";
import { RouterProvider } from "@tanstack/react-router";
import React from "react";
import ReactDOM from "react-dom/client";
import { GalleryProvider } from "./context/GalleryContext";
import { router } from "./router";
import theme from "./theme";

const clerkPublishableKey = import.meta.env.VITE_CLERK_PUBLISHABLE_KEY;

if (!clerkPublishableKey) {
  throw new Error("Missing VITE_CLERK_PUBLISHABLE_KEY");
}

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <ClerkProvider publishableKey={clerkPublishableKey}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <GalleryProvider>
          <RouterProvider router={router} />
        </GalleryProvider>
      </ThemeProvider>
    </ClerkProvider>
  </React.StrictMode>,
);
