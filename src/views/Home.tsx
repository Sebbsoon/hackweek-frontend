import useGallery from "../hooks/useGallery";
import UserList from "../components/UserList";

const Home = () => {
  const { users } = useGallery();

  return <UserList users={users} />;
};
export default Home;
