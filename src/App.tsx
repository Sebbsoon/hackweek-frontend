import { ClerkProvider } from "@clerk/clerk-react";
import GalleryApp from "./views/GalleryApp";


import { BrowserRouter } from 'react-router-dom';

function App() {
  const publishableKey = import.meta.env.VITE_CLERK_PUBLISHABLE_KEY ?? "";

  if (!publishableKey) {
    console.warn(
      "VITE_CLERK_PUBLISHABLE_KEY is not set. Check .env and restart the dev server.",
    );
  }
  return (
    <ClerkProvider publishableKey={publishableKey}>
      <BrowserRouter basename="/hackweek-frontend">

      <GalleryApp />
      </BrowserRouter>

    </ClerkProvider>
  );
}

export default App;
