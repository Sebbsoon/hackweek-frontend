import { useAuth, useUser } from "@clerk/clerk-react";
import {
  BottomNavigation,
  BottomNavigationAction,
  Box,
  CircularProgress,
  Container,
  List,
  ListItemButton,
  ListItemText,
  Paper,
  Typography
} from "@mui/material";
import { Outlet, useNavigate, useRouterState } from "@tanstack/react-router";
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
      <Box sx={{ display: "grid", placeItems: "center", minHeight: 240 }}>
        <CircularProgress />
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
    <Container
      maxWidth="lg"
      sx={{
        px: { xs: 1, sm: 2, md: 3 },
        py: { xs: 1, sm: 2, md: 3 },
        pb: { xs: 9, md: 3 },
      }}
    >
      <Header />

      <Box
        sx={{
          mt: { xs: 1, sm: 2 },
          display: "grid",
          gridTemplateColumns: { xs: "1fr", md: "240px 1fr" },
          gap: { xs: 0, md: 3 },
          alignItems: "start",
        }}
      >
        <Paper
          variant="outlined"
          sx={{
            display: { xs: "none", md: "block" },
            position: "sticky",
            top: 88,
            p: 1,
            borderRadius: 3,
          }}
        >
          <Typography sx={{ px: 1.5, py: 1, fontWeight: 700 }} variant="subtitle2">
            Navigation
          </Typography>
          <List disablePadding>
            <ListItemButton
              selected={navValue === "home"}
              onClick={() => void navigate({ to: "/" })}
              sx={{ borderRadius: 2 }}
            >
              <ListItemText primary="Home" />
            </ListItemButton>

            <ListItemButton
              selected={navValue === "users"}
              onClick={() => void navigate({ to: "/users" })}
              sx={{ borderRadius: 2 }}
            >
              <ListItemText primary="Users" />
            </ListItemButton>

            {isSignedIn && (
              <ListItemButton
                selected={navValue === "profile"}
                onClick={() => {
                  if (currentUser) setSelectedUser(currentUser);
                  void navigate({ to: "/profile" });
                }}
                sx={{ borderRadius: 2 }}
              >
                <ListItemText primary="My Profile" />
              </ListItemButton>
            )}
          </List>
        </Paper>

        <Paper
          variant="outlined"
          sx={{
            borderRadius: 3,
            p: { xs: 0, md: 2 },
            minHeight: { md: "70vh" },
          }}
        >
          <Outlet />
        </Paper>
      </Box>

      <Paper
        elevation={8}
        sx={{
          position: "fixed",
          left: 0,
          right: 0,
          bottom: 0,
          display: { xs: "block", md: "none" },
          borderTop: "1px solid",
          borderColor: "divider",
        }}
      >
        <BottomNavigation showLabels value={navValue} onChange={handleNavChange}>
          <BottomNavigationAction label="Home" value="home" />
          <BottomNavigationAction label="Users" value="users" />
          {isSignedIn && <BottomNavigationAction label="My Profile" value="profile" />}
        </BottomNavigation>
      </Paper>
    </Container>
  );
};

export default GalleryApp;
