import { useAuth } from "@clerk/clerk-react";
import { deleteGallery } from "../api/api";
import useGallery from "../hooks/useGallery";
import { useState } from "react";
import {
  Alert,
  Button,
  Card,
  CardActionArea,
  CardActions,
  CardContent,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Snackbar,
  Typography,
} from "@mui/material";

const GalleryCard = ({ gallery }: { gallery: UserGallery }) => {
  const { getToken } = useAuth();
  const {
    setCurrentView,
    setCurrentGallery,
    currentGallery,
    currentUser,
    selectedUser,
    setSelectedUser,
    setUsers,
  } = useGallery();

  const [isDeleting, setIsDeleting] = useState(false);
  const [confirmOpen, setConfirmOpen] = useState(false);
  const [toast, setToast] = useState<{
    open: boolean;
    severity: "success" | "error" | "info";
    message: string;
  }>({ open: false, severity: "info", message: "" });

  const removeGalleryLocally = (galleryId: string) => {
    // Update selectedUser galleries (if the selected user owns this gallery)
    if (selectedUser?.id === gallery.userId) {
      setSelectedUser((prev) => {
        if (!prev) return prev;
        const nextGalleries = (prev.galleries ?? []).filter((g) => g.id !== galleryId);
        return { ...prev, galleries: nextGalleries };
      });
    }

    // Update users list (keep global list in sync)
    setUsers((prev) =>
      prev.map((u) => {
        if (u.id !== gallery.userId) return u;
        const nextGalleries = (u.galleries ?? []).filter((g) => g.id !== galleryId);
        return { ...u, galleries: nextGalleries };
      }),
    );

    // If the deleted gallery is currently open, clear it and navigate away
    if (currentGallery?.id === galleryId) {
      setCurrentGallery(null);
      setCurrentView("profile");
    }
  };

  async function handleDelete(id: string) {
    try {
      setIsDeleting(true);
      setToast({ open: true, severity: "info", message: "Removing gallery…" });

      const token = await getToken();
      await deleteGallery(id, token ?? undefined);

      removeGalleryLocally(id);
      setToast({ open: true, severity: "success", message: "Gallery removed." });
    } catch (e) {
      console.error("Delete gallery failed:", e);
      setToast({
        open: true,
        severity: "error",
        message:
          "Couldn’t remove gallery. If it has images, remove them first (or enable cascade delete).",
      });
    } finally {
      setIsDeleting(false);
    }
  }

  const handleOnClick = () => {
    if (isDeleting) return;
    setCurrentGallery(gallery);
    setCurrentView("gallery");
  };

  const isOwner = gallery.userId === currentUser?.id;

  return (
    <>
      <Card variant="outlined">
        <CardActionArea onClick={handleOnClick} disabled={isDeleting}>
          <CardContent>
            <Typography variant="h6" component="h2" noWrap>
              {gallery.title}
            </Typography>
            {!!gallery.description && (
              <Typography variant="body2" color="text.secondary">
                {gallery.description}
              </Typography>
            )}
          </CardContent>
        </CardActionArea>

        {isOwner && (
          <CardActions sx={{ justifyContent: "flex-end" }}>
            <Button
              color="error"
              variant="outlined"
              disabled={isDeleting}
              onClick={(e) => {
                e.preventDefault();
                e.stopPropagation();
                setConfirmOpen(true);
              }}
            >
              Remove gallery
            </Button>
          </CardActions>
        )}
      </Card>

      <Dialog
        open={confirmOpen}
        onClose={() => (isDeleting ? undefined : setConfirmOpen(false))}
        aria-labelledby="delete-gallery-title"
        aria-describedby="delete-gallery-description"
      >
        <DialogTitle id="delete-gallery-title">Remove gallery?</DialogTitle>
        <DialogContent>
          <DialogContentText id="delete-gallery-description">
            This will remove <strong>{gallery.title}</strong>.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button
            onClick={() => setConfirmOpen(false)}
            disabled={isDeleting}
            variant="outlined"
          >
            Cancel
          </Button>
          <Button
            onClick={() => {
              setConfirmOpen(false);
              void handleDelete(gallery.id);
            }}
            disabled={isDeleting}
            color="error"
            variant="contained"
          >
            {isDeleting ? "Removing…" : "Remove"}
          </Button>
        </DialogActions>
      </Dialog>

      <Snackbar
        open={toast.open}
        autoHideDuration={toast.severity === "info" ? null : 4500}
        onClose={() => setToast((t) => ({ ...t, open: false }))}
        anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
      >
        <Alert
          severity={toast.severity}
          variant="filled"
          onClose={() => setToast((t) => ({ ...t, open: false }))}
        >
          {toast.message}
        </Alert>
      </Snackbar>
    </>
  );
};

export default GalleryCard;
