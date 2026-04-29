import CreateGallery from "../components/CreateGallery";
import GalleryList from "../components/GalleryList";
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

const UserProfile = () => {
  const { selectedUser: user, currentUser } = useGallery();

  if (!user) {
    return <Alert severity="warning">User not found.</Alert>;
  }

  const isOwnProfile = user.id === currentUser?.id;

  return (
    <Box sx={{ p: { xs: 1, sm: 2 } }}>
      <Paper variant="outlined" sx={{ p: { xs: 1.5, sm: 2 } }}>
        <Stack spacing={2}>
          <Stack direction="row" spacing={2} sx={{ alignItems: "center" }}>
            <Avatar
              src={user.profilePictureUrl}
              alt={`${user.username}'s profile`}
              sx={{ width: 56, height: 56 }}
            />
            <Box sx={{ minWidth: 0 }}>
              <Typography variant="h5" component="h1" sx={{ fontWeight: 800 }} noWrap>
                {user.username}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                {user.description?.trim() ? user.description : "No bio yet."}
              </Typography>
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
            <Accordion variant="outlined" disableGutters sx={{ borderRadius: 2 }}>
              <AccordionSummary
                aria-controls="create-gallery-content"
                id="create-gallery-header"
                expandIcon={
                  <Box component="span" sx={{ fontSize: 18, lineHeight: 1 }}>
                    ▾
                  </Box>
                }
                sx={{
                  px: 2,
                  "& .MuiAccordionSummary-content, & .MuiAccordionSummary-expandIconWrapper":
                    {
                      alignItems: "center",
                    },
                  "& .MuiAccordionSummary-content": {
                    justifyContent: "center",
                    textAlign: "center",
                    margin: 0,
                    my: 1,
                  },
                  "& .MuiAccordionSummary-expandIconWrapper": {
                    marginLeft: 1,
                  },
                }}
              >
                <Typography variant="subtitle1" sx={{ fontWeight: 800 }}>
                  Create gallery
                </Typography>
              </AccordionSummary>

              <AccordionDetails sx={{ px: { xs: 1.5, sm: 2 }, pt: 0, pb: 2 }}>
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
