import {
  SignOutButton,
  SignedIn,
  SignedOut,
  useAuth,
  useUser,
} from "@clerk/clerk-react";
import { useEffect, useMemo, useState } from "react";
import img1 from "../assets/Gallery/20240226_235955.jpg";
import img2 from "../assets/Gallery/20250318_164818.jpg";
import img3 from "../assets/Gallery/Aqua.png";
import img4 from "../assets/Gallery/BW22.png";
import CreateGallery from "./CreateGallery";
import Gallery from "./Gallery";
import GalleryList from "./GalleryList";
import ImageUpload from "./ImageUpload";
import Login from "./Login";
import Register from "./Register";
import UserList from "./UserList";
import UserProfile from "./UserProfile";

const mockGalleries: UserGallery[] = [
  {
    id: "1",
    user_id: "user1",
    title: "Vacation Photos",
    images: [
      { id: "1", gallery_id: "1", url: img1 },
      { id: "2", gallery_id: "1", url: img2 },
    ],
    description: "Photos from my recent vacation to the beach.",
  },
  {
    id: "2",
    user_id: "user2",
    title: "Family Album",
    images: [
      { id: "3", gallery_id: "2", url: img3 },
      { id: "4", gallery_id: "2", url: img4 },
    ],
    description: "Family photos from various events and gatherings.",
  },
];

const mockedUsers: User[] = [
  {
    id: "user_3ClKsTp1NDEX8EywrJZj85xCOf7",
    username: "sebastian",
    galleries: [],
    profile_picture_url: "",
    description: "A new user of the Gallery App.",
  },
  {
    id: "user1",
    username: "john_doe",
    galleries: [mockGalleries[0]],
    profile_picture_url: "",
    description: "A passionate photographer.",
  },
  {
    id: "user2",
    username: "jane_smith",
    galleries: [mockGalleries[1]],
    profile_picture_url: "",
    description: "An enthusiastic nature lover.",
  },
];

function fetchUsers(): User[] {
  return mockedUsers;
}

function fetchUserById(userId: string): User | null {
  const user = mockedUsers.find((u) => u.id === userId);
  return user || null;
}

const GalleryApp = () => {
  const { isLoaded } = useAuth();
  const { user } = useUser();
  const [currentGallery, setCurrentGallery] = useState<UserGallery | null>(
    null,
  );
  const [selectedUser, setSelectedUser] = useState<User | null>(null);

  const users = fetchUsers();
  const currentUser = useMemo<User | null>(() => {
    if (!user) return null;
    return users.find((u) => u.id === user.id) ?? null;
  }, [user, users]);

  function addImageToGallery(galleryId: string, image: Image) {
    console.log(`Adding image ${image.id} to gallery ${galleryId}`);
    if (!currentUser) return;
    const gallery = currentUser.galleries?.find((g) => g.id === galleryId);
    if (!gallery) {
      console.warn("Gallery not found for current user. Cannot add image.");
      return;
    }
    if (!gallery.images) {
      gallery.images = [];
    }
    gallery.images.push(image);
    console.log(`Added image ${image.id} to gallery ${galleryId}`);
    console.log("Updated gallery:", gallery);
  }

  function createGallery(gallery: UserGallery) {
    if (!currentUser) return;
    currentUser.galleries.push(gallery);
    console.log("Created new gallery:", gallery);
    console.log("Updated user galleries:", currentUser);
  }

  const [view, setView] = useState<
    | "create-gallery"
    | "login"
    | "home"
    | "galleries"
    | "profile"
    | "gallery"
    | "upload"
  >("home");

  useEffect(() => {
    console.log("User data changed:", user);
    if (user) {
      const loggedInUser: User | null = fetchUserById(user.id);
      console.log("Found user:", loggedInUser);
    } else {
      console.log("No user logged in");
    }
  }, [user, users]);

  useEffect(() => {
    console.log("Current gallery changed:", currentGallery);
  }, [currentGallery]);
  useEffect(() => {
    console.log("Selected user changed:", selectedUser);
  }, [selectedUser]);

  if (!isLoaded) return <div>Loading...</div>;

  return (
    <main>
      <p>Current View: {view}</p>
      <p>Current User: {currentUser?.username || "Not logged in"}</p>
      <p>
        Current Gallery:{" "}
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
          You are signed in as {user?.firstName} {user?.lastName}!
        </p>
        <SignOutButton redirectUrl="/hackweek-frontend" />
      </SignedIn>
      {view === "home" && (
        <>
          <h1>Welcome to the Gallery App!</h1>
          <UserList users={users} selectUser={setSelectedUser} />
        </>
      )}
      {view === "profile" && (
        <UserProfile
          user={selectedUser}
          currentUser={currentUser}
          selectGallery={setCurrentGallery}
          addImageToGallery={addImageToGallery}
        />
      )}
      {view === "gallery" && (
        <>
          <h1>Gallery Page</h1>
          <Gallery
            gallery={currentGallery}
            addImageToGallery={addImageToGallery}
            currentUser={currentUser}
          />
        </>
      )}
      {view === "galleries" && (
        <>
          <GalleryList
            galleries={currentUser?.galleries || []}
            selectGallery={setCurrentGallery}
          />
        </>
      )}
      {view === "upload" && (
        <ImageUpload
          galleryId={currentGallery?.id || ""}
          addImageToGallery={addImageToGallery}
        />
      )}
      {view === "create-gallery" && (
        <CreateGallery createGallery={createGallery} />
      )}
    </main>
  );
};
export default GalleryApp;
