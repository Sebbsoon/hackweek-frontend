import Gallery from "./Gallery";
import GalleryList from "./GalleryList";

const UserProfile = ({
  user,
  currentUser,
  selectGallery,
  addImageToGallery,
}: {
  user: User | null;
  currentUser: User | null;
  selectGallery: (gallery: UserGallery) => void;
  addImageToGallery: (galleryId: string, image: Image) => void;
}) => {
  if (!user) {
    return <div>User not found.</div>;
  }
  return (
    <div>
      <h1>{user.username}'s Profile</h1>
      <img src={user.profile_picture_url} alt={`${user.username}'s profile`} />
      <p>{user.description}</p>
      <h2>Galleries</h2>
      {user.galleries && user.galleries.length > 0 ? (
        user.galleries.length === 1 ? (
          <Gallery
            gallery={user.galleries[0]}
            addImageToGallery={addImageToGallery}
            currentUser={currentUser}
          />
        ) : (
          <GalleryList
            galleries={user.galleries}
            selectGallery={selectGallery}
          />
        )
      ) : (
        <p>This user has no galleries.</p>
      )}
    </div>
  );
};

export default UserProfile;
