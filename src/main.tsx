import { ClerkProvider } from "@clerk/clerk-react";
import { CssBaseline, ThemeProvider } from "@mui/material";
import { RouterProvider } from "@tanstack/react-router";
import React from "react";
import ReactDOM from "react-dom/client";
import { GalleryProvider } from "./context/GalleryContext";
import { router } from "./router";
import theme from "./theme";
import "@fontsource/poppins/400.css";
import "@fontsource/poppins/500.css";
import "@fontsource/poppins/600.css";
import "@fontsource/poppins/700.css";

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
