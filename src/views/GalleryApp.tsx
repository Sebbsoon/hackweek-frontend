import { useAuth } from "@clerk/clerk-react";

import Gallery from "./Gallery";
import GalleryList from "../components/GalleryList";
import Header from "../components/Header";
import useGallery from "../hooks/useGallery";
import Home from "./Home";
import UserProfile from "./UserProfile";

const GalleryApp = () => {
  const { isLoaded } = useAuth();
  const { currentView: view } = useGallery();

  if (!isLoaded) return <div>Loading...</div>;

  return (
    <main>
      <Header />
      <p>view is {view}</p>
      {view === "home" && <Home />}
      {view === "galleries" && <GalleryList />}
      {view === "profile" && <UserProfile />}
      {view == "gallery" && <Gallery />}
    </main>
  );
};
export default GalleryApp;
