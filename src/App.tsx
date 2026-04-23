import { ClerkProvider } from "@clerk/clerk-react";
import GalleryApp from "./views/GalleryApp";

// Types derived from Section 8 & 10 of project-plan.md
export interface User {
  id: string;
  username: string;
  first_name: string;
  last_name: string;
  description: string;
}

export interface Gallery {
  id: string;
  user_id: string;
  title: string;
}

export interface Image {
  id: string;
  gallery_id: string;
  url: string;
}

export interface ApiResponse<T> {
  data: T | null;
  error: {
    code: string;
    message: string;
  } | null;
}

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
