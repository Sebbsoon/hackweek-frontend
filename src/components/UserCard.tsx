import {
  Avatar,
  Box,
  Card,
  CardActionArea,
  CardContent,
  Stack,
  Typography,
} from "@mui/material";
import { useNavigate } from "@tanstack/react-router";
import useGallery from "../hooks/useGallery";

const UserCard = ({ user }: { user: User }) => {
  const navigate = useNavigate();
  const { setSelectedUser } = useGallery();

  const handleOnClick = () => {
    setSelectedUser(user);
    void navigate({ to: "/user/$userId", params: { userId: String(user.id) } });
  };

  return (
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
      <CardActionArea onClick={handleOnClick} sx={{ borderRadius: "12px" }}>
        <CardContent>
          <Stack direction="row" spacing={1.5} sx={{ alignItems: "center" }}>
            <Avatar
              src={user.profilePictureUrl}
              alt={`${user.username}'s profile`}
              sx={{
                width: 48,
                height: 48,
                border: "1.5px solid rgba(0,0,0,0.08)",
              }}
            />

            <Stack spacing={0.25} sx={{ minWidth: 0, flex: 1 }}>
              <Typography
                variant="subtitle1"
                component="h2"
                noWrap
                sx={{ fontWeight: 700, letterSpacing: -0.2, lineHeight: 1.25 }}
              >
                {user.username}
              </Typography>

              <Typography
                variant="body2"
                color="text.secondary"
                sx={{
                  display: "-webkit-box",
                  WebkitLineClamp: 2,
                  WebkitBoxOrient: "vertical",
                  overflow: "hidden",
                }}
              >
                {user.description?.trim() ? user.description : "No bio yet."}
              </Typography>
            </Stack>

            {user.galleries && user.galleries.length > 0 && (
              <Box
                sx={{
                  flexShrink: 0,
                  fontSize: "0.7rem",
                  fontWeight: 700,
                  color: "secondary.main",
                  bgcolor: "rgba(99,102,241,0.1)",
                  border: "1px solid rgba(99,102,241,0.2)",
                  borderRadius: "6px",
                  px: 0.75,
                  py: 0.25,
                  whiteSpace: "nowrap",
                }}
              >
                {user.galleries.length}{" "}
                {user.galleries.length === 1 ? "gallery" : "galleries"}
              </Box>
            )}
          </Stack>
        </CardContent>
      </CardActionArea>
    </Card>
  );
};

export default UserCard;
