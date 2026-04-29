import { useAuth, useUser } from "@clerk/clerk-react";
import { useState } from "react";
import { addImageToGallery } from "../api/api";
import {
  Alert,
  Box,
  Button,
  Paper,
  Stack,
  TextField,
  Typography,
} from "@mui/material";

const ImageUpload = ({ galleryId }: { galleryId: string }) => {
  const { user } = useUser();
  const { getToken } = useAuth();

  const [files, setFiles] = useState<File[]>([]);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [isUploading, setIsUploading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFiles = Array.from(event.target.files ?? []);
    setFiles(selectedFiles);
  };

  const handleUpload = async () => {
    if (files.length === 0) return;

    try {
      setIsUploading(true);
      setError(null);

      const token = await getToken();
      const sharedTitle = title.trim();

      await Promise.all(
        files.map((file) =>
          addImageToGallery(
            galleryId,
            {
              file,
              title: sharedTitle || file.name,
              description: description.trim() || undefined,
            },
            token ?? undefined,
          ),
        ),
      );

      setFiles([]);
      setTitle("");
      setDescription("");
    } catch (e) {
      console.error("Image upload failed:", e);
      setError("Upload failed. Please try again.");
    } finally {
      setIsUploading(false);
    }
  };

  if (!user)
    return (
      <Alert severity="info" sx={{ mt: 2 }}>
        Sign in to upload images.
      </Alert>
    );

  return (
    <Box sx={{ mt: 3 }}>
      <Paper variant="outlined" sx={{ p: { xs: 1.5, sm: 2 } }}>
        <Stack spacing={2}>
          <Box>
            <Typography variant="h6" component="h2" sx={{ fontWeight: 800 }}>
              Add photos
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Select one or more images to upload to this gallery.
            </Typography>
          </Box>

          <Stack
            direction="row"
            spacing={1}
            sx={{ alignItems: "center", flexWrap: "wrap" }}
          >
            <Button component="label" variant="outlined" disabled={isUploading}>
              Choose files
              <input
                hidden
                type="file"
                accept="image/*"
                multiple
                onChange={handleChange}
              />
            </Button>

            <Typography variant="body2" color="text.secondary">
              {files.length > 0 ? `${files.length} selected` : "No files selected"}
            </Typography>
          </Stack>

          <TextField
            label="Title (optional)"
            placeholder="Use one title for all selected files"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            disabled={isUploading}
            fullWidth
          />

          <TextField
            label="Description (optional)"
            placeholder="Add a short note"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            disabled={isUploading}
            fullWidth
          />

          <Box sx={{ display: "flex", justifyContent: "flex-end" }}>
            <Button
              onClick={handleUpload}
              disabled={files.length === 0 || isUploading}
              variant="contained"
            >
              {isUploading ? "Uploading…" : "Upload"}
            </Button>
          </Box>

          {error && <Alert severity="error">{error}</Alert>}
        </Stack>
      </Paper>
    </Box>
  );
};

export default ImageUpload;
