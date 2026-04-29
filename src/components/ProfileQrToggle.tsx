import { useState } from "react";
import { Box, Button, Collapse, Paper, Stack, Typography } from "@mui/material";
import styles from "./ProfileQrToggle.module.css";

const joinUrl = (origin: string, base: string, path: string) => {
  const cleanOrigin = origin.replace(/\/+$/, "");
  const cleanBase = (base || "/").replace(/^\/?/, "/"); // ensure leading /
  const withTrailingSlash = cleanBase.endsWith("/") ? cleanBase : `${cleanBase}/`;
  const cleanPath = path.replace(/^\/+/, "");
  return `${cleanOrigin}${withTrailingSlash}${cleanPath}`;
};

const ProfileQrToggle = ({ userId }: { userId: string | number }) => {
  const [open, setOpen] = useState(false);

  const origin = typeof window !== "undefined" ? window.location.origin : "";
  const base = import.meta.env.BASE_URL || "/";

  const profileUrl = joinUrl(
    origin,
    base,
    `user/${encodeURIComponent(String(userId))}`,
  );

  // Match "component" sizing better than 220px
  const qrSize = 180;

  const qrSrc = `https://api.qrserver.com/v1/create-qr-code/?size=${qrSize}x${qrSize}&data=${encodeURIComponent(
    profileUrl,
  )}`;

  return (
    <Box className={styles.root}>
      <Button
        variant="outlined"
        className={styles.toggleBtn}
        onClick={() => setOpen((v) => !v)}
      >
        {open ? "Close" : "Share"}
      </Button>

      <Collapse in={open} unmountOnExit>
        <Paper variant="outlined" className={styles.panel}>
          <Stack spacing={1.25} className={styles.panelInner}>
            <Typography variant="subtitle2" className={styles.panelTitle}>
              Share this profile
            </Typography>

            <img
              className={styles.qr}
              src={qrSrc}
              alt="QR code linking to the user profile"
            />

            <Typography
              variant="caption"
              color="text.secondary"
              className={styles.link}
            >
              {profileUrl}
            </Typography>
          </Stack>
        </Paper>
      </Collapse>
    </Box>
  );
};

export default ProfileQrToggle;