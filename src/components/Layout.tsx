// src/components/Layout.tsx
import { Box } from "@mui/material";
import type { ReactNode } from "react";

const Layout = ({ children }: { children: ReactNode }) => {
  return (
    <Box
      sx={{
        minHeight: "80vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        bgcolor: "background.default",
        color: "text.primary",
        p: 1,
        overflow: "auto",
      }}
    >
      {children}
    </Box>
  );
};

export default Layout;
