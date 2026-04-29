import { SignedIn, SignedOut, SignInButton } from "@clerk/clerk-react";
import { Box, Button, Divider, Paper, Stack, Typography } from "@mui/material";
import useGallery from "../hooks/useGallery";
import styles from "./Home.module.css";

const Home = () => {
  const { setCurrentView, currentUser, setSelectedUser } = useGallery();

  return (
    <Box className={styles.root}>
      <Paper variant="outlined" className={styles.card}>
        <Stack spacing={2}>
          <Box>
            <Typography variant="h4" component="h1" className={styles.title}>
              Welcome to LinkedImg
            </Typography>
            <Typography
              variant="body1"
              color="text.secondary"
              className={styles.subtitle}
            >
              Discover artist galleries, share your work, and keep your photos
              organized.
            </Typography>
          </Box>

          <Stack className={styles.actions} spacing={1}>
            <SignedOut>
              <SignInButton mode="modal">
                <Button
                  variant="outlined"
                  className={styles.actionButton}
                  fullWidth
                >
                  Sign in to create
                </Button>
              </SignInButton>
            </SignedOut>

            <SignedIn>
              <Button
                variant="outlined"
                className={styles.actionButton}
                fullWidth
                onClick={() => {
                  if (!currentUser) {
                    setCurrentView("home");
                    return;
                  }
                  setSelectedUser(currentUser);
                  setCurrentView("profile");
                }}
              >
                My profile
              </Button>
            </SignedIn>
          </Stack>
          <Paper variant="outlined" square className={styles.featureCard}>
            <Box className={styles.features}>
              <Typography variant="h5" className={styles.featureTitle}>Explore</Typography>
              <Typography variant="body2" color="text.secondary">
                Browse artists and open galleries to view their latest uploads.
              </Typography>
              <Divider sx={{ my: 1 }} />
              <Typography variant="h5" className={styles.featureTitle}>Create</Typography>
              <Typography variant="body2" color="text.secondary">
                Make your own galleries and add photos when you’re signed in.
              </Typography>
              <Divider sx={{ my: 1 }} />

              <Typography variant="h5" className={styles.featureTitle}>Organize</Typography>
              <Typography variant="body2" color="text.secondary">
                Keep collections tidy with descriptions and easy image
                management.
              </Typography>
            </Box>
          </Paper>
        </Stack>
      </Paper>
    </Box>
  );
};

export default Home;
