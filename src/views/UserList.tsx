import { useMemo, useState } from "react";
import UserCard from "../components/UserCard";
import useGallery from "../hooks/useGallery";
import {
  Alert,
  Box,
  IconButton,
  InputAdornment,
  Skeleton,
  Stack,
  TextField,
  Typography,
} from "@mui/material";

const normalize = (v: unknown) => String(v ?? "").trim().toLowerCase();

type UserNameFields = {
  firstName?: string | null;
  lastName?: string | null;
  first_name?: string | null;
  last_name?: string | null;
};

const getFirstName = (u: User): string =>
  (u as UserNameFields).firstName ?? (u as UserNameFields).first_name ?? "";

const getLastName = (u: User): string =>
  (u as UserNameFields).lastName ?? (u as UserNameFields).last_name ?? "";

const UserList = () => {
  const { users, usersLoading, usersError } = useGallery();
  const [term, setTerm] = useState("");

  const filteredUsers = useMemo(() => {
    const t = normalize(term);
    if (!t) return users;

    return users.filter((u) => {
      const username = normalize(u.username);
      const firstName = normalize(getFirstName(u));
      const lastName = normalize(getLastName(u));
      const full = normalize(`${getFirstName(u)} ${getLastName(u)}`);

      return (
        username.includes(t) ||
        firstName.includes(t) ||
        lastName.includes(t) ||
        full.includes(t)
      );
    });
  }, [term, users]);

  const showEmptyState =
    !usersLoading && !usersError && filteredUsers.length === 0;

  return (
    <Box sx={{ pb: 2 }}>
      <Stack spacing={0.5} sx={{ mb: 2 }}>
        <Typography
          variant="h5"
          component="h1"
          sx={{ fontWeight: 800, letterSpacing: -0.3 }}
        >
          Browse artists
        </Typography>
        <Typography variant="body2" color="text.secondary">
          Discover photographers and explore their galleries.
        </Typography>
      </Stack>

      <TextField
        value={term}
        onChange={(e) => setTerm(e.target.value)}
        placeholder="Search by username or name…"
        fullWidth
        size="small"
        sx={{ mb: 1.5 }}
        slotProps={{
          input: {
            endAdornment: term ? (
              <InputAdornment position="end">
                <IconButton
                  aria-label="Clear search"
                  edge="end"
                  size="small"
                  onClick={() => setTerm("")}
                >
                  <Typography variant="caption" sx={{ fontWeight: 700 }}>
                    ✕
                  </Typography>
                </IconButton>
              </InputAdornment>
            ) : undefined,
          },
        }}
      />

      {!usersLoading && !usersError && (
        <Typography
          variant="caption"
          color="text.secondary"
          sx={{ display: "block", mb: 1.5 }}
        >
          {filteredUsers.length} result{filteredUsers.length === 1 ? "" : "s"}
          {term.trim() ? ` for "${term.trim()}"` : ""}
        </Typography>
      )}

      {usersError && (
        <Alert severity="error" sx={{ mb: 1.5, borderRadius: 2 }}>
          {usersError}
        </Alert>
      )}

      {usersLoading ? (
        <Stack spacing={1.25}>
          {Array.from({ length: 6 }).map((_, i) => (
            <Skeleton key={i} variant="rounded" height={80} animation="wave" sx={{ borderRadius: 2 }} />
          ))}
        </Stack>
      ) : showEmptyState ? (
        <Typography variant="body2" color="text.secondary">
          No users match &ldquo;{term.trim()}&rdquo;.
        </Typography>
      ) : (
        <Stack spacing={1.25}>
          {filteredUsers.map((user) => (
            <UserCard key={user.id} user={user} />
          ))}
        </Stack>
      )}
    </Box>
  );
};

export default UserList;
