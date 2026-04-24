const UserList = ({
  users,
  selectUser,
}: {
  users: User[];
  selectUser: (user: User) => void;
}) => {
  return (
    <div>
      <h1>User List</h1>
      <p>This is the user list page.</p>
      {users.map((user) => (
        <div key={user.id}>
          <h2>{user.username}</h2>
          <p>{user.description}</p>
          <button onClick={() => selectUser(user)}>View Profile</button>
        </div>
      ))}
    </div>
  );
};
export default UserList;
