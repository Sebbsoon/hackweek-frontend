import { useAuth, useUser } from "@clerk/clerk-react";
import { useState } from "react";
import { createGallery, getUsers } from "../api/api";
import useGallery from "../hooks/useGallery";
import {
  Alert,
  Box,
  Button,
  Paper,
  Snackbar,
  Stack,
  TextField,
  Typography,
} from "@mui/material";

const CreateGallery = () => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const { user } = useUser();
  const { getToken } = useAuth();

  const { currentUser, selectedUser, setSelectedUser, setUsers } = useGallery();

  const [isCreating, setIsCreating] = useState(false);
  const [toast, setToast] = useState<{
    open: boolean;
    severity: "success" | "error" | "info";
    message: string;
  }>({ open: false, severity: "info", message: "" });

  const addGalleryLocally = (created: Partial<UserGallery>) => {
    if (!currentUser) return;

    const galleryToInsert: UserGallery = {
      // prefer backend response, otherwise fallback
      id: String(created.id),
      title: created.title ?? title.trim(),
      description: created.description ?? (description.trim() || ""),
      userId: created.userId ?? currentUser.id,
      images: created.images ?? [],
    };

    // Update selectedUser (if we’re looking at our own profile)
    if (selectedUser?.id === currentUser.id) {
      setSelectedUser((prev) => {
        if (!prev) return prev;
        const prevGalleries = prev.galleries ?? [];
        return { ...prev, galleries: [galleryToInsert, ...prevGalleries] };
      });
    }

    // Update users list (source of truth for currentUser resolution)
    setUsers((prev) =>
      prev.map((u) => {
        if (u.id !== currentUser.id) return u;
        const prevGalleries = u.galleries ?? [];
        return { ...u, galleries: [galleryToInsert, ...prevGalleries] };
      }),
    );
  };

  async function handleCreateGallery() {
    if (!user || isCreating) return;

    try {
      setIsCreating(true);
      setToast({ open: true, severity: "info", message: "Creating gallery…" });

      const token = await getToken();

      const payload = {
        user_id: user.id,
        title: title.trim(),
        images: [],
        description: description.trim() || undefined,
      };

      const created = (await createGallery(payload, token ?? undefined)) as
        | Partial<UserGallery>
        | undefined;

      if (created?.id) {
        addGalleryLocally(created);
      } else {
        // Fallback: if API doesn't return the created gallery, refresh users
        const data = await getUsers();
        const normalizedUsers = Array.isArray(data)
          ? data
          : Array.isArray((data as { users?: User[] })?.users)
            ? (data as { users: User[] }).users
            : [];
        setUsers(normalizedUsers);
      }

      setToast({ open: true, severity: "success", message: "Gallery created." });
      setTitle("");
      setDescription("");
    } catch (e) {
      console.error("Creating gallery failed:", e);
      setToast({
        open: true,
        severity: "error",
        message: "Couldn’t create gallery. Please try again.",
      });
    } finally {
      setIsCreating(false);
    }
  }

  return (
    <Box sx={{ maxWidth: 720, mx: "auto", p: { xs: 1, sm: 2 } }}>
      <Paper variant="outlined" sx={{ p: { xs: 1.5, sm: 2 } }}>
        <Stack spacing={2}>
          <Box>
            <Typography variant="body2" color="text.secondary">
              Add a title and an optional description to get started.
            </Typography>
          </Box>

          <TextField
            label="Title"
            placeholder="e.g. Summer trip"
            id="gallery-title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            fullWidth
            disabled={isCreating}
          />

          <TextField
            label="Description (optional)"
            placeholder="What’s this gallery about?"
            id="gallery-description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            fullWidth
            multiline
            minRows={4}
            disabled={isCreating}
          />

          <Box sx={{ display: "flex", justifyContent: "flex-end" }}>
            <Button
              onClick={handleCreateGallery}
              disabled={!title.trim() || isCreating}
              variant="contained"
            >
              {isCreating ? "Creating…" : "Create"}
            </Button>
          </Box>
        </Stack>
      </Paper>

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
    </Box>
  );
};

export default CreateGallery;