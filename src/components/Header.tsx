import {
  SignedIn,
  SignedOut,
  SignInButton,
  SignOutButton,
  UserButton,
} from "@clerk/clerk-react";
import {
  AppBar,
  Box,
  Button,
  ButtonBase,
  Toolbar,
  Typography,
} from "@mui/material";
import { useNavigate } from "@tanstack/react-router";
import useGallery from "../hooks/useGallery";

const Header = () => {
  const navigate = useNavigate();
  const { currentUser } = useGallery();

  const baseUrl = import.meta.env.BASE_URL || "/";
  const afterSignOutUrl = baseUrl.endsWith("/") ? baseUrl : `${baseUrl}/`;

  return (
    <AppBar
      position="sticky"
      elevation={0}
      color="transparent"
      sx={{
        borderBottom: "1px solid",
        borderColor: "divider",
        bgcolor: "background.paper",
        backdropFilter: "blur(8px)",
      }}
    >
      <Toolbar sx={{ px: { xs: 2, sm: 3 }, minHeight: 60 }}>
        <ButtonBase
          onClick={() => void navigate({ to: "/" })}
          sx={{
            borderRadius: 2,
            px: 0.75,
            py: 0.5,
            textAlign: "left",
            transition: "opacity 0.15s",
            "&:hover": { opacity: 0.75 },
          }}
          aria-label="Go to home"
        >
          <Typography
            variant="h6"
            sx={{
              fontWeight: 900,
              letterSpacing: -0.5,
              color: "text.primary",
              "& span": { color: "secondary.main" },
            }}
          >
            Linked<span>Img</span>
          </Typography>
        </ButtonBase>

        <Box sx={{ flex: 1 }} />

        <SignedOut>
          <SignInButton mode="modal">
            <Button
              variant="contained"
              size="small"
              sx={{ borderRadius: 2, px: 2 }}
            >
              Sign in
            </Button>
          </SignInButton>
        </SignedOut>

        <SignedIn>
          <Box sx={{ display: "flex", alignItems: "center", gap: 1.5 }}>
            {currentUser && (
              <Typography
                variant="body2"
                sx={{
                  color: "text.secondary",
                  fontWeight: 500,
                  display: { xs: "none", sm: "block" },
                }}
              >
                {currentUser.username}
              </Typography>
            )}
            <UserButton />
            <SignOutButton redirectUrl={afterSignOutUrl}>
              <Button
                variant="outlined"
                size="small"
                sx={{ borderRadius: 2, px: 1.5 }}
              >
                Sign out
              </Button>
            </SignOutButton>
          </Box>
        </SignedIn>
      </Toolbar>
    </AppBar>
  );
};

export default Header;

