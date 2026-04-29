import { useAuth } from "@clerk/clerk-react";

import {
  BottomNavigation,
  BottomNavigationAction,
  Box,
  CircularProgress,
  Container,
  Paper,
} from "@mui/material";
import Header from "./components/Header";
import useGallery from "./hooks/useGallery";
import Home from "./views/Home";
import UserList from "./views/UserList";
import UserProfile from "./views/UserProfile";
import Gallery from "./views/Gallery";

const GalleryApp = () => {
  const { isLoaded } = useAuth();
  const {
    currentView: view,
    setCurrentView: setView,
    currentUser,
    setSelectedUser,
  } = useGallery();

  if (!isLoaded)
    return (
      <Box sx={{ display: "grid", placeItems: "center", minHeight: 240 }}>
        <CircularProgress />
      </Box>
    );

  const handleNavChange = (_: React.SyntheticEvent, next: string) => {
    if (next === "profile") {
      if (currentUser) {
        setSelectedUser(currentUser);
        setView("profile");
        return;
      }

      setSelectedUser(null);
      setView("home");
      return;
    }

    setView(next);
  };

  return (
    <Container
      maxWidth="sm"
      sx={{
        px: { xs: 1, sm: 2 },
        py: { xs: 1, sm: 2 },
        pb: { xs: 9, sm: 2 }, // space for mobile bottom nav
      }}
    >
      <Header />

      <Box sx={{ mt: { xs: 1, sm: 2 } }}>
        {view === "home" && <Home />}
        {view === "users" && <UserList />}
        {view === "profile" && <UserProfile />}
        {view === "gallery" && <Gallery />}
      </Box>

      {/* Mobile-first navigation */}
      <Paper
        elevation={8}
        sx={{
          position: "fixed",
          left: 0,
          right: 0,
          bottom: 0,
          display: { xs: "block", sm: "none" },
          borderTop: "1px solid",
          borderColor: "divider",
        }}
      >
        <BottomNavigation showLabels value={view} onChange={handleNavChange}>
          <BottomNavigationAction label="Home" value="home" />
          <BottomNavigationAction label="Users" value="users" />
          <BottomNavigationAction label="My Profile" value="profile" />
        </BottomNavigation>
      </Paper>
    </Container>
  );
};

export default GalleryApp;
