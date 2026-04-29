import { useEffect } from "react";
import { useNavigate, useParams } from "@tanstack/react-router";
import { Alert, Button, Stack } from "@mui/material";
import useGallery from "../hooks/useGallery";
import Gallery from "../views/Gallery";

type FoundGallery = { owner: User; gallery: UserGallery } | null;

const findGalleryById = (users: User[], galleryId: string): FoundGallery => {
  for (const u of users) {
    const g = (u.galleries ?? []).find(
      (x) => String(x.id) === String(galleryId)
    );
    if (g) return { owner: u, gallery: g };
  }
  return null;
};

const GalleryRoute = () => {
  const navigate = useNavigate();
  const { galleryId } = useParams({ from: "/gallery/$galleryId" });

  const {
    users,
    usersLoading,
    usersError,
    setCurrentGallery,
    setSelectedUser,
  } = useGallery();

  const found = findGalleryById(users, String(galleryId));

  useEffect(() => {
    if (!found) return;
    setCurrentGallery(found.gallery);
    setSelectedUser(found.owner);
  }, [found, setCurrentGallery, setSelectedUser]);

  if (usersError) return <Alert severity="error">{usersError}</Alert>;
  if (usersLoading) return <Alert severity="info">Loading gallery…</Alert>;

  if (!found) {
    return (
      <Stack spacing={1.25}>
        <Alert severity="warning">Gallery not found.</Alert>
        <Button
          variant="outlined"
          onClick={() => void navigate({ to: "/users" })}
        >
          Back to users
        </Button>
      </Stack>
    );
  }

  return <Gallery />;
};

export default GalleryRoute;