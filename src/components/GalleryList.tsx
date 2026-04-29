import useGallery from "../hooks/useGallery";
import GalleryCard from "./GalleryCard";
import { Box, Stack, Typography } from "@mui/material";

const GalleryList = () => {
  const { selectedUser } = useGallery();
  const galleries = selectedUser?.galleries;

  return (
    <Box>
      <Stack spacing={0.5} sx={{ mb: 1.5 }}>
        <Typography
          variant="h6"
          component="h2"
          sx={{ fontWeight: 700, letterSpacing: -0.2 }}
        >
          {selectedUser?.username
            ? `${selectedUser.username}'s galleries`
            : "Galleries"}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          Open a gallery to view its images.
        </Typography>
      </Stack>

      <Stack spacing={1.25}>
        {galleries?.map((gallery) => (
          <GalleryCard key={gallery.id} gallery={gallery} />
        ))}
      </Stack>
    </Box>
  );
};

export default GalleryList;
