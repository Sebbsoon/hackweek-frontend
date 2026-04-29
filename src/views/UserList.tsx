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

// Some APIs return camelCase, others snake_case. Support both without `any`.
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
    <Box sx={{ p: { xs: 1, sm: 2 } }}>
      <Stack spacing={0.75} sx={{ mb: 1.5 }}>
        <Typography variant="h5" component="h1" sx={{ fontWeight: 800 }}>
          Browse artists
        </Typography>

        <TextField
          value={term}
          onChange={(e) => setTerm(e.target.value)}
          placeholder="Search by username or name…"
          fullWidth
          size="small"
          slotProps={{
            input: {
              endAdornment: term ? (
                <InputAdornment position="end">
                  <IconButton
                    aria-label="Clear search"
                    edge="end"
                    onClick={() => setTerm("")}
                  >
                    <Typography variant="body2" sx={{ fontWeight: 700 }}>
                      Clear
                    </Typography>
                  </IconButton>
                </InputAdornment>
              ) : undefined,
            },
          }}
        />

        {!usersLoading && !usersError && (
          <Typography variant="caption" color="text.secondary">
            {filteredUsers.length} result{filteredUsers.length === 1 ? "" : "s"}
            {term.trim() ? ` for “${term.trim()}”` : ""}
          </Typography>
        )}
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
      ) : showEmptyState ? (
        <Typography variant="body2" color="text.secondary">
          No users match “{term.trim()}”.
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
