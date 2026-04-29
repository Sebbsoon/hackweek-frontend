import {
  Avatar,
  Card,
  CardActionArea,
  CardContent,
  Stack,
  Typography,
} from "@mui/material";
import { useNavigate } from "@tanstack/react-router";

const UserCard = ({ user }: { user: User }) => {
  const navigate = useNavigate();

  const handleOnClick = () => {
    void navigate({ to: "/user/$userId", params: { userId: String(user.id) } });
  };

  return (
    <Card variant="outlined">
      <CardActionArea onClick={handleOnClick}>
        <CardContent>
          <Stack direction="row" spacing={1.5} sx={{ alignItems: "center" }}>
            <Avatar
              src={user.profilePictureUrl}
              alt={`${user.username}'s profile`}
              sx={{ width: 44, height: 44 }}
            />

            <Stack spacing={0.25} sx={{ minWidth: 0, flex: 1 }}>
              <Typography
                variant="h6"
                component="h2"
                noWrap
                sx={{ lineHeight: 1.2 }}
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
          </Stack>
        </CardContent>
      </CardActionArea>
    </Card>
  );
};

export default UserCard;
