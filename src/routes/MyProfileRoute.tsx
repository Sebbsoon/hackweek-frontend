import { useEffect } from "react";
import { useUser } from "@clerk/clerk-react";
import { Alert } from "@mui/material";
import useGallery from "../hooks/useGallery";
import UserProfile from "../views/UserProfile";

const MyProfileRoute = () => {
  const { isSignedIn } = useUser();
  const { currentUser, setSelectedUser, usersLoading } = useGallery();

  useEffect(() => {
    if (currentUser) setSelectedUser(currentUser);
  }, [currentUser, setSelectedUser]);

  if (!isSignedIn) {
    return <Alert severity="info">Sign in to view your profile.</Alert>;
  }

  if (usersLoading && !currentUser) {
    return <Alert severity="info">Loading your profile…</Alert>;
  }

  return <UserProfile />;
};

export default MyProfileRoute;