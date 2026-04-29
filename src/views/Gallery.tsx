import useGallery from "../hooks/useGallery";
import ImageUpload from "../components/ImageUpload";
import { deleteImageFromGallery } from "../api/api";
import { useAuth } from "@clerk/clerk-react";
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Alert,
  Box,
  Button,
  Paper,
  Stack,
  Typography,
  ButtonBase,
} from "@mui/material";

const Gallery = () => {
  const {
    currentGallery: gallery,
    currentUser,
    selectedUser,
    galleryImages,
    removeImageLocally,
    setCurrentView,
  } = useGallery();
  const { getToken } = useAuth();

  if (!gallery) {
    return <Alert severity="warning">Gallery not found.</Alert>;
  }

  const ownerUsername =
    (selectedUser?.id === gallery.userId ? selectedUser.username : undefined) ??
    (currentUser?.id === gallery.userId ? currentUser.username : undefined) ??
    "Unknown user";

  const handleDelete = async (id: string) => {
    const token = await getToken();
    deleteImageFromGallery(id, token ?? undefined);
    removeImageLocally(id);
  };

  const handleOwnerClick = () => {
    setCurrentView("profile");
  };

  const isOwner = gallery.userId === currentUser?.id;

  return (
    <Box sx={{ p: { xs: 1, sm: 2 } }}>
      <Paper variant="outlined" sx={{ p: { xs: 1.5, sm: 2 } }}>
        <Stack spacing={2}>
          <Box>
            <ButtonBase
              onClick={handleOwnerClick}
              sx={{
                display: "inline-flex",
                borderRadius: 1,
                px: 0.5,
                py: 0.25,
                textAlign: "left",
              }}
              aria-label="Open owner profile"
            >
              <Typography
                variant="h4"
                component="h1"
                sx={{
                  fontWeight: 800,
                  textDecoration: "underline",
                  textUnderlineOffset: 4,
                }}
              >
                {ownerUsername}
              </Typography>
            </ButtonBase>

            <Typography variant="h5" component="h2">
              {gallery.title}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              {gallery.description}
            </Typography>
          </Box>
          {isOwner && (
            <Accordion
              variant="outlined"
              disableGutters
              sx={{ borderRadius: 2 }}
            >
              <AccordionSummary
                aria-controls="image-upload-content"
                id="image-upload-header"
                expandIcon={
                  <Box component="span" sx={{ fontSize: 18, lineHeight: 1 }}>
                    ▾
                  </Box>
                }
                sx={{
                  px: 2,

                  // Center label + arrow as a group
                  "& .MuiAccordionSummary-content, & .MuiAccordionSummary-expandIconWrapper":
                    {
                      alignItems: "center",
                    },

                  "& .MuiAccordionSummary-content": {
                    my: 1,
                    justifyContent: "center",
                    textAlign: "center",
                    margin: 0,
                  },

                  "& .MuiAccordionSummary-expandIconWrapper": {
                    marginLeft: 1,
                  },
                }}
              >
                <Typography variant="subtitle1" sx={{ fontWeight: 800 }}>
                  Add photos
                </Typography>
              </AccordionSummary>

              <AccordionDetails sx={{ px: { xs: 1.5, sm: 2 }, pt: 0, pb: 2 }}>
                <ImageUpload galleryId={gallery.id} />
              </AccordionDetails>
            </Accordion>
          )}
          <Box
            sx={{
              display: "grid",
              gridTemplateColumns: {
                xs: "repeat(2, 1fr)",
                sm: "repeat(4, 1fr)",
              },
              gap: 1.25,
            }}
          >
            {galleryImages?.map((image) => {
              const src = image.thumbnailUrl ?? image.url;

              return (
                <Box key={image.id} sx={{ display: "grid", gap: 0.75 }}>
                  <Box
                    component="img"
                    src={src}
                    alt={image.title ?? "Gallery image"}
                    sx={{
                      width: "100%",
                      aspectRatio: "1 / 1",
                      objectFit: "cover",
                      borderRadius: 1.5,
                      border: "1px solid",
                      borderColor: "divider",
                    }}
                  />
                  {isOwner && (
                    <Button
                      size="small"
                      color="error"
                      variant="outlined"
                      onClick={() => void handleDelete(image.id)}
                      sx={{ minHeight: 40 }}
                    >
                      Delete
                    </Button>
                  )}
                </Box>
              );
            })}
          </Box>
        </Stack>
      </Paper>
    </Box>
  );
};

export default Gallery;
