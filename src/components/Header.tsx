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
import useGallery from "../hooks/useGallery";

const Header = () => {
  const { setCurrentView, currentUser } = useGallery();

  return (
    <AppBar
      position="sticky"
      elevation={0}
      color="transparent"
      sx={{
        borderBottom: "1px solid",
        borderColor: "divider",
        bgcolor: "background.paper",
      }}
    >
      <Toolbar sx={{ px: { xs: 1, sm: 2 }, minHeight: 56 }}>
        <ButtonBase
          onClick={() => setCurrentView("home")}
          sx={{
            borderRadius: 1,
            px: 0.5,
            py: 0.25,
            textAlign: "left",
          }}
          aria-label="Go to home"
        >
          <Typography
            variant="h6"
            sx={{ fontWeight: 800, letterSpacing: -0.2 }}
          >
            LinkedImg
          </Typography>
        </ButtonBase>

        <Box sx={{ flex: 1 }} />

        <SignedOut>
          <SignInButton mode="modal">
            <Button variant="contained" size="small">
              Sign in
            </Button>
          </SignInButton>
        </SignedOut>

        <SignedIn>
          <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
            {currentUser && (
              <Typography
                variant="body2"
                color="text.secondary"
                sx={{ display: { sm: "block" } }}
              >
                {currentUser?.username}
              </Typography>
            )}
            <UserButton />
            <SignOutButton redirectUrl="/hackweek-frontend">
              <Button variant="outlined" size="small">
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
