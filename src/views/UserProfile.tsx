import GalleryList from "../components/GalleryList";
import useGallery from "../hooks/useGallery";

const UserProfile = () => {
  const { selectedUser: user } = useGallery();
  if (!user) {
    return <div>User not found.</div>;
  }
  return (
    <div>
      <h1>{user.username}'s Profile</h1>
      <img src={user.profilePictureUrl} alt={`${user.username}'s profile`} />
      <p>{user.description}</p>
      <h2>Galleries</h2>
      {user.galleries && user.galleries.length > 0 ? (
        <GalleryList />
      ) : (
        <p>This user has no galleries.</p>
      )}
    </div>
  );
};

export default UserProfile;
