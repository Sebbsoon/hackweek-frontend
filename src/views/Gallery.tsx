import { useAuth } from "@clerk/clerk-react";
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Alert,
  Box,
  Button,
  ButtonBase,
  Dialog,
  DialogContent,
  Paper,
  Stack,
  Typography,
} from "@mui/material";
import { useNavigate } from "@tanstack/react-router";
import { useState } from "react";
import { deleteImageFromGallery } from "../api/api";
import ImageUpload from "../components/ImageUpload";
import useGallery from "../hooks/useGallery";
import styles from "./Gallery.module.css";

type ViewerImage = {
  src: string;
  title?: string | null;
};

const Gallery = () => {
  const navigate = useNavigate();
  const {
    currentGallery: gallery,
    currentUser,
    selectedUser,
    galleryImages,
    removeImageLocally,
  } = useGallery();
  const { getToken } = useAuth();

  const [viewer, setViewer] = useState<ViewerImage | null>(null);

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
    if (currentUser?.id === gallery.userId) {
      void navigate({ to: "/profile" });
      return;
    }

    void navigate({
      to: "/user/$userId",
      params: { userId: String(gallery.userId) },
    });
  };

  const isOwner = gallery.userId === currentUser?.id;

  return (
    <Box className={styles.root}>
      <Paper variant="outlined" className={styles.card}>
        <Stack spacing={2}>
          <Box>
            <ButtonBase
              onClick={handleOwnerClick}
              className={styles.ownerButton}
              aria-label="Open owner profile"
            >
              <Typography
                variant="h4"
                component="h1"
                className={styles.ownerName}
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
              className={styles.accordion}
            >
              <AccordionSummary
                aria-controls="image-upload-content"
                id="image-upload-header"
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
                  Add photos
                </Typography>
              </AccordionSummary>

              <AccordionDetails className={styles.accordionDetails}>
                <ImageUpload galleryId={gallery.id} />
              </AccordionDetails>
            </Accordion>
          )}

          <Box className={styles.grid}>
            {galleryImages?.map((image) => {
              const thumbSrc = image.thumbnailUrl ?? image.url;
              const fullSrc = image.url;

              return (
                <Box key={image.id} className={styles.gridItem}>
                  <ButtonBase
                    className={styles.thumbButton}
                    onClick={() =>
                      setViewer({
                        src: fullSrc,
                        title: image.title,
                      })
                    }
                    aria-label={
                      image.title ? `Open ${image.title}` : "Open image"
                    }
                  >
                    <Box
                      component="img"
                      src={thumbSrc}
                      alt={image.title ?? "Gallery image"}
                      className={styles.thumb}
                      loading="lazy"
                    />
                  </ButtonBase>

                  {isOwner && (
                    <Button
                      size="small"
                      color="error"
                      variant="outlined"
                      onClick={() => void handleDelete(image.id)}
                      className={styles.deleteBtn}
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

      <Dialog
        open={!!viewer}
        onClose={() => setViewer(null)}
        maxWidth="md"
        fullWidth
        slotProps={{
          paper: { className: styles.viewerPaper },
        }}
      >
        <DialogContent className={styles.viewerContent}>
          <ButtonBase
            className={styles.viewerClose}
            onClick={() => setViewer(null)}
            aria-label="Close image"
          >
            ×
          </ButtonBase>

          {viewer?.title ? (
            <Typography variant="subtitle2" className={styles.viewerTitle}>
              {viewer.title}
            </Typography>
          ) : null}

          {viewer?.src ? (
            <Box
              component="img"
              src={viewer.src}
              alt={viewer.title ?? "Selected image"}
              className={styles.viewerImage}
            />
          ) : null}
        </DialogContent>
      </Dialog>
    </Box>
  );
};

export default Gallery;
