import GalleryList from "./GalleryList";

const UserProfile = ({ currentUser }: { currentUser: User | null }) => {
  if (!currentUser) {
    return <div>Please log in to view your profile.</div>;
  }
  return (
    <div>
      <h1>{currentUser.username}'s Profile</h1>
      <img src={currentUser.profile_picture_url} alt={`${currentUser.username}'s profile`} />
      <p>{currentUser.description}</p>
      <h2>Galleries</h2>
      {currentUser.galleries && currentUser.galleries.length > 0 ? (
        <GalleryList galleries={currentUser.galleries} />
      ) : (
        <p>This user has no galleries.</p>
      )}
    </div>
  );
};

export default UserProfile;
