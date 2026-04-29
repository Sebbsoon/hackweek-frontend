import { useEffect } from "react";
import { useParams } from "@tanstack/react-router";
import { Alert } from "@mui/material";
import useGallery from "../hooks/useGallery";
import UserProfile from "../views/UserProfile";

const UserProfileRoute = () => {
  const { userId } = useParams({ from: "/user/$userId" });
  const { users, usersLoading, usersError, setSelectedUser } = useGallery();

  useEffect(() => {
    const found = users.find((u) => String(u.id) === String(userId)) ?? null;
    setSelectedUser(found);
  }, [userId, users, setSelectedUser]);

  if (usersError) return <Alert severity="error">{usersError}</Alert>;
  if (usersLoading) return <Alert severity="info">Loading user…</Alert>;

  return <UserProfile />;
};

export default UserProfileRoute;