import { SignedIn, SignedOut, SignOutButton } from "@clerk/clerk-react";
import useGallery from "../hooks/useGallery";
import Register from "../views/Register";
import Login from "./Login";

const Header = () => {
  const {
    currentView: view,
    setCurrentView: setView,
    selectedUser,
  } = useGallery();

  const { currentUser, currentGallery } = useGallery();
  return (
    <header>
      <p>Current View: {view}</p>
      <p>Current User: {currentUser?.username || "Not logged in"}</p>
      <p>
        Current Gallery:
        {currentGallery ? currentGallery.title : "None selected"}
      </p>
      <p>Selected user: {selectedUser?.username}</p>
      <div>
        <button onClick={() => setView("home")}>Home</button>
        <button onClick={() => setView("profile")}>Profile</button>
        <button onClick={() => setView("gallery")}>Gallery</button>
        <button onClick={() => setView("create-gallery")}>
          Create Gallery
        </button>
      </div>
      <SignedOut>
        <Login />
        <hr />
        <Register />
      </SignedOut>
      <SignedIn>
        <p>
          You are signed in as {currentUser?.firstName || "unknown"}  {currentUser?.lastName || "unknown"}!
        </p>
        <SignOutButton redirectUrl="/hackweek-frontend" />
      </SignedIn>
    </header>
  );
};
export default Header;
