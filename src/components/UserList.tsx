import UserCard from "./UserCard";

const UserList = ({ users }: { users: User[] }) => {
  return (
    <div>
      <h1>User List</h1>
      <p>This is the user list page.</p>
      {users.map((user) => (
        <UserCard key={user.id} user={user} />
      ))}
    </div>
  );
};
export default UserList;
