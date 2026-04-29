import useGallery from "../hooks/useGallery";
import GalleryCard from "./GalleryCard";
import { Box, Stack, Typography } from "@mui/material";

const GalleryList = () => {
  const { selectedUser } = useGallery();
  const galleries = selectedUser?.galleries;

  return (
    <Box sx={{ p: { xs: 1, sm: 2 } }}>
      <Stack spacing={0.5} sx={{ mb: 1.5 }}>
        <Typography variant="h5" component="h1" sx={{ fontWeight: 800 }}>
          {selectedUser?.username ? `${selectedUser.username}'s galleries` : "Galleries"}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          Browse collections and open a gallery to view images.
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
