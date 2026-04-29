import { useAuth } from "@clerk/clerk-react";
import { deleteGallery } from "../api/api";
import useGallery from "../hooks/useGallery";
import { useState } from "react";
import {
  Alert,
  Box,
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
import { useNavigate } from "@tanstack/react-router";

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
  const navigate = useNavigate();

  const [isDeleting, setIsDeleting] = useState(false);
  const [confirmOpen, setConfirmOpen] = useState(false);
  const [toast, setToast] = useState<{
    open: boolean;
    severity: "success" | "error" | "info";
    message: string;
  }>({ open: false, severity: "info", message: "" });

  const removeGalleryLocally = (galleryId: string) => {
    if (selectedUser?.id === gallery.userId) {
      setSelectedUser((prev) => {
        if (!prev) return prev;
        const nextGalleries = (prev.galleries ?? []).filter(
          (g) => g.id !== galleryId,
        );
        return { ...prev, galleries: nextGalleries };
      });
    }

    setUsers((prev) =>
      prev.map((u) => {
        if (u.id !== gallery.userId) return u;
        const nextGalleries = (u.galleries ?? []).filter(
          (g) => g.id !== galleryId,
        );
        return { ...u, galleries: nextGalleries };
      }),
    );

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
          "Couldn't remove gallery. If it has images, remove them first (or enable cascade delete).",
      });
    } finally {
      setIsDeleting(false);
    }
  }

  const handleOnClick = () => {
    if (isDeleting) return;
    setCurrentGallery(gallery);
    void navigate({
      to: "/gallery/$galleryId",
      params: { galleryId: String(gallery.id) },
    });
  };

  const isOwner = gallery.userId === currentUser?.id;

  return (
    <>
      <Card
        variant="outlined"
        sx={{
          borderRadius: "12px",
          border: "1px solid rgba(0,0,0,0.08)",
          transition: "box-shadow 0.18s ease, transform 0.18s ease",
          "&:hover": {
            boxShadow: "0 4px 20px rgba(0,0,0,0.08)",
            transform: "translateY(-1px)",
          },
        }}
      >
        <CardActionArea onClick={handleOnClick} disabled={isDeleting}>
          <CardContent sx={{ pb: isOwner ? 1 : 2 }}>
            <Typography
              variant="h6"
              component="h2"
              noWrap
              sx={{ fontWeight: 700, letterSpacing: -0.2 }}
            >
              {gallery.title}
            </Typography>
            {!!gallery.description && (
              <Typography
                variant="body2"
                color="text.secondary"
                sx={{ mt: 0.25 }}
              >
                {gallery.description}
              </Typography>
            )}
          </CardContent>
        </CardActionArea>

        {isOwner && (
          <CardActions sx={{ justifyContent: "flex-end", pt: 0, px: 1.5, pb: 1.5 }}>
            <Button
              color="error"
              variant="text"
              size="small"
              disabled={isDeleting}
              sx={{ fontWeight: 600, fontSize: "0.75rem" }}
              onClick={(e) => {
                e.preventDefault();
                e.stopPropagation();
                setConfirmOpen(true);
              }}
            >
              Remove
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
        <DialogTitle id="delete-gallery-title" sx={{ fontWeight: 700 }}>
          Remove gallery?
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="delete-gallery-description">
            This will permanently remove{" "}
            <Box component="strong" sx={{ color: "text.primary" }}>
              {gallery.title}
            </Box>
            .
          </DialogContentText>
        </DialogContent>
        <DialogActions sx={{ px: 3, pb: 2, gap: 1 }}>
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
