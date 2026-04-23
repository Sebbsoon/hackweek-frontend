import {
  SignOutButton,
  SignedIn,
  SignedOut,
  useAuth,
} from "@clerk/clerk-react";
import Login from "./Login";
import Register from "./Register";
import GalleryList from "./GalleryList";

const GalleryApp = () => {
  const { isLoaded } = useAuth();

  if (!isLoaded) return <div>Loading...</div>;

  return (
    <main>
      <SignedOut>
        <Login />
        <hr />
        <Register />
      </SignedOut>
      <SignedIn>
        <SignOutButton redirectUrl="/hackweek-frontend" />
        <GalleryList />
      </SignedIn>
    </main>
  );
};
export default GalleryApp;
