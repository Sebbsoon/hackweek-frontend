import {
  SignedIn,
  SignedOut,
  SignInButton,
  useClerk,
  UserButton,
} from "@clerk/clerk-react";
import {
  AppBar,
  Box,
  Button,
  ButtonBase,
  Toolbar
} from "@mui/material";
import { useNavigate } from "@tanstack/react-router";
import linkedImgLogo from "../assets/linkedimg-logo.png";

const Header = () => {
  const navigate = useNavigate();
  const { signOut } = useClerk();

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
      }}
    >
      <Toolbar sx={{ px: { xs: 1, sm: 2 }, minHeight: 56 }}>
        <ButtonBase
          onClick={() => void navigate({ to: "/" })}
          sx={{
            borderRadius: 1,
            px: 0.5,
            py: 0.25,
            textAlign: "left",
          }}
          aria-label="Go to home"
        >
          <Box
            component="img"
            src={linkedImgLogo}
            alt="LinkedImg"
            sx={{
              height: 40,
              width: "auto",
              display: "block",
            }}
          />
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
           
            <UserButton />
            <Button
              variant="outlined"
              size="small"
              onClick={() => void signOut({ redirectUrl: afterSignOutUrl })}
            >
              Sign out
            </Button>
          </Box>
        </SignedIn>
      </Toolbar>
    </AppBar>
  );
};

export default Header;
