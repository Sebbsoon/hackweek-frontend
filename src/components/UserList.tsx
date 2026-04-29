import UserCard from "./UserCard";
import { Box, Stack, Typography } from "@mui/material";

const UserList = ({ users }: { users: User[] }) => {
  return (
    <Box sx={{ p: { xs: 1, sm: 2 } }}>
      <Stack spacing={0.5} sx={{ mb: 1.5 }}>
        <Typography variant="h5" component="h1" sx={{ fontWeight: 800 }}>
          Browse users
        </Typography>
        <Typography variant="body2" color="text.secondary">
          Select a user to view their profile and galleries.
        </Typography>
      </Stack>

      <Stack spacing={1.25}>
        {users.map((user) => (
          <UserCard key={user.id} user={user} />
        ))}
      </Stack>
    </Box>
  );
};

export default UserList;
