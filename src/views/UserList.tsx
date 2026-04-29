import UserCard from "../components/UserCard";
import { Alert, Box, Skeleton, Stack, Typography } from "@mui/material";
import useGallery from "../hooks/useGallery";

const UserList = () => {
  const { users, usersLoading, usersError } = useGallery();

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

      {usersError && (
        <Alert severity="error" sx={{ mb: 1.5 }}>
          {usersError}
        </Alert>
      )}

      {usersLoading ? (
        <Stack spacing={1.25}>
          {Array.from({ length: 6 }).map((_, i) => (
            <Skeleton key={i} variant="rounded" height={76} animation="wave" />
          ))}
        </Stack>
      ) : (
        <Stack spacing={1.25}>
          {users.map((user) => (
            <UserCard key={user.id} user={user} />
          ))}
        </Stack>
      )}
    </Box>
  );
};

export default UserList;
