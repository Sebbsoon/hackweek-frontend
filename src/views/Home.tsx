import { SignedIn, SignedOut, SignInButton } from "@clerk/clerk-react";
import { Box, Button, Paper, Stack, Typography } from "@mui/material";
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
              LinkedImg
            </Typography>
            <Typography
              variant="body1"
              color="text.secondary"
              className={styles.subtitle}
            >
              Discover artist galleries, share your work, and keep your photos organized.
            </Typography>
          </Box>

          <Stack className={styles.actions} spacing={1}>
            <Button
              variant="contained"
              onClick={() => setCurrentView("users")}
              className={styles.actionButton}
              fullWidth
            >
              Browse artists
            </Button>

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

          <Box className={styles.features}>
            <Paper variant="outlined" className={styles.featureCard}>
              <Typography className={styles.featureTitle}>Explore</Typography>
              <Typography variant="body2" color="text.secondary">
                Browse artists and open galleries to view their latest uploads.
              </Typography>
            </Paper>

            <Paper variant="outlined" className={styles.featureCard}>
              <Typography className={styles.featureTitle}>Create</Typography>
              <Typography variant="body2" color="text.secondary">
                Make your own galleries and add photos when you’re signed in.
              </Typography>
            </Paper>

            <Paper variant="outlined" className={styles.featureCard}>
              <Typography className={styles.featureTitle}>Organize</Typography>
              <Typography variant="body2" color="text.secondary">
                Keep collections tidy with descriptions and easy image management.
              </Typography>
            </Paper>
          </Box>

          <Typography
            variant="caption"
            color="text.secondary"
            className={styles.tip}
          >
            Tip: Use the bottom navigation to switch between Home and My Profile.
          </Typography>
        </Stack>
      </Paper>
    </Box>
  );
};

export default Home;
