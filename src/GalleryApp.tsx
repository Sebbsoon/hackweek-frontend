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
  Typography,
} from "@mui/material";
import { Outlet, useNavigate, useRouterState } from "@tanstack/react-router";
import Header from "./components/Header";
import useGallery from "./hooks/useGallery";
import styles from "./GalleryApp.module.css";

const GalleryApp = () => {
  const { isLoaded } = useAuth();
  const { isSignedIn } = useUser();
  const navigate = useNavigate();
  const pathname = useRouterState({ select: (s) => s.location.pathname });

  const { currentUser, setSelectedUser } = useGallery();

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

  if (!isLoaded) {
    return (
      <Container maxWidth="lg" className={styles.container}>
        <Header />
        <Box className={styles.loadingBox}>
          <CircularProgress />
        </Box>
      </Container>
    );
  }

  return (
    <Container maxWidth="lg" className={styles.container}>
      <Header />

      <Box className={styles.layoutGrid}>
        <Paper variant="outlined" className={styles.sideNav}>
          <Typography className={styles.navTitle} variant="subtitle2">
            Navigation
          </Typography>
          <List disablePadding>
            <ListItemButton
              selected={navValue === "home"}
              onClick={() => void navigate({ to: "/" })}
              className={styles.navItem}
            >
              <ListItemText primary="Home" />
            </ListItemButton>

            <ListItemButton
              selected={navValue === "users"}
              onClick={() => void navigate({ to: "/users" })}
              className={styles.navItem}
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
                className={styles.navItem}
              >
                <ListItemText primary="My Profile" />
              </ListItemButton>
            )}
          </List>
        </Paper>

        <Paper variant="outlined" className={styles.mainContent}>
          <Outlet />
        </Paper>
      </Box>

      <Paper elevation={8} className={styles.bottomNav}>
        <BottomNavigation
          showLabels
          value={navValue}
          onChange={handleNavChange}
        >
          <BottomNavigationAction label="Home" value="home" />
          <BottomNavigationAction label="Users" value="users" />
          {isSignedIn && (
            <BottomNavigationAction label="My Profile" value="profile" />
          )}
        </BottomNavigation>
      </Paper>
    </Container>
  );
};

export default GalleryApp;
