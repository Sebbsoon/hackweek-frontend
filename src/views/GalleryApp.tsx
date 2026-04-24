import {
  SignOutButton,
  SignedIn,
  SignedOut,
  useAuth,
  useUser,
} from "@clerk/clerk-react";
import { useEffect, useState } from "react";
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

function fetchGalleryById(galleryId: string): UserGallery | null {
  const gallery = mockGalleries.find((g) => g.id === galleryId);
  return gallery || null;
}

function fetchUsers(): User[] {
  return mockedUsers;
}

const GalleryApp = () => {
  const { isLoaded } = useAuth();
  const { user } = useUser();
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [currentGallery, setCurrentGallery] = useState<UserGallery | null>(
    null,
  );

  const users = fetchUsers();

  useEffect(() => {
    console.log("User data changed:", user);
    if (user) {
      const loggedInUser: User = {
        id: user.id,
        username: user.username || "Unknown",
        galleries: users.find((u) => u.id === user.id)?.galleries || [],
        profile_picture_url: user.imageUrl || "",
        description: "A new user of the Gallery App.",
      };

      setCurrentUser(loggedInUser);
    } else {
      setCurrentUser(null);
    }
  }, [user]);

  function addImageToGallery(galleryId: string, image: Image) {
    if (!currentUser) return;
    mockGalleries.forEach((gallery) => {
      if (gallery.id === galleryId) {
        if (gallery.user_id !== currentUser.id) {
          console.warn("User does not own this gallery. Cannot add image.");
          return;
        }
        if (!gallery.images) {
          gallery.images = [];
        }
        gallery.images.push(image);
        console.log(`Added image ${image.id} to gallery ${galleryId}`);
        console.log("Updated gallery:", gallery);
      }
    });
  }

  function createGallery(gallery: UserGallery) {
    if (!currentUser) return;
    mockGalleries.push(gallery);
    setCurrentUser({
      ...currentUser,
      galleries: [...currentUser.galleries, gallery],
    });
    console.log("Created new gallery:", gallery);
    console.log("Updated user galleries:", currentUser?.galleries);
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
  if (!isLoaded) return <div>Loading...</div>;

  return (
    <main>
      <p>Current View: {view}</p>
      <p>Current User: {currentUser?.username || "Not logged in"}</p>
      <p>
        Current Gallery:{" "}
        {currentGallery ? currentGallery.title : "None selected"}
      </p>
      <div>
        <button onClick={() => setView("home")}>Home</button>
        <button onClick={() => setView("profile")}>Profile</button>
        <button onClick={() => setView("gallery")}>Gallery</button>
        <button onClick={() => setView("galleries")}>Galleries</button>
        <button onClick={() => setView("upload")}>Upload</button>
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
          <UserList users={users} />
        </>
      )}
      {view === "profile" && <UserProfile currentUser={currentUser} />}
      {view === "gallery" && (
        <>
          <h1>Gallery Page</h1>
          <Gallery
            gallery={currentGallery}
            addImageToGallery={addImageToGallery}
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
