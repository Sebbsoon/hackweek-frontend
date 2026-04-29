import { SignedIn, SignedOut, SignInButton } from "@clerk/clerk-react";
import { Box, Button, Chip, Paper, Stack, Typography } from "@mui/material";
import { useNavigate } from "@tanstack/react-router";
import useGallery from "../hooks/useGallery";
import styles from "./Home.module.css";

const FEATURES = [
  {
    label: "Explore",
    description: "Browse artist galleries and discover the latest uploads.",
  },
  {
    label: "Create",
    description: "Build your own galleries and add photos when signed in.",
  },
  {
    label: "Organise",
    description: "Keep collections tidy with descriptions and easy management.",
  },
];

const Home = () => {
  const navigate = useNavigate();
  const { currentUser, setSelectedUser } = useGallery();

  return (
    <Box className={styles.root}>
      {/* Hero */}
      <Box className={styles.hero}>
        <Chip
          label="Photo galleries, simplified"
          size="small"
          sx={{
            bgcolor: "rgba(99,102,241,0.1)",
            color: "secondary.main",
            fontWeight: 600,
            mb: 2,
            border: "1px solid rgba(99,102,241,0.2)",
          }}
        />
        <Typography
          variant="h4"
          component="h1"
          className={styles.heroTitle}
          sx={{ mb: 1.5 }}
        >
          Welcome to{" "}
          <Box component="span" sx={{ color: "secondary.main" }}>
            LinkedImg
          </Box>
        </Typography>
        <Typography
          variant="body1"
          color="text.secondary"
          className={styles.heroSubtitle}
        >
          Discover artist galleries, share your work, and keep your photos
          organised in one clean space.
        </Typography>

        <Stack className={styles.actions} direction="row" spacing={1.5}>
          <SignedOut>
            <SignInButton mode="modal">
              <Button
                variant="contained"
                size="large"
                className={styles.actionButton}
              >
                Get started
              </Button>
            </SignInButton>
          </SignedOut>

          <SignedIn>
            <Button
              variant="contained"
              size="large"
              className={styles.actionButton}
              onClick={() => {
                if (!currentUser) {
                  void navigate({ to: "/" });
                  return;
                }
                setSelectedUser(currentUser);
                void navigate({ to: "/profile" });
              }}
            >
              My profile
            </Button>
          </SignedIn>

          <Button
            variant="outlined"
            size="large"
            className={styles.actionButton}
            onClick={() => void navigate({ to: "/users" })}
          >
            Browse artists
          </Button>
        </Stack>
      </Box>

      {/* Feature cards */}
      <Box className={styles.featuresGrid}>
        {FEATURES.map(({ label, description }) => (
          <Paper key={label} variant="outlined" className={styles.featureCard}>
            <Typography
              variant="h6"
              className={styles.featureLabel}
              sx={{ mb: 0.75 }}
            >
              {label}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              {description}
            </Typography>
          </Paper>
        ))}
      </Box>
    </Box>
  );
};

export default Home;
