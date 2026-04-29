import { useAuth, useUser } from "@clerk/clerk-react";
import { Outlet, useNavigate, useRouterState } from "@tanstack/react-router";
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

const GalleryApp = () => {
  const { isLoaded } = useAuth();
  const { isSignedIn } = useUser();
  const navigate = useNavigate();
  const pathname = useRouterState({ select: (s) => s.location.pathname });

  const { currentUser, setSelectedUser } = useGallery();

  if (!isLoaded) {
    return (
      <Box
        sx={{
          display: "grid",
          placeItems: "center",
          minHeight: "100dvh",
          bgcolor: "background.default",
        }}
      >
        <CircularProgress sx={{ color: "secondary.main" }} />
      </Box>
    );
  }

  const navValue =
    pathname === "/"
      ? "home"
      : pathname.startsWith("/users") || pathname.startsWith("/user/")
        ? "users"
        : pathname === "/profile"
          ? "profile"
          : "home";

  const handleNavChange = (_: React.SyntheticEvent, next: string) => {
    if (next === "home") void navigate({ to: "/" });
    if (next === "users") void navigate({ to: "/users" });

    if (next === "profile") {
      if (currentUser) setSelectedUser(currentUser);
      void navigate({ to: "/profile" });
    }
  };

  return (
    <Box sx={{ minHeight: "100dvh", bgcolor: "background.default" }}>
      <Container
        maxWidth="sm"
        sx={{
          px: { xs: 0, sm: 0 },
          pb: { xs: 9, sm: 4 },
        }}
      >
        <Header />

        <Box sx={{ px: { xs: 1, sm: 2 }, mt: { xs: 1.5, sm: 2.5 } }}>
          <Outlet />
        </Box>
      </Container>

      {/* Mobile bottom nav */}
      <Paper
        elevation={0}
        sx={{
          position: "fixed",
          left: 0,
          right: 0,
          bottom: 0,
          display: { xs: "block", sm: "none" },
          borderTop: "1px solid",
          borderColor: "divider",
          bgcolor: "background.paper",
        }}
      >
        <BottomNavigation showLabels value={navValue} onChange={handleNavChange}>
          <BottomNavigationAction label="Home" value="home" />
          <BottomNavigationAction label="Artists" value="users" />
          {isSignedIn && (
            <BottomNavigationAction label="My Profile" value="profile" />
          )}
        </BottomNavigation>
      </Paper>
    </Box>
  );
};

export default GalleryApp;
