import CreateGallery from "../components/CreateGallery";
import GalleryList from "../components/GalleryList";
import ProfileQrToggle from "../components/ProfileQrToggle";
import useGallery from "../hooks/useGallery";
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Alert,
  Avatar,
  Box,
  Paper,
  Stack,
  Typography,
} from "@mui/material";
import styles from "./UserProfile.module.css";

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

const UserProfile = () => {
  const { selectedUser: user, currentUser } = useGallery();

  if (!user) {
    return <Alert severity="warning">User not found.</Alert>;
  }

  const isOwnProfile = user.id === currentUser?.id;

  const firstName = getFirstName(user).trim();
  const lastName = getLastName(user).trim();
  const fullName = `${firstName} ${lastName}`.trim();

  return (
    <Box className={styles.root}>
      <Paper variant="outlined" className={styles.card}>
        <Stack spacing={2}>
          <Stack direction="row" spacing={2} className={styles.headerRow}>
            <Stack direction="row" spacing={2} className={styles.headerLeft}>
              <Avatar
                src={user.profilePictureUrl}
                alt={`${user.username}'s profile`}
                className={styles.avatar}
              />

              <Box className={styles.headerText}>
                <Typography
                  variant="h5"
                  component="h1"
                  className={styles.username}
                  noWrap
                >
                  {user.username}
                </Typography>

                {fullName ? (
                  <Typography variant="body2" color="text.secondary">
                    {fullName}
                  </Typography>
                ) : null}

                <Typography variant="body2" color="text.secondary">
                  {user.description?.trim() ? user.description : "No bio yet."}
                </Typography>
              </Box>
            </Stack>

            <Box className={styles.qrTopRight}>
              <ProfileQrToggle userId={user.id} />
            </Box>
          </Stack>

          {user.galleries && user.galleries.length > 0 ? (
            <GalleryList />
          ) : (
            <Typography variant="body2" color="text.secondary">
              No galleries yet.
            </Typography>
          )}

          {isOwnProfile && (
            <Accordion
              variant="outlined"
              disableGutters
              className={styles.accordion}
            >
              <AccordionSummary
                aria-controls="create-gallery-content"
                id="create-gallery-header"
                expandIcon={
                  <Box component="span" className={styles.expandIcon}>
                    ▾
                  </Box>
                }
                className={styles.accordionSummary}
              >
                <Typography
                  variant="subtitle1"
                  className={styles.accordionTitle}
                >
                  Create gallery
                </Typography>
              </AccordionSummary>

              <AccordionDetails className={styles.accordionDetails}>
                <CreateGallery />
              </AccordionDetails>
            </Accordion>
          )}
        </Stack>
      </Paper>
    </Box>
  );
};

export default UserProfile;
