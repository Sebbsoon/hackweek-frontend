import useGallery from "../hooks/useGallery";

const UserCard = ({ user }: { user: User }) => {
  const { setSelectedUser, setCurrentView } = useGallery();
  const handleOnClick = () => {
    setSelectedUser(user);
    setCurrentView("profile");
    console.log("UserCard clicked:", { user });
  };

  return (
    <button onClick={() => handleOnClick()}>
      <div>
        <h2>{user.username}</h2>
        <p>{user.description}</p>
      </div>
    </button>
  );
};
export default UserCard;
